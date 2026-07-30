import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

// Combined Premium 3D centerpiece: Glowing open book with a learning dashboard tablet/laptop screen
function LearningCenterpiece() {
  const modelRef = useRef();

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (modelRef.current) {
      // Gentle rotation to show off 3D angles
      modelRef.current.rotation.y = Math.sin(elapsed * 0.15) * 0.25;
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.4, 0]}>
      
      {/* 1. Large Open Book Base */}
      <group position={[0, -0.6, 0]} rotation={[0.1, 0, 0]}>
        {/* Book Cover (Navy Blue) */}
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[3.4, 0.1, 2.4]} />
          <meshStandardMaterial color="#0F172A" roughness={0.4} metalness={0.2} />
        </mesh>
        
        {/* Left Page (Slanted up slightly) */}
        <mesh position={[-0.8, 0.04, 0]} rotation={[0, 0, 0.08]}>
          <boxGeometry args={[1.55, 0.08, 2.2]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
        </mesh>
        
        {/* Right Page (Slanted up slightly) */}
        <mesh position={[0.8, 0.04, 0]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[1.55, 0.08, 2.2]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
        </mesh>

        {/* Golden bookmark ribbon hanging out */}
        <mesh position={[0, 0.05, 1.15]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.2, 0.02, 0.4]} />
          <meshStandardMaterial color="#F59E0B" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>

      {/* 2. Modern Tablet/Laptop Learning Dashboard Screen */}
      <group position={[0, 0.4, -0.2]} rotation={[-0.05, 0, 0]}>
        {/* Device Shell (Premium Space Gray) */}
        <mesh>
          <boxGeometry args={[2.5, 1.6, 0.1]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Inner Bezel (Black) */}
        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[2.4, 1.5]} />
          <meshStandardMaterial color="#090D16" roughness={0.5} />
        </mesh>

        {/* Glowing Screen Face with Learning Dashboard graphic lines */}
        <group position={[0, 0, 0.053]}>
          {/* Main screen background (Glow Cyan/Blue) */}
          <mesh>
            <planeGeometry args={[2.3, 1.4]} />
            <meshBasicMaterial color="#0284C7" toneMapped={false} />
          </mesh>

          {/* Simulated dashboard items (3D boxes/planes to represent stats & charts) */}
          {/* Header bar */}
          <mesh position={[0, 0.55, 0.001]}>
            <planeGeometry args={[2.1, 0.15]} />
            <meshBasicMaterial color="#38BDF8" />
          </mesh>

          {/* Left panel (list menu) */}
          <mesh position={[-0.75, -0.1, 0.001]}>
            <planeGeometry args={[0.6, 0.95]} />
            <meshBasicMaterial color="#0369A1" />
          </mesh>

          {/* Center Chart (Bar 1) */}
          <mesh position={[-0.1, -0.2, 0.002]}>
            <planeGeometry args={[0.15, 0.5]} />
            <meshBasicMaterial color="#38BDF8" />
          </mesh>
          
          {/* Center Chart (Bar 2) */}
          <mesh position={[0.15, -0.05, 0.002]}>
            <planeGeometry args={[0.15, 0.8]} />
            <meshBasicMaterial color="#F59E0B" />
          </mesh>

          {/* Center Chart (Bar 3) */}
          <mesh position={[0.4, -0.25, 0.002]}>
            <planeGeometry args={[0.15, 0.4]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
        </group>
      </group>

    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 50 }}
        frameloop="demand"
        dpr={[1, 1.5]}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 8, 4]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-3, -3, 2]} intensity={1.0} color="#2563EB" />
        <pointLight position={[3, 3, 2]} intensity={1.2} color="#38BDF8" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
          <LearningCenterpiece />
        </Float>
        
        <Stars radius={80} depth={40} count={150} factor={3} saturation={0.5} fade speed={1} />
        
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
        
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
