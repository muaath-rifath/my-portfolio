"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export function HexGrid() {
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
      drawHexGrid();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    function drawHexGrid() {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set line properties based on theme - increased opacity for light theme
      ctx.strokeStyle = theme === 'dark' ? '#1a1a2e' : '#c0c0d0';
      ctx.lineWidth = theme === 'dark' ? 1 : 1.5;
      
      const hexSize = 30;
      const width = hexSize * 2;
      const height = Math.sqrt(3) * hexSize;
      
      const cols = Math.ceil(canvas.width / (width * 0.75)) + 1;
      const rows = Math.ceil(canvas.height / height) + 1;
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const centerX = x * width * 0.75;
          const centerY = y * height + (x % 2 ? height / 2 : 0);
          
          drawHexagon(centerX, centerY, hexSize);
        }
      }
    }
    
    function drawHexagon(x: number, y: number, size: number) {
      if (!ctx) return;
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const pointX = x + size * Math.cos(angle);
        const pointY = y + size * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
