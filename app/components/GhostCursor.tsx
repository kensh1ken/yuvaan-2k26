"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function GhostEntity() {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const active = useRef(false);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const hero = document.getElementById("hero");
      if (!hero) {
        active.current = false;
        return;
      }

      const rect = hero.getBoundingClientRect();
      const insideX = event.clientX >= rect.left && event.clientX <= rect.right;
      const insideY = event.clientY >= rect.top && event.clientY <= rect.bottom;

      if (!insideX || !insideY) {
        active.current = false;
        return;
      }

      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      target.current.set(nx * 2.2, ny * 1.4, 0);
      active.current = true;
    };

    const onLeave = () => {
      active.current = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const bob = Math.sin(time * 2.2) * 0.06;
    const sway = Math.sin(time * 1.6) * 0.08;
    const idle = new THREE.Vector3(0, 0.25, 0);
    const destination = active.current ? target.current : idle;

    groupRef.current.position.lerp(destination, 0.12);
    groupRef.current.position.y += bob;
    groupRef.current.rotation.z = sway * 0.24;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.35}>
      <group ref={groupRef}>
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color="#e8f2ff" transparent opacity={0.9} emissive="#dbe7ff" />
        </mesh>
        <mesh position={[0, -0.12, 0]} scale={[1, 1.35, 1]}>
          <coneGeometry args={[0.23, 0.52, 32]} />
          <meshStandardMaterial color="#d3def8" transparent opacity={0.74} emissive="#94a7d6" />
        </mesh>
        <mesh position={[-0.06, 0.18, 0.16]}>
          <sphereGeometry args={[0.028, 16, 16]} />
          <meshStandardMaterial color="#0b0d12" emissive="#000000" />
        </mesh>
        <mesh position={[0.06, 0.18, 0.16]}>
          <sphereGeometry args={[0.028, 16, 16]} />
          <meshStandardMaterial color="#0b0d12" emissive="#000000" />
        </mesh>
      </group>
    </Float>
  );
}

export default function GhostCursor() {
  const [isWebGLAvailable, setIsWebGLAvailable] = useState<boolean | null>(null);
  const [isDesktopViewport, setIsDesktopViewport] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 961px) and (hover: hover) and (pointer: fine)",
    );

    const updateViewport = () => {
      setIsDesktopViewport(mediaQuery.matches);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");

      setIsWebGLAvailable(Boolean(context));
    } catch {
      setIsWebGLAvailable(false);
    }
  }, []);

  if (isDesktopViewport !== true || isWebGLAvailable !== true) {
    return <div aria-hidden="true" style={{ width: "100%", height: "100%" }} />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.8]}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 1.8, 2]} intensity={1.4} color="#a7bbff" />
      <pointLight position={[-1.4, -0.5, 1.3]} intensity={0.65} color="#7087c2" />
      <GhostEntity />
    </Canvas>
  );
}
