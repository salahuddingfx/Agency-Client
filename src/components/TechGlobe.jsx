import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Color map per category ──────────────────────────────────────── */
const CATEGORY_COLORS = {
  Frontend:      '#18B7F5',
  Backend:       '#34d399',
  Database:      '#f59e0b',
  Design:        '#e879f9',
  Infrastructure:'#fb923c',
  Tools:         '#94a3b8',
};

/* ─── Single tech node ────────────────────────────────────────────── */
function TechNode({ tech, index, total, radius, speed, ringIndex }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  const color = CATEGORY_COLORS[tech.category] || '#18B7F5';
  const angle = (index / total) * Math.PI * 2;
  const yOffset = (ringIndex - 1) * 1.8;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = Math.cos(angle + t) * radius;
    ref.current.position.z = Math.sin(angle + t) * radius;
    ref.current.position.y = yOffset + Math.sin(t * 0.5 + index) * 0.3;
  });

  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        {/* Glow sphere */}
        <Sphere
          args={[hovered ? 0.32 : 0.22, 24, 24]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.2 : 0.6}
            transparent
            opacity={hovered ? 1 : 0.85}
          />
        </Sphere>

        {/* Outer glow ring */}
        <Sphere args={[hovered ? 0.4 : 0.3, 16, 16]}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={hovered ? 0.15 : 0.08}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Tech name label */}
        <Text
          position={[0, 0.45, 0]}
          fontSize={0.18}
          color={hovered ? '#ffffff' : '#cbd5e1'}
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v18/UcCo3FwrK3iLTcviYwY.woff2"
          outlineWidth={0.015}
          outlineColor="#000000"
        >
          {tech.name}
        </Text>
      </Float>
    </group>
  );
}

/* ─── Central core sphere ─────────────────────────────────────────── */
function CoreSphere() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.2;
  });

  return (
    <group ref={ref}>
      <Sphere args={[1.2, 64, 64]}>
        <meshStandardMaterial
          color="#0f172a"
          emissive="#18B7F5"
          emissiveIntensity={0.15}
          transparent
          opacity={0.4}
          wireframe
        />
      </Sphere>
      <Sphere args={[1.22, 32, 32]}>
        <meshStandardMaterial
          color="#18B7F5"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

/* ─── Orbit ring lines ────────────────────────────────────────────── */
function OrbitRing({ radius, color, yOffset = 0 }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius, yOffset]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.12} />
    </line>
  );
}

/* ─── Floating particles background ───────────────────────────────── */
function Particles({ count = 200 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    // Seeded pseudo-random for stable layout
    let seed = 42;
    const rand = () => { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; };
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * 30;
      pos[i * 3 + 1] = (rand() - 0.5) * 20;
      pos[i * 3 + 2] = (rand() - 0.5) * 30;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#18B7F5" size={0.04} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

/* ─── Scene setup ─────────────────────────────────────────────────── */
function Scene({ technologies }) {
  const categorized = useMemo(() => {
    const cats = {};
    technologies.forEach(tech => {
      if (!cats[tech.category]) cats[tech.category] = [];
      cats[tech.category].push(tech);
    });
    return cats;
  }, [technologies]);

  const rings = Object.keys(categorized);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#18B7F5" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#7C3AED" />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#34d399" />

      <CoreSphere />
      <Particles />

      {rings.map((cat, ringIdx) => {
        const techs = categorized[cat];
        const radius = 3 + ringIdx * 1.6;
        const speed = 0.12 - ringIdx * 0.015;
        const color = CATEGORY_COLORS[cat] || '#18B7F5';

        return (
          <group key={cat}>
            <OrbitRing radius={radius} color={color} yOffset={(ringIdx - 1) * 1.8} />
            {techs.map((tech, i) => (
              <TechNode
                key={tech.name}
                tech={tech}
                index={i}
                total={techs.length}
                radius={radius}
                speed={speed}
                ringIndex={ringIdx}
              />
            ))}
          </group>
        );
      })}

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={18}
        autoRotate
        autoRotateSpeed={0.4}
        dampingFactor={0.05}
        enableDamping
      />
    </>
  );
}

/* ─── Exported wrapper ────────────────────────────────────────────── */
export default function TechGlobe({ technologies }) {
  return (
    <div className="w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden border border-slate-800/50 bg-[#020617]">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene technologies={technologies} />
      </Canvas>
    </div>
  );
}
