import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

/* ─── Color map per category ──────────────────────────────────────── */
const CATEGORY_COLORS = {
  Frontend:      '#18B7F5',
  Backend:       '#34d399',
  Database:      '#f59e0b',
  Design:        '#e879f9',
  Infrastructure:'#fb923c',
  Tools:         '#94a3b8',
};

/* ─── Custom Vector Tech Icons ────────────────────────────────────── */
export function TechIcon({ name }) {
  switch (name) {
    case 'React':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5 animate-spin-slow">
          <ellipse cx="50" cy="50" rx="8" ry="22" fill="none" stroke="#61dafb" strokeWidth="5.5" transform="rotate(30 50 50)" />
          <ellipse cx="50" cy="50" rx="8" ry="22" fill="none" stroke="#61dafb" strokeWidth="5.5" transform="rotate(90 50 50)" />
          <ellipse cx="50" cy="50" rx="8" ry="22" fill="none" stroke="#61dafb" strokeWidth="5.5" transform="rotate(150 50 50)" />
          <circle cx="50" cy="50" r="5" fill="#61dafb" />
        </svg>
      );
    case 'Node.js':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M50 15 L80 32 L80 68 L50 85 L20 68 L20 32 Z" fill="none" stroke="#68a063" strokeWidth="7" />
          <path d="M50 35 L70 47 L70 70 L50 82 L30 70 L30 47 Z" fill="none" stroke="#3c873a" strokeWidth="4" />
          <circle cx="50" cy="58" r="5.5" fill="#68a063" />
        </svg>
      );
    case 'HTML5':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M20 15 L80 15 L73 80 L50 88 L27 80 Z" fill="#e34f26" />
          <path d="M50 15 L80 15 L73 80 L50 88 Z" fill="#ef652a" />
          <path d="M50 30 L36 30 L37 45 L50 45 L50 57 L39 57 L40 70 L50 74 L50 82 L32 75 L30 20 L50 20 Z" fill="#ffffff" />
          <path d="M50 20 L68 20 L66 40 L50 40 L50 48 L65 48 L63 68 L50 74 Z" fill="#ebebeb" />
        </svg>
      );
    case 'CSS3':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M20 15 L80 15 L73 80 L50 88 L27 80 Z" fill="#1572b6" />
          <path d="M50 15 L80 15 L73 80 L50 88 Z" fill="#33a9dc" />
          <path d="M50 30 L36 30 L37 45 L50 45 L50 57 L39 57 L40 70 L50 74 L50 82 L32 75 L30 20 L50 20 Z" fill="#ffffff" />
          <path d="M50 20 L68 20 L66 40 L50 40 L50 48 L65 48 L63 68 L50 74 Z" fill="#ebebeb" />
        </svg>
      );
    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M50 30 C58 20, 75 20, 85 30 C90 35, 90 45, 80 55 C70 65, 50 80, 50 80 C50 80, 30 65, 20 55 C10 45, 10 35, 15 30 C25 20, 42 20, 50 30 Z" fill="none" stroke="#38bdf8" strokeWidth="6" />
          <path d="M35 45 C40 38, 52 38, 60 45 C65 50, 60 58, 50 65 C40 58, 35 50, 35 45 Z" fill="#38bdf8" />
        </svg>
      );
    case 'JavaScript':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <rect width="90" height="90" x="5" y="5" rx="8" fill="#f7df1e" />
          <path d="M60 40 L60 65 C60 72, 53 75, 45 75 C38 75, 35 70, 35 65 L44 65 C44 67, 45 68, 47 68 C49 68, 51 67, 51 63 L51 40 Z" fill="#000000" />
          <path d="M72 48 C75 48, 79 50, 79 55 L70 55 C70 53, 71 52, 73 52 C75 52, 76 53, 76 55 C76 58, 72 59, 70 61 L70 65 L80 65 L80 61 C80 58, 83 56, 80 51 C77 48, 73 48, 72 48 Z" fill="#000000" />
        </svg>
      );
    case 'WordPress':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <circle cx="50" cy="50" r="45" fill="#21759b" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff" strokeWidth="4.5" />
          <path d="M32 30 L45 70 L53 48 L61 70 L74 30 L68 30 L59 60 L51 38 L43 60 L36 30 Z" fill="#ffffff" />
        </svg>
      );
    case 'PHP':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <ellipse cx="50" cy="50" rx="45" ry="25" fill="#777bb4" />
          <path d="M30 40 L30 65 M30 40 C35 40, 42 42, 42 48 C42 54, 35 56, 30 56 M52 40 L52 65 M48 53 L58 53 M75 40 L75 65 M75 40 C80 40, 87 42, 87 48 C87 54, 80 56, 75 56" fill="none" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" />
        </svg>
      );
    case 'Laravel':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M30 20 L70 20 L80 35 L80 75 L60 85 L20 75 L20 35 Z" fill="none" stroke="#ff2d20" strokeWidth="7" />
          <path d="M40 38 L60 38 L65 48 L65 68 L50 75 L35 68 L35 48 Z" fill="none" stroke="#ff2d20" strokeWidth="4" />
          <circle cx="50" cy="55" r="4.5" fill="#ff2d20" />
        </svg>
      );
    case 'Python':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M50 10 C32 10, 30 22, 30 28 L30 38 L50 38 L50 42 L25 42 C18 42, 10 45, 10 60 C10 75, 20 85, 35 85 L42 85 L42 75 C42 63, 50 60, 58 60 L70 60 C80 60, 90 50, 90 35 C90 20, 80 10, 50 10 Z" fill="#3572a5" />
          <path d="M50 90 C68 90, 70 78, 70 72 L70 62 L50 62 L50 58 L75 58 C82 58, 90 55, 90 40 C90 25, 80 15, 65 15 L58 15 L58 25 C58 37, 50 40, 42 40 L30 40 C20 40, 10 50, 10 65 C10 80, 20 90, 50 90 Z" fill="#f7ca3e" />
          <circle cx="40" cy="22" r="3.5" fill="#ffffff" />
          <circle cx="60" cy="78" r="3.5" fill="#000000" />
        </svg>
      );
    case 'Django':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <rect width="90" height="90" x="5" y="5" rx="8" fill="#092e20" />
          <path d="M60 22 L60 75 M60 48 C50 48 38 52 38 61 C38 70 50 75 60 75" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );
    case 'Prisma':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M50 12 L88 78 L12 78 Z" fill="none" stroke="#2d3748" strokeWidth="7" />
          <path d="M50 25 L75 70 L25 70 Z" fill="#2d3748" />
        </svg>
      );
    case 'MySQL':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M20 30 C20 20, 80 20, 80 30 L80 70 C80 80, 20 80, 20 70 Z" fill="none" stroke="#00758f" strokeWidth="7" />
          <path d="M20 50 C20 45, 80 45, 80 50 M20 65 C20 60, 80 60, 80 65" fill="none" stroke="#f29111" strokeWidth="3.5" />
          <path d="M45 15 C55 10, 65 20, 70 30" fill="none" stroke="#00758f" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );
    case 'PostgreSQL':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M50 15 C20 15, 15 45, 35 65 C40 70, 48 75, 50 85 C52 75, 60 70, 65 65 C85 45, 80 15, 50 15 Z" fill="#336791" />
          <path d="M42 35 C42 35, 45 28, 55 28 C65 28, 68 35, 68 35" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="38" cy="45" r="4.5" fill="#ffffff" />
          <circle cx="62" cy="45" r="4.5" fill="#ffffff" />
        </svg>
      );
    case 'Figma':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M35 25 C35 15, 45 10, 50 10 L50 30 L35 30 Z" fill="#f24e1e" />
          <path d="M50 10 C55 10, 65 15, 65 25 L65 30 L50 30 Z" fill="#ff7262" />
          <path d="M35 45 C35 35, 45 30, 50 30 L50 50 L35 50 Z" fill="#a259ff" />
          <circle cx="60" cy="40" r="10" fill="#1abc9c" />
          <path d="M35 65 C35 75, 45 80, 50 80 L50 60 L35 60 Z" fill="#0acf83" />
          <path d="M50 60 C55 60, 65 65, 65 75 C65 85, 55 90, 50 90 Z" fill="#1abc9c" />
        </svg>
      );
    case 'Adobe Illustrator':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <rect width="90" height="90" x="5" y="5" rx="8" fill="#330000" />
          <text x="50" y="62" fontSize="38" fontWeight="bold" fill="#ff9a00" textAnchor="middle" fontFamily="sans-serif">Ai</text>
        </svg>
      );
    case 'Adobe Photoshop':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <rect width="90" height="90" x="5" y="5" rx="8" fill="#001c3d" />
          <text x="50" y="62" fontSize="38" fontWeight="bold" fill="#31a8ff" textAnchor="middle" fontFamily="sans-serif">Ps</text>
        </svg>
      );
    case 'Adobe InDesign':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <rect width="90" height="90" x="5" y="5" rx="8" fill="#2c0017" />
          <text x="50" y="62" fontSize="38" fontWeight="bold" fill="#ff1493" textAnchor="middle" fontFamily="sans-serif">Id</text>
        </svg>
      );
    case 'Docker':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M10 55 C10 40, 20 30, 40 30 C45 30, 50 33, 55 35 C58 30, 65 25, 75 25 C85 25, 90 32, 90 45 C90 60, 75 75, 45 75 C25 75, 10 65, 10 55 Z" fill="#0db7ed" />
          <rect x="25" y="38" width="7" height="7" fill="#ffffff" />
          <rect x="35" y="38" width="7" height="7" fill="#ffffff" />
          <rect x="45" y="38" width="7" height="7" fill="#ffffff" />
          <rect x="30" y="47" width="7" height="7" fill="#ffffff" />
          <rect x="40" y="47" width="7" height="7" fill="#ffffff" />
          <rect x="50" y="47" width="7" height="7" fill="#ffffff" />
        </svg>
      );
    case 'AWS':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M20 70 C40 85, 60 85, 80 70" fill="none" stroke="#ff9900" strokeWidth="6" strokeLinecap="round" />
          <path d="M75 60 L83 72 L68 74 Z" fill="#ff9900" />
          <path d="M35 50 C30 50, 25 45, 25 35 C25 25, 35 20, 50 20 C65 20, 75 25, 75 35 L75 50" fill="none" stroke="#ffffff" strokeWidth="6.5" strokeLinecap="round" />
        </svg>
      );
    case 'Cloudflare':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M20 50 C20 40, 30 35, 40 40 C45 35, 55 30, 65 35 C75 35, 80 42, 80 50 C80 58, 70 65, 45 65 C25 65, 20 58, 20 50 Z" fill="#f38020" />
          <path d="M35 50 L55 38 L45 52 L65 52 L45 62 Z" fill="#ffffff" />
        </svg>
      );
    case 'GitHub':
      return (
        <svg viewBox="0 0 100 100" className="w-5 h-5" fill="#ffffff">
          <path d="M50 10 C27.9 10 10 27.9 10 50 C10 67.7 21.5 82.7 37.4 88 C39.4 88.4 40.1 87.1 40.1 86.1 C40.1 85.1 40.1 82.5 40.1 79.7 C29 82.1 26.6 74.4 26.6 74.4 C24.8 69.8 22.2 68.6 22.2 68.6 C18.6 66.1 22.5 66.2 22.5 66.2 C26.5 66.5 28.6 70.3 28.6 70.3 C32.1 76.4 37.9 74.6 40.2 73.6 C40.6 71.1 41.6 69.4 42.7 68.4 C33.8 67.4 24.5 64 24.5 48.6 C24.5 44.2 26.1 40.6 28.7 37.8 C28.3 36.8 26.9 32.7 29.1 27.2 C29.1 27.2 32.5 26.1 40.2 31.3 C43.4 30.4 46.8 30 50.2 30 C53.6 30 57 30.4 60.2 31.3 C67.9 26.1 71.3 27.2 71.3 27.2 C73.5 32.7 72.1 36.8 71.7 37.8 C74.3 40.6 75.9 44.2 75.9 48.6 C75.9 64.1 66.6 67.4 57.7 68.4 C59.1 69.6 60.4 72.1 60.4 75.9 C60.4 81.3 60.4 85.7 60.4 87.1 C60.4 88.1 61.1 89.4 63.1 89 C79 83.7 90.5 68.7 90.5 50.9 C90.2 27.9 72.3 10 50 10 Z" />
        </svg>
      );
    default:
      return (
        <span className="text-[10px] font-black text-white">
          {name.slice(0, 2).toUpperCase()}
        </span>
      );
  }
}

