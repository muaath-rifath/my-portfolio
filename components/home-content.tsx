"use client";

import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { CircuitTraces } from "@/components/circuit-traces";
import { CircuitPatterns } from "@/components/circuit-patterns";
import { HexGrid } from "@/components/hex-grid";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BootSequence } from "@/components/boot-sequence";

export default function HomeContent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [booted, setBooted] = useState(false);
  
  // Wait for client-side hydration to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Simulate boot sequence
    const timer = setTimeout(() => setBooted(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <div className="relative w-full overflow-hidden">
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
      
      <main className="relative z-10">
        <BootSequence complete={booted} />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* About Section */}
        <AboutSection />
      </main>
    </div>
  );
}