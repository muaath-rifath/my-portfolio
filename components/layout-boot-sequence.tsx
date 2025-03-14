"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { BootSequence } from "@/components/boot-sequence";
import { usePathname } from "next/navigation";

export const BootSequenceContext = createContext({ isBooting: true });

export function useBootSequence() {
  return useContext(BootSequenceContext);
}

export function LayoutBootSequence() {
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [booted, setBooted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Initial load or refresh detection
    if (typeof window !== 'undefined') {
      const start = () => {
        setShowBootSequence(true);
        setBooted(false);
        
        // Main display duration - 7 seconds
        const mainTimer = setTimeout(() => {
          setBooted(true);
          
          // Fade out duration - 1 second
          const fadeTimer = setTimeout(() => {
            setShowBootSequence(false);
          }, 1000);
          
          return () => clearTimeout(fadeTimer);
        }, 7000);
        
        return () => clearTimeout(mainTimer);
      };

      // Start animation on mount or refresh
      start();
    }
  }, []);

  // Handle internal navigation
  useEffect(() => {
    if (pathname && typeof window !== 'undefined') {
      const navEntries = window.performance.getEntriesByType('navigation');
      const isNavigating = navEntries.length > 0 && 
        (navEntries[0] as PerformanceNavigationTiming).type !== 'reload';
      
      if (isNavigating) {
        setShowBootSequence(false);
      }
    }
  }, [pathname]);

  return (
    <BootSequenceContext.Provider value={{ isBooting: showBootSequence }}>
      {showBootSequence && <BootSequence complete={booted} />}
    </BootSequenceContext.Provider>
  );
}