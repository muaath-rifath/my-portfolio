"use client";
import { useState, useEffect, createContext, useContext, Suspense } from "react";
import { BootSequence } from "@/components/boot-sequence";
import { usePathname, useSearchParams } from "next/navigation";

export const BootSequenceContext = createContext({ isBooting: true });

export function useBootSequence() {
  return useContext(BootSequenceContext);
}

function BootSequenceContent() {
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [booted, setBooted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initBoot = () => {
      setShowBootSequence(true);
      
      const mainTimer = setTimeout(() => {
        setBooted(true);
        
        const fadeTimer = setTimeout(() => {
          setShowBootSequence(false);
        }, 1500);
        
        return () => clearTimeout(fadeTimer);
      }, 8000);
      
      return () => clearTimeout(mainTimer);
    };

    if (typeof window !== 'undefined') {
      const isDirectPageLoad = !window.performance
        .getEntriesByType('navigation')
        .some((nav) => (nav as any).type === 'back_forward');

      if (isDirectPageLoad) {
        return initBoot();
      } else {
        setShowBootSequence(false);
      }
    }
  }, []);

  useEffect(() => {
    if (booted) {
      setShowBootSequence(false);
    }
  }, [pathname, searchParams, booted]);

  return (
    <BootSequenceContext.Provider value={{ isBooting: showBootSequence }}>
      {showBootSequence && <BootSequence complete={booted} />}
    </BootSequenceContext.Provider>
  );
}

export function LayoutBootSequence() {
  return (
    <Suspense fallback={null}>
      <BootSequenceContent />
    </Suspense>
  );
}