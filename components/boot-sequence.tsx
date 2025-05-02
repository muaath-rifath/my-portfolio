"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface BootSequenceProps {
  complete: boolean;
}

export function BootSequence({ complete }: BootSequenceProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    setMounted(true);
    // Adjust progress to complete within ~3 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment by ~4% every 100ms to reach 100% in ~2.5s
        return Math.min(prev + 4, 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false;
  
  if (!mounted) return null;
  
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: complete ? 0 : 1 }}
      transition={{ duration: 0.6, delay: complete ? 0 : 0 }}
      style={{ pointerEvents: complete ? 'none' : 'auto' }}
    >
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
        <div className="absolute top-0 left-0 h-full w-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
        <div className="absolute top-0 right-0 h-full w-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
        
        <div className="absolute top-4 right-4 h-2 w-2 rounded-full dark:bg-[#8fffaa]/40 bg-[#006b42]/40"></div>
        <div className="absolute bottom-4 left-4 h-2 w-2 rounded-full dark:bg-[#8fffaa]/40 bg-[#006b42]/40"></div>
        <div className="absolute top-1/3 left-8 h-[1px] w-8 dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
        <div className="absolute bottom-1/3 right-8 h-[1px] w-8 dark:bg-[#8fffaa]/30 bg-[#006b42]/30"></div>
      </div>

      <div className="text-center font-mono relative">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-sm relative"
          >
            <div className={`mb-2 ${isDark ? "text-[#5dffa0]" : "text-green-700"}`}>
              <span className="mr-2">{`>`}</span>
              <span className="font-bold">MR-SYSTEM v1.0.4</span>
              <span className="opacity-75">[Build 20231115]</span>
            </div>
            
            <div className={`absolute -left-4 -right-4 h-[1px] ${isDark ? "bg-[#8fffaa]/20" : "bg-[#006b42]/20"}`}></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="text-xs space-y-2"
          >
            <div className={`flex items-center gap-2 ${isDark ? "text-[#e1ffed]" : ""}`}>
              <span className="opacity-75">Memory check:</span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={isDark ? "text-[#8cdfff]" : "text-blue-700"}
              >
                OK
              </motion.span>
              <motion.div 
                className={`h-1 flex-1 ${isDark ? "bg-[#8cdfff]/20" : "bg-blue-700/20"}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
            </div>

            <div className={`flex items-center gap-2 ${isDark ? "text-[#e1ffed]" : ""}`}>
              <span className="opacity-75">System integrity:</span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className={isDark ? "text-[#8cdfff]" : "text-blue-700"}
              >
                OK
              </motion.span>
              <motion.div 
                className={`h-1 flex-1 ${isDark ? "bg-[#8cdfff]/20" : "bg-blue-700/20"}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.9 }}
              />
            </div>

            <div className={`flex items-center gap-2 ${isDark ? "text-[#e1ffed]" : ""}`}>
              <span className="opacity-75">Loading core modules...</span>
              <motion.div 
                className={`h-1 flex-1 ${isDark ? "bg-[#8cdfff]/20" : "bg-blue-700/20"}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.1 }}
              />
              <span className="text-[10px] tabular-nums w-8">{progress}%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 1.3 }}
            className="pt-4 pb-2 relative"
          >
            <div className={`absolute -left-8 -right-8 h-[1px] top-0 ${isDark ? "bg-[#8fffaa]/20" : "bg-[#006b42]/20"}`}></div>
            <div className={`absolute -left-8 -right-8 h-[1px] bottom-0 ${isDark ? "bg-[#8fffaa]/20" : "bg-[#006b42]/20"}`}></div>
            
            <h1 className="text-2xl font-bold tracking-wider relative">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.03 }}
              >
                M
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.45, duration: 0.03 }}
              >
                U
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.03 }}
              >
                A
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.55, duration: 0.03 }}
              >
                A
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.03 }}
              >
                T
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.65, duration: 0.03 }}
              >
                H
              </motion.span>
              <motion.span className="mx-1">
                {" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.03 }}
              >
                R
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.75, duration: 0.03 }}
              >
                I
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.03 }}
              >
                F
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.85, duration: 0.03 }}
              >
                A
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.03 }}
              >
                T
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.95, duration: 0.03 }}
              >
                H
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 2.1 }}
            className="text-sm relative"
          >
            <div className={`absolute -left-4 -right-4 h-[1px] top-0 ${isDark ? "bg-[#8fffaa]/20" : "bg-[#006b42]/20"}`}></div>
            <p className={`mt-2 ${isDark ? "text-[#5dffa0]" : "text-green-700"}`}>
              <span className="mr-2">{`>`}</span>
              System initialization complete
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated corners */}
      <div className="absolute inset-4 pointer-events-none">
        <motion.div 
          className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${isDark ? "border-[#8fffaa]/60" : "border-[#006b42]/60"}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: 0.05 }}
        />
        <motion.div 
          className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${isDark ? "border-[#8fffaa]/60" : "border-[#006b42]/60"}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: 0.1 }}
        />
        <motion.div 
          className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${isDark ? "border-[#8fffaa]/60" : "border-[#006b42]/60"}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: 0.15 }}
        />
        <motion.div 
          className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${isDark ? "border-[#8fffaa]/60" : "border-[#006b42]/60"}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}
