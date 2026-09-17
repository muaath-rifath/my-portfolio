'use client';

import { lightModelPalette } from '@/lib/model-palette';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import DeviceScreen from './device-screen';
import { useDarkMode } from '@/hooks/useDarkMode';
// Import Line if needed for borders, or primitive for existing THREE.Line objects
// import { Line } from '@react-three/drei';
// Assuming Text component is available for rendering text in R3F
// import { Text } from '@react-three/drei';

// Helper function to create rounded rectangle shapes (from reference)
const createRoundedRectShape = (w: number, h: number, r: number) => {
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, -h / 2); shape.lineTo(w / 2 - r, -h / 2); shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r); shape.lineTo(w / 2, h / 2 - r); shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); shape.lineTo(-w / 2 + r, h / 2); shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); shape.lineTo(-w / 2, -h / 2 + r); shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    return shape;
};

// Materials Hook (adapted from reference createMaterials)
const useLaptopMaterials = (isDarkMode: boolean) => {
    return useMemo(() => ({
        laptopBody: new THREE.MeshStandardMaterial({
            name: 'laptop_lid', // Default name, will be overridden for base
            color: isDarkMode ? 0x505e50 : lightModelPalette.housing,
            metalness: 0.7, roughness: 0.3,
            emissive: isDarkMode ? 0x253025 : 0x000000, emissiveIntensity: isDarkMode ? 0.30 : 0,
            side: THREE.DoubleSide
        }),
        screen: new THREE.MeshStandardMaterial({ // Not directly used for screen bg, but for potential elements
            name: 'screen',
            color: isDarkMode ? 0x00ffbb : 0x00aa99,
            metalness: 0.1, roughness: 0.05,
            emissive: isDarkMode ? 0x00aa88 : 0x008866, emissiveIntensity: isDarkMode ? 0.5 : 0.2,
            side: THREE.FrontSide
        }),
        dashboardBackground: new THREE.MeshBasicMaterial({
            name: 'dashboard_background', color: isDarkMode ? 0x1a241a : 0xe8f4e8, toneMapped: false,
        }),
        dashboardBorder: new THREE.LineBasicMaterial({ // Specific material for the border
            name: 'dashboard_border',
            color: isDarkMode ? 0x446644 : 0xaaaaaa, linewidth: 1, transparent: true, opacity: 0.5
        }),
        uiElement: new THREE.MeshStandardMaterial({ // General UI elements if needed
            name: 'ui_element',
            color: isDarkMode ? 0xafffaf : 0x00aa88,
            metalness: 0.1, roughness: 0.1,
            emissive: isDarkMode ? 0x66cc66 : 0x000000, emissiveIntensity: isDarkMode ? 0.7 : 0.0
        }),
        accent: new THREE.MeshStandardMaterial({ // For status indicators, etc.
            name: 'accent',
            color: isDarkMode ? 0x66ffaa : 0x00aa66,
            metalness: 0.7, roughness: 0.3,
            emissive: isDarkMode ? 0x44cc88 : 0x000000, emissiveIntensity: isDarkMode ? 0.6 : 0.0
        }),
        port: new THREE.MeshStandardMaterial({
            name: 'port',
            color: isDarkMode ? 0x444444 : 0x888888,
            metalness: 0.8, roughness: 0.5
        }),
        buttons: new THREE.MeshStandardMaterial({ // For power button etc.
            name: 'buttons',
            color: isDarkMode ? 0x505e50 : lightModelPalette.housing,
            metalness: 0.9, roughness: 0.3,
            emissive: isDarkMode ? 0x253025 : 0x000000, emissiveIntensity: isDarkMode ? 0.3 : 0.0
        }),
        selfieCamera: new THREE.MeshStandardMaterial({
            name: 'selfie_camera',
            color: isDarkMode ? 0x111111 : 0x000000,
            metalness: 0.2, roughness: 0.3,
            emissive: isDarkMode ? 0x111111 : 0x000000, emissiveIntensity: isDarkMode ? 0.1 : 0.0
        }),
        graphElement: new THREE.MeshStandardMaterial({ // For widgets
            name: 'graph_element',
            color: isDarkMode ? 0x88ffcc : 0x00ccaa,
            metalness: 0.1, roughness: 0.2,
            emissive: isDarkMode ? 0x44ddaa : 0x00aa88, emissiveIntensity: isDarkMode ? 0.8 : 0.3,
            transparent: true, opacity: 0.9, side: THREE.DoubleSide // Ensure side for ring geometry
        }),
        chartElement: new THREE.MeshStandardMaterial({ // For widgets
            name: 'chart_element',
            color: isDarkMode ? 0xccff66 : 0x88cc00,
            metalness: 0.1, roughness: 0.2,
            emissive: isDarkMode ? 0xaadd33 : 0x66aa00, emissiveIntensity: isDarkMode ? 0.8 : 0.3,
            transparent: true, opacity: 0.9, side: THREE.DoubleSide // Ensure side for ring geometry
        }),
        textElement: new THREE.MeshStandardMaterial({ // For widget text (if using planes)
            name: 'text_element',
            color: isDarkMode ? 0xeeffee : 0xffffff,
            metalness: 0.1, roughness: 0.2,
            emissive: isDarkMode ? 0xccffcc : 0xf0f0f0, emissiveIntensity: isDarkMode ? 0.6 : 0.2,
            side: THREE.FrontSide
        }),
        keyCap: new THREE.MeshStandardMaterial({
            name: 'keyCap',
            color: isDarkMode ? 0x354035 : lightModelPalette.panel,
            roughness: 0.7, metalness: 0.1,
            emissive: isDarkMode ? 0x101510 : 0x000000, emissiveIntensity: isDarkMode ? 0.1 : 0,
        }),
        touchpad: new THREE.MeshStandardMaterial({
            name: 'touchpad',
            color: isDarkMode ? 0x485548 : lightModelPalette.metal,
            roughness: 0.6, metalness: 0.2,
        }),
        hinge: new THREE.MeshStandardMaterial({
            name: 'hinge',
            color: isDarkMode ? 0x333833 : 0xaaaaaa,
            metalness: 0.8, roughness: 0.4,
        }),
        keyboardBase: new THREE.MeshStandardMaterial({ // Specific material for keyboard recess
            name: 'keyboard_base',
            color: isDarkMode ? 0x252e25 : lightModelPalette.frame,
            roughness: 0.8, metalness: 0.2,
            transparent: true, opacity: 0.4
        }),
        // Widget specific materials from reference code
        widgetBackground: new THREE.MeshBasicMaterial({
            name: 'widget_background', color: isDarkMode ? 0x304530 : 0xfcfffc, toneMapped: false,
        }),
        widgetTitleText: new THREE.MeshStandardMaterial({ // If using planes for text
            name: 'widget_title_text',
            color: isDarkMode ? 0xddffdd : 0x333333, emissive: isDarkMode ? 0xaaccaa : 0x000000,
            emissiveIntensity: isDarkMode ? 0.3 : 0, side: THREE.FrontSide,
        }),
        widgetGaugeBackground: new THREE.MeshStandardMaterial({
            name: 'widget_gauge_background',
            color: isDarkMode ? 0x335533 : 0xcccccc, side: THREE.DoubleSide, opacity: 0.3, transparent: true
        }),
        widgetLineUp: new THREE.LineBasicMaterial({
            name: 'widget_line_up',
            color: isDarkMode ? 0x88ff88 : 0x00aa00, linewidth: 2
        }),
        widgetLineDown: new THREE.LineBasicMaterial({
            name: 'widget_line_down',
            color: isDarkMode ? 0x66aaff : lightModelPalette.secondary, linewidth: 2
        }),
        widgetBarBackground: new THREE.MeshStandardMaterial({
            name: 'widget_bar_background',
            color: isDarkMode ? 0x443322 : 0xddccaa, side: THREE.FrontSide, opacity: 0.3, transparent: true
        }),
        widgetDefaultText: new THREE.MeshStandardMaterial({ // If using planes for text
            name: 'widget_default_text',
            color: isDarkMode ? 0xccffcc : 0x444444, side: THREE.FrontSide
        }),
    }), [isDarkMode]);
};

