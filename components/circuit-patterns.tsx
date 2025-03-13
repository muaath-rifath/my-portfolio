"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export function CircuitPatterns() {
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
      drawCircuitPatterns();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    function drawCircuitPatterns() {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set properties based on theme - much darker colors for light theme
      const isDark = theme === 'dark';
      const lineColor = isDark ? '#1a1a2e' : '#475b59';
      const componentColor = isDark ? '#2a2a4e' : '#5c7975';
      
      // Increased line width for better visibility
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = isDark ? 1.5 : 2;
      
      // Draw grid of electronic components
      const gridSize = 100; // Smaller grid for more density
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;
      
      // Draw ICs and components
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const posX = x * gridSize;
          const posY = y * gridSize;
          
          // Randomly select component type (only draw 30% of grid cells)
          if (Math.random() < 0.3) {
            const componentType = Math.floor(Math.random() * 5);
            drawComponent(posX, posY, componentType, lineColor, componentColor);
          }
        }
      }
      
      // Draw connecting traces
      for (let i = 0; i < cols * rows / 4; i++) {
        const startX = Math.floor(Math.random() * cols) * gridSize;
        const startY = Math.floor(Math.random() * rows) * gridSize;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        // Generate a path
        let x = startX;
        let y = startY;
        
        const segments = 1 + Math.floor(Math.random() * 3);
        
        for (let j = 0; j < segments; j++) {
          // Choose horizontal or vertical
          const isHorizontal = Math.random() > 0.5;
          
          // Length is a multiple of grid size
          const length = gridSize * (Math.random() > 0.7 ? 2 : 1);
          
          if (isHorizontal) {
            x += Math.random() > 0.5 ? length : -length;
          } else {
            y += Math.random() > 0.5 ? length : -length;
          }
          
          // Keep within bounds
          x = Math.max(0, Math.min(canvas.width, x));
          y = Math.max(0, Math.min(canvas.height, y));
          
          // Draw with 90 degree angles
          if (j > 0 && Math.random() > 0.5) {
            const midX = isHorizontal ? x : ctx.lineTo(x, y);
            const midY = isHorizontal ? ctx.lineTo(x, y) : y;
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }
    }
    
    function drawComponent(
      x: number, 
      y: number, 
      type: number, 
      lineColor: string, 
      fillColor: string
    ) {
      if (!ctx) return;
      
      ctx.strokeStyle = lineColor;
      ctx.fillStyle = fillColor;
      
      switch(type) {
        case 0: // IC chip
          // Chip body
          ctx.fillRect(x - 25, y - 15, 50, 30);
          ctx.strokeRect(x - 25, y - 15, 50, 30);
          
          // Pins
          for (let i = 0; i < 6; i++) {
            // Left pins
            ctx.fillRect(x - 30, y - 12 + i * 5, 5, 2);
            ctx.strokeRect(x - 30, y - 12 + i * 5, 5, 2);
            
            // Right pins
            ctx.fillRect(x + 25, y - 12 + i * 5, 5, 2);
            ctx.strokeRect(x + 25, y - 12 + i * 5, 5, 2);
          }
          
          // Notch
          ctx.beginPath();
          ctx.arc(x, y - 15, 5, Math.PI, 0, false);
          ctx.fillStyle = theme === 'dark' ? '#000' : '#111';
          ctx.fill();
          break;
          
        case 1: // Capacitor
          // Body
          ctx.fillRect(x - 5, y - 15, 10, 30);
          ctx.strokeRect(x - 5, y - 15, 10, 30);
          
          // Terminals
          ctx.beginPath();
          ctx.moveTo(x, y - 15);
          ctx.lineTo(x, y - 25);
          ctx.moveTo(x, y + 15);
          ctx.lineTo(x, y + 25);
          ctx.stroke();
          
          // Polarity
          ctx.fillStyle = theme === 'dark' ? '#000' : '#111';
          ctx.fillText('+', x - 2, y);
          break;
          
        case 2: // Resistor
          // Body
          ctx.fillRect(x - 15, y - 5, 30, 10);
          ctx.strokeRect(x - 15, y - 5, 30, 10);
          
          // Terminals
          ctx.beginPath();
          ctx.moveTo(x - 15, y);
          ctx.lineTo(x - 25, y);
          ctx.moveTo(x + 15, y);
          ctx.lineTo(x + 25, y);
          ctx.stroke();
          
          // Bands - darker bands for light theme
          const bandColors = theme === 'dark' 
            ? ['#000', '#b00', '#fb0', '#00b']
            : ['#111', '#900', '#c90', '#008'];
          for (let i = 0; i < 4; i++) {
            ctx.fillStyle = bandColors[i];
            ctx.fillRect(x - 12 + i * 7, y - 5, 3, 10);
          }
          break;
          
        case 3: // Transistor
          // Body
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          
          // Leads
          ctx.beginPath();
          ctx.moveTo(x, y - 10);
          ctx.lineTo(x, y - 20);
          ctx.moveTo(x - 8, y + 5);
          ctx.lineTo(x - 18, y + 15);
          ctx.moveTo(x + 8, y + 5);
          ctx.lineTo(x + 18, y + 15);
          ctx.stroke();
          break;
          
        case 4: // PCB pad array
          for (let iy = 0; iy < 5; iy++) {
            for (let ix = 0; ix < 5; ix++) {
              if ((ix + iy) % 2 === 0) {
                ctx.beginPath();
                ctx.arc(x - 10 + ix * 5, y - 10 + iy * 5, 1.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
              }
            }
          }
          break;
      }
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
