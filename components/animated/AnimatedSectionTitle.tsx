'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp } from '@/lib/animations';

interface AnimatedSectionTitleProps {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedSectionTitle: React.FC<AnimatedSectionTitleProps> = ({ children, delay = 0 }) => {
  const animation = useScrollAnimation({ threshold: 0.1 });

  return (
    <div 
      className="relative z-10 mb-8"
      ref={animation.ref as React.RefObject<HTMLDivElement>}
      style={fadeInUp(animation.isVisible, delay)}
    >
      {children}
    </div>
  );
};
