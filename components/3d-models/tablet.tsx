"use client";

import { lightModelPalette } from '@/lib/model-palette';
import { useEffect, useRef, useMemo } from 'react'; // Added useMemo
import * as THREE from 'three';
// OrbitControls will likely be added in page.tsx now, removing from here
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useFrame } from '@react-three/fiber'; // Import useFrame for animation
import { useDarkMode } from '@/hooks/useDarkMode';
import DeviceScreen from './device-screen';

// Define the structure for the materials object (Moved outside component)
interface TabletMaterials {
    tabletBody: THREE.MeshStandardMaterial;
    screen: THREE.MeshBasicMaterial; // Assuming basic for screen, adjust if needed
    selfieCamera: THREE.MeshStandardMaterial;
    textElement: THREE.MeshStandardMaterial; // For widget titles/text backgrounds
    graphElement: THREE.MeshStandardMaterial; // For bars/lines in widgets
    chartElement: THREE.MeshStandardMaterial; // For gauge/other chart parts
    accent: THREE.MeshStandardMaterial; // For status indicators, logo
    camera: THREE.MeshStandardMaterial; // Back camera housing/rim
    cameraRing: THREE.MeshStandardMaterial; // Glowing ring
    cameraLens: THREE.MeshStandardMaterial; // Lens glass
    buttons: THREE.MeshStandardMaterial;
    port: THREE.MeshStandardMaterial;
    // Add other materials as needed
    [key: string]: THREE.Material; // Allow general access but prefer specific types
}

// Material Creation (Moved outside component)
const createMaterials = (isDark: boolean): TabletMaterials => {
    // Green Theme Colors
    const primaryDark = 0x1a241a; // Dark green-grey
    const primaryLight = lightModelPalette.housing; // Light pale green
    const accentDark = 0x88ff88; // Bright green accent
    const accentLight = 0x00aa00; // Darker green accent
    const textDark = 0xddffdd; // Light green text
    const textLight = 0x333333; // Dark grey text
    const graphDark = 0x66ffaa; // Tealish green for graphs
    const graphLight = 0x00aa66; // Darker tealish green
    const chartDark = 0xaaffcc; // Lighter mint green for charts
    const chartLight = 0x44cc88; // Medium mint green
    const buttonDark = 0x253525; // Dark green for buttons
    const buttonLight = 0xd0e0d0; // Light green-grey for buttons
    const portColor = 0x555555; // Neutral grey for ports
    const cameraBodyDark = 0x203020; // Dark green for camera
    const cameraBodyLight = 0xc0d0c0; // Light green-grey for camera
    const cameraLensColor = 0x050805; // Very dark green lens
    const cameraRingColor = 0x66ff66; // Bright green glow

    return {
        tabletBody: new THREE.MeshStandardMaterial({
            name: 'tablet_body',
            color: isDark ? primaryDark : primaryLight,
            roughness: 0.5,
            metalness: 0.1,
        }),
        screen: new THREE.MeshBasicMaterial({ // Basic material for non-lit screen background (if needed)
            name: 'screen_placeholder',
            color: 0x000000, // Black screen (content will be overlaid)
            transparent: true,
            opacity: 0.9, // Slightly transparent if needed
        }),
        selfieCamera: new THREE.MeshStandardMaterial({
            name: 'selfie_camera',
            color: 0x111111,
            roughness: 0.1,
            metalness: 0.0,
        }),
        textElement: new THREE.MeshStandardMaterial({ // Used for widget titles/text bg
            name: 'text_element',
            color: isDark ? textDark : textLight,
            roughness: 0.8,
            metalness: 0.0,
            emissive: isDark ? 0x113311 : 0x000000, // Subtle glow for dark text bg
            emissiveIntensity: isDark ? 0.2 : 0,
        }),
         graphElement: new THREE.MeshStandardMaterial({ // Used for bars/lines
            name: 'graph_element',
            color: isDark ? graphDark : graphLight,
            roughness: 0.7,
            metalness: 0.0,
            emissive: isDark ? graphDark : 0x000000,
            emissiveIntensity: isDark ? 0.25 : 0,
        }),
        chartElement: new THREE.MeshStandardMaterial({ // Used for gauge/other charts
            name: 'chart_element',
            color: isDark ? chartDark : chartLight,
            roughness: 0.6,
            metalness: 0.0,
            emissive: isDark ? chartDark : 0x000000,
            emissiveIntensity: isDark ? 0.3 : 0,
        }),
        accent: new THREE.MeshStandardMaterial({ // Used for status/logo
            name: 'accent_element',
            color: isDark ? accentDark : accentLight,
            roughness: 0.4,
            metalness: 0.05,
            emissive: isDark ? accentDark : 0x000000,
            emissiveIntensity: isDark ? 0.4 : 0,
        }),
        camera: new THREE.MeshStandardMaterial({
            name: 'camera_body',
            color: isDark ? cameraBodyDark : cameraBodyLight,
            roughness: 0.4,
            metalness: 0.1,
        }),
        cameraRing: new THREE.MeshStandardMaterial({
            name: 'camera_ring',
            color: cameraRingColor,
            roughness: 0.3,
            metalness: 0.0,
            emissive: cameraRingColor,
            emissiveIntensity: 0.8, // Make it glow noticeably
        }),
        cameraLens: new THREE.MeshStandardMaterial({
            name: 'camera_lens_detail',
            color: cameraLensColor,
            roughness: 0.1,
            metalness: 0.0,
            transparent: true,
            opacity: 0.8,
        }),
        buttons: new THREE.MeshStandardMaterial({
            name: 'buttons',
            color: isDark ? buttonDark : buttonLight,
            roughness: 0.6,
            metalness: 0.05,
        }),
        port: new THREE.MeshStandardMaterial({
            name: 'port',
            color: portColor,
            roughness: 0.5,
            metalness: 0.2,
        }),
    };
};

