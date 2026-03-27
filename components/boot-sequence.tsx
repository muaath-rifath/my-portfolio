"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BootSequence() {
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressComplete, setProgressComplete] = useState(false);

  const handleSequenceComplete = () => {
    setShowBootSequence(false);
    document.documentElement.classList.remove('nojs');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDirectPageLoad = !window.performance
        .getEntriesByType('navigation')
        .some((nav) => (nav as any).type === 'back_forward');

      if (!isDirectPageLoad) {
        setShowBootSequence(false);
        document.documentElement.classList.remove('nojs');
        return;
      }
    }

    setMounted(true);

    // Fallback timer
    const fallbackTimer = setTimeout(() => {
      handleSequenceComplete();
    }, 5000);

    // Progress: 5% every 60ms → ~1.2s to reach 100%
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          clearTimeout(fallbackTimer);
          setTimeout(() => {
            setProgressComplete(true);
            setTimeout(() => {
              handleSequenceComplete();
            }, 200);
          }, 200);
          return 100;
        }
        return Math.min(prev + 5, 100);
      });
    }, 60);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (!mounted || !showBootSequence) return null;

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden",
        progressComplete ? "pointer-events-none" : "pointer-events-auto"
      )}
      initial={{ opacity: 1 }}
      animate={{ opacity: progressComplete ? 0 : 1 }}
      transition={{ duration: 0.2 }}
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
            transition={{ duration: 0.15 }}
            className="text-sm relative"
          >
            <div className="mb-2 text-green-700 dark:text-[#5dffa0]">
              <span className="mr-2">{`>`}</span>
              <span className="font-bold">MR-SYSTEM v1.0.4</span>
              <span className="opacity-75">[Build 20231115]</span>
            </div>
            <div className="absolute -left-4 -right-4 h-[1px] bg-[#006b42]/20 dark:bg-[#8fffaa]/20"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 0.2 }}
            className="text-xs space-y-2"
          >
            <div className="flex items-center gap-2 dark:text-[#e1ffed]">
              <span className="opacity-75">Memory check:</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-blue-700 dark:text-[#8cdfff]"
              >
                OK
              </motion.span>
              <motion.div
                className="h-1 flex-1 bg-blue-700/20 dark:bg-[#8cdfff]/20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              />
            </div>

            <div className="flex items-center gap-2 dark:text-[#e1ffed]">
              <span className="opacity-75">System integrity:</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-blue-700 dark:text-[#8cdfff]"
              >
                OK
              </motion.span>
              <motion.div
                className="h-1 flex-1 bg-blue-700/20 dark:bg-[#8cdfff]/20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2, delay: 0.35 }}
              />
            </div>

            <div className="flex items-center gap-2 dark:text-[#e1ffed]">
              <span className="opacity-75">Loading core modules...</span>
              <motion.div
                className="h-1 flex-1 bg-blue-700/20 dark:bg-[#8cdfff]/20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.05 }}
              />
              <span className="text-[10px] tabular-nums w-8">{progress}%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 0.6 }}
            className="pt-4 pb-2 relative"
          >
            <div className="absolute -left-8 -right-8 h-[1px] top-0 bg-[#006b42]/20 dark:bg-[#8fffaa]/20"></div>
            <div className="absolute -left-8 -right-8 h-[1px] bottom-0 bg-[#006b42]/20 dark:bg-[#8fffaa]/20"></div>

            <h1 className="text-2xl font-bold tracking-wider relative">
              {['M','U','A','A','T','H',' ','R','I','F','A','T','H'].map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 + i * 0.02, duration: 0.02 }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 0.95 }}
            className="text-sm relative"
          >
            <div className="absolute -left-4 -right-4 h-[1px] top-0 bg-[#006b42]/20 dark:bg-[#8fffaa]/20"></div>
            <p className="mt-2 text-green-700 dark:text-[#5dffa0]">
              <span className="mr-2">{`>`}</span>
              System initialization complete
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated corners */}
      <div className="absolute inset-4 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#006b42]/60 dark:border-[#8fffaa]/60"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: 0.05 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#006b42]/60 dark:border-[#8fffaa]/60"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: 0.1 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#006b42]/60 dark:border-[#8fffaa]/60"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: 0.15 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#006b42]/60 dark:border-[#8fffaa]/60"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}
