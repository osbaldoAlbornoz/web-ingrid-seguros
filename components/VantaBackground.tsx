"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import to prevent SSR errors (window is not defined)
    const initVanta = async () => {
      if (!vantaEffect && vantaRef.current) {
        try {
          // @ts-ignore
          const CLOUDS = (await import("vanta/dist/vanta.clouds.min")).default;
          const effect = CLOUDS({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            backgroundColor: 0xffffff,
            skyColor: 0x6abcfb, 
            cloudColor: 0xe2ebf5, // Intermediate white/light-grey for volume
            cloudShadowColor: 0x3a6088, // Intermediate shadow, not too dark, not too flat
            sunColor: 0xff9919,
            sunGlareColor: 0xff6633,
            sunPosition: 1.0,
            speed: 1.2
          });
          setVantaEffect(effect);
        } catch (error) {
          console.error("Error loading Vanta Clouds:", error);
        }
      }
    };

    initVanta();

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 z-[-1] w-full h-full overflow-hidden opacity-60"
    />
  );
}
