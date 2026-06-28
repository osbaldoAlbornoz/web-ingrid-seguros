"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-white pointer-events-none">
      <div className="absolute -inset-[100px] opacity-50">
        <motion.div
          animate={{
            x: [0, 100, 0, -100, 0],
            y: [0, -100, 100, -50, 0],
            scale: [1, 1.2, 1.1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-[60%] h-[60%] left-[-10%] top-[-10%] rounded-full bg-[#00A896] filter blur-[120px]"
        />
        
        <motion.div
          animate={{
            x: [0, -150, 0, 100, 0],
            y: [0, 100, -50, 150, 0],
            scale: [1, 1.3, 1.1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-[50%] h-[60%] right-[-10%] top-[10%] rounded-full bg-[#007064] filter blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, 100, -100, 50, 0],
            y: [0, 50, -100, 100, 0],
            scale: [1, 1.1, 1.3, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-[50%] h-[50%] left-[20%] bottom-[-10%] rounded-full bg-[#00A896] filter blur-[120px]"
        />
      </div>
      
      {/* Light gradient mask to make sure it stays subtle and text is perfectly readable */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
    </div>
  );
}
