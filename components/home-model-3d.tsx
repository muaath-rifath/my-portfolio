"use client";

import { Suspense, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { type MotionValue } from "framer-motion";
import * as THREE from "three";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { Canvas, useFrame, useThree } from '@react-three/fiber';

import SceneLighting from "./3d-models/scene-lighting";
import SceneModelLighting from "./3d-models/scene-model-lighting";
import { useResponsiveScale } from '@/hooks/useResponsiveScale';
import { useDesktopViewport } from '@/hooks/useMotionPreference';

// Import 3D model components from the correct directory
import FivegTower from "./3d-models/5g-tower";
import AirQualitySensor from "./3d-models/air-quality-sensor";
import BladeServer from "./3d-models/blade-server";
import Laptop from "./3d-models/laptop";
import MotionSensor from "./3d-models/motion-sensor";
import MotorActuator from "./3d-models/motor-actuator";
import ResidentialIotGateway from "./3d-models/residential-iot-gateway";
import SmartPhone from "./3d-models/smart-phone";
import ValveActuator from "./3d-models/valve-actuator";
import Tablet from "./3d-models/tablet";
import VehicleIotGateway from "./3d-models/vehicle-iot-gateway";

// Model3D props interface - removed scale prop since it's now handled internally
interface Model3DProps {
  progress: MotionValue<number>;
  onSpinComplete?: () => void;
  onSceneReady?: () => void;
}

type SceneViewport = { width: number; height: number; left: number; screenWidth: number };
const VERTICAL_BLEED = 240;

function OverflowCamera({ viewport }: { viewport: SceneViewport | null }) {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    if (viewport) {
      // Extend the original frustum without changing its pixels-per-world-unit scale.
      camera.setViewOffset(viewport.width, viewport.height, -viewport.left, -VERTICAL_BLEED, size.width, size.height);
    } else {
      camera.clearViewOffset();
    }
  }, [camera, size.width, size.height, viewport]);
  return null;
}