// Renamed component
export default function Tablet() {
    const isDarkMode = useDarkMode();
    // R3F ref for the tablet group
    const tabletRef = useRef<THREE.Group>(null!);
    // Ref for scene needed by updateMaterials (though ideally lights are updated declaratively)

    // Function to update materials based on dark mode (Keep this logic)
    const updateMaterials = (isDark: boolean) => {
        // Use the R3F ref
        if (!tabletRef.current) return;

        // Update scene background - This should ideally be done in page.tsx <Canvas> or via scene prop
        // if (sceneRef.current) {
        //     sceneRef.current.background = new THREE.Color(isDark ? 0x081208 : 0xf0f4f0);
        // }

        // Update tablet materials (using tabletRef)
        tabletRef.current.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                const material = object.material as THREE.MeshStandardMaterial;

                // Identify parts by their name and update accordingly - Green Theme
                if (material.name === 'tablet_body') {
                    material.color.set(isDark ? 0x505e50 : lightModelPalette.housing); // Adapted green body
                    material.emissive.set(isDark ? 0x253025 : 0x000000);
                    material.emissiveIntensity = isDark ? 0.30 : 0;
                }
                else if (material.name === 'screen') {
                    material.color.set(isDark ? 0x00ffbb : 0x00aa99); // Adapted green screen
                    material.emissive.set(isDark ? 0x00aa88 : 0x008866);
                    material.emissiveIntensity = isDark ? 0.5 : 0.2;
                }
                else if (material.name === 'ui_element') {
                    material.color.set(isDark ? 0xafffaf : 0x00aa88); // Adapted green UI
                    material.emissive.set(isDark ? 0x66cc66 : 0x000000);
                    material.emissiveIntensity = isDark ? 0.7 : 0.0;
                }
                else if (material.name === 'accent') {
                    material.color.set(isDark ? 0x66ffaa : 0x00aa66); // Adapted green accent
                    material.emissive.set(isDark ? 0x44cc88 : 0x000000);
                    material.emissiveIntensity = isDark ? 0.6 : 0.0;
                }
                else if (material.name === 'camera') {
                    material.color.set(isDark ? 0x334433 : 0x556655); // Greenish tint camera
                    material.emissive.set(isDark ? 0x112211 : 0x000000);
                    material.emissiveIntensity = isDark ? 0.3 : 0.0;
                }
                else if (material.name === 'camera_lens') {
                    material.color.set(isDark ? 0x445544 : 0x111111); // Greenish tint lens
                    material.emissive.set(isDark ? 0x223322 : 0x000000);
                    material.emissiveIntensity = isDark ? 0.1 : 0.0;
                }
                else if (material.name === 'port') {
                    material.color.set(isDark ? 0x444444 : 0x888888); // Keep neutral grey
                }
                else if (material.name === 'buttons') {
                    material.color.set(isDark ? 0x505e50 : lightModelPalette.housing); // Match green body
                    material.emissive.set(isDark ? 0x253025 : 0x000000);
                    material.emissiveIntensity = isDark ? 0.3 : 0.0;
                }
                // No notch for tablet example
                // else if (material.name === 'notch') { ... }
                else if (material.name === 'selfie_camera') {
                    material.color.set(isDark ? 0x111111 : 0x000000); // Keep dark
                    material.emissive.set(isDark ? 0x111111 : 0x000000);
                    material.emissiveIntensity = isDark ? 0.1 : 0.0;
                }
                else if (material.name === 'graph_element') {
                    material.color.set(isDark ? 0x88ffcc : 0x00ccaa); // Adapted green graph
                    material.emissive.set(isDark ? 0x44ddaa : 0x00aa88);
                    material.emissiveIntensity = isDark ? 0.8 : 0.3;
                }
                else if (material.name === 'chart_element') {
                    material.color.set(isDark ? 0xccff66 : 0x88cc00); // Contrasting green/yellow chart
                    material.emissive.set(isDark ? 0xaadd33 : 0x66aa00);
                    material.emissiveIntensity = isDark ? 0.8 : 0.3;
                }
                else if (material.name === 'text_element') {
                    material.color.set(isDark ? 0xeeffee : 0xffffff); // Greenish tint text
                    material.emissive.set(isDark ? 0xccffcc : 0xf0f0f0);
                    material.emissiveIntensity = isDark ? 0.6 : 0.2;
                }
                else if (material.name === 'camera_ring') {
                    material.color.set(isDark ? 0x66ffaa : 0xbbbbbb); // Adapted green ring
                    material.emissive.set(isDark ? 0x44cc88 : 0x666666); // Adapted green glow
                    material.emissiveIntensity = isDark ? 0.8 : 0.2;
                }
                // Ensure other materials also update if needed
                if (material.needsUpdate) {
                    material.needsUpdate = true;
                }
            }
        });
    };

    // Effect to update materials when isDarkMode changes
    useEffect(() => {
        updateMaterials(isDarkMode);
        // Note: Updating lights declaratively based on isDarkMode is preferred
    }, [isDarkMode]);

    // Use useMemo to create materials and tablet geometry only once or when isDarkMode changes
    // Note: Creating materials inside useMemo might be complex if they need isDark state initially.
    // A simpler approach might be to create them once and update in useEffect.
    const materials = useMemo(() => createMaterials(isDarkMode), [isDarkMode]); // Recreate materials if needed
    const tabletGroup = useMemo(() => createTablet(materials), [materials]); // Pass isDarkMode

    // Assign the created group to the ref
    useEffect(() => {
        if (tabletGroup) {
            tabletRef.current = tabletGroup;
        }
    }, [tabletGroup]);


    // Animation (using R3F's useFrame hook)
    useFrame((state, delta) => {
        if (tabletRef.current) {
            // Ensure delta is not excessively large (e.g., when tab is inactive)
            const dt = Math.min(delta, 0.1); // Cap delta time
            tabletRef.current.rotation.y += 0.0015 * (dt * 60); // Adjust speed based on capped delta
        }
    });


    // REMOVED: The large useEffect hook that manually set up scene, camera, renderer, controls, lights, animation loop, and cleanup.

    // Return R3F components
    return (
        <>
            {/* Add the created tablet group to the scene */}
            {/* Use key prop if tabletGroup identity changes, forcing remount */}
            <primitive object={tabletGroup} ref={tabletRef} key={isDarkMode ? 'dark' : 'light'}>
                <DeviceScreen device="tablet" width={16.6} height={23.6} radius={1} position={[0, 0, 0.41]} />
            </primitive>

            {/* REMOVED: The div container */}
        </>
    );
}

