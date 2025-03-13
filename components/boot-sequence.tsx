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
      <div className="text-center font-mono">
        <div className="space-y-2">
          {/* Memory check animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm"
          >
            <span className={isDark ? "text-[#5dffa0]" : "text-green-700"}>
              MR-SYSTEM v1.0.4 [Build 20231115]
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-xs space-y-1"
          >
            <p className={isDark ? "text-[#e1ffed]" : ""}>Memory check: <span className={isDark ? "text-[#8cdfff]" : "text-blue-700"}>OK</span></p>
            <p className={isDark ? "text-[#e1ffed]" : ""}>System integrity: <span className={isDark ? "text-[#8cdfff]" : "text-blue-700"}>OK</span></p>
            <p className={isDark ? "text-[#e1ffed]" : ""}>Loading core modules...</p>
          </motion.div>
          
          {/* Name initialization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="pt-4 pb-2"
          >
            <h1 className="text-2xl font-bold tracking-wider">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.1 }}
              >
                M
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.1 }}
              >
                U
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.1 }}
              >
                A
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.1 }}
              >
                A
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.1 }}
              >
                T
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.1 }}
              >
                H
              </motion.span>
              <motion.span className="mx-1">
                {" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.1 }}
              >
                R
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.1 }}
              >
                I
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.1 }}
              >
                F
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.1 }}
              >
                A
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.1 }}
              >
                T
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1, duration: 0.1 }}
              >
                H
              </motion.span>
            </h1>
          </motion.div>
          
          {/* System boot complete */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 2.2 }}
            className="text-sm"
          >
            <p className={isDark ? "text-[#5dffa0]" : "text-green-700"}>System initialization complete</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
