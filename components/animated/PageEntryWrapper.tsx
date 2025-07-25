'use client';

import React from 'react';

interface PageEntryWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export const PageEntryWrapper: React.FC<PageEntryWrapperProps> = ({ children, delay = 0.5 }) => {
  return (
    <div style={{ 
      opacity: 0, 
      animation: `pageEntryFadeIn 1s ease-out ${delay}s forwards` 
    }}>
      {children}
    </div>
  );
};
