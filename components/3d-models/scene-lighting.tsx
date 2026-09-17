'use client';

import { lightModelPalette } from '@/lib/model-palette';

import { useDarkMode } from '@/hooks/useDarkMode';

/** A fixed studio rig illuminates every model as the scene rotates. */
export default function SceneLighting() {
    const dark = useDarkMode();
    return <>
        <ambientLight intensity={dark ? 0.5 : 0.9} />
        <hemisphereLight args={[dark ? '#b8d5c4' : lightModelPalette.fillLight, '#34433b', dark ? 0.85 : 1.4]} />
        {/* Broad front key defines the housings and metal surfaces. */}
        <directionalLight name="studio-key" position={[18, 30, 35]}
            color={dark ? '#d9f2df' : lightModelPalette.keyLight} intensity={dark ? 1.65 : 1.35} castShadow
            shadow-mapSize-width={2048} shadow-mapSize-height={2048}
            shadow-camera-left={-50} shadow-camera-right={50}
            shadow-camera-top={50} shadow-camera-bottom={-50}
            shadow-camera-near={0.5} shadow-camera-far={140}
            shadow-normalBias={0.08} shadow-bias={-0.0001} />
        <directionalLight name="studio-fill" position={[-25, 12, 20]}
            color={dark ? '#a4d9bb' : lightModelPalette.fillLight} intensity={dark ? 0.9 : 1.4} />
        {/* A small rim light maintains depth without washing out the scene. */}
        <directionalLight name="studio-rim" position={[8, 18, -30]}
            color={dark ? '#93e9d4' : lightModelPalette.rimLight} intensity={dark ? 1.1 : 0.8} />
    </>;
}