/* ─── Single tech node ────────────────────────────────────────────── */
function TechNode({ tech, index, total, radius, speed, ringIndex, theme }) {
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
        {/* Glow sphere core */}
        <Sphere
          args={[hovered ? 0.25 : 0.16, 24, 24]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.5 : 0.8}
            transparent
            opacity={hovered ? 1 : 0.9}
          />
        </Sphere>

        {/* Outer pulse shell */}
        <Sphere args={[hovered ? 0.35 : 0.24, 16, 16]}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={hovered ? 0.25 : 0.1}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* 3D-Projected HTML Vector Logo & Label */}
        <Html
          position={[0, 0, 0]}
          center
          distanceFactor={7}
          className="pointer-events-none"
        >
          <div 
            className={`flex flex-col items-center justify-center transition-all duration-300 ${
              hovered ? 'scale-125' : 'scale-100'
            }`}
            style={{
              width: '120px',
              textAlign: 'center',
            }}
          >
            {/* Glowing Brand Icon Capsule */}
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 shadow-xl ${
                theme === 'dark' ? 'bg-slate-950/90' : 'bg-white/90'
              }`}
              style={{
                borderColor: color,
                boxShadow: hovered ? `0 0 20px ${color}` : `0 0 8px ${color}50`,
                cursor: 'pointer',
              }}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            >
              <TechIcon name={tech.name} />
            </div>
            {/* Glossy Tech Name tag */}
            <span 
              className={`mt-2 text-[9px] font-bold tracking-wider font-sans select-none px-2 py-0.5 rounded border transition-all duration-300 ${
                hovered 
                  ? theme === 'dark' ? 'text-white bg-slate-900/95 border-white/30 shadow-lg' : 'text-slate-950 bg-white/95 border-slate-300 shadow-lg'
                  : theme === 'dark' ? 'text-slate-300 bg-slate-950/65 border-transparent' : 'text-slate-600 bg-white/65 border-slate-200/50'
              }`}
            >
              {tech.name}
            </span>
          </div>
        </Html>
      </Float>
    </group>
  );
}

/* ─── Central core sphere ─────────────────────────────────────────── */
function CoreSphere({ theme }) {
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
          color={theme === 'dark' ? '#0f172a' : '#cbd5e1'}
          emissive={theme === 'dark' ? '#18B7F5' : '#3b82f6'}
          emissiveIntensity={theme === 'dark' ? 0.15 : 0.05}
          transparent
          opacity={0.4}
          wireframe
        />
      </Sphere>
      <Sphere args={[1.22, 32, 32]}>
        <meshStandardMaterial
          color={theme === 'dark' ? '#18B7F5' : '#3b82f6'}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

/* ─── Orbit ring lines ────────────────────────────────────────────── */
function OrbitRing({ radius, color, yOffset = 0, theme }) {
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
      <lineBasicMaterial color={color} transparent opacity={theme === 'dark' ? 0.12 : 0.22} />
    </line>
  );
}

/* ─── Floating particles background ───────────────────────────────── */
function Particles({ count = 200, theme }) {
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
      <pointsMaterial color={theme === 'dark' ? '#18B7F5' : '#3b82f6'} size={0.04} transparent opacity={theme === 'dark' ? 0.4 : 0.25} sizeAttenuation />
    </points>
  );
}

/* ─── Scene setup ─────────────────────────────────────────────────── */
function Scene({ technologies, theme }) {
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
      <ambientLight intensity={theme === 'dark' ? 0.3 : 0.8} />
      <pointLight position={[10, 10, 10]} intensity={theme === 'dark' ? 1 : 1.5} color={theme === 'dark' ? '#18B7F5' : '#3b82f6'} />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#7C3AED" />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#34d399" />

      <CoreSphere theme={theme} />
      <Particles theme={theme} />

      {rings.map((cat, ringIdx) => {
        const techs = categorized[cat];
        const radius = 3 + ringIdx * 1.6;
        const speed = 0.12 - ringIdx * 0.015;
        const color = CATEGORY_COLORS[cat] || '#18B7F5';

        return (
          <group key={cat}>
            <OrbitRing radius={radius} color={color} yOffset={(ringIdx - 1) * 1.8} theme={theme} />
            {techs.map((tech, i) => (
              <TechNode
                key={tech.name}
                tech={tech}
                index={i}
                total={techs.length}
                radius={radius}
                speed={speed}
                ringIndex={ringIdx}
                theme={theme}
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

/* ─── WebGL detection ──────────────────────────────────────────────── */
function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

/* ─── Fallback when WebGL unavailable ──────────────────────────────── */
function GlobeFallback({ technologies, theme }) {
  const CATEGORY_COLORS = {
    Frontend: '#18B7F5', Backend: '#34d399', Database: '#f59e0b',
    Design: '#e879f9', Infrastructure: '#fb923c', Tools: '#94a3b8',
  };
  return (
    <div className={`w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden border flex items-center justify-center transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#020617] border-slate-800/50' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 p-6 max-w-2xl">
        {(technologies || []).map((t) => (
          <div key={t.name} className="flex flex-col items-center gap-1.5 p-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow" style={{ backgroundColor: CATEGORY_COLORS[t.category] || '#94a3b8' }}>
              {t.name.slice(0, 2)}
            </div>
            <span className={`text-[9px] text-center leading-tight transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Exported wrapper ────────────────────────────────────────────── */
export default function TechGlobe({ technologies }) {
  const [webgl] = useState(() => hasWebGL());
  const { theme } = useTheme();

  if (!webgl) return <GlobeFallback technologies={technologies} theme={theme} />;

  return (
    <div className={`w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden border transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#020617] border-slate-800/50' : 'bg-slate-50 border-slate-200'
    }`}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene technologies={technologies} theme={theme} />
      </Canvas>
    </div>
  );
}
