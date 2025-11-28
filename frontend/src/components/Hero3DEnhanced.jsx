import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Cinematic camera controller with smooth movement
const CameraController = () => {
  const { camera } = useThree();
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    // Smooth camera follow with easing
    targetX.current += (mouseX.current - targetX.current) * 0.02;
    targetY.current += (mouseY.current - targetY.current) * 0.02;

    // Subtle camera movement based on mouse position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX.current * 0.5, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1 + targetY.current * 0.3, 0.05);
    
    // Slow orbit around scene
    const time = state.clock.elapsedTime * 0.1;
    camera.position.x += Math.sin(time) * 0.3;
    camera.position.z = 6 + Math.cos(time) * 0.5;
    
    camera.lookAt(0, 0.5, 0);
  });

  return null;
};

// Luxury villa 3D model - more detailed
const LuxuryVilla = () => {
  const groupRef = useRef();
  const glassRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
    if (glassRef.current) {
      // Glass shimmer effect
      glassRef.current.material.thickness = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Ground plane with subtle reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.9} 
          roughness={0.3}
        />
      </mesh>

      {/* Main building base */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1.2, 1.5]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.3} 
          roughness={0.8}
        />
      </mesh>

      {/* Upper floor - cantilevered */}
      <mesh position={[0.2, 1.5, 0]} castShadow>
        <boxGeometry args={[2.2, 0.8, 1.6]} />
        <meshStandardMaterial 
          color="#151515" 
          metalness={0.4} 
          roughness={0.7}
        />
      </mesh>

      {/* Roof overhang */}
      <mesh position={[0.2, 2, 0]}>
        <boxGeometry args={[2.5, 0.08, 1.9]} />
        <meshStandardMaterial 
          color="#0d0d0d" 
          metalness={0.5} 
          roughness={0.5}
        />
      </mesh>

      {/* Glass facade - main floor */}
      <mesh ref={glassRef} position={[0, 0.6, 0.76]}>
        <boxGeometry args={[1.6, 0.9, 0.02]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          iridescence={0.3}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#c9a227"
          transmission={0.95}
        />
      </mesh>

      {/* Glass facade - upper floor */}
      <mesh position={[0.2, 1.5, 0.81]}>
        <boxGeometry args={[1.8, 0.6, 0.02]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.3}
          chromaticAberration={0.02}
          color="#d4b84a"
          transmission={0.9}
        />
      </mesh>

      {/* Interior light glow - main floor */}
      <pointLight position={[0, 0.6, 0.3]} intensity={2} color="#c9a227" distance={3} decay={2} />
      
      {/* Interior light glow - upper floor */}
      <pointLight position={[0.2, 1.5, 0.3]} intensity={1.5} color="#d4b84a" distance={2.5} decay={2} />

      {/* Balcony */}
      <mesh position={[1.2, 1.1, 0.4]}>
        <boxGeometry args={[0.6, 0.05, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Balcony glass rail */}
      <mesh position={[1.2, 1.25, 0.75]}>
        <boxGeometry args={[0.55, 0.25, 0.02]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.2} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Column accent */}
      <mesh position={[-1.05, 0.6, 0.7]}>
        <boxGeometry args={[0.08, 1.2, 0.08]} />
        <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Pool/water feature */}
      <mesh position={[0, 0.02, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 0.8]} />
        <meshStandardMaterial color="#1a3a4a" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  );
};

// Atmospheric particles
const AtmosphericParticles = () => {
  const count = 100;
  const mesh = useRef();
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = Math.random() * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = Math.random() * 0.005 + 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    const posAttr = mesh.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      posAttr.array[i * 3] += velocities[i * 3];
      posAttr.array[i * 3 + 1] += velocities[i * 3 + 1];
      posAttr.array[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Reset particles that go too high
      if (posAttr.array[i * 3 + 1] > 8) {
        posAttr.array[i * 3 + 1] = 0;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#c9a227"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Volumetric light beams
const LightBeams = () => {
  const beamRef = useRef();

  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.material.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
    }
  });

  return (
    <mesh ref={beamRef} position={[2, 3, -2]} rotation={[0, 0, Math.PI / 6]}>
      <cylinderGeometry args={[0.1, 2, 8, 16, 1, true]} />
      <meshBasicMaterial
        color="#c9a227"
        transparent
        opacity={0.03}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// Main scene
const Scene = () => {
  return (
    <>
      {/* Fog for depth */}
      <fog attach="fog" args={['#050505', 4, 25]} />
      
      {/* Ambient light */}
      <ambientLight intensity={0.15} />
      
      {/* Key light - warm */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        color="#ffeedd"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Fill light - cool */}
      <directionalLight position={[-5, 3, -5]} intensity={0.2} color="#aaccff" />
      
      {/* Rim light */}
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#c9a227" />
      
      {/* Camera controller */}
      <CameraController />
      
      {/* Main villa */}
      <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.05}>
        <LuxuryVilla />
      </Float>
      
      {/* Atmospheric effects */}
      <AtmosphericParticles />
      <LightBeams />
      
      {/* Environment */}
      <Environment preset="night" />
    </>
  );
};

const Hero3DEnhanced = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        shadows
        camera={{ position: [0, 1, 6], fov: 40 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
      
      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-charcoal/40 pointer-events-none" />
      
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)'
      }} />
    </div>
  );
};

export default Hero3DEnhanced;
