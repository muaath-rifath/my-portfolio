"use client";
import React, { useState, useEffect, useRef } from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

// Define props specifically for HoverBorderGradient
type HoverBorderGradientProps<T extends React.ElementType = "button"> = {
  children?: React.ReactNode; // Explicitly define children
  containerClassName?: string;
  className?: string;
  as?: T;
  duration?: number;
  clockwise?: boolean;
  // Include event handlers explicitly if they need special handling
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
} & Omit<React.ComponentPropsWithoutRef<T>, "className" | "onMouseEnter" | "onMouseLeave">; // Omit handled props

export function HoverBorderGradient<T extends React.ElementType = "button">({
  children,
  containerClassName,
  className,
  as,
  duration = 1,
  clockwise = true,
  onMouseEnter: userOnMouseEnter, // Rename user-provided handlers
  onMouseLeave: userOnMouseLeave,
  ...restProps // Rename rest props
}: HoverBorderGradientProps<T>) {
  const Tag = as || "button"; // Determine the tag type
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  };

  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  // Construct props for the Tag element
  const tagProps = {
    ...restProps, // Spread the remaining props first
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
      setHovered(true);
      userOnMouseEnter?.(event); // Call user's handler if provided
    },
    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
      setHovered(false);
      userOnMouseLeave?.(event); // Call user's handler if provided
    },
    className: cn( // Merge base styles with containerClassName
      "relative flex rounded-full border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
      containerClassName
    ),
  };

  return (
    // @ts-ignore // Temporary ignore if type error persists, indicates deeper issue
    <Tag {...tagProps}>
      {/* Inner structure remains the same */}
      <div
        className={cn(
          "relative z-10 w-auto bg-white dark:bg-black px-4 py-2 rounded-[inherit]",
          className // Apply the specific className to the inner content div
        )}
      >
        {children}
      </div>
      <motion.div
        // ... motion div props ...
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="absolute inset-[2px] z-1 bg-white dark:bg-black rounded-[100px]" />
    </Tag>
  );
}
