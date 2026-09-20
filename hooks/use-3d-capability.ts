"use client";

import { useEffect, useState } from "react";

function supportsInteractiveScene() {
  let context: WebGL2RenderingContext | null = null;
  try {
    const canvas = document.createElement("canvas");
    // CPU, RAM and network estimates do not tell us whether WebGL works.
    // Three.js uses WebGL2; release this probe before creating the real renderer.
    context = canvas.getContext("webgl2", {
      failIfMajorPerformanceCaveat: true,
      powerPreference: "high-performance",
    });
    if (!context) return false;

    // Some browsers still return a software context despite the caveat flag.
    // Rendering this scene on the CPU can stall the page; retain its poster.
    const info = context.getExtension("WEBGL_debug_renderer_info");
    const renderer = context.getParameter(
      info ? info.UNMASKED_RENDERER_WEBGL : context.RENDERER,
    ) as string;
    return !/swiftshader|llvmpipe|softpipe|software rasterizer|software renderer|microsoft basic render/i.test(renderer);
  } catch {
    return false;
  } finally {
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  }
}

/** Check graphics support once; device/network estimates must not hide the scene. */
export function use3dCapability() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    let graphicsSupported: boolean | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      // Do not allocate a graphics context when motion is disabled. Probe only
      // once, including when the preference changes during this visit.
      if (reducedMotion.matches) {
        setIsSupported(false);
        return;
      }
      graphicsSupported ??= supportsInteractiveScene();
      setIsSupported(graphicsSupported);
    };
    update();
    reducedMotion.addEventListener("change", update);
    return () => {
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return isSupported;
}
