"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// @ts-ignore
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// @ts-ignore
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import styles from './model-3d.module.css';

// Type guard for objects with materials
function hasMaterial(obj: THREE.Object3D): obj is THREE.Mesh {
  return obj instanceof THREE.Mesh;
}

export function Model3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Theme configuration - Light green color scheme for dark mode
    const themeColors = {
      dark: {
        primary: 0x8fffaa,    // Light green primary color
        secondary: 0x1a2e20,  // Dark green/blue background tone
        accent: 0x44ff66,     // Brighter green accent
        highlight: 0x00ffaa,  // Teal highlight for contrast
        solarPanel: 0xbcffdd, // Light mint color for solar panel
        background: 0x000000, // Pure black background
        text: 0xffffff,       // Pure white text
        emissiveIntensity: 1.5 // Significantly increased glow for dark mode
      },
      light: {
        primary: 0x009977,    // Dark teal for light mode
        secondary: 0xd0e8ff,  // Light blue background
        accent: 0xff3300,     // Orange-red accent
        highlight: 0x00aa88,  // Darker teal highlight
        solarPanel: 0x006644, // Darker green for solar panel
        background: 0xffffff,
        text: 0x003322,
        emissiveIntensity: 0.5 // Moderate glow for light mode
      }
    };

    const currentTheme = theme === 'dark' ? themeColors.dark : themeColors.light;

    // Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    
    // Position camera further back to accommodate the larger model
    camera.position.set(30, 20, 30);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,  // Ensure alpha channel is enabled
      powerPreference: "high-performance"
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    
    // Make background fully transparent
    renderer.setClearColor(0x000000, 0); // Set alpha to 0 for full transparency
    
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced lighting for better visibility
    const ambientLight = new THREE.AmbientLight(currentTheme.text, theme === 'dark' ? 0.6 : 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(currentTheme.text, 1.2);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add green-tinted lighting for dark mode
    const pointLight = new THREE.PointLight(currentTheme.primary, theme === 'dark' ? 5 : 2.5, 50);
    pointLight.position.set(0, 5, 0);
    pointLight.decay = 2;
    scene.add(pointLight);

    // Add an accent light to highlight solar panels and other components
    const accentLight = new THREE.PointLight(
      theme === 'dark' ? currentTheme.highlight : currentTheme.accent, 
      theme === 'dark' ? 4 : 2, 
      40
    );
    accentLight.position.set(-5, 8, 5);
    scene.add(accentLight);

    // Additional spot light to highlight the solar panel area
    const spotLight = new THREE.SpotLight(
      theme === 'dark' ? 0xaaffcc : 0xffffff, 
      theme === 'dark' ? 8 : 2
    );
    spotLight.position.set(10, 15, 0);
    spotLight.angle = 0.3;
    spotLight.penumbra = 0.8;
    spotLight.decay = 2;
    spotLight.distance = 50;
    spotLight.target.position.set(0, 2, 0);
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Create a container group for the entire model to apply scaling
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    
    // Apply a significantly larger uniform scale to the entire model
    modelGroup.scale.set(3.0, 3.0, 3.0);

    // Create main IoT structure
    createCentralHub(modelGroup, currentTheme);
    createSensorNetwork(modelGroup, currentTheme);
    createDataFlow(modelGroup, currentTheme);
    createHolographicInterface(modelGroup, currentTheme);
    
    // Add solar panel component with enhanced visibility
    createSolarPanel(modelGroup, currentTheme);

    // Interactive elements
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.enableZoom = true;
    
    // Adjust min/max distance to prevent getting too close or too far
    controls.minDistance = 20;
    controls.maxDistance = 60;

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update dynamic elements
      modelGroup.traverse((object) => {
        const obj = object; // Proper scoping of obj variable
        
        if (obj.userData?.type === 'sensor') {
          obj.rotation.y = elapsedTime * 0.5;
          obj.position.y = Math.sin(elapsedTime * 2) * 0.2;
        }

        if (obj.userData?.type === 'dataParticle') {
          obj.position.x = Math.sin(elapsedTime * 3) * 2;
          obj.position.z = Math.cos(elapsedTime * 3) * 2;
          obj.scale.setScalar(Math.abs(Math.sin(elapsedTime * 5)) * 0.2 + 0.8);
        }

        if (obj.userData?.type === 'hologram' && hasMaterial(obj)) {
          (obj.material as THREE.MeshStandardMaterial).opacity = Math.sin(elapsedTime) * 0.2 + 0.7;
        }
        
        // Enhanced glow pulse effect
        if (hasMaterial(obj) && (obj.material as THREE.MeshStandardMaterial).emissiveIntensity !== undefined) {
          const baseMaterial = obj.material as THREE.MeshStandardMaterial;
          if (baseMaterial.userData?.originalIntensity === undefined) {
            baseMaterial.userData = {
              ...baseMaterial.userData,
              originalIntensity: baseMaterial.emissiveIntensity
            };
          }
          
          // More pronounced pulse for better visibility
          const pulseAmount = Math.sin(elapsedTime * (obj.userData?.pulseSpeed || 2)) * 0.4 + 1;
          baseMaterial.emissiveIntensity = baseMaterial.userData.originalIntensity * pulseAmount;
        }
        
        // Special effect for solar panel
        if (obj.userData?.type === 'solarPanel' && hasMaterial(obj)) {
          const material = obj.material as THREE.MeshStandardMaterial;
          // Create shimmering effect on solar panels
          material.emissiveIntensity = theme === 'dark' 
            ? (Math.sin(elapsedTime * 2) * 0.5 + 1.5) * currentTheme.emissiveIntensity
            : (Math.sin(elapsedTime * 2) * 0.2 + 0.8) * currentTheme.emissiveIntensity;
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && rendererRef.current) {
        rendererRef.current.dispose();
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      controls.dispose();
    };
  }, [theme]);

  return <div ref={containerRef} className={styles.modelContainer} />;
}

