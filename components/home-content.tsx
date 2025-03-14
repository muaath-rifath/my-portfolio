"use client";

import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function HomeContent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Wait for client-side hydration to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <div className="relative w-full overflow-hidden">
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* About Section */}
        <AboutSection />
      </main>
    </div>
  );
}