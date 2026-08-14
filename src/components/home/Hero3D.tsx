"use client";

import { Float, Line, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * The hero's signature element: a glowing core with eight nodes orbiting
 * it, tied by lines. This isn't a decorative particle sphere — it's a
 * literal diagram of Callie X Group's structure: one company (the core,
 * born 2019 as a crypto trading desk) that eight product lines (Dolla,
 * Bitshop, Jetpay, Billpoint, B Cars, B Homes, Blunt, Famous) now orbit.
 * It resolves visually into the Products grid the moment the hero
 * scrolls out of view.
 *
 * Each orbit is two nested <group>s rather than per-frame position math:
 * an outer group sets a fixed inclination + angular offset (so the 8
 * orbits sit on different planes, armillary-sphere style), an inner
 * group spins continuously around its local Y axis. The line and node
 * are static children of the inner group, so Three.js's own transform
 * hierarchy does the orbiting — nothing needs its geometry rewritten
 * every frame, which keeps this cheap on low-end phones.
 */

const NODE_COUNT = 8;

function Core() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.08;
      wireRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#0033ff"
          emissive="#0033ff"
          emissiveIntensity={1.4}
          roughness={0.25}
          metalness={0.4}
        />
      </mesh>
      <mesh ref={wireRef} scale={1.35}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#8fa8ff" wireframe transparent opacity={0.25} />
      </mesh>
      <pointLight color="#3d6bff" intensity={12} distance={6} />
    </group>
  );
}

interface OrbitDef {
  radius: number;
  speed: number;
  phase: number;
  tilt: number;
  size: number;
  angleOffset: number;
}

function Orbit({ def }: { def: OrbitDef }) {
  const spinRef = useRef<THREE.Group>(null);
  const linePoints = useMemo<[THREE.Vector3, THREE.Vector3]>(
    () => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(def.radius, 0, 0)],
    [def.radius]
  );

  useFrame((_, delta) => {
    if (spinRef.current) spinRef.current.rotation.y += delta * def.speed;
  });

  return (
    <group rotation={[def.tilt, 0, def.angleOffset]}>
      <group ref={spinRef} rotation={[0, def.phase, 0]}>
        <Line points={linePoints} color="#3d6bff" transparent opacity={0.35} lineWidth={1} />
        <mesh position={[def.radius, 0, 0]}>
          <sphereGeometry args={[def.size, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#3d6bff" emissiveIntensity={1.6} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

function Constellation() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const orbits = useMemo<OrbitDef[]>(
    () =>
      Array.from({ length: NODE_COUNT }, (_, i) => ({
        radius: 2.1 + (i % 4) * 0.55,
        speed: 0.16 + (i % 3) * 0.06,
        phase: (i / NODE_COUNT) * Math.PI * 2,
        tilt: 0.35 + (i % 5) * 0.22,
        size: 0.09 + (i % 3) * 0.03,
        angleOffset: (i / NODE_COUNT) * Math.PI * 2,
      })),
    []
  );

  // Gentle parallax toward the pointer — reads normalized pointer each
  // frame rather than a mousemove listener, so it costs nothing when idle.
  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    const targetX = (pointer.y * Math.PI) / 22;
    const targetY = (pointer.x * Math.PI) / 16;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.04);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.04);
  });

  const scale = Math.min(1, viewport.width / 9);

  return (
    <group ref={groupRef} scale={scale}>
      <Float speed={1.1} floatIntensity={0.5} rotationIntensity={0.15}>
        <Core />
      </Float>
      {orbits.map((def, i) => (
        <Orbit key={i} def={def} />
      ))}
      <Sparkles count={90} scale={7} size={1.6} speed={0.25} color="#8fa8ff" opacity={0.5} />
    </group>
  );
}

class CanvasErrorBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return <HeroFallback />;
    return this.props.children;
  }
}

function HeroFallback() {
  return (
    <div
      className="h-full w-full"
      style={{
        background: "radial-gradient(circle at 50% 45%, rgba(61,107,255,0.55), rgba(5,6,15,0) 60%)",
      }}
    />
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <CanvasErrorBoundary>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.4, 8.5], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          fallback={<HeroFallback />}
        >
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 4, 4]} intensity={0.6} color="#8fa8ff" />
          <Suspense fallback={null}>
            <Constellation />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
