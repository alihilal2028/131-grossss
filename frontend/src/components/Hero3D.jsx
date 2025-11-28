import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Minimal architectural building shape
const Building = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Main building body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.2, 1.5, 1]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.3} 
          roughness={0.7}
        />
      </mesh>
      
      {/* Upper floor */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.4, 0.8, 1.2]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.4} 
          roughness={0.6}
        />
      </mesh>
      
      {/* Windows - glowing gold */}
      <mesh position={[0.35, 0.5, 0.51]}>
        <planeGeometry args={[0.3, 0.4]} />
        <meshStandardMaterial 
          color="#c9a227" 
          emissive="#c9a227"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[-0.35, 0.5, 0.51]}>
        <planeGeometry args={[0.3, 0.4]} />
        <meshStandardMaterial 
          color="#c9a227" 
          emissive="#c9a227"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0, 1.5, 0.61]}>
        <planeGeometry args={[0.8, 0.5]} />
        <meshStandardMaterial 
          color="#c9a227" 
          emissive="#c9a227"
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Roof accent */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[1.5, 0.1, 1.3]} />
        <meshStandardMaterial 
          color="#8b7355" 
          metalness={0.6} 
          roughness={0.4}
        />
      </mesh>
    </group>
  );
};

// Floating particles
const Particles = () => {
  const count = 50;
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#c9a227"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Scene with slow camera rotation
const Scene = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });
  
  return (
    <>
      <fog attach="fog" args={['#0a0a0a', 5, 20]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={0.3} color="#c9a227" />
      
      <group ref={groupRef}>
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
          <Building position={[0, -0.5, 0]} />
        </Float>
      </group>
      
      <Particles />
      <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />
      <Environment preset="night" />
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-transparent to-charcoal pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 via-transparent to-charcoal/30 pointer-events-none" />
    </div>
  );
};

export default Hero3D;
