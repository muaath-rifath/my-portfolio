import React from 'react';
import styles from './ModelScaler.module.css';

// Define interface for component props
interface ModelScalerProps {
  children?: React.ReactNode;
  scale?: number;
  className?: string;
  [key: string]: any; // For any additional props
}

// Update function signature to use the interface
export function ModelScaler({ children, scale = 1, className = '', ...props }: ModelScalerProps) {
  return (
    <div className={`${styles.scaleContainer} ${className}`} {...props}>
      {children}
    </div>
  );
}
