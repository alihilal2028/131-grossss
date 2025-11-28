import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Simplified luxury villa - optimized for performance
const LuxuryVilla = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Main building base */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.8, 1, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Upper floor */}
      <mesh position={[0.15, 1.2, 0]}>
        <boxGeometry args={[2, 0.6, 1.3]} />
        <meshStandardMaterial color="#151515" metalness={0.4} roughness={0.7} />
      </mesh>

      {/* Roof */}
      <mesh position={[0.15, 1.55, 0]}>
        <boxGeometry args={[2.2, 0.05, 1.5]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Windows - main floor */}
      <mesh position={[0, 0.5, 0.61]}>
        <planeGeometry args={[1.2, 0.6]} />
        <meshStandardMaterial 
          color="#c9a227" 
          emissive="#c9a227"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Windows - upper floor */}
      <mesh position={[0.15, 1.2, 0.66]}>
        <planeGeometry args={[1.5, 0.4]} />
        <meshStandardMaterial 
          color="#d4b84a" 
          emissive="#c9a227"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Gold accent column */}
      <mesh position={[-0.95, 0.5, 0.55]}>
        <boxGeometry args={[0.06, 1, 0.06]} />
        <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Interior glow lights */}
      <pointLight position={[0, 0.5, 0.3]} intensity={1.5} color="#c9a227" distance={2} decay={2} />
      <pointLight position={[0.15, 1.2, 0.3]} intensity={1} color="#d4b84a" distance={1.5} decay={2} />
    </group>
  );
};

// Minimal particles - reduced count for performance
const MinimalParticles = () => {
  const count = 30; // Reduced from 100
  const meshRef = useRef();
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = Math.random() * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#c9a227"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

// Optimized scene
const Scene = () => {
  return (
    <>
      <fog attach="fog" args={['#050505', 5, 18]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffeedd" />
      <directionalLight position={[-3, 3, -3]} intensity={0.2} color="#aaccff" />
      
      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.1}>
        <LuxuryVilla />
      </Float>
      
      <MinimalParticles />
      <Environment preset="night" />
    </>
  );
};

const Hero3DOptimized = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 40 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'default', // Changed from high-performance
          stencil: false,
          depth: true
        }}
        dpr={[1, 1.5]} // Reduced from [1, 2]
        frameloop="demand" // Only render when needed
        performance={{ min: 0.5 }}
      >
        <Scene />
      </Canvas>
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-transparent to-charcoal pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 via-transparent to-charcoal/30 pointer-events-none" />
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.5) 100%)'
      }} />
    </div>
  );
};

export default Hero3DOptimized;
