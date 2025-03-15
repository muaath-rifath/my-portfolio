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
  const [previousPathname, setPreviousPathname] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Only run this on the client
    if (typeof window !== 'undefined') {
      // Store current path to detect navigation
      if (!previousPathname) {
        setPreviousPathname(pathname || '');
      }
      
      // Show boot sequence on initial load and refresh
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

  // Handle internal navigation - hide boot sequence when pathname changes
  useEffect(() => {
    if (previousPathname && pathname !== previousPathname) {
      setShowBootSequence(false);
      setPreviousPathname(pathname || '');
    }
  }, [pathname, previousPathname]);

  return (
    <BootSequenceContext.Provider value={{ isBooting: showBootSequence }}>
      {showBootSequence && <BootSequence complete={booted} />}
    </BootSequenceContext.Provider>
  );
}