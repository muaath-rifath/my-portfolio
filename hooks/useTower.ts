"use client";

import { useMemo } from 'react';
import { use3DMaterials, usePositionArray } from './use3D';

// Specialized hook for tower models
export function useTowerConfiguration(mainHeight: number = 25) {
  const materials = use3DMaterials();
  
  const configuration = useMemo(() => ({
    mainTowerHeight: mainHeight,
    sectionCount: 8,
    antennaCount: 3,
    radius: 2.5,
  }), [mainHeight]);
  
  // Memoized dish positions
  const dishPositions = useMemo(() => [
    { y: configuration.mainTowerHeight * 0.8, angle: Math.PI / 6 },
    { y: configuration.mainTowerHeight * 0.6, angle: Math.PI / 2 + Math.PI / 6 },
    { y: configuration.mainTowerHeight * 0.4, angle: Math.PI + Math.PI / 6 },
  ], [configuration.mainTowerHeight]);
  
  // Memoized antenna positions
  const antennaPositions = usePositionArray(
    configuration.antennaCount, 
    configuration.radius, 
    configuration.mainTowerHeight + 1.5
  );
  
  // Memoized section positions
  const sectionPositions = useMemo(() => {
    return Array.from({ length: configuration.sectionCount }, (_, i) => {
      const y = (i + 1) * configuration.mainTowerHeight / (configuration.sectionCount + 1) + 0.5;
      return y;
    });
  }, [configuration.sectionCount, configuration.mainTowerHeight]);
  
  // Memoized diagonal support positions
  const diagonalPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const x = Math.cos(angle) * 1.5;
      const z = Math.sin(angle) * 1.5;
      positions.push({ x, z, angle });
    }
    return positions;
  }, []);
  
  return {
    materials,
    configuration,
    dishPositions,
    antennaPositions,
    sectionPositions,
    diagonalPositions,
  };
}
