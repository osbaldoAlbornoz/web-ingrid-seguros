"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vPos;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Create a flowing, twisting ribbon effect
  // Twist along the X axis
  float twist = sin(pos.x * 0.4 + uTime * 0.3) * 0.8;
  
  // Wave along the X and Y axis
  float wave1 = sin(pos.x * 0.8 + uTime * 0.5) * 0.5;
  float wave2 = cos(pos.y * 1.5 + uTime * 0.4) * 0.3;

  // Apply displacement
  pos.z += twist + wave1 + wave2;
  
  // Fold the edges slightly
  float edgeFold = (sin(vUv.x * 3.1415) * 0.2);
  pos.y += edgeFold * sin(uTime + pos.x);

  vPos = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vPos;

void main() {
  // Define vibrant Stripe-like colors
  vec3 color1 = vec3(1.0, 0.35, 0.2); // Orange
  vec3 color2 = vec3(0.9, 0.15, 0.6); // Pink
  vec3 color3 = vec3(0.3, 0.1, 0.9);  // Purple
  vec3 color4 = vec3(0.0, 0.7, 0.8);  // Cyan

  // Dynamic mixing based on UV coordinates, position, and time
  float mix1 = smoothstep(0.0, 1.0, vUv.x + sin(uTime * 0.2 + vUv.y * 2.0) * 0.3);
  float mix2 = smoothstep(0.0, 1.0, vUv.y + cos(uTime * 0.3 + vUv.x * 2.0) * 0.3);
  float mix3 = smoothstep(-1.0, 1.0, vPos.z); // Depth-based mixing

  // Blend colors
  vec3 col = mix(color1, color2, mix1);
  col = mix(col, color3, mix2);
  col = mix(col, color4, mix3 * 0.5); // Add highlights on the peaks

  // Calculate fake lighting based on depth
  float lighting = smoothstep(-0.5, 0.5, vPos.z) * 0.3;
  col += lighting; // Add brightness to the peaks

  // Soft edges to make it look like a floating ribbon instead of a hard rectangle
  float edgeY = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
  float edgeX = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
  float alpha = edgeY * edgeX * 0.9;

  gl_FragColor = vec4(col, alpha);
}
`;

const RibbonMesh = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-0.2, 0.1, 0.1]} scale={[1.2, 1.2, 1.2]}>
      {/* PlaneGeometry args: width, height, widthSegments, heightSegments */}
      <planeGeometry args={[14, 5, 128, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default function RibbonBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <RibbonMesh />
      </Canvas>
    </div>
  );
}
