'use client';

import { lightModelPalette } from '@/lib/model-palette';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useDarkMode } from '@/hooks/useDarkMode';
import DeviceScreen from './device-screen';

export default function SmartPhone() {
    const isDarkMode = useDarkMode();
    const phoneGroupRef = useRef<THREE.Group>(null);
    
    // Materials definition based on standalone page
    const materials = useMemo(() => ({
        phoneBody: new THREE.MeshStandardMaterial({
            name: 'phone_body',
            color: isDarkMode ? 0x505e50 : lightModelPalette.housing,
            metalness: 0.7,
            roughness: 0.3,
            emissive: isDarkMode ? 0x253025 : 0x000000,
            emissiveIntensity: isDarkMode ? 0.30 : 0,
        }),
        
        screen: new THREE.MeshBasicMaterial({
            name: 'screen',
            color: isDarkMode ? 0x1a241a : 0xe8f4e8,
            toneMapped: false,
        }),
        
        uiElement: new THREE.MeshStandardMaterial({
            name: 'ui_element',
            color: isDarkMode ? 0xafffaf : 0x00aa88,
            metalness: 0.1,
            roughness: 0.1,
            emissive: isDarkMode ? 0x66cc66 : 0x000000,
            emissiveIntensity: isDarkMode ? 0.7 : 0.0
        }),
        
        accent: new THREE.MeshStandardMaterial({
            name: 'accent',
            color: isDarkMode ? 0x66ffaa : 0x00aa66,
            metalness: 0.7,
            roughness: 0.3,
            emissive: isDarkMode ? 0x44cc88 : 0x000000,
            emissiveIntensity: isDarkMode ? 0.6 : 0.0
        }),
        
        camera: new THREE.MeshStandardMaterial({
            name: 'camera',
            color: isDarkMode ? 0x334433 : 0x556655,
            metalness: 0.9,
            roughness: 0.4,
            emissive: isDarkMode ? 0x112211 : 0x000000,
            emissiveIntensity: isDarkMode ? 0.3 : 0.0
        }),
        
        cameraLens: new THREE.MeshStandardMaterial({
            name: 'camera_lens',
            color: isDarkMode ? 0x445544 : 0x111111,
            metalness: 0.1,
            roughness: 0.1,
            emissive: isDarkMode ? 0x223322 : 0x000000,
            emissiveIntensity: isDarkMode ? 0.1 : 0.0
        }),
        
        cameraLensMain: new THREE.MeshStandardMaterial({
            name: 'camera_lens_main',
            color: isDarkMode ? 0x445544 : 0x111111,
            metalness: 0.1,
            roughness: 0.05,
            opacity: 0.9,
            transparent: true,
            side: THREE.DoubleSide,
            emissive: isDarkMode ? 0x223322 : 0x000000,
            emissiveIntensity: isDarkMode ? 0.1 : 0.0
        }),
        
        port: new THREE.MeshStandardMaterial({
            name: 'port',
            color: isDarkMode ? 0x444444 : 0x888888,
            metalness: 0.8,
            roughness: 0.5
        }),
        
        buttons: new THREE.MeshStandardMaterial({
            name: 'buttons',
            color: isDarkMode ? 0x505e50 : lightModelPalette.housing,
            metalness: 0.9, 
            roughness: 0.3,
            emissive: isDarkMode ? 0x253025 : 0x000000,
            emissiveIntensity: isDarkMode ? 0.3 : 0.0
        }),
        
        notch: new THREE.MeshStandardMaterial({
            name: 'notch',
            color: isDarkMode ? 0x112211 : 0x333333,
            metalness: 0.5,
            roughness: 0.8,
            emissive: isDarkMode ? 0x001100 : 0x000000,
            emissiveIntensity: isDarkMode ? 0.1 : 0.0
        }),
        
        selfieCamera: new THREE.MeshStandardMaterial({
            name: 'selfie_camera',
            color: isDarkMode ? 0x111111 : 0x000000,
            metalness: 0.2,
            roughness: 0.3,
            emissive: isDarkMode ? 0x111111 : 0x000000,
            emissiveIntensity: isDarkMode ? 0.1 : 0.0
        }),
        
        cameraRing: new THREE.MeshStandardMaterial({
            name: 'camera_ring',
            color: isDarkMode ? 0x66ffaa : 0xbbbbbb,
            metalness: 0.6,
            roughness: 0.3,
            emissive: isDarkMode ? 0x44cc88 : 0x666666,
            emissiveIntensity: isDarkMode ? 0.8 : 0.2,
            side: THREE.DoubleSide
        }),
        
        graphElement: new THREE.MeshStandardMaterial({
            name: 'graph_element',
            color: isDarkMode ? 0x88ffcc : 0x00ccaa,
            metalness: 0.1,
            roughness: 0.2,
            emissive: isDarkMode ? 0x44ddaa : 0x00aa88,
            emissiveIntensity: isDarkMode ? 0.8 : 0.3,
            transparent: true,
            opacity: 0.9
        }),
        
        chartElement: new THREE.MeshStandardMaterial({
            name: 'chart_element',
            color: isDarkMode ? 0xccff66 : 0x88cc00,
            metalness: 0.1,
            roughness: 0.2,
            emissive: isDarkMode ? 0xaadd33 : 0x66aa00,
            emissiveIntensity: isDarkMode ? 0.8 : 0.3,
            transparent: true,
            opacity: 0.9
        }),
        
        textElement: new THREE.MeshStandardMaterial({
            name: 'text_element',
            color: isDarkMode ? 0xeeffee : 0xffffff,
            metalness: 0.1,
            roughness: 0.2,
            emissive: isDarkMode ? 0xccffcc : 0xf0f0f0,
            emissiveIntensity: isDarkMode ? 0.6 : 0.2
        })
    }), [isDarkMode]);
    
    // Animate screen content and subtle phone movement
    useFrame((state) => {
        // Subtle rotation of the phone
        if (phoneGroupRef.current) {
            phoneGroupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
        }
    });
    
    // Create a rounded rectangle shape for the phone
    const createRoundedRectShape = (width: number, height: number, radius: number) => {
        const shape = new THREE.Shape();
        shape.moveTo(-width / 2 + radius, -height / 2);
        shape.lineTo(width / 2 - radius, -height / 2);
        shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
        shape.lineTo(width / 2, height / 2 - radius);
        shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
        shape.lineTo(-width / 2 + radius, height / 2);
        shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
        shape.lineTo(-width / 2, -height / 2 + radius);
        shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);
        return shape;
    };
    
    const secondThirdRingGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        shape.absarc(0, 0, 0.35, 0, Math.PI * 2, false);
        const hole = new THREE.Path();
        hole.absarc(0, 0, 0.3, 0, Math.PI * 2, true);
        shape.holes.push(hole);
        return new THREE.ExtrudeGeometry(shape, { steps: 1, depth: 0.05, bevelEnabled: false });
    }, []);

    // Phone dimensions
    const height = 14;
    const width = 7;
    const thickness = 0.8;
    const cornerRadius = 0.7;
    const screenCornerRadius = 0.5;
 // Added for widgets
    const punchHoleRadius = 0.2; // Selfie camera radius

    // Create geometries
    const phoneShape = useMemo(() => createRoundedRectShape(width, height, cornerRadius), []);

    const phoneGeometry = useMemo(() => {
        const extrudeSettings = {
            steps: 1,
            depth: thickness,
            bevelEnabled: false
        };
        const geometry = new THREE.ExtrudeGeometry(phoneShape, extrudeSettings);
        geometry.center();
        return geometry;
    }, [phoneShape]);

    // Screen geometry
    const screenWidth = width - 0.3;
    const screenHeight = height - 0.4;
    const screenSurfaceZ = thickness / 2 + 0.06;
    const frontCameraZ = screenSurfaceZ + 0.06;

    return (
        <group ref={phoneGroupRef}>
            {/* Phone body */}
            <mesh
                geometry={phoneGeometry}
                material={materials.phoneBody}
                castShadow
                receiveShadow
            />

            <DeviceScreen device="phone" width={screenWidth} height={screenHeight} radius={screenCornerRadius}
                position={[0, 0, screenSurfaceZ]} />

            {/* Notch / Front Camera Area - REMOVE NOTCH MESH */}
            {/*
            <mesh
                material={materials.notch}
                position={[0, screenHeight / 2 - 0.4, frontCameraZ]} // Use frontCameraZ
            >
                <boxGeometry args={[1.5, 0.3, 0.01]} />
            </mesh>
            */}

            {/* Selfie camera (Punch-hole) */}
            <mesh
                material={materials.selfieCamera}
                // Position centered horizontally, slightly below the top edge
                position={[0, screenHeight / 2 - 0.4, frontCameraZ + 0.001]}
            >
                {/* Use the radius defined for punchHoleRadius */}
                <circleGeometry args={[punchHoleRadius, 32]} />
            </mesh>

            {/* Camera area on back - Move to top-right and arrange vertically */}
            <group position={[width/3, height/2.7, -thickness/2 - 0.075]}>
                 {/* ... existing camera code ... */}
                 {/* Camera 1 (Top) */}
                 <mesh
                    material={materials.cameraRing}
                    geometry={secondThirdRingGeometry}
                    position={[0, 0.8, 0.1]}
                    rotation={[Math.PI, 0, 0]}
                 />
                 <mesh
                    material={new THREE.MeshStandardMaterial({ color: 0x000000, /* ... */ })}
                    position={[0, 0.8, 0.05]}
                 >
                    <circleGeometry args={[0.3, 32]} />
                 </mesh>

                 {/* Flashlight */}
                 <mesh
                    position={[-0.8, 0, 0.075]}
                    rotation={[Math.PI / 2, 0, 0]}
                 >
                    <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
                    <meshStandardMaterial color={0xffffdd} emissive={0xffffaa} /* ... */ />
                 </mesh>

                 {/* Camera 2 (Middle) */}
                 <mesh
                    material={materials.cameraRing}
                    geometry={secondThirdRingGeometry}
                    position={[0, 0, 0.1]}
                    rotation={[Math.PI, 0, 0]}
                 />
                 <mesh
                    material={new THREE.MeshStandardMaterial({ color: 0x000000, /* ... */ })}
                    position={[0, 0, 0.05]}
                 >
                    <circleGeometry args={[0.3, 32]} />
                 </mesh>

                 {/* Camera 3 (Bottom) */}
                 <mesh
                    material={materials.cameraRing}
                    geometry={secondThirdRingGeometry}
                    position={[0, -0.8, 0.1]}
                    rotation={[Math.PI, 0, 0]}
                 />
                 <mesh
                    material={new THREE.MeshStandardMaterial({ color: 0x000000, /* ... */ })}
                    position={[0, -0.8, 0.05]}
                 >
                    <circleGeometry args={[0.3, 32]} />
                 </mesh>
            </group>

            {/* Side buttons */}
            <mesh
                material={materials.buttons}
                position={[-width/2 - 0.1, height/4, 0]}
                castShadow
            >
                <boxGeometry args={[0.1, 1.2, 0.25]} />
            </mesh>
            
            <mesh
                material={materials.buttons}
                position={[width/2 + 0.1, height/4, 0]}
                castShadow
            >
                <boxGeometry args={[0.1, 1.2, 0.25]} />
            </mesh>

            {/* Bottom port - REMOVED */}
            {/*
            <mesh
                material={materials.port}
                position={[0, -height/2 - 0.05, 0]}
                rotation={[Math.PI/2, 0, 0]}
            >
                <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
            </mesh>
            */}
        </group>
    );
}
