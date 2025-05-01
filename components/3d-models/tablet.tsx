"use client";
import { useEffect, useRef, useMemo } from 'react'; // Added useMemo
import * as THREE from 'three';
// OrbitControls will likely be added in page.tsx now, removing from here
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useFrame } from '@react-three/fiber'; // Import useFrame for animation

interface TabletProps {
  isDarkMode: boolean;
}

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
    const primaryLight = 0xe8f4e8; // Light pale green
    const secondaryDark = 0x304530; // Mid-dark green
    const secondaryLight = 0xfcfffc; // Almost white green tint
    const accentDark = 0x88ff88; // Bright green accent
    const accentLight = 0x00aa00; // Darker green accent
    const textDark = 0xddffdd; // Light green text
    const textLight = 0x333333; // Dark grey text
    const borderDark = 0x446644; // Dark green border
    const borderLight = 0xaaaaaa; // Light grey border
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
export default function Tablet({ isDarkMode }: TabletProps) {
    // R3F ref for the tablet group
    const tabletRef = useRef<THREE.Group>(null!);
    // Ref for scene needed by updateMaterials (though ideally lights are updated declaratively)
    const sceneRef = useRef<THREE.Scene | null>(null); // Keep for now if updateMaterials modifies scene directly

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
                    material.color.set(isDark ? 0x505e50 : 0xe0ffe0); // Adapted green body
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
                    material.color.set(isDark ? 0x505e50 : 0xe0ffe0); // Match green body
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
    const tabletGroup = useMemo(() => createTablet(materials, isDarkMode), [materials, isDarkMode]); // Pass isDarkMode

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
            {/* Lights - Add declaratively, controlled by isDarkMode */}
            <ambientLight
                color={isDarkMode ? 0x445544 : 0x909090}
                intensity={isDarkMode ? 0.4 : 0.8}
            />
            <directionalLight
                color={isDarkMode ? 0xaaffcc : 0xffffff}
                intensity={isDarkMode ? 0.7 : 0.9}
                position={[5, 10, 7]}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.5}
                shadow-camera-far={50}
            />
            <directionalLight
                color={isDarkMode ? 0x44aa66 : 0xddffee}
                intensity={isDarkMode ? 0.3 : 0.3}
                position={[-3, 5, -5]}
            />
            {/* Spotlight needs a target, which is tricky declaratively without refs */}
            {/* Consider adding spotlight logic if essential, or simplifying */}

            {/* Add the created tablet group to the scene */}
            {/* Use key prop if tabletGroup identity changes, forcing remount */}
            <primitive object={tabletGroup} ref={tabletRef} key={isDarkMode ? 'dark' : 'light'} />

            {/* REMOVED: The div container */}
        </>
    );
}

