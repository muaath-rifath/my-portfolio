"use client";

import { useEffect, useState } from "react";

function supportsInteractiveScene() {
  try {
    const canvas = document.createElement("canvas");
    // CPU, RAM and network estimates do not tell us whether WebGL works.
    // Three.js uses WebGL2; release this probe before creating the real renderer.
    const context = canvas.getContext("webgl2");
    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** Check graphics support once; device/network estimates must not hide the scene. */
export function use3dCapability() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const graphicsSupported = supportsInteractiveScene();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsSupported(graphicsSupported && !reducedMotion.matches);
    };
    update();
    reducedMotion.addEventListener("change", update);
    return () => {
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return isSupported;
}
