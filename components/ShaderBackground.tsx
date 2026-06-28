"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;

// Simple random and noise functions
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Fractional Brownian Motion for more complex clouds
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st = rot * st * 2.0 + shift;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 st = vUv * 3.0;
    
    // Slow moving time
    float t = uTime * 0.15;
    
    vec2 q = vec2(0.);
    q.x = fbm(st + 0.00 * t);
    q.y = fbm(st + vec2(1.0));
    
    vec2 r = vec2(0.);
    r.x = fbm(st + 1.0 * q + vec2(1.7,9.2) + 0.15 * t);
    r.y = fbm(st + 1.0 * q + vec2(8.3,2.8) + 0.126 * t);
    
    float f = fbm(st + r);
    
    // Color Palette
    vec3 colorWhite = vec3(0.9, 0.93, 0.93); // Slightly darker grey
    vec3 colorLightGrey = vec3(0.8, 0.85, 0.85); // Distinct grey
    vec3 colorTurquoise = vec3(0.0, 0.66, 0.59); // #00A896
    vec3 colorDarkTeal = vec3(0.0, 0.44, 0.39); // #007064
    
    // Base is light grey
    vec3 color = mix(colorWhite, colorLightGrey, clamp((f * f) * 4.0, 0.0, 1.0));
    
    // Add strong turquoise blobs where f is higher
    color = mix(color, colorTurquoise, clamp(length(q) * 0.4, 0.0, 1.0));
    
    // Add slightly darker teal accents in the deepest parts
    color = mix(color, colorDarkTeal, clamp(length(r.x) * 0.3, 0.0, 1.0));
    
    // Remove extreme brightness boost so colors show up
    // color = color + vec3(0.1); 
    
    // Prevent blowout
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
}
`;

const ShaderPlane = () => {
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
    <mesh>
      {/* Plane of size 2x2 perfectly fits the OrthographicCamera with bounds -1 to 1 */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export function ShaderBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas 
        orthographic 
        camera={{ position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1 }}
      >
        <ShaderPlane />
      </Canvas>
      {/* Fade the top and bottom to seamlessly integrate with the site */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white/90 pointer-events-none opacity-50" />
    </div>
  );
}
