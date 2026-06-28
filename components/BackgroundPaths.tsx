"use client";

import { motion } from "framer-motion";

export function BackgroundPaths() {
    // Generate beautiful abstract swirling paths (adapted from Kokonut UI)
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * 2} -${189 + i * 6}C-${
            380 - i * 5 * 2
        } -${189 + i * 6} -${312 - i * 5 * 2} ${216 - i * 6} ${
            152 - i * 5 * 2
        } ${343 - i * 6}C${616 - i * 5 * 2} ${470 - i * 6} ${
            684 - i * 5 * 2
        } ${875 - i * 6} ${684 - i * 5 * 2} ${875 - i * 6}`,
        color: `rgba(0, 168, 150, ${0.05 + i * 0.015})`, // Turquoise colors with varying opacity
        width: 0.5 + i * 0.03, // Thin to slightly thicker lines
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
            {/* We scale it slightly up to ensure it covers the section well */}
            <svg
                className="w-full h-full absolute"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid slice"
                style={{ minWidth: '100%', minHeight: '100%' }}
            >
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={path.color}
                        strokeWidth={path.width}
                        strokeLinecap="round"
                        fill="transparent"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>
            
            {/* White gradients to blend the borders of the paths smoothly into the page */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-white opacity-80" />
        </div>
    );
}
