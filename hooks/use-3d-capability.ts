"use client";

import { useEffect, useState } from "react";

type ConnectionInfo = {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: ConnectionInfo;
  deviceMemory?: number;
};

function supportsInteractiveScene() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const navigatorWithConnection = navigator as NavigatorWithConnection;
  const connection = navigatorWithConnection.connection;
  if (connection?.saveData || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") return false;
  if ((navigatorWithConnection.deviceMemory ?? 8) <= 4 || (navigator.hardwareConcurrency ?? 8) <= 4) return false;

  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Uses the 3D scene on capable devices while preserving low-power and reduced-motion fallbacks. */
export function use3dCapability() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        setIsSupported(false);
        return;
      }

      // A scene that has already initialized must survive a responsive resize.
      // Otherwise the canvas unmounts on a phone-width resize after its poster
      // has faded out, leaving an empty scene frame.
      setIsSupported((current) => supportsInteractiveScene() ? true : current ?? false);
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    update();
    reducedMotion.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      reducedMotion.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return isSupported;
}