function ScrollGroup({ progress, children, onSpinComplete, onSceneReady }: {
  progress: MotionValue<number>;
  children: ReactNode;
  onSpinComplete?: () => void;
  onSceneReady?: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const hasReportedCompletion = useRef(false);
  const hasReportedSceneReady = useRef(false);
  const reducedMotion = useMotionPreference();
  useLayoutEffect(() => {
    // Keep shadow data on the actual scene geometry. Applying a CSS filter to the
    // canvas creates a duplicate silhouette around every transparent object instead.
    group.current?.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
  }, []);
  useFrame(({ clock, pointer, gl }) => {
    if (group.current) {
      // A steady ambient rotation keeps the scene alive without taking over page scroll.
      const rotation = reducedMotion ? 0 : clock.getElapsedTime() * 0.15;
      group.current.rotation.y = rotation;
      if (progress.get() >= 1 && !hasReportedCompletion.current) {
        hasReportedCompletion.current = true;
        onSpinComplete?.();
      }
      gl.domElement.dataset.sceneReady = "true";
      if (!hasReportedSceneReady.current) {
        hasReportedSceneReady.current = true;
        requestAnimationFrame(() => onSceneReady?.());
      }
    }
  });
  return (
    <group ref={group}>
      {children}
      <mesh position={[0, -31, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[140, 140]} />
        <shadowMaterial transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

export function HomeModel3D({ progress, onSpinComplete, onSceneReady }: Model3DProps) {
  const frame = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<SceneViewport | null>(null);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);
  useLayoutEffect(() => {
    const element = frame.current;
    if (!element) return;
    const measure = () => {
      const rect = element.getBoundingClientRect();
      setViewport({ width: rect.width, height: rect.height, left: rect.left, screenWidth: document.documentElement.clientWidth });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener('resize', measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); };
  }, []);
  // Hook to detect dark mode using Tailwind's class-based approach

  
  // Use responsive scale hook for internal scaling
  const scale = useResponsiveScale();
  const isDesktop = useDesktopViewport();
  const sceneScale = isDesktop ? scale * 1.42 : scale;

  // Define approximate positions for each model in the scene
  const modelPositions: [number, number, number][] = [
    [0, 0, 0],    // 5G Tower (center)
    [15, 0, 15],  // Air Quality Sensor (Increased spacing)
    [-10, -10, 25], // Blade Server
    [-30, 0, -5],  // Laptop (Index 3)
    [15, 0, -15], // Motion Sensor (Index 4)
    [20, -15, 10],  // Motor Actuator (Index 5, Custom position)
    [0, -17.8, -25],   // Residential IoT Gateway (Index 6, Moved to bottom front)
    [-35, 5, 10],  // Smartphone (Index 7, Custom position)
    [25, 0, -25], // Tablet (Index 8, Adjusted)
    [-25, -10, -25],// Valve Actuator (Index 9, Adjusted)
    [-8, 2, -18], // Vehicle IoT Gateway: open left-middle position, clear of the tablet and laptop
  ];

  return (
    <div ref={frame} className="lab-canvas">
      <div className="lab-canvas-layer" style={viewport ? { position: 'absolute', left: -viewport.left, top: -VERTICAL_BLEED, width: viewport.screenWidth, height: viewport.height + VERTICAL_BLEED * 2, pointerEvents: 'none' } : { width: '100%', height: '100%' }}>
      {/* Adjusted camera position - further back */}
      <Canvas shadows frameloop={pageVisible ? "always" : "never"} dpr={[1, 1.25]} gl={{ powerPreference: "high-performance", antialias: true }} camera={{ position: [0, 15, 60], fov: 50 }}>
        <OverflowCamera viewport={viewport} />
        <Suspense fallback={null}>
          {/* Add helpers for debugging */}
          {/* <axesHelper args={[5]} /> */}
          {/* <gridHelper args={[50, 50]} /> */}

          <SceneLighting />
          {/* Main parent group for global scaling */}
          <ScrollGroup progress={progress} onSpinComplete={onSpinComplete} onSceneReady={onSceneReady}>
          <group scale={sceneScale}>
            <SceneModelLighting />
            {/* Position each model using groups */}
            <group position={[0, -28.8, 0]} scale={2}> {/* Centered vertically and scaled */}
              <FivegTower />
            </group>
            <group position={modelPositions[1]} scale={3}> {/* AirQualitySensor */}
              <AirQualitySensor />
            </group>
            <group position={modelPositions[2]} scale={0.7}> {/* BladeServer */}
              <BladeServer />
            </group>
            <group position={modelPositions[3]} scale={0.7}> {/* Laptop */}
              <Laptop />
            </group>
            <group position={modelPositions[4]} scale={3}>  {/* MotionSensor - Increased scale */}
              <MotionSensor />
            </group>
            <group position={modelPositions[5]} scale={0.7}> {/* MotorActuator - Changed position and reduced scale */}
              <MotorActuator />
            </group>
            <group
              position={modelPositions[6]}
              scale={1.2}
              rotation={[0, Math.PI, 0]}
            > {/* ResidentialIotGateway */}
              <ResidentialIotGateway />
            </group>
            <group
              position={modelPositions[7]}
              scale={1}
              rotation={[0, Math.PI / 3, 0]}
            > {/* SmartPhone */}
              <SmartPhone />
            </group>
            <group position={modelPositions[8]} scale={.7}> {/* Tablet */}
              <Tablet />
            </group>
            <group position={modelPositions[9]} scale={5}> {/* ValveActuator */}
              <ValveActuator />
            </group>
            <group position={modelPositions[10]}> {/* VehicleIotGateway */}
              <VehicleIotGateway />
            </group>
          </group>
          </ScrollGroup>
        </Suspense>

      </Canvas>
      </div>
    </div>
  );
}