// Tablet geometry creation (Moved outside component)
const createTablet = (materials: TabletMaterials, isDarkMode: boolean) => { // <-- Added isDarkMode param
    const tablet = new THREE.Group(); // Ensure it returns a Group

    // Tablet dimensions in cm - Adjusted
    const height = 25; // Larger height
    const width = 18; // Larger width
    const thickness = 0.7; // Slightly thinner
    const cornerRadius = 1.2; // Larger corner radius
    const screenCornerRadius = 1.0; // Larger screen radius
    const widgetCornerRadius = 0.3; // Slightly larger widget radius
    const bevelSize = 0.1; // Keep bevel size consistent

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

    // --- Screen and UI Layering ---
    // Adjusted screen dimensions based on tablet size
    const screenHeight = height - 1.0; // Larger bezels typical for tablets
    const screenWidth = width - 1.0;
    const screenSurfaceZ = thickness / 2 + 0.01;
    const dashboardBgZ = screenSurfaceZ + 0.001;
    const widgetZ = dashboardBgZ + 0.002;
    const widgetContentZ = widgetZ + 0.001;
    const frontCameraZ = dashboardBgZ + 0.005; // Keep camera slightly above dashboard

    // --- IoT Dashboard Design ---

    // Helper function to create rounded rectangle shapes (no changes needed)
    const createRoundedRectShape = (w: number, h: number, r: number) => {
        const shape = new THREE.Shape();
        shape.moveTo(-w / 2 + r, -h / 2);
        shape.lineTo(w / 2 - r, -h / 2);
        shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
        shape.lineTo(w / 2, h / 2 - r);
        shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
        shape.lineTo(-w / 2 + r, h / 2);
        shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
        shape.lineTo(-w / 2, -h / 2 + r);
        shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
        return shape;
    };

    // Dashboard Background - Adjusted dimensions and Green Theme
    const dashboardWidth = screenWidth - 0.4;
    const dashboardHeight = screenHeight - 0.4;
    const dashboardShape = createRoundedRectShape(dashboardWidth, dashboardHeight, screenCornerRadius);

    // Create a hole for the punch-hole camera
    const punchHoleRadius = 0.3;
    const punchHoleX = 0;
    const punchHoleY = dashboardHeight / 2 - 0.6;

    const punchHolePath = new THREE.Path();
    punchHolePath.absarc(punchHoleX, punchHoleY, punchHoleRadius, 0, Math.PI * 2, false);
    dashboardShape.holes.push(punchHolePath);

    // Adjusted dashboard material colors - Green Theme
    const dashboardMaterial = new THREE.MeshStandardMaterial({
        color: isDarkMode ? 0x1a241a : 0xe8f4e8, // Greenish dashboard
        roughness: 0.6,
        metalness: 0.02,
        side: THREE.FrontSide,
        transparent: true,
        opacity: 0.97,
        emissive: isDarkMode ? 0x020502 : 0x000000,
        emissiveIntensity: isDarkMode ? 0.05 : 0,
    });
    const dashboardGeometry = new THREE.ShapeGeometry(dashboardShape);
    const dashboardBg = new THREE.Mesh(dashboardGeometry, dashboardMaterial);
    dashboardBg.position.z = dashboardBgZ;
    tablet.add(dashboardBg);

    // Add Dashboard Border (Optional, subtle) - Adjusted colors - Green Theme
    const borderPoints = dashboardShape.getPoints(50);
    const borderGeometry = new THREE.BufferGeometry().setFromPoints(borderPoints);
    const borderMaterial = new THREE.LineBasicMaterial({
        color: isDarkMode ? 0x446644 : 0xaaaaaa, // Greenish border
        linewidth: 1,
        transparent: true,
        opacity: 0.5
    });
    const dashboardBorder = new THREE.LineLoop(borderGeometry, borderMaterial);
    dashboardBorder.position.z = dashboardBgZ + 0.0001;
    tablet.add(dashboardBorder);

    // --- Front Camera --- (No color changes needed)
    const selfieCameraGeometry = new THREE.CircleGeometry(punchHoleRadius * 0.9, 32);
    const selfieCamera = new THREE.Mesh(selfieCameraGeometry, materials.selfieCamera);
    selfieCamera.position.set(punchHoleX, punchHoleY, frontCameraZ);
    tablet.add(selfieCamera);

    // Create Widget function - Green Theme
    const createWidget = (x: number, y: number, w: number, h: number, index: number) => {
        const widgetGroup = new THREE.Group();
        widgetGroup.position.set(x, y, widgetZ);

        // Widget Background - Adjusted colors - Green Theme
        const widgetShape = createRoundedRectShape(w, h, widgetCornerRadius);
        const widgetGeometry = new THREE.ShapeGeometry(widgetShape);
        const widgetMaterial = new THREE.MeshStandardMaterial({
            color: isDarkMode ? 0x304530 : 0xfcfffc, // Greenish widget
            roughness: 0.4,
            metalness: 0.0,
            side: THREE.FrontSide,
            transparent: true,
            opacity: 0.88,
            emissive: isDarkMode ? 0x141f14 : 0x000000,
            emissiveIntensity: isDarkMode ? 0.15 : 0,
        });
        const widgetBg = new THREE.Mesh(widgetGeometry, widgetMaterial);
        widgetBg.castShadow = false;
        widgetBg.receiveShadow = true;
        widgetGroup.add(widgetBg);

        // Widget Title - Green Theme
        const titles = ["Temperature", "Humidity", "Light Level", "Energy Usage", "Device Status", "Network Traffic", "Air Quality", "System Load"];
        const titleText = titles[index % titles.length] || `Sensor ${index + 1}`;
        const titleHeight = 0.3;
        const titleWidth = w * 0.75;
        const titleGeometry = new THREE.PlaneGeometry(titleWidth, titleHeight);
        const titleMaterial = materials.textElement.clone(); // No cast needed
        titleMaterial.color.set(isDarkMode ? 0xddffdd : 0x333333); // Greenish title
        titleMaterial.emissive.set(isDarkMode ? 0xaaccaa : 0x000000);
        titleMaterial.emissiveIntensity = isDarkMode ? 0.3 : 0;
        titleMaterial.side = THREE.FrontSide;
        const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
        titleMesh.position.set(0, h / 2 - titleHeight / 2 - 0.2, widgetContentZ - widgetZ);
        widgetGroup.add(titleMesh);

        // --- Widget Data Area - Generate different content based on index ---
        const dataAreaX = 0;
        const dataAreaY = -0.15; // Adjusted Y position
        const dataAreaWidth = w * 0.85; // Wider data area
        const dataAreaHeight = h * 0.5; // Adjusted height
        const contentZ = widgetContentZ - widgetZ + 0.001;

        const randomSeed = (index + 1) * 1234;
        const seededRandom = (offset = 0) => {
            let x = Math.sin(randomSeed + offset) * 10000;
            return x - Math.floor(x);
        };

        const widgetType = index % titles.length;

        // --- Switch statement for widget types - Update colors for Green Theme ---
        switch (widgetType) {
            case 0: // Temperature - Line Graph Simulation
                const points = [];
                const segments = 10;
                for (let i = 0; i <= segments; i++) {
                    const px = -dataAreaWidth / 2 + (i / segments) * dataAreaWidth;
                    const py = (seededRandom(i) - 0.5) * dataAreaHeight * 0.8; // Random Y variation
                    points.push(new THREE.Vector3(px, py, 0));
                }
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                const lineMaterial = new THREE.LineBasicMaterial({ color: isDarkMode ? 0xffaaaa : 0xcc0000, linewidth: 2 }); // Keep red for temp
                const line = new THREE.Line(lineGeometry, lineMaterial);
                line.position.set(dataAreaX, dataAreaY, contentZ);
                widgetGroup.add(line);
                break;

            case 1: // Humidity - Gauge Simulation (Arc) - Use Chart Element Color
                const gaugeRadius = dataAreaHeight * 0.6;
                const arcPercentage = seededRandom();
                const arcGeometry = new THREE.RingGeometry(gaugeRadius * 0.8, gaugeRadius, 32, 1, 0, Math.PI * arcPercentage);
                const arcMaterial = materials.chartElement.clone(); // No cast needed
                arcMaterial.side = THREE.DoubleSide;
                const arcMesh = new THREE.Mesh(arcGeometry, arcMaterial);
                arcMesh.position.set(dataAreaX, dataAreaY - gaugeRadius * 0.2, contentZ);
                arcMesh.rotation.z = -Math.PI / 2;
                widgetGroup.add(arcMesh);
                // Add background arc
                const bgArcGeometry = new THREE.RingGeometry(gaugeRadius * 0.8, gaugeRadius, 32, 1, 0, Math.PI);
                const bgArcMaterial = new THREE.MeshStandardMaterial({ color: isDarkMode ? 0x335533 : 0xcccccc, side: THREE.DoubleSide, opacity: 0.3, transparent: true }); // Dark green bg
                const bgArcMesh = new THREE.Mesh(bgArcGeometry, bgArcMaterial);
                bgArcMesh.position.copy(arcMesh.position);
                bgArcMesh.rotation.copy(arcMesh.rotation);
                widgetGroup.add(bgArcMesh);
                break;

            case 2: // Light Level - Radial Indicator - Yellow
                const indicatorRadius = dataAreaHeight * 0.5;
                const lightLevel = seededRandom();
                const indicatorGeometry = new THREE.CircleGeometry(indicatorRadius * lightLevel, 32);
                const indicatorMaterial = new THREE.MeshBasicMaterial({ color: isDarkMode ? 0xffffcc : 0xffcc00 }); // Keep yellow
                const indicatorMesh = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
                indicatorMesh.position.set(dataAreaX, dataAreaY, contentZ);
                widgetGroup.add(indicatorMesh);
                // Add outer ring
                const ringGeometry = new THREE.RingGeometry(indicatorRadius * 0.95, indicatorRadius, 32);
                const ringMaterial = new THREE.MeshBasicMaterial({ color: isDarkMode ? 0xaaaa88 : 0x888888, side: THREE.DoubleSide }); // Yellowish grey
                const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
                ringMesh.position.copy(indicatorMesh.position);
                widgetGroup.add(ringMesh);
                break;

            case 3: // Energy Usage - Stacked Bars Simulation - Use Graph/Chart Colors
                const barCountEnergy = 3;
                const barWidthEnergy = dataAreaWidth / (barCountEnergy * 1.8);
                const barSpacingEnergy = barWidthEnergy * 0.8;
                const maxTotalHeight = dataAreaHeight * 0.9;
                for (let i = 0; i < barCountEnergy; i++) {
                    const height1 = seededRandom(i) * maxTotalHeight * 0.6;
                    const height2 = seededRandom(i + 10) * maxTotalHeight * 0.4;
                    const geom1 = new THREE.BoxGeometry(barWidthEnergy, height1, 0.01);
                    const mat1 = materials.graphElement.clone(); // No cast needed
                    const mesh1 = new THREE.Mesh(geom1, mat1);
                    const barX = -dataAreaWidth / 2 + barWidthEnergy / 2 + i * (barWidthEnergy + barSpacingEnergy);
                    mesh1.position.set(barX, dataAreaY - dataAreaHeight / 2 + height1 / 2, contentZ);
                    widgetGroup.add(mesh1);

                    const geom2 = new THREE.BoxGeometry(barWidthEnergy, height2, 0.01);
                    const mat2 = materials.chartElement.clone(); // No cast needed
                    const mesh2 = new THREE.Mesh(geom2, mat2);
                    mesh2.position.set(barX, mesh1.position.y + height1 / 2 + height2 / 2, contentZ);
                    widgetGroup.add(mesh2);
                }
                break;

            case 4: // Device Status - Text/Indicator Simulation - Use Status Colors
                const statusCount = 3;
                const statusHeight = dataAreaHeight / statusCount * 0.6;
                const statusWidth = dataAreaWidth * 0.8;
                const statusSpacing = (dataAreaHeight - (statusHeight * statusCount)) / (statusCount + 1);
                const statuses = ["Online", "Scanning", "Idle"];
                const statusColors = [0x88ff88, 0xffff88, 0xaaaaff]; // Keep these distinct colors

                for (let i = 0; i < statusCount; i++) {
                    const planeGeom = new THREE.PlaneGeometry(statusWidth, statusHeight);
                    const planeMat = materials.textElement.clone(); // No cast needed
                    planeMat.color.set(isDarkMode ? 0xaaaaaa : 0x555555); // Grey background for text simulation
                    const planeMesh = new THREE.Mesh(planeGeom, planeMat);
                    const planeY = dataAreaY + dataAreaHeight / 2 - statusSpacing * (i + 1) - statusHeight * (i + 0.5);
                    planeMesh.position.set(dataAreaX, planeY, contentZ);
                    widgetGroup.add(planeMesh);

                    // Add status indicator circle
                    const indicatorGeom = new THREE.CircleGeometry(statusHeight * 0.4, 16);
                    const indicatorMat = new THREE.MeshBasicMaterial({ color: statusColors[i % statusColors.length] });
                    const indicatorMesh = new THREE.Mesh(indicatorGeom, indicatorMat);
                    indicatorMesh.position.set(dataAreaX - statusWidth / 2 + statusHeight * 0.5, planeY, contentZ + 0.001);
                    widgetGroup.add(indicatorMesh);
                }
                break;

            case 5: // Network Traffic - Dual Line Graph Simulation - Use Graph/Accent Colors
                const pointsUp: THREE.Vector3[] = [];
                const pointsDown: THREE.Vector3[] = [];
                const segmentsNet = 10;
                for (let i = 0; i <= segmentsNet; i++) {
                    const px = -dataAreaWidth / 2 + (i / segmentsNet) * dataAreaWidth;
                    const pyUp = (seededRandom(i) - 0.5) * dataAreaHeight * 0.4 + dataAreaHeight * 0.25;
                    const pyDown = (seededRandom(i + 50) - 0.5) * dataAreaHeight * 0.4 - dataAreaHeight * 0.25;
                    pointsUp.push(new THREE.Vector3(px, pyUp, 0));
                    pointsDown.push(new THREE.Vector3(px, pyDown, 0));
                }
                const lineGeomUp = new THREE.BufferGeometry().setFromPoints(pointsUp);
                const lineMatUp = new THREE.LineBasicMaterial({ color: isDarkMode ? 0x88ff88 : 0x00aa00, linewidth: 2 }); // Lighter green
                const lineUp = new THREE.Line(lineGeomUp, lineMatUp);
                lineUp.position.set(dataAreaX, dataAreaY, contentZ);
                widgetGroup.add(lineUp);

                const lineGeomDown = new THREE.BufferGeometry().setFromPoints(pointsDown);
                const lineMatDown = new THREE.LineBasicMaterial({ color: isDarkMode ? 0x66ffaa : 0x00aa66, linewidth: 2 }); // Use accent green
                const lineDown = new THREE.Line(lineGeomDown, lineMatDown);
                lineDown.position.set(dataAreaX, dataAreaY, contentZ);
                widgetGroup.add(lineDown);
                break;
            case 6: // Air Quality - Simple Bar - Orange/Yellow
                const airQualityValue = seededRandom();
                const aqBarWidth = dataAreaWidth * 0.8;
                const aqBarHeight = dataAreaHeight * 0.3;
                const aqGeom = new THREE.BoxGeometry(aqBarWidth * airQualityValue, aqBarHeight, 0.01);
                const aqMat = materials.graphElement.clone(); // No cast needed
                aqMat.color.set(isDarkMode ? 0xffcc66 : 0xcc8800); // Keep Orange/Yellow tones
                const aqMesh = new THREE.Mesh(aqGeom, aqMat);
                aqMesh.position.set(dataAreaX - (aqBarWidth * (1-airQualityValue))/2, dataAreaY, contentZ); // Align left
                widgetGroup.add(aqMesh);
                 // Add background bar
                const bgAqGeom = new THREE.BoxGeometry(aqBarWidth, aqBarHeight, 0.01);
                const bgAqMat = new THREE.MeshStandardMaterial({ color: isDarkMode ? 0x443322 : 0xddccaa, side: THREE.FrontSide, opacity: 0.3, transparent: true }); // Dark orange bg
                const bgAqMesh = new THREE.Mesh(bgAqGeom, bgAqMat);
                bgAqMesh.position.set(dataAreaX, dataAreaY, contentZ - 0.0001); // Slightly behind
                widgetGroup.add(bgAqMesh);
                break;
            case 7: // System Load - Multiple small bars - Use Chart Color
                const loadBarCount = 5;
                const loadBarWidth = dataAreaWidth / (loadBarCount * 1.5);
                const loadBarSpacing = loadBarWidth * 0.5;
                const maxLoadHeight = dataAreaHeight * 0.8;
                 for (let i = 0; i < loadBarCount; i++) {
                    const loadHeight = seededRandom(i) * maxLoadHeight;
                    const loadGeom = new THREE.BoxGeometry(loadBarWidth, loadHeight, 0.01);
                    const loadMat = materials.chartElement.clone(); // No cast needed
                    const loadMesh = new THREE.Mesh(loadGeom, loadMat);
                    const loadBarX = -dataAreaWidth / 2 + loadBarWidth / 2 + i * (loadBarWidth + loadBarSpacing);
                    loadMesh.position.set(loadBarX, dataAreaY - dataAreaHeight / 2 + loadHeight / 2, contentZ);
                    widgetGroup.add(loadMesh);
                }
                break;

            default:
                break;
        }


        // Widget Status/Icon Area - Keep multi-color for now
        const statusRadius = 0.2;
        const statusGeometry = new THREE.CircleGeometry(statusRadius, 16);
        const statusMaterial = materials.accent.clone(); // No cast needed
        const statusColorsCycle = [0xff8888, 0x88ff88, 0x8888ff, 0xffff88, 0xff88ff, 0x88ffff]; // Keep distinct colors
        statusMaterial.color.set(statusColorsCycle[index % statusColorsCycle.length]);
        statusMaterial.emissive.set(statusColorsCycle[index % statusColorsCycle.length]);
        statusMaterial.emissiveIntensity = isDarkMode ? 0.4 : 0.1;
        statusMaterial.side = THREE.FrontSide;
        const statusMesh = new THREE.Mesh(statusGeometry, statusMaterial);
        statusMesh.position.set(-w / 2 + statusRadius + 0.15, -h / 2 + statusRadius + 0.15, widgetContentZ - widgetZ);
        widgetGroup.add(statusMesh);

        return widgetGroup;
    };

    // --- Arrange Widgets --- Adjusted for tablet screen
    const padding = 0.4; // Increased padding
    const usableWidth = dashboardWidth - padding * 2;
    const usableHeight = dashboardHeight - padding * 2;
    // More columns and rows for tablet
    const widgetCols = 3;
    const widgetRows = 3;
    const widgetWidth = (usableWidth - padding * (widgetCols - 1)) / widgetCols;
    // const widgetHeight = (usableHeight - padding * (widgetRows - 1)) / widgetRows; // Original calculation

    const startX = -usableWidth / 2 + widgetWidth / 2;
    // Adjust startY if punch hole is at the top
    const topOffsetForCamera = punchHoleRadius * 2 + 0.4; // Increased space below camera
    const adjustedUsableHeight = usableHeight - topOffsetForCamera;
    // Use adjusted height for widget calculation if camera offset is significant
    const adjustedWidgetHeight = (adjustedUsableHeight - padding * (widgetRows - 1)) / widgetRows;
    const startY = usableHeight / 2 - topOffsetForCamera - adjustedWidgetHeight / 2;


    let widgetIndex = 0;
    for (let r = 0; r < widgetRows; r++) {
        for (let c = 0; c < widgetCols; c++) {
            const x = startX + c * (widgetWidth + padding);
            const y = startY - r * (adjustedWidgetHeight + padding);
            // Use adjustedWidgetHeight for creation
            const widget = createWidget(x, y, widgetWidth, adjustedWidgetHeight, widgetIndex);
            tablet.add(widget); // Add to tablet group
            widgetIndex++;
        }
    }


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
