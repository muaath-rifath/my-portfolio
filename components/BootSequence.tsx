"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface BootSequenceProps {
  complete: boolean;
}

export function BootSequence({ complete }: BootSequenceProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background ${complete ? 'pointer-events-none' : 'pointer-events-auto'}`}
      animate={{ opacity: complete ? 0 : 1 }}
      transition={{ duration: 0.5, delay: complete ? 2.5 : 0 }}
    >
      // ...existing code...
    </motion.div>
  );
}
