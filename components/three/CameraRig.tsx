"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const scrollState = { progress: 0 };

if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.progress = docHeight > 0 ? scrollTop / docHeight : 0;
  });
}

const cameraPath = [
  { position: new THREE.Vector3(0, 0.6, 5), lookAt: new THREE.Vector3(0, 0, 0) },
  { position: new THREE.Vector3(1.5, 0.3, 3), lookAt: new THREE.Vector3(1.1, -0.2, 0) },
  { position: new THREE.Vector3(-0.6, -0.1, 1.8), lookAt: new THREE.Vector3(-0.8, -0.17, -0.17) },
  { position: new THREE.Vector3(0, 1.5, 6), lookAt: new THREE.Vector3(0, -0.5, 0) },
];

export default function CameraRig() {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const p = scrollState.progress * (cameraPath.length - 1);
    const index = Math.min(Math.floor(p), cameraPath.length - 2);
    const t = p - index;

    const from = cameraPath[index];
    const to = cameraPath[index + 1];

    const targetPos = new THREE.Vector3().lerpVectors(from.position, to.position, t);
    const targetLookAt = new THREE.Vector3().lerpVectors(from.lookAt, to.lookAt, t);

    camera.position.lerp(targetPos, 0.08);
    currentLookAt.current.lerp(targetLookAt, 0.08);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}