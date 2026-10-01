"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import CameraRig from "@/components/three/CameraRig";

function useCodeTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#0D1321";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fake title bar
    ctx.fillStyle = "#1B2430";
    ctx.fillRect(0, 0, canvas.width, 24);
    ctx.fillStyle = "#E8A33D";
    ctx.beginPath();
    ctx.arc(16, 12, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#10B981";
    ctx.beginPath();
    ctx.arc(34, 12, 5, 0, Math.PI * 2);
    ctx.fill();

    // Fake code lines
    const colors = ["#10B981", "#94A3B8", "#F8FAFC", "#E8A33D", "#3C7A6A"];
    let y = 50;
    const lineHeight = 20;
    const indents = [20, 40, 60, 40, 20, 40, 60, 80, 60, 40, 20];

    for (let i = 0; i < indents.length; i++) {
      const x = indents[i];
      const width = 60 + Math.random() * 180;
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.globalAlpha = 0.85;
      ctx.fillRect(x, y, width, 10);
      y += lineHeight;
    }
    ctx.globalAlpha = 1;

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function CodeScreen() {
  const texture = useCodeTexture();
  return (
    <meshStandardMaterial map={texture} emissive="#10B981" emissiveIntensity={0.15} roughness={0.3} />
  );
}

function Desk() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetY = state.pointer.x * 0.3;
    const targetX = -state.pointer.y * 0.15;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
  });

  return (
    <group ref={groupRef} position={[1.1, -0.3, 0]} rotation={[0.1, -0.3, 0]}>
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <boxGeometry args={[4, 0.15, 2.2]} />
        <meshStandardMaterial color="#1B2430" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Laptop base */}
      <mesh position={[-0.8, -0.5, 0.2]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[1.1, 0.06, 0.75]} />
        <meshStandardMaterial color="#2A3444" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Laptop screen — code editor look */}
      <group position={[-0.8, -0.17, -0.17]} rotation={[-0.35, 0.15, 0]}>
        <mesh>
          <boxGeometry args={[1.1, 0.7, 0.04]} />
          <meshStandardMaterial color="#0D1321" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.95, 0.55]} />
          <CodeScreen />
        </mesh>
      </group>

      {/* Monitor stand */}
      <mesh position={[0.9, -0.45, -0.3]}>
        <cylinderGeometry args={[0.05, 0.08, 0.3, 16]} />
        <meshStandardMaterial color="#2A3444" roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Monitor screen — plain glow */}
      <group position={[0.9, -0.05, -0.3]}>
        <mesh>
          <boxGeometry args={[1.3, 0.8, 0.05]} />
          <meshStandardMaterial color="#0D1321" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.15, 0.65]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.45} roughness={0.3} />
        </mesh>
      </group>

      <mesh position={[1.7, -0.45, 0.5]}>
        <cylinderGeometry args={[0.12, 0.1, 0.22, 24]} />
        <meshStandardMaterial color="#E8A33D" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[1.82, -0.45, 0.5]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.06, 0.015, 8, 16]} />
        <meshStandardMaterial color="#E8A33D" roughness={0.4} metalness={0.1} />
      </mesh>

      <mesh position={[-1.7, -0.47, 0.5]}>
        <cylinderGeometry args={[0.14, 0.11, 0.18, 16]} />
        <meshStandardMaterial color="#2A3444" roughness={0.6} />
      </mesh>
      <mesh position={[-1.7, -0.3, 0.5]}>
        <icosahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#3C7A6A" roughness={0.7} flatShading />
      </mesh>
    </group>
  );
}

import { useEffect, useState } from "react";

function useShouldRender3D() {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const isSmallScreen = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShouldRender(!isSmallScreen && !prefersReducedMotion);
  }, []);

  return shouldRender;
}

export default function Scene() {
  const shouldRender = useShouldRender3D();

  if (!shouldRender) return null;

  return (
    <Canvas camera={{ position: [0, 0.6, 5], fov: 40 }}>
      <CameraRig />
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 3]} intensity={1.1} color="#F8FAFC" />
      <directionalLight position={[-3, -1, -2]} intensity={0.5} color="#E8A33D" />
      <Desk />
      <ContactShadows position={[0, -0.95, 0]} opacity={0.35} scale={6} blur={2.5} far={2} />
    </Canvas>
  );
}