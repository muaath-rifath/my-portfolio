"use client";
import { useState, useEffect } from "react";
import { BootSequence } from "@/components/boot-sequence";

export function LayoutBootSequence() {
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    // Force any content to show after 12 seconds as a fallback
    const fallbackTimer = setTimeout(() => {
      const htmlEl = document.documentElement;
      htmlEl.classList.remove('nojs');
      
      // Force content visibility
      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.style.opacity = '1';
        mainEl.style.visibility = 'visible';
      }
      
      setShowBootSequence(false);
    }, 12000);

    // Normal boot sequence
    if (typeof window !== 'undefined') {
      const isDirectPageLoad = !window.performance
        .getEntriesByType('navigation')
        .some((nav) => (nav as any).type === 'back_forward');

      if (isDirectPageLoad) {
        // Boot sequence for direct page loads
        const bootTimer = setTimeout(() => {
          setBooted(true);
          
          const fadeTimer = setTimeout(() => {
            setShowBootSequence(false);
            
            // Show content
            document.documentElement.classList.remove('nojs');
            const mainEl = document.querySelector('main');
            if (mainEl) {
              mainEl.style.opacity = '1';
              mainEl.style.visibility = 'visible';
            }
          }, 1500);
          
          return () => clearTimeout(fadeTimer);
        }, 8000);
        
        return () => {
          clearTimeout(bootTimer);
          clearTimeout(fallbackTimer);
        };
      } else {
        // Skip boot for navigation
        setShowBootSequence(false);
        document.documentElement.classList.remove('nojs');
        
        // Show content immediately
        const mainEl = document.querySelector('main');
        if (mainEl) {
          mainEl.style.opacity = '1';
          mainEl.style.visibility = 'visible';
        }
        
        return () => clearTimeout(fallbackTimer);
      }
    }
    
    return () => clearTimeout(fallbackTimer);
  }, []);

  return showBootSequence ? <BootSequence complete={booted} /> : null;
}