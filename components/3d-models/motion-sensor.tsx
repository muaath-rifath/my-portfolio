'use client';

import { useMemo } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';
import * as THREE from 'three';

const lightColors = { pcb: '#14634e', edge: '#c5ad69', lens: '#eef2eb', collar: '#b6c4c7', chip: '#182224', solder: '#b9c8cf', grooves: '#d4dfd9' };
const darkColors: typeof lightColors = { pcb: '#006633', edge: '#8fffaa', lens: '#6e9980', collar: '#006644', chip: '#111b15', solder: '#8fffaa', grooves: '#456b53' };

function Part({ position, size, color, metalness = 0.2 }: {
    position: [number, number, number]; size: [number, number, number]; color: string; metalness?: number;
}) {
    return <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.45} metalness={metalness} />
    </mesh>;
}

export default function MotionSensor() {
    const dark = useDarkMode();
    const colors = dark ? darkColors : lightColors;
    const board = useMemo(() => {
        const shape = new THREE.Shape();
        const half = 0.96, corner = 0.12;
        shape.moveTo(-half + corner, -half);
        shape.lineTo(half - corner, -half);
        shape.quadraticCurveTo(half, -half, half, -half + corner);
        shape.lineTo(half, half - corner);
        shape.quadraticCurveTo(half, half, half - corner, half);
        shape.lineTo(-half + corner, half);
        shape.quadraticCurveTo(-half, half, -half, half - corner);
        shape.lineTo(-half, -half + corner);
        shape.quadraticCurveTo(-half, -half, -half + corner, -half);
        for (const x of [-0.78, 0.78]) for (const y of [-0.78, 0.78]) {
            const hole = new THREE.Path();
            hole.absarc(x, y, 0.085, 0, Math.PI * 2, true);
            shape.holes.push(hole);
        }
        return shape;
    }, []);

    return <group name="pir-motion-sensor">
        <mesh rotation-x={-Math.PI / 2} position-y={-0.05} castShadow receiveShadow>
            <extrudeGeometry args={[board, { depth: 0.1, bevelEnabled: false, curveSegments: 8 }]} />
            <meshStandardMaterial color={colors.pcb} roughness={0.6} metalness={0.15} />
        </mesh>
        {[-0.78, 0.78].flatMap(x => [-0.78, 0.78].map(z => <mesh key={`${x}-${z}`} position={[x, 0.055, z]} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.086, 0.135, 24]} />
            <meshStandardMaterial color={colors.edge} metalness={0.7} roughness={0.35} side={THREE.DoubleSide} />
        </mesh>))}
        {/* Opaque Fresnel lens, seated in its retaining collar. */}
        <mesh position-y={0.15} castShadow receiveShadow>
            <cylinderGeometry args={[0.71, 0.75, 0.18, 48]} />
            <meshStandardMaterial color={colors.collar} roughness={0.35} metalness={0.55} />
        </mesh>
        <mesh position-y={0.25} castShadow receiveShadow>
            <sphereGeometry args={[0.66, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial color={colors.lens} roughness={0.48} metalness={0} clearcoat={0.18} flatShading />
        </mesh>
        {[0.28, 0.55, 0.82, 1.09, 1.36].map(angle => <mesh key={angle} position-y={0.25 + 0.662 * Math.cos(angle)} rotation-x={Math.PI / 2}>
            <torusGeometry args={[0.662 * Math.sin(angle), 0.007, 6, 48]} />
            <meshStandardMaterial color={colors.grooves} roughness={0.55} />
        </mesh>)}
        {/* Controller and soldered legs remain visible along the board's front edge. */}
        <Part position={[0, 0.11, 0.8]} size={[0.46, 0.11, 0.2]} color={colors.chip} />
        {[-0.16, -0.05, 0.05, 0.16].flatMap(x => [0.65, 0.94].map(z => <Part key={`${x}-${z}`} position={[x, 0.08, z]} size={[0.035, 0.04, 0.11]} color={colors.solder} metalness={0.75} />))}
        {[-0.82, 0.82].map(x => <group key={x}>
            {[-0.35, 0, 0.35].map(z => <group key={z}>
                <Part position={[x, 0.065, z]} size={[0.14, 0.025, 0.19]} color={colors.solder} metalness={0.7} />
                <Part position={[x, 0.09, z]} size={[0.12, 0.05, 0.09]} color={colors.chip} />
            </group>)}
            <Part position={[x, 0.053, 0]} size={[0.025, 0.006, 1.2]} color={colors.edge} metalness={0.6} />
        </group>)}
        <Part position={[0, -0.13, -0.82]} size={[0.68, 0.18, 0.22]} color={colors.chip} />
        {[-0.22, 0, 0.22].map(x => <Part key={x} position={[x, -0.36, -0.82]} size={[0.055, 0.5, 0.055]} color={colors.edge} metalness={0.8} />)}
        <mesh position={[0.58, 0.11, 0.76]}>
            <sphereGeometry args={[0.055, 12, 8]} />
            <meshStandardMaterial color="#6affb5" emissive="#40ed9b" emissiveIntensity={1.8} toneMapped={false} />
        </mesh>
    </group>;
}
