"use client";

import { CircuitTraces } from "@/components/circuit-traces";
import { CircuitPatterns } from "@/components/circuit-patterns";
import { HexGrid } from "@/components/hex-grid";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function BackgroundElements() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for client-side hydration to avoid theme mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Circuit board background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="hidden dark:block w-full h-full">
          <CircuitTraces />
        </div>
        <div className="block dark:hidden w-full h-full">
          <CircuitPatterns />
        </div>
      </div>
      
      {/* Hex grid overlay - only show in dark mode */}
      <div className="fixed inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none hidden dark:block">
        <HexGrid />
      </div>
    </>
  );
}