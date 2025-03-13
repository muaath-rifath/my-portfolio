"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function SensorDataViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  
  useEffect(() => {
    // Initialize data points
    setDataPoints(Array(100).fill(0).map(() => Math.random() * 0.5 + 0.25));
    
    // Update data points every 100ms
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newPoints = [...prev];
        // Shift points left
        newPoints.shift();
        // Add new point
        newPoints.push(Math.random() * 0.5 + 0.25);
        return newPoints;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dataPoints.length) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const gridSize = 20;
    
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw multiple waveforms
    const waveforms = [
      { color: theme === 'dark' ? '#00aaff' : '#0077cc', amplitude: 1.0, offset: 0.2 },
      { color: theme === 'dark' ? '#00ff77' : '#00aa44', amplitude: 0.7, offset: 0.5 },
      { color: theme === 'dark' ? '#ff7700' : '#cc4400', amplitude: 0.4, offset: 0.8 }
    ];
    
    waveforms.forEach(wave => {
      // Draw data line
      ctx.beginPath();
      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 2;
      
      const pointSpacing = canvas.width / dataPoints.length;
      
      dataPoints.forEach((point, index) => {
        const x = index * pointSpacing;
        const y = canvas.height * (1 - (point * wave.amplitude + wave.offset));
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    });
    
  }, [dataPoints, theme]);

  return (
    <div className="relative w-full h-full rounded-lg border border-border overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Overlay elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Component labels */}
        <div className="absolute top-3 left-3 font-mono text-xs">
          <div className={`px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-[#b0fff0]' : 'bg-slate-200 text-[#006b42]'} border border-border`}>
            SENSOR_ARRAY:STATUS
          </div>
        </div>
        
        <div className="absolute top-3 right-3 font-mono text-xs">
          <div className={`px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-[#b0fff0]' : 'bg-slate-200 text-[#006b42]'} border border-border flex items-center gap-2`}>
            <span className="h-2 w-2 rounded-full bg-green-500 pulse-animation"></span>
            LIVE
          </div>
        </div>
        
        {/* Edge components */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className={`flex justify-between items-center py-2 px-3 font-mono text-xs ${isDark ? 'text-[#d7fff5]' : 'text-gray-700'}`}>
            <div>SIGNAL:ACTIVE</div>
            <div className="flex gap-4">
              <div>CPU: 12%</div>
              <div>MEM: 237MB</div>
              <div>TEMP: 42°C</div>
            </div>
          </div>
        </div>
        
        {/* Animated elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute h-1 w-1 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-700'} particle-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
