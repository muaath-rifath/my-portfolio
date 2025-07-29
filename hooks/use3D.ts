"use client";

import { useMemo } from 'react';
import * as THREE from 'three';
import { useDarkMode } from './useDarkMode';

// Hook for creating optimized materials with dark mode support
export function use3DMaterials() {
  const isDarkMode = useDarkMode();
  
  return useMemo(() => {
    // Base colors that work well in both modes
    const colors = {
      primary: isDarkMode ? 0x00cc66 : 0x6699cc,
      secondary: isDarkMode ? 0x115533 : 0x445566,
      accent: isDarkMode ? 0xccffdd : 0xeeeeee,
      dark: isDarkMode ? 0x224433 : 0x223344,
      warning: isDarkMode ? 0xffaa00 : 0xff6600,
      emissive: isDarkMode ? 0xff7700 : 0xff3300,
    };
    
    return {
      colors,
      metalMaterial: new THREE.MeshStandardMaterial({
        color: colors.primary,
        roughness: 0.4,
        metalness: 0.8,
      }),
      darkMetalMaterial: new THREE.MeshStandardMaterial({
        color: colors.secondary,
        roughness: 0.3,
        metalness: 0.7,
      }),
      antennaMaterial: new THREE.MeshStandardMaterial({
        color: colors.accent,
        roughness: 0.2,
        metalness: 0.9,
      }),
      equipmentMaterial: new THREE.MeshStandardMaterial({
        color: colors.dark,
        roughness: 0.5,
        metalness: 0.6,
      }),
      warningMaterial: new THREE.MeshStandardMaterial({
        color: colors.warning,
        emissive: colors.emissive,
        emissiveIntensity: isDarkMode ? 0.6 : 0.3,
        roughness: 0.4,
        metalness: 0.5,
      }),
    };
  }, [isDarkMode]);
}

// Hook for creating optimized geometries (reusable across components)
export function use3DGeometries() {
  return useMemo(() => ({
    // Common geometries that can be reused
    smallBox: new THREE.BoxGeometry(0.5, 0.5, 0.5),
    mediumBox: new THREE.BoxGeometry(1, 1, 1),
    largeBox: new THREE.BoxGeometry(2, 2, 2),
    cylinder: new THREE.CylinderGeometry(0.5, 0.5, 1, 8),
    smallCylinder: new THREE.CylinderGeometry(0.15, 0.15, 1, 8),
    sphere: new THREE.SphereGeometry(0.5, 16, 16),
    smallSphere: new THREE.SphereGeometry(0.3, 16, 16),
  }), []);
}

// Hook for creating complex position arrays (memoized for performance)
export function usePositionArray(count: number, radius: number, height?: number) {
  return useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = height || 0;
      positions.push({ x, y, z, angle });
    }
    return positions;
  }, [count, radius, height]);
}

// Hook for animation values (using useMemo for computed values)
export function useAnimationValues(speed: number = 1) {
  return useMemo(() => ({
    rotationSpeed: speed * 0.01,
    pulseSpeed: speed * 0.005,
    bounceSpeed: speed * 0.02,
  }), [speed]);
}
