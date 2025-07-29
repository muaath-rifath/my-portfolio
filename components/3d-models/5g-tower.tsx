'use client';

import React, { useRef, memo } from 'react';
import * as THREE from 'three';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useTowerConfiguration } from '@/hooks/useTower';

type Tower5GProps = {
    // Removed isDarkMode prop - now using useDarkMode hook
    height?: number;
}

// Optimized Tower Section component with memo
const TowerSection = memo(({ y, materials, diagonalPositions }: { 
    y: number; 
    materials: ReturnType<typeof useTowerConfiguration>['materials']; 
    diagonalPositions: ReturnType<typeof useTowerConfiguration>['diagonalPositions'];
}) => {
    const sectionGroupRef = useRef<THREE.Group>(null);
    const height = 2;

    return (
        <group position-y={y} ref={sectionGroupRef}>
            {/* Horizontal supports */}
            <mesh material={materials.darkMetalMaterial}>
                <boxGeometry args={[4, 0.3, 4]} />
            </mesh>
            {/* Diagonal supports */}
            {diagonalPositions.map((pos, i) => (
                <mesh
                    key={i}
                    material={materials.metalMaterial}
                    position={[pos.x, 0, pos.z]}
                    rotation={[Math.PI / 4, -pos.angle, 0]}
                >
                    <cylinderGeometry args={[0.15, 0.15, height * 1.5, 8]} />
                </mesh>
            ))}
        </group>
    );
});

TowerSection.displayName = 'TowerSection';

// Optimized Sector Antenna component with memo
const SectorAntenna = memo(({ x, y, z, angle, materials }: { 
    x: number; 
    y: number; 
    z: number; 
    angle: number; 
    materials: ReturnType<typeof useTowerConfiguration>['materials']; 
}) => {
    return (
        <group position={[x, y, z]} rotation-y={angle}>
            {/* Main panel */}
            <mesh material={materials.antennaMaterial}>
                <boxGeometry args={[0.5, 4, 1.5]} />
            </mesh>
            {/* Equipment box */}
            <mesh material={materials.equipmentMaterial} position={[-0.7, -0.5, 0]}>
                <boxGeometry args={[0.8, 1.5, 1]} />
            </mesh>
        </group>
    );
});

SectorAntenna.displayName = 'SectorAntenna';

// Optimized Dish component with memo
const Dish = memo(({ y, angle, materials }: { 
    y: number; 
    angle: number; 
    materials: ReturnType<typeof useTowerConfiguration>['materials']; 
}) => {
    return (
        <group position-y={y} rotation-y={angle}>
            {/* Support arm */}
            <mesh material={materials.darkMetalMaterial} position-x={1.5}>
                <boxGeometry args={[3, 0.3, 0.3]} />
            </mesh>
            {/* Dish */}
            <mesh material={materials.antennaMaterial} position={[3, 0, 0]} rotation={[Math.PI / 2, Math.PI, 0]}>
                <sphereGeometry args={[1, 32, 16, 0, Math.PI]} />
            </mesh>
            {/* Mount */}
            <mesh material={materials.darkMetalMaterial} position={[3, 0, 0]} rotation-x={Math.PI / 2}>
                <cylinderGeometry args={[0.3, 0.3, 0.5, 8]} />
            </mesh>
        </group>
    );
});

Dish.displayName = 'Dish';

const Tower5G = memo(({ height = 25 }: Tower5GProps) => {
    const towerRef = useRef<THREE.Group>(null);
    const isDarkMode = useDarkMode();
    const { 
        materials, 
        configuration, 
        dishPositions, 
        antennaPositions, 
        sectionPositions, 
        diagonalPositions 
    } = useTowerConfiguration(height);

    return (
        <group ref={towerRef} dispose={null}>
            {/* Tower base */}
            <mesh material={materials.darkMetalMaterial} position-y={0}>
                <boxGeometry args={[4, 1, 4]} />
            </mesh>

            {/* Tower main shaft */}
            <mesh material={materials.metalMaterial} position-y={configuration.mainTowerHeight / 2 + 0.5}>
                <boxGeometry args={[1.5, configuration.mainTowerHeight, 1.5]} />
            </mesh>

            {/* Tower sections/supports */}
            {sectionPositions.map((y, i) => (
                <TowerSection 
                    key={i} 
                    y={y} 
                    materials={materials} 
                    diagonalPositions={diagonalPositions} 
                />
            ))}

            {/* Top equipment platform */}
            <mesh material={materials.darkMetalMaterial} position-y={configuration.mainTowerHeight + 1}>
                <cylinderGeometry args={[3, 3, 0.5, 8]} />
            </mesh>

            {/* Antennas & Equipment */}
            {antennaPositions.map((pos, i) => (
                <SectorAntenna key={i} {...pos} materials={materials} />
            ))}

            {/* Warning light at top */}
            <mesh material={materials.warningMaterial} position-y={configuration.mainTowerHeight + 3.5}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <pointLight
                    color={materials.colors.emissive}
                    intensity={isDarkMode ? 1.2 : 1.0}
                    distance={50}
                    position={[0, 0.2, 0]}
                />
            </mesh>

            {/* Small dishes */}
            {dishPositions.map((pos, i) => (
                <Dish key={i} y={pos.y} angle={pos.angle} materials={materials} />
            ))}
        </group>
    );
});

Tower5G.displayName = 'Tower5G';

export default Tower5G;
