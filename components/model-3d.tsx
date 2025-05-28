"use client";

import { Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

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

// Assuming isDarkMode is passed as a prop
interface Model3DProps {
  isDarkMode: boolean;
  scale?: number; // Add scale prop with default value
}

export function Model3D({ isDarkMode, scale = 0.4 }: Model3DProps) {

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
    [0, 0, -45],  // Vehicle IoT Gateway (Index 10, Adjusted)
  ];

  return (
    <div className="h-full w-full relative"> {/* Use h-full and w-full */} 
      {/* Adjusted camera position - further back */}
      <Canvas shadows camera={{ position: [0, 15, 60], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Add helpers for debugging */}
          {/* <axesHelper args={[5]} /> */}
          {/* <gridHelper args={[50, 50]} /> */}

          {/* Enhanced lighting setup */}
          <ambientLight intensity={isDarkMode ? 0.6 : 1.0} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight position={[-10, 10, -5]} intensity={0.8} />

          {/* Add a soft hemisphere light */}
          <hemisphereLight
            args={[isDarkMode ? '#4b5563' : '#e0f2fe', isDarkMode ? '#1e293b' : '#f8fafc', 1.0]}
          />

          {/* Add a subtle point light */}
          <pointLight
            position={[0, 15, 0]}
            intensity={0.7}
            color={isDarkMode ? '#4ade80' : '#ffffff'}
            distance={80}
          />
          
          {/* Add additional lights for better visibility */}
          <pointLight 
            position={[20, 10, 20]} 
            intensity={0.5} 
            color={isDarkMode ? '#a5f3fc' : '#ffffff'} 
          />
          <pointLight 
            position={[-20, 10, -20]} 
            intensity={0.5} 
            color={isDarkMode ? '#fda4af' : '#ffffff'} 
          />

          {/* Main parent group for global scaling */}
          <group scale={scale}>
            {/* Position each model using groups */}
            <group position={[0, -28.8, 0]} scale={2}> {/* Centered vertically and scaled */}
              <FivegTower isDarkMode={isDarkMode} />
            </group>
            <group position={modelPositions[1]} scale={3}> {/* AirQualitySensor */}
              <AirQualitySensor isDarkMode={isDarkMode} />
            </group>
            <group position={modelPositions[2]} scale={0.7}> {/* BladeServer */}
              <BladeServer isDarkMode={isDarkMode} />
            </group>
            <group position={modelPositions[3]} scale={0.7}> {/* Laptop */}
              <Laptop isDarkMode={isDarkMode} />
            </group>
            <group position={modelPositions[4]} scale={3}>  {/* MotionSensor - Increased scale */}
              <MotionSensor isDarkMode={isDarkMode} />
            </group>
            <group position={modelPositions[5]} scale={0.7}> {/* MotorActuator - Changed position and reduced scale */}
              <MotorActuator isDarkMode={isDarkMode} />
            </group>
            <group
              position={modelPositions[6]}
              scale={1.2}
              rotation={[0, Math.PI, 0]}
            > {/* ResidentialIotGateway */}
              <ResidentialIotGateway isDarkMode={isDarkMode} />
            </group>
            <group
              position={modelPositions[7]}
              scale={1}
              rotation={[0, Math.PI / 3, 0]}
            > {/* SmartPhone */}
              <SmartPhone isDarkMode={isDarkMode} />
            </group>
            <group position={modelPositions[8]} scale={.7}> {/* Tablet */}
              <Tablet isDarkMode={isDarkMode} />
            </group>
            <group position={modelPositions[9]} scale={5}> {/* ValveActuator */}
              <ValveActuator isDarkMode={isDarkMode} />
            </group>
            <group position={modelPositions[10]}> {/* VehicleIotGateway */}
              <VehicleIotGateway isDarkMode={isDarkMode} />
            </group>
          </group>
        </Suspense>
        {/* Add OrbitControls for interaction */}
        <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