// Function to create a solar panel component with enhanced visibility
function createSolarPanel(parent: THREE.Group, theme: any) {
  const panelGroup = new THREE.Group();
  panelGroup.position.set(0, 2.5, 0);
  
  // Create the main panel frame
  const frameGeometry = new THREE.BoxGeometry(5, 0.2, 5);
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: theme.secondary,
    metalness: 0.8,
    roughness: 0.2,
    emissive: theme.primary,
    emissiveIntensity: theme.emissiveIntensity * 0.3
  });
  
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  panelGroup.add(frame);
  
  // Create the actual solar panel cells with a grid pattern
  const panelMaterial = new THREE.MeshStandardMaterial({
    color: theme.solarPanel,
    metalness: 0.9,
    roughness: 0.1,
    emissive: theme.solarPanel,
    emissiveIntensity: theme.emissiveIntensity * 1.2,
    transparent: true,
    opacity: 0.95
  });
  
  // Create individual solar cells in a grid pattern
  const cellSize = 0.8;
  const cellSpacing = 0.2;
  const gridSize = 5;
  
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      const cellGeometry = new THREE.BoxGeometry(cellSize, 0.1, cellSize);
      const cell = new THREE.Mesh(cellGeometry, panelMaterial);
      
      // Position cells with spacing to create a grid
      const posX = (x - (gridSize-1)/2) * (cellSize + cellSpacing);
      const posZ = (z - (gridSize-1)/2) * (cellSize + cellSpacing);
      cell.position.set(posX, 0.15, posZ);
      
      cell.userData = {
        type: 'solarPanel',
        pulseSpeed: 0.5 + Math.random() * 0.5
      };
      
      panelGroup.add(cell);
    }
  }
  
  // Add support rod
  const rodGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5);
  const rodMaterial = new THREE.MeshStandardMaterial({
    color: theme.secondary,
    metalness: 0.6,
    roughness: 0.4
  });
  
  const rod = new THREE.Mesh(rodGeometry, rodMaterial);
  rod.position.y = -0.85;
  panelGroup.add(rod);
  
  // Add sensor connector to rod
  const sensorGeometry = new THREE.SphereGeometry(0.3);
  const sensorMaterial = new THREE.MeshStandardMaterial({
    color: theme.accent,
    emissive: theme.accent,
    emissiveIntensity: theme.emissiveIntensity
  });
  
  const sensor = new THREE.Mesh(sensorGeometry, sensorMaterial);
  sensor.position.y = -1.5;
  sensor.userData = { 
    type: 'sensor',
    pulseSpeed: 1.2
  };
  panelGroup.add(sensor);
  
  // Slightly tilt the panel for better visibility
  panelGroup.rotation.x = -Math.PI / 6;
  
  parent.add(panelGroup);
}

