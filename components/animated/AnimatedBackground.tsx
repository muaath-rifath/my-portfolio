'use client';

import React from 'react';
import { useParallax } from '@/hooks/useScrollAnimation';
import { parallax } from '@/lib/animations';

export const AnimatedBackground: React.FC = () => {
  const circuitParallax = useParallax(0.5);

  return (
    <div 
      className="fixed inset-0 z-0 opacity-10 pointer-events-none"
      style={parallax(circuitParallax.offsetY, 0.3)}
      ref={circuitParallax.ref as React.RefObject<HTMLDivElement>}
    >
      <div className="h-[1px] w-3/4 dark:bg-[#8fffaa]/30 bg-[#006b42]/30 absolute top-40 left-0 transition-all duration-1000"></div>
      <div className="h-[1px] w-1/2 dark:bg-[#8fffaa]/20 bg-[#006b42]/20 absolute top-60 right-0 transition-all duration-1000 delay-200"></div>
      <div className="h-[1px] w-1/3 dark:bg-[#8fffaa]/30 bg-[#006b42]/30 absolute bottom-40 left-1/4 transition-all duration-1000 delay-400"></div>
      
      {/* Animated Nodes */}
      <div className="absolute right-12 top-72 h-2 w-2 rounded-full dark:bg-[#8fffaa]/60 bg-[#006b42]/60 animate-pulse"></div>
      <div className="absolute right-28 top-96 h-1 w-1 rounded-full dark:bg-[#8fffaa]/40 bg-[#006b42]/40 animate-pulse delay-100"></div>
      <div className="absolute left-20 top-80 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/50 bg-[#006b42]/50 animate-pulse delay-200"></div>
      
      {/* Vertical traces */}
      <div className="w-[1px] h-40 dark:bg-[#8fffaa]/30 bg-[#006b42]/30 absolute top-40 left-1/3 transition-all duration-1000 delay-300"></div>
      <div className="w-[1px] h-60 dark:bg-[#8fffaa]/20 bg-[#006b42]/20 absolute top-20 right-1/4 transition-all duration-1000 delay-500"></div>
    </div>
  );
};
