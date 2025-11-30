"use client";

import { CircuitTraces } from "@/components/circuit-traces";
import { CircuitPatterns } from "@/components/circuit-patterns";
import { HexGrid } from "@/components/hex-grid";
import { useSyncExternalStore } from "react";

// Subscription function that does nothing (client never changes)
const subscribe = () => () => {};

// Check if we're on the client
function getClientSnapshot() {
  return true;
}

// Server always returns false
function getServerSnapshot() {
  return false;
}

export function BackgroundElements() {
  // Use useSyncExternalStore for hydration-safe mounting detection
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Subtle overlay to soften background in dark mode */}
      <div className="fixed inset-0 -z-10 bg-background/30 dark:bg-background/40 pointer-events-none" />
      
      {/* Circuit board background */}
      <div className="fixed inset-0 -z-20 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="hidden dark:block w-full h-full">
          <CircuitTraces />
        </div>
        <div className="block dark:hidden w-full h-full">
          <CircuitPatterns />
        </div>
      </div>
      
      {/* Hex grid overlay - only show in dark mode */}
      <div className="fixed inset-0 -z-20 opacity-20 dark:opacity-15 pointer-events-none hidden dark:block">
        <HexGrid />
      </div>
    </>
  );
}