"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export function CircuitTraces() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawCircuits();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    function drawCircuits() {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Enhanced visibility for light theme
      ctx.strokeStyle = theme === 'dark' ? '#1a4a1f' : '#7e9c83';
      ctx.lineWidth = theme === 'dark' ? 1 : 1.5;
      
      const gridSize = 40;
      const padding = 10;
      const cols = Math.floor(canvas.width / gridSize);
      const rows = Math.floor(canvas.height / gridSize);
      
      // Create trace paths
      for (let i = 0; i < cols * rows / 3; i++) {
        const startX = Math.floor(Math.random() * cols) * gridSize + padding;
        const startY = Math.floor(Math.random() * rows) * gridSize + padding;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        // Generate a circuit path
        let x = startX;
        let y = startY;
        
        const segments = 2 + Math.floor(Math.random() * 5);
        
        for (let j = 0; j < segments; j++) {
          // Choose a direction: 0 = right, 1 = down, 2 = left, 3 = up
          const direction = Math.floor(Math.random() * 4);
          
          const length = (1 + Math.floor(Math.random() * 3)) * gridSize;
          
          switch (direction) {
            case 0: // Right
              x += length;
              break;
            case 1: // Down
              y += length;
              break;
            case 2: // Left
              x -= length;
              break;
            case 3: // Up
              y -= length;
              break;
          }
          
          // Keep within bounds
          x = Math.max(padding, Math.min(canvas.width - padding, x));
          y = Math.max(padding, Math.min(canvas.height - padding, y));
          
          // For the last segment, make a right angle before continuing
          if (j < segments - 1 && Math.random() > 0.5) {
            const midX = x;
            const midY = y;
            
            if (direction % 2 === 0) { // If horizontal movement
              y += (Math.random() > 0.5 ? 1 : -1) * gridSize;
            } else { // If vertical movement
              x += (Math.random() > 0.5 ? 1 : -1) * gridSize;
            }
            
            ctx.lineTo(midX, midY);
          }
          
          ctx.lineTo(x, y);
        }
        
        // Draw circuit nodes at ends
        if (Math.random() > 0.7) {
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = ctx.strokeStyle;
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
      
      // Add small component pads
      for (let i = 0; i < cols * rows / 10; i++) {
        const x = Math.floor(Math.random() * cols) * gridSize + padding;
        const y = Math.floor(Math.random() * rows) * gridSize + padding;
        
        ctx.beginPath();
        
        // Randomly choose component type
        const componentType = Math.floor(Math.random() * 4);
        
        switch (componentType) {
          case 0: // Circle pad
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            break;
          case 1: // Square pad
            ctx.rect(x - 3, y - 3, 6, 6);
            break;
          case 2: // Small IC
            ctx.rect(x - 8, y - 5, 16, 10);
            break;
          case 3: // Multiple pins
            for (let p = 0; p < 4; p++) {
              ctx.rect(x - 8 + p * 4, y - 2, 2, 4);
            }
            break;
        }
        
        // For component pads - more visible in light theme
        ctx.fillStyle = theme === 'dark' ? '#143015' : '#a3c9a7';
        ctx.fill();
        ctx.strokeStyle = theme === 'dark' ? '#1a4a1f' : '#7e9c83';
        ctx.stroke();
      }
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
