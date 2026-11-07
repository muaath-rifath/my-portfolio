'use client';

import React from 'react';

interface PageEntryWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export const PageEntryWrapper: React.FC<PageEntryWrapperProps> = ({ children, delay = 0.5 }) => {
  return (
    <div className="w-full" style={{
      opacity: 0,
      animation: `pageEntryFadeIn 0.4s ease-out 0.05s forwards`
    }}>
      {children}
    </div>
  );
};
