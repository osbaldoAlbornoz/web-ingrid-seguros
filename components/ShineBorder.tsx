"use client";

import React from "react";
import { motion } from "framer-motion";

export const ShineBorder = ({
  children,
  className = "",
  borderWidth = 3,
  duration = 4,
  color = "#00A896", // Default to the teal color
}: {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  duration?: number;
  color?: string;
}) => {
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ padding: borderWidth }}
    >
      {/* Spinning Background gradient */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[300%] h-[300%] z-0"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, transparent 40%, ${color} 50%, transparent 60%, transparent 100%)`,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      
      {/* The actual content (image, etc.) */}
      <div className="relative z-10 h-full w-full rounded-[inherit] overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );
};