function createCentralHub(parent: THREE.Group, theme: any) {
  const hubGroup = new THREE.Group();
  
  // Main chassis - Enhanced with green tones in dark mode
  const geometry = new THREE.CylinderGeometry(3, 3, 1, 32);
  const material = new THREE.MeshStandardMaterial({
    color: theme.secondary,
    metalness: 0.7,
    roughness: 0.3,
    emissive: theme.primary,
    emissiveIntensity: theme.emissiveIntensity * 0.5 // Increased for better visibility
  });
  const hub = new THREE.Mesh(geometry, material);
  hub.castShadow = true;
  hub.receiveShadow = true;

  // Antenna array - Brighter green in dark mode
  const antennaGeometry = new THREE.ConeGeometry(0.1, 2, 32);
  const antennaMaterial = new THREE.MeshStandardMaterial({
    color: theme.primary,
    emissive: theme.primary,
    emissiveIntensity: theme.emissiveIntensity * 1.2, // Enhanced glow
    metalness: 0.6,
    roughness: 0.2
  });

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.set(Math.cos(angle) * 2.5, 1, Math.sin(angle) * 2.5);
    antenna.rotation.x = -Math.PI / 4;
    antenna.userData = { pulseSpeed: 1.5 + Math.random() * 1.0 };
    hubGroup.add(antenna);
  }

  // Status LEDs - Enhanced glow effect
  const ledGeometry = new THREE.SphereGeometry(0.2);
  const ledMaterial = new THREE.MeshStandardMaterial({
    color: theme.accent,
    emissive: theme.accent,
    emissiveIntensity: theme.emissiveIntensity * 5.0, // Much brighter
    metalness: 0.0,
    roughness: 0.1
  });

  const ledPositions = [
    [1, 0.5, 1], [-1, 0.5, 1], [1, 0.5, -1], [-1, 0.5, -1]
  ];

  ledPositions.forEach(pos => {
    const led = new THREE.Mesh(ledGeometry, ledMaterial);
    led.position.set(pos[0], pos[1], pos[2]);
    led.userData = { pulseSpeed: 2 + Math.random() * 2.0 };
    hubGroup.add(led);
  });

  hubGroup.add(hub);
  hubGroup.position.y = 1;
  parent.add(hubGroup);
}

function createSensorNetwork(parent: THREE.Group, theme: any) {
  const sensorGroup = new THREE.Group();
  const sensorCount = 12;
  const radius = 8;

  // Different sensor types with more vibrant green colors for dark mode
  const sensorTypes = [
    { shape: 'box', color: theme.primary, size: 0.5 },
    { shape: 'sphere', color: theme.accent, size: 0.4 },
    { shape: 'cylinder', color: theme.highlight, size: 0.6 }
  ];

  for (let i = 0; i < sensorCount; i++) {
    const type = sensorTypes[i % sensorTypes.length];
    let geometry;

    switch (type.shape) {
      case 'box':
        geometry = new THREE.BoxGeometry(type.size, type.size, type.size);
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(type.size / 2);
        break;
      case 'cylinder':
        geometry = new THREE.CylinderGeometry(type.size / 2, type.size / 2, type.size);
        break;
    }

    const material = new THREE.MeshStandardMaterial({
      color: type.color,
      metalness: 0.4,
      roughness: 0.5,
      emissive: type.color,
      emissiveIntensity: theme.emissiveIntensity * 0.8 // More glow
    });

    const sensor = new THREE.Mesh(geometry, material);
    sensor.castShadow = true;
    sensor.receiveShadow = true;

    const angle = (i / sensorCount) * Math.PI * 2;
    sensor.position.set(
      Math.cos(angle) * radius,
      Math.random() * 4,
      Math.sin(angle) * radius
    );

    sensor.userData = {
      type: 'sensor',
      status: 'active',
      pulseSpeed: 1 + Math.random() * 1.5
    };

    // Add connection lines - more visible with green tint in dark mode
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 1, 0),
      sensor.position.clone().add(new THREE.Vector3(0, 0.5, 0))
    ]);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: theme.primary,
      transparent: true,
      opacity: 0.7 // Increased for better visibility
    });

    const line = new THREE.Line(lineGeometry, lineMaterial);
    parent.add(line);

    sensorGroup.add(sensor);
  }

  parent.add(sensorGroup);
}

