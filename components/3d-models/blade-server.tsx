'use client';

import { lightModelPalette } from '@/lib/model-palette';

import { useRef } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useMotionPreference } from '@/hooks/useMotionPreference';

const lightFinish: Record<'frame' | 'panel' | 'steel' | 'recess' | 'green' | 'activity' | 'light', string> = { frame: lightModelPalette.frame, panel: lightModelPalette.panel, steel: lightModelPalette.steel, recess: lightModelPalette.recess, green: lightModelPalette.indicator, activity: lightModelPalette.secondary, light: lightModelPalette.glow };
// Match the gateway and actuator's forest-green housings and mint trim.
const darkFinish: typeof lightFinish = { frame: '#1a2e20', panel: '#006644', steel: '#8fffaa', recess: '#0c1912', green: '#00ffaa', activity: '#00ff88', light: '#8fffaa' };

function Block({ position, size, color, metalness = 0.6 }: {
    position: [number, number, number]; size: [number, number, number]; color: string; metalness?: number;
}) {
    const dark = useDarkMode();
    return <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} metalness={dark ? metalness : Math.min(metalness, 0.35)} roughness={dark ? 0.38 : 0.55} />
    </mesh>;
}

function ServerBlade({ index, finish }: { index: number; finish: typeof lightFinish }) {
    const activity = useRef<THREE.MeshStandardMaterial>(null);
    const reducedMotion = useMotionPreference();
    useFrame(({ clock }) => {
        if (activity.current) activity.current.emissiveIntensity = reducedMotion ? 1 : 0.65 + Math.pow(Math.sin(clock.elapsedTime * 2.5 + index * 1.7), 8) * 1.8;
    });
    return <group position-y={7.4 - index * 2.1}>
        <Block position={[0, 0, -0.1]} size={[26.4, 1.85, 7.1]} color={finish.recess} />
        <RoundedBox args={[26.4, 1.8, 0.35]} radius={0.12} smoothness={2} position-z={3.65} castShadow receiveShadow>
            <meshStandardMaterial color={finish.panel} roughness={0.4} metalness={0.65} />
        </RoundedBox>
        {/* Four hot-swap drive trays with inset ventilation and release tabs. */}
        {[-8.4, -3.4, 1.6, 6.6].map(x => <group key={x} position={[x, 0, 3.9]}>
            <Block position={[0, 0, 0]} size={[4.55, 1.3, 0.16]} color={finish.recess} />
            {[-0.35, 0, 0.35].map(y => <Block key={y} position={[-0.25, y, 0.1]} size={[3.35, 0.1, 0.06]} color={finish.panel} />)}
            <Block position={[1.9, 0, 0.15]} size={[0.25, 0.85, 0.16]} color={finish.steel} />
        </group>)}
        {[-12.3, 12.3].map(x => <group key={x} position={[x, 0, 4.05]}>
            {[-0.48, 0.48].map(y => <Block key={y} position={[0, y, 0]} size={[0.22, 0.18, 0.6]} color={finish.steel} />)}
            <Block position={[0, 0, 0.3]} size={[0.22, 1.1, 0.2]} color={finish.steel} />
        </group>)}
        <mesh position={[10.1, 0.36, 3.88]}>
            <circleGeometry args={[0.13, 16]} />
            <meshStandardMaterial color={finish.green} emissive={finish.green} emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
        <mesh position={[10.65, 0.36, 3.88]}>
            <circleGeometry args={[0.1, 16]} />
            <meshStandardMaterial ref={activity} color={finish.activity} emissive={finish.activity} toneMapped={false} />
        </mesh>
        <Block position={[10.35, -0.35, 3.88]} size={[1, 0.3, 0.08]} color={finish.recess} />
    </group>;
}

export default function BladeServer() {
    const dark = useDarkMode();
    const finish = dark ? darkFinish : lightFinish;
    return <group name="server-rack">
        {/* An open cabinet keeps the recessed blades visible. */}
        <Block position={[0, 0, -4]} size={[30, 20, 0.5]} color={finish.frame} />
        {[-14.6, 14.6].map(x => <group key={x}>
            <Block position={[x, 0, 0]} size={[0.8, 20, 8]} color={finish.frame} />
            <Block position={[x * 0.945, 0, 3.9]} size={[0.65, 19, 0.4]} color={finish.steel} />
            {Array.from({ length: 16 }, (_, i) => <Block key={i} position={[x * 0.945, 8.6 - i * 1.14, 4.12]} size={[0.2, 0.3, 0.05]} color={finish.recess} />)}
            {Array.from({ length: 9 }, (_, i) => <Block key={i} position={[x + Math.sign(x) * 0.41, -5.6 + i * 1.4, 0]} size={[0.03, 0.18, 5.5]} color={finish.recess} />)}
        </group>)}
        {[-9.7, 9.7].map(y => <RoundedBox key={y} args={[30, 0.8, 8.5]} radius={0.18} smoothness={2} position-y={y} castShadow receiveShadow>
            <meshStandardMaterial color={finish.frame} roughness={0.32} metalness={0.65} />
        </RoundedBox>)}
        {Array.from({ length: 8 }, (_, i) => <ServerBlade key={i} index={i} finish={finish} />)}
        {[-11, 11].flatMap(x => [-2.5, 2.5].map(z => <Block key={`${x}-${z}`} position={[x, -10.4, z]} size={[2.2, 0.7, 1.6]} color={finish.recess} metalness={0.1} />))}
        <mesh position={[0, 9.25, 4.05]}>
            <boxGeometry args={[24.8, 0.1, 0.08]} />
            <meshStandardMaterial color={finish.light} emissive={finish.light} emissiveIntensity={dark ? 0.9 : 2} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 8.4, 5.5]} color={finish.light} intensity={dark ? 5 : 12} distance={18} decay={2} />
    </group>;
}