// Tablet geometry creation (Moved outside component)
const createTablet = (materials: TabletMaterials) => { // <-- Added isDarkMode param
    const tablet = new THREE.Group(); // Ensure it returns a Group

    // Tablet dimensions in cm - Adjusted
    const height = 25; // Larger height
    const width = 18; // Larger width
    const thickness = 0.7; // Slightly thinner
    const cornerRadius = 1.2; // Larger corner radius

    // Main tablet body with rounded corners
    const tabletShape = new THREE.Shape(); // Renamed shape variable
    // Define shape centered around (0,0) using new dimensions
    tabletShape.moveTo(-width / 2 + cornerRadius, -height / 2);
    tabletShape.lineTo(width / 2 - cornerRadius, -height / 2);
    tabletShape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + cornerRadius);
    tabletShape.lineTo(width / 2, height / 2 - cornerRadius);
    tabletShape.quadraticCurveTo(width / 2, height / 2, width / 2 - cornerRadius, height / 2);
    tabletShape.lineTo(-width / 2 + cornerRadius, height / 2);
    tabletShape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - cornerRadius);
    tabletShape.lineTo(-width / 2, -height / 2 + cornerRadius);
    tabletShape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + cornerRadius, -height / 2);

    // Extrude settings (keeping bevel disabled for now)
    const extrudeSettings = {
        steps: 1,
        depth: thickness,
        bevelEnabled: false
    };

    const tabletGeometry = new THREE.ExtrudeGeometry(tabletShape, extrudeSettings);
    tabletGeometry.center();
    // Use renamed material key
    const tabletBody = new THREE.Mesh(tabletGeometry, materials.tabletBody);
    tabletBody.castShadow = true;
    tabletBody.receiveShadow = true;
    tabletBody.position.set(0, 0, 0);
    tablet.add(tabletBody); // Add to renamed group

    // Front camera stays physically above the single display surface.
    const selfieCamera = new THREE.Mesh(new THREE.CircleGeometry(0.27, 32), materials.selfieCamera);
    selfieCamera.position.set(0, 11.2, 0.47);
    tablet.add(selfieCamera);

    // --- Back Camera, Buttons, Ports ---
    const backSurfaceZ = -thickness / 2;
    const backElementOffset = 0.01;

    // Camera lenses - Adjusted positioning and ring material
    const addCameraLens = (x: number, y: number, size: number) => {
        const housingDepth = 0.1; // Slightly deeper housing
        const ringDepth = 0.02;
        const lensZOffset = 0.005;

        const housingZ = backSurfaceZ - housingDepth / 2 - backElementOffset;
        const ringZ = housingZ - housingDepth / 2 - ringDepth / 2 - 0.001;
        const lensZ = ringZ - ringDepth / 2 - lensZOffset;
        const innerLensZ = lensZ - lensZOffset;
        const highlightZ = innerLensZ - lensZOffset;

        // Housing
        const housingGeometry = new THREE.CylinderGeometry(size + 0.1, size + 0.1, housingDepth, 32);
        housingGeometry.rotateX(Math.PI / 2);
        const housing = new THREE.Mesh(housingGeometry, materials.camera); // Use tablet camera material
        housing.position.set(x, y, housingZ); // Set position here
        housing.castShadow = true;
        tablet.add(housing); // Add to tablet group

        // Ring - Use the new glowing material
        const ringGeometry = new THREE.TorusGeometry(size + 0.035, ringDepth, 16, 48);
        const ring = new THREE.Mesh(ringGeometry, materials.cameraRing); // Use tablet cameraRing material
        ring.position.set(x, y, ringZ);
        tablet.add(ring); // Add to tablet group

        // Main lens
        const lensGeometry = new THREE.CircleGeometry(size, 32);
        const lensMaterial = new THREE.MeshStandardMaterial({
            name: 'camera_lens_main',
            color: 0x111111,
            metalness: 0.1,
            roughness: 0.05,
            opacity: 0.9,
            transparent: true,
            side: THREE.DoubleSide
         });
        const lens = new THREE.Mesh(lensGeometry, lensMaterial);
        lens.position.set(x, y, lensZ);
        tablet.add(lens); // Add to tablet group

        // Inner lens
        const innerLensGeometry = new THREE.CircleGeometry(size * 0.7, 32);
        const innerLens = new THREE.Mesh(innerLensGeometry, materials.cameraLens); // Use tablet cameraLens material
        innerLens.position.set(x, y, innerLensZ);
        tablet.add(innerLens); // Add to tablet group

        // Highlight
        const highlightGeometry = new THREE.CircleGeometry(size * 0.2, 16);
        const highlightMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
         });
        const highlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
        highlight.position.set(x - size/4, y + size/4, highlightZ);
        tablet.add(highlight); // Add to tablet group
    };

    // Add camera lenses (Adjusted for larger tablet back) - Maybe just one or two lenses
    const cameraClusterX = width / 2 - 2.0; // Further from edge
    const cameraClusterY = height / 2 - 2.0;
    // Increased vertical separation: +0.7 and -0.7 instead of +0.5 and -0.5
    addCameraLens(cameraClusterX, cameraClusterY + 0.7, 0.55); // Main lens (moved up slightly)
    addCameraLens(cameraClusterX, cameraClusterY - 0.7, 0.45); // Secondary lens (moved down slightly)

    // Flash - Adjusted position
    const flashSize = 0.2; // Larger flash
    const flashDepth = 0.06;
    const flashDetailSize = flashSize * 0.6;
    const flashDetailOffset = 0.002;

    const flashBaseZ = backSurfaceZ - backElementOffset - 0.005;
    const flashZ = flashBaseZ - flashDepth / 2;
    const flashGeometry = new THREE.CylinderGeometry(flashSize, flashSize, flashDepth, 32);
    flashGeometry.rotateX(Math.PI / 2);
    const flashMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffdd, // Keep flash color yellowish
        emissive: 0xaaaa88,
        emissiveIntensity: 0.2,
        roughness: 0.3
     });
    const flash = new THREE.Mesh(flashGeometry, flashMaterial);
    flash.castShadow = false;
    flash.renderOrder = 1;
    // Position flash next to camera cluster
    const flashX = cameraClusterX + 1.0; // To the right of the cluster
    const flashY = cameraClusterY; // Centered vertically with cluster
    flash.position.set(flashX, flashY, flashZ);
    tablet.add(flash); // Add to tablet group

    // Add inner flash detail
    const flashDetailGeometry = new THREE.CircleGeometry(flashDetailSize, 32);
    const flashDetailMaterial = materials.cameraLens.clone(); // No cast needed
    flashDetailMaterial.color.set(0xeeeecc); // Keep yellowish
    flashDetailMaterial.emissive.set(0xffffaa);
    flashDetailMaterial.emissiveIntensity = 0.5;
    const flashDetail = new THREE.Mesh(flashDetailGeometry, flashDetailMaterial);
    const flashDetailZ = flashZ - flashDepth / 2 - flashDetailOffset;
    flashDetail.position.set(flashX, flashY, flashDetailZ);
    flashDetail.renderOrder = 3;
    tablet.add(flashDetail); // Add to tablet group

    // Flash rim
    const flashRimGeometry = new THREE.RingGeometry(flashSize, flashSize + 0.04, 32); // Slightly thicker rim
    const flashRim = new THREE.Mesh(flashRimGeometry, materials.camera); // Use tablet camera material (greenish tint)
    flashRim.renderOrder = 2;
    const flashRimZ = flashDetailZ - 0.0005;
    flashRim.position.set(flashX, flashY, flashRimZ);
    tablet.add(flashRim); // Add to tablet group

    // Add simple logo on the back - Adjusted size/position
    const logoWidth = 2.0; // Larger logo
    const logoHeight = 1.0;
    const logoGeometry = new THREE.PlaneGeometry(logoWidth, logoHeight);
    const logoMaterial = materials.accent.clone(); // No cast needed
    logoMaterial.side = THREE.FrontSide;
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, -height / 5, backSurfaceZ - backElementOffset - 0.001); // Adjusted Y position
    tablet.add(logo); // Add to tablet group

    // --- Side Buttons Fix --- Adjusted positions/sizes
    const addButton = (y: number, h: number, isRight: boolean = true) => {
        const buttonDepth = 0.1;
        const buttonWidth = 0.3; // Slightly wider buttons
        const buttonGeometry = new THREE.BoxGeometry(buttonDepth, h, buttonWidth); // Use buttonWidth for Z dimension
        const button = new THREE.Mesh(buttonGeometry, materials.buttons); // Use tablet buttons material (green)
        const x = isRight ? width / 2 : -width / 2;
        button.position.set(x + (isRight ? buttonDepth / 2 : -buttonDepth / 2), y, 0);
        button.castShadow = true;
        tablet.add(button); // Add to tablet group
    };

    addButton(height * 0.3, 1.5, true);   // Power button (top right side)
    addButton(height * 0.15, 1.2, true);  // Volume up (right side)
    addButton(height * 0.05, 1.2, true);  // Volume down (right side)

    // --- Bottom Ports Centering Fix --- Adjusted positions/sizes
    const addPort = (x: number, w: number) => {
        const portDepth = 0.1;
        const portHeight = 0.1; // Slightly taller port
        const portGeometry = new THREE.BoxGeometry(w, portHeight, portDepth);
        const port = new THREE.Mesh(portGeometry, materials.port); // Use tablet port material (neutral grey)
        port.position.set(x, -height / 2, -portDepth / 2);
        tablet.add(port); // Add to tablet group
    };

    addPort(0, 1.0);     // Main USB-C port (centered)
    addPort(-width * 0.3, 0.6);  // Speaker grille (left)
    addPort(width * 0.3, 0.6);   // Speaker grille (right)

    return tablet; // Return the tablet group
};