function createDataFlow(parent: THREE.Group, theme: any) {
  const particleCount = 200;
  const particleGeometry = new THREE.SphereGeometry(0.05);
  const particleMaterial = new THREE.MeshStandardMaterial({
    color: theme.primary,
    emissive: theme.primary,
    emissiveIntensity: theme.emissiveIntensity * 4 // Brighter particles
  });

  const particles = new THREE.InstancedMesh(
    particleGeometry,
    particleMaterial,
    particleCount
  );

  const dummy = new THREE.Object3D();
  const particleData = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 5 + Math.random() * 3;
    const height = Math.random() * 4;
    
    dummy.position.set(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    );
    
    dummy.updateMatrix();
    particles.setMatrixAt(i, dummy.matrix);
    particleData.push({
      speed: Math.random() * 0.02 + 0.01,
      direction: new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize()
    });
  }

  particles.instanceMatrix.needsUpdate = true;
  particles.userData = { particleData };
  particles.userData.type = 'dataFlow';
  parent.add(particles);
}

function createHolographicInterface(parent: THREE.Group, theme: any) {
  const hologramGroup = new THREE.Group();
  hologramGroup.position.set(0, 5, 0);

  // Main display - More vibrant green in dark mode
  const displayGeometry = new THREE.PlaneGeometry(6, 4);
  const displayMaterial = new THREE.MeshStandardMaterial({
    color: theme.primary,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
    emissive: theme.primary,
    emissiveIntensity: theme.emissiveIntensity * 0.4 // Increased for better visibility
  });

  const display = new THREE.Mesh(displayGeometry, displayMaterial);
  display.rotation.x = -Math.PI / 8;
  hologramGroup.add(display);

  // Grid overlay - Improved visibility with green grid in dark mode
  const gridTexture = new THREE.CanvasTexture(createGridCanvas(theme));
  const gridMaterial = new THREE.MeshBasicMaterial({
    map: gridTexture,
    transparent: true,
    opacity: 0.5  // Increased opacity for better visibility
  });

  const grid = new THREE.Mesh(displayGeometry, gridMaterial);
  grid.rotation.copy(display.rotation);
  grid.position.z = 0.01;
  hologramGroup.add(grid);

  // Animated data bars - More greenish colors in dark mode
  const barGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.1);
  const barColors = [
    theme.primary,   // Base green color
    theme.accent,    // Accent green
    theme.highlight, // Highlight
    0x66ffbb        // Extra light mint
  ];
  
  for (let i = 0; i < 8; i++) {
    const bar = new THREE.Mesh(
      barGeometry,
      new THREE.MeshStandardMaterial({
        color: barColors[i % barColors.length],
        emissive: barColors[i % barColors.length],
        emissiveIntensity: theme.emissiveIntensity * 1.3
      })
    );
    
    bar.position.set(
      -2.5 + i * 0.7,
      -1.5 + Math.random() * 1,
      0.02
    );
    
    bar.userData = {
      type: 'hologram',
      baseY: bar.position.y,
      speed: Math.random() * 0.5 + 0.2,
      pulseSpeed: 1 + Math.random() * 2.0
    };
    
    hologramGroup.add(bar);
  }

  parent.add(hologramGroup);
}

function createGridCanvas(theme: any) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Start with a transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grid lines with improved visibility - greener in dark mode
  ctx.strokeStyle = `#${theme.primary.toString(16).padStart(6, '0')}aa`; // Less transparency for better visibility
  ctx.lineWidth = 1.5;

  // Draw grid
  for (let i = 0; i < 32; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 16, 0);
    ctx.lineTo(i * 16, canvas.height);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, i * 16);
    ctx.lineTo(canvas.width, i * 16);
    ctx.stroke();
  }

  // Add some accent lines for visual interest
  ctx.strokeStyle = `#${theme.accent.toString(16).padStart(6, '0')}cc`; // More opaque
  ctx.lineWidth = 2.5;
  
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 64, 0);
    ctx.lineTo(i * 64, canvas.height);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, i * 64);
    ctx.lineTo(canvas.width, i * 64);
    ctx.stroke();
  }

  return canvas;
}
