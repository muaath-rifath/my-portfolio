'use client';

import { lightModelPalette } from '@/lib/model-palette';

import { useDarkMode } from '@/hooks/useDarkMode';

/** Local fills move with the assembled model and illuminate it as one composition. */
export default function SceneModelLighting() {
  const dark = useDarkMode();
  return <>
    <directionalLight position={[24, 32, 28]} color={dark ? '#d9ffea' : lightModelPalette.keyLight} intensity={dark ? 2.4 : 0.9} />
    <directionalLight position={[-28, 18, 20]} color={dark ? '#a7e5c4' : lightModelPalette.fillLight} intensity={dark ? 1.55 : 0.8} />
    <directionalLight position={[8, 22, -34]} color={dark ? '#7be9be' : lightModelPalette.rimLight} intensity={dark ? 1.35 : 0.62} />
    <pointLight position={[-30, 16, 24]} color={dark ? '#91ffc0' : lightModelPalette.fillLight} intensity={dark ? 6 : 2.2} distance={80} decay={2} />
    <pointLight position={[28, 14, -18]} color={dark ? '#8bd5ff' : lightModelPalette.fillLight} intensity={dark ? 4.5 : 1.6} distance={80} decay={2} />
    <pointLight position={[0, -10, 26]} color={dark ? '#77efb0' : lightModelPalette.fillLight} intensity={dark ? 3.5 : 1.1} distance={70} decay={2} />
  </>;
}
