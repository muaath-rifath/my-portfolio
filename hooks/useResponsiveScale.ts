"use client";

import { useState, useEffect } from 'react';

export function useResponsiveScale() {
  const [scale, setScale] = useState(0.6); // Default scale - restored to original
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateScale = () => {
      if (typeof window === 'undefined') return;
      
      const width = window.innerWidth;
      
      if (width >= 1024) {
        setScale(0.5); // Desktop - original scale
      } else if (width >= 640) {
        setScale(0.7); // Tablet - original scale  
      } else {
        setScale(0.6); // Mobile - original scale
      }
    };

    // Set initial scale
    updateScale();

    // Add resize listener
    window.addEventListener('resize', updateScale);

    // Cleanup
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Return a stable scale value during SSR
  return mounted ? scale : 0.6;
}