type LaptopProps = React.ComponentProps<'group'>;

// Main Laptop Component (Adapted from reference createLaptop)
export default function Laptop({ ...props }: LaptopProps) {
    const isDarkMode = useDarkMode();
    const materials = useLaptopMaterials(isDarkMode);
    const displayGroupRef = useRef<THREE.Group>(null!); // Ref for display group rotation

    // --- Dimensions (from reference code) ---
    const baseWidth = 28;
    const baseDepth = 20;
    const baseHeight = 1.5;
    const lidWidth = baseWidth;
    const lidDepth = 0.7;
    const lidHeight = baseDepth; // Match base depth
    const cornerRadius = 1.0;
    const screenCornerRadius = 0.8;
    // const widgetCornerRadius = 0.3; // Defined in ScreenWidget

    // --- Geometries (Memoized) ---
    const lidShape = useMemo(() => createRoundedRectShape(lidWidth, lidHeight, cornerRadius), [lidWidth, lidHeight, cornerRadius]);
    const lidExtrudeSettings = useMemo(() => ({ steps: 1, depth: lidDepth, bevelEnabled: false }), [lidDepth]);
    const lidGeometry = useMemo(() => {
        const geom = new THREE.ExtrudeGeometry(lidShape, lidExtrudeSettings);
        geom.center(); // Center geometry for easier positioning relative to group origin
        return geom;
    }, [lidShape, lidExtrudeSettings]);

    const baseShape = useMemo(() => createRoundedRectShape(baseWidth, baseDepth, cornerRadius), [baseWidth, baseDepth, cornerRadius]);
    const baseExtrudeSettings = useMemo(() => ({ steps: 1, depth: baseHeight, bevelEnabled: false }), [baseHeight]);
    const baseGeometry = useMemo(() => {
        const geom = new THREE.ExtrudeGeometry(baseShape, baseExtrudeSettings);
        geom.center(); // Center geometry
        return geom;
    }, [baseShape, baseExtrudeSettings]);

    const hingeRadius = 0.4;
    const hingeLength = baseWidth * 0.15;
    const hingeGeometry = useMemo(() => {
        const geom = new THREE.CylinderGeometry(hingeRadius, hingeRadius, hingeLength, 16);
        geom.rotateZ(Math.PI / 2); // Rotate to lie along X-axis
        return geom;
    }, [hingeRadius, hingeLength]);

    // --- Screen Elements Calculations (Relative to Display Group) ---
    const screenBezel = 0.8;
    const screenHeight = lidHeight - screenBezel * 2;
    const screenWidth = lidWidth - screenBezel * 2;
    // Z positions relative to the displayGroup origin (back edge is Z=0, front is Z=lidDepth)
    const screenSurfaceZ = lidDepth + 0.04;
    // Separate opaque display layers to avoid depth fighting at scene scale.
    const dashboardBgZ = screenSurfaceZ + 0.02;
    const frontCameraZ = dashboardBgZ + 0.12;

    // Dashboard Background
    const dashboardWidth = screenWidth - 0.4;
    const dashboardHeight = screenHeight - 0.4;
    const punchHoleRadius = 0.3;
    const punchHoleX = 0;
    // Y position relative to displayGroup origin (bottom edge is Y=0)
    // Place camera near the top edge of the dashboard area
    const punchHoleY = lidHeight - screenBezel / 2; // Adjusted Y for camera position

    // The webcam sits in the upper bezel, outside the display shape.
    const selfieCameraGeometry = useMemo(() => new THREE.CircleGeometry(punchHoleRadius * 0.9, 32), [punchHoleRadius]);

    // --- Keyboard Calculations (Relative to Base Group) ---
    const keyboardLayout = useMemo(() => {
        // Define consistent gap sizes
        const sideGap = 0.8;
        const topGap = 0.2; // Smaller gap at the top/back edge
        const bottomGap = 1.2; // Larger gap at the bottom/front edge

        // Calculate available keyboard area dimensions based on gaps
        const keyboardWidth = baseWidth - sideGap * 2;
        const keyboardDepth = baseDepth - topGap - bottomGap; // Depth available

        // Define keyboard base thickness (visual recess)
        const keyboardBaseThickness = 0.01; // Minimal thickness

        // Define key grid layout parameters
        const rows = 6; const cols = 15; const keyGap = 0.075; const keyHeight = 0.12;

        // Calculate maximum key size to fit the available area
        const maxKeyWidth = (keyboardWidth - (cols - 1) * keyGap) / cols;
        const maxKeyDepth = (keyboardDepth - (rows - 1) * keyGap) / rows;
        const keySize = Math.min(maxKeyWidth, maxKeyDepth); // Use smaller dimension

        // Calculate actual dimensions of the key grid
        const actualKeyboardWidth = cols * keySize + (cols - 1) * keyGap;
        const actualKeyboardDepth = rows * keySize + (rows - 1) * keyGap;

        // Starting position (top-left corner of key grid) relative to keyboardBase center
        const keyGridStartX = -actualKeyboardWidth / 2 + keySize / 2;
        const keyGridStartZ = -actualKeyboardDepth / 2 + keySize / 2;

        // Special keys mapping (same as reference)
        const specialKeys: { [key: string]: [number, number, number] } = {
            backspace: [0, 13, 2], tab: [1, 0, 2], backslash: [1, 13, 2],
            caps: [2, 0, 2], enter_upper: [2, 13, 2], enter: [3, 13, 2],
            shift_left: [4, 0, 2], shift_right: [4, 13, 2], ctrl_left: [5, 0, 2],
            fn: [5, 2, 1], alt_left: [5, 3, 2], spacebar: [5, 5, 6],
            alt_gr: [5, 11, 2], ctrl_right: [5, 13, 2],
        };

        const isSpecialKeyPosition = (row: number, col: number): false | { key: string; startCol: number; width: number; } => {
            for (const [key, [keyRow, keyStartCol, keyWidth]] of Object.entries(specialKeys)) {
                if (row === keyRow && col >= keyStartCol && col < keyStartCol + keyWidth) {
                    return { key, startCol: keyStartCol, width: keyWidth };
                }
            }
            return false;
        };

        const keys = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const specialKey = isSpecialKeyPosition(row, col);
                if (specialKey && col > specialKey.startCol) continue; // Skip subsequent cells

                const keyWidth = specialKey ? specialKey.width * keySize + (specialKey.width - 1) * keyGap : keySize;
                const xOffset = specialKey ? (specialKey.width - 1) * (keySize + keyGap) / 2 : 0;
                const relativeX = keyGridStartX + col * (keySize + keyGap) + xOffset;
                const relativeZ = keyGridStartZ + row * (keySize + keyGap);

                keys.push({
                    x: relativeX, z: relativeZ, // Relative to keyboard base center
                    w: keyWidth, d: keySize, h: keyHeight, // Use d for depth
                    isSpecial: !!specialKey,
                    key: `key-${row}-${col}`
                });
            }
        }

        // Keyboard base position relative to main base center (Y=0, Z=0)
        // Base center is Y=0 because of baseGeometry.center()
        const baseSurfaceY = baseHeight / 2; // Top surface Y of the main base
        const keyboardBaseY = baseSurfaceY - keyboardBaseThickness / 2; // Center slightly below base surface
        // Z position relative to main base center (Z=0)
        const keyboardBaseZ = -baseDepth / 2 + topGap + keyboardDepth / 2;

        // Touchpad position relative to main base center (Y=0, Z=0)
        const touchpadThickness = 0.1;
        const touchpadWidth = baseWidth * 0.4;
        const touchpadDepth = bottomGap * 0.6; // Use depth instead of height
        // Calculate touchpad Z position relative to main base center (Z=0)
        // Center it within the bottom gap area
        const touchpadCenterZ = baseDepth / 2 - bottomGap / 2; // Z position

        return {
            base: { w: keyboardWidth, h: keyboardBaseThickness, d: keyboardDepth, x: 0, y: keyboardBaseY, z: keyboardBaseZ },
            keys,
            touchpad: { w: touchpadWidth, h: touchpadThickness, d: touchpadDepth, x: 0, y: baseSurfaceY + touchpadThickness / 2, z: touchpadCenterZ }
        };

    }, [baseWidth, baseDepth, baseHeight]); // Dependencies


    // --- Hinge Calculations (Relative to Base Group) ---
    // Define the pivot point coordinates relative to baseGroup origin (center of base geometry)
    const pivotY = baseHeight / 2; // Pivot at the top surface of the base
    const pivotZ = -baseDepth / 2 + 0.1; // Pivot near the back edge
    const hingeOffset = baseWidth * 0.35; // Distance from center

    // --- Materials (Cloned for specific names) ---
    const laptopLidMat = useMemo(() => {
        const mat = materials.laptopBody.clone();
        mat.name = 'laptop_lid';
        return mat;
    }, [materials.laptopBody]);
    const laptopBaseMat = useMemo(() => {
        const mat = materials.laptopBody.clone();
        mat.name = 'laptop_base';
        return mat;
    }, [materials.laptopBody]);

    // --- Keyboard Key Geometry (Memoized) ---
    // Memoize a standard key geometry to instance it
    const standardKeyGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []); // Placeholder size, will be scaled


    // --- Component Structure ---
    return (
        <group {...props} dispose={null}> {/* Main Laptop Group */}

            {/* Base Group - Origin at the center of the base geometry */}
            <group position-y={0}> {/* Base group origin matches main base geometry center - removed rotation from here */}
                {/* Rotated Base Container - This only rotates the physical base */}
                <group rotation-x={Math.PI / 2 }> {/* This group only rotates the base parts */}
                    {/* Laptop Base Mesh */}
                    <mesh
                        geometry={baseGeometry}
                        material={laptopBaseMat}
                        castShadow
                        receiveShadow={false} // Avoid self-shadowing on base surface
                    />

                    {/* Keyboard Group - Positioned relative to Base Group origin */}
                    <group rotation-x={- Math.PI / 2}> {/* Add rotation to the keyboard group */}
                        {/* Keyboard Base (Recess) */}
                        <mesh position={[keyboardLayout.base.x, keyboardLayout.base.y, keyboardLayout.base.z]}>
                            <boxGeometry args={[keyboardLayout.base.w, keyboardLayout.base.h, keyboardLayout.base.d]} />
                            <primitive object={materials.keyboardBase} attach="material" />
                        </mesh>

                        {/* Keyboard Keys */}
                        {keyboardLayout.keys.map(keyInfo => (
                            <mesh
                                key={keyInfo.key}
                                position={[
                                    keyboardLayout.base.x + keyInfo.x,
                                    keyboardLayout.base.y + keyboardLayout.base.h / 2 + keyInfo.h / 2,
                                    keyboardLayout.base.z + keyInfo.z
                                ]}
                                geometry={standardKeyGeometry}
                                scale={[keyInfo.w, keyInfo.h, keyInfo.d]}
                                material={materials.keyCap}
                                castShadow
                            />
                        ))}

                        {/* Touchpad */}
                        <mesh
                            position={[keyboardLayout.touchpad.x, keyboardLayout.touchpad.y, keyboardLayout.touchpad.z]}
                            material={materials.touchpad}
                            castShadow
                        >
                            <boxGeometry args={[keyboardLayout.touchpad.w, keyboardLayout.touchpad.h, keyboardLayout.touchpad.d]} />
                        </mesh>
                    </group>
                </group>

                {/* Hinges - Positioned relative to Base Group origin but NOT rotated */}
                <mesh geometry={hingeGeometry} material={materials.hinge} position={[-hingeOffset, pivotY, pivotZ]} />
                <mesh geometry={hingeGeometry} material={materials.hinge} position={[hingeOffset, pivotY, pivotZ]} />

                {/* Display Group - Positioned and Rotated relative to Base Group's Pivot Point */}
                <group
                    ref={displayGroupRef}
                    position={[0, pivotY, pivotZ]} // Position at the pivot point
                    rotation-x={-Math.PI / 6} // Initial open angle (negative X rotation)
                >
                    {/* Laptop Lid Mesh - Origin is center, position relative to display group pivot */}
                    <mesh
                        geometry={lidGeometry}
                        material={laptopLidMat}
                        position={[0, lidHeight / 2, lidDepth / 2]} // Position relative to pivot
                        castShadow
                        receiveShadow
                    />

                    <DeviceScreen device="laptop" width={dashboardWidth} height={dashboardHeight} radius={screenCornerRadius}
                        position={[0, screenBezel + screenHeight / 2, dashboardBgZ]} />

                    {/* Front Camera - Position relative to display group pivot */}
                    <mesh
                        geometry={selfieCameraGeometry}
                        material={materials.selfieCamera}
                        position={[punchHoleX, punchHoleY, frontCameraZ]}
                    />

                </group> {/* End Display Group */}
            </group> {/* End Base Group */}
        </group> // End Main Laptop Group
    );
}
