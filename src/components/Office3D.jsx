import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Floor Component
 */
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.8} />
    </mesh>
  )
}

/**
 * Desk Component
 */
function Desk({ position, monitorColor = '#7aa2f7' }) {
  return (
    <group position={position}>
      {/* Desk Top */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.08, 0.7]} />
        <meshStandardMaterial color="#4a4339" metalness={0.2} roughness={0.7} />
      </mesh>
      
      {/* Desk Legs */}
      {[[-0.5, 0, -0.25], [0.5, 0, -0.25], [-0.5, 0, 0.25], [0.5, 0, 0.25]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.25, pos[2]]} castShadow>
          <boxGeometry args={[0.05, 0.5, 0.05]} />
          <meshStandardMaterial color="#3d3d3d" />
        </mesh>
      ))}
      
      {/* Monitor */}
      <group position={[0, 0.85, -0.15]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.35, 0.03]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.45, 0.3, 0.01]} />
          <meshStandardMaterial color={monitorColor} emissive={monitorColor} emissiveIntensity={0.3} />
        </mesh>
        {/* Monitor Stand */}
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[0.08, 0.15, 0.08]} />
          <meshStandardMaterial color="#2d2d2d" />
        </mesh>
      </group>
      
      {/* Keyboard */}
      <mesh position={[0, 0.55, 0.15]} castShadow>
        <boxGeometry args={[0.35, 0.02, 0.12]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
    </group>
  )
}

/**
 * Chair Component
 */
function Chair({ position }) {
  return (
    <group position={position}>
      {/* Seat */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.4, 0.08, 0.4]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.65, -0.18]} castShadow>
        <boxGeometry args={[0.38, 0.5, 0.05]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      {/* Pole */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.8} />
      </mesh>
    </group>
  )
}

/**
 * Cubicle Wall Component
 */
function CubicleWall({ position, rotation = [0, 0, 0], width = 1.5 }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={[width, 1.2, 0.05]} />
      <meshStandardMaterial color="#c9a66b" roughness={0.9} />
    </mesh>
  )
}

/**
 * Plant Component
 */
function Plant({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Pot */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.1, 0.3, 8]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>
      <mesh position={[0.1, 0.6, 0.1]} castShadow>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#5a9c69" />
      </mesh>
      <mesh position={[-0.1, 0.55, -0.05]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#3d6b4a" />
      </mesh>
    </group>
  )
}

/**
 * Character Component - Cute animal sitting at desk
 */
function Character({ position, type = 'cat', color = '#f5f5f5' }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02
    }
  })

  const colors = {
    cat: { body: '#f5f5f5', accent: '#ffb6c1' },
    panda: { body: '#f5f5f5', accent: '#1a1a2e' },
    fox: { body: '#ff9e64', accent: '#f5f5f5' },
    penguin: { body: '#1a1a2e', accent: '#f5f5f5' },
    dog: { body: '#d4a574', accent: '#f5e6d3' },
  }

  const c = colors[type] || colors.cat

  return (
    <group ref={meshRef} position={position}>
      {/* Body */}
      <mesh castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={c.body} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={c.body} />
      </mesh>
      
      {/* Ears (for cat/fox) */}
      {(type === 'cat' || type === 'fox') && (
        <>
          <mesh position={[-0.08, 0.32, 0]} rotation={[0, 0, -0.3]}>
            <coneGeometry args={[0.04, 0.08, 4]} />
            <meshStandardMaterial color={c.body} />
          </mesh>
          <mesh position={[0.08, 0.32, 0]} rotation={[0, 0, 0.3]}>
            <coneGeometry args={[0.04, 0.08, 4]} />
            <meshStandardMaterial color={c.body} />
          </mesh>
        </>
      )}
      
      {/* Eyes */}
      <mesh position={[-0.04, 0.22, 0.1]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.04, 0.22, 0.1]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
    </group>
  )
}

/**
 * Floating Particles
 */
function Particles() {
  const particlesRef = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 15,
          Math.random() * 5,
          (Math.random() - 0.5) * 15,
        ],
        speed: Math.random() * 0.5 + 0.2,
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += Math.sin(state.clock.elapsedTime * particles[i].speed) * 0.002
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial 
            color={['#7aa2f7', '#bb9af7', '#9ece6a', '#7dcfff'][i % 4]} 
            emissive={['#7aa2f7', '#bb9af7', '#9ece6a', '#7dcfff'][i % 4]}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Coffee Machine
 */
function CoffeeMachine({ position }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.4, 0.6, 0.3]} />
        <meshStandardMaterial color="#4a5568" metalness={0.3} />
      </mesh>
      {/* Display */}
      <mesh position={[0, 0.1, 0.16]}>
        <boxGeometry args={[0.25, 0.15, 0.01]} />
        <meshStandardMaterial color="#1a1a2e" emissive="#7aa2f7" emissiveIntensity={0.2} />
      </mesh>
      {/* Coffee cup */}
      <mesh position={[0.08, -0.2, 0.2]} castShadow>
        <cylinderGeometry args={[0.04, 0.035, 0.08, 8]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
    </group>
  )
}

/**
 * Window with city view
 */
function WindowPanel({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[1.5, 2, 0.05]} />
        <meshStandardMaterial color="#4a6572" metalness={0.5} />
      </mesh>
      {/* Glass */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.4, 1.9, 0.02]} />
        <meshStandardMaterial 
          color="#7aa2f7" 
          transparent 
          opacity={0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* City silhouette */}
      {[[-0.4, -0.3, 0.04, 0.3, 0.8], [0, -0.1, 0.04, 0.35, 1], [0.4, -0.4, 0.04, 0.25, 0.6]].map((b, i) => (
        <mesh key={i} position={[b[0], b[1], b[2]]}>
          <boxGeometry args={[b[3], b[4], 0.01]} />
          <meshStandardMaterial color="#2d3a44" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Main 3D Scene
 */
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={0.8} 
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-3, 3, 0]} intensity={0.3} color="#7aa2f7" />
      <pointLight position={[3, 3, 0]} intensity={0.3} color="#bb9af7" />
      
      {/* Floor */}
      <Floor />
      
      {/* Desks with characters */}
      <Desk position={[-2.5, 0, -1]} monitorColor="#7aa2f7" />
      <Chair position={[-2.5, 0, -0.3]} />
      <Character position={[-2.5, 0.7, -0.3]} type="cat" />
      
      <Desk position={[0, 0, -1.5]} monitorColor="#9ece6a" />
      <Chair position={[0, 0, -0.8]} />
      <Character position={[0, 0.7, -0.8]} type="panda" />
      
      <Desk position={[2.5, 0, -1]} monitorColor="#bb9af7" />
      <Chair position={[2.5, 0, -0.3]} />
      <Character position={[2.5, 0.7, -0.3]} type="dog" />
      
      <Desk position={[-1.5, 0, 1.5]} monitorColor="#7dcfff" />
      <Chair position={[-1.5, 0, 2.2]} />
      <Character position={[-1.5, 0.7, 2.2]} type="penguin" />
      
      <Desk position={[1.5, 0, 1.5]} monitorColor="#f7768e" />
      <Chair position={[1.5, 0, 2.2]} />
      <Character position={[1.5, 0.7, 2.2]} type="fox" />
      
      {/* Cubicle Walls */}
      <CubicleWall position={[-1.2, 0.1, -0.5]} rotation={[0, Math.PI / 4, 0]} />
      <CubicleWall position={[1.2, 0.1, -0.5]} rotation={[0, -Math.PI / 4, 0]} />
      <CubicleWall position={[0, 0.1, 0.5]} rotation={[0, 0, 0]} width={2} />
      
      {/* Plants */}
      <Plant position={[-4, 0, -2]} scale={1.2} />
      <Plant position={[4, 0, -2]} scale={1} />
      <Plant position={[-3, 0, 3]} scale={0.8} />
      <Plant position={[3, 0, 3]} scale={1.1} />
      <Plant position={[0, 0, -3]} scale={0.9} />
      
      {/* Coffee Machine */}
      <CoffeeMachine position={[4, 0.3, 0]} />
      
      {/* Windows */}
      <WindowPanel position={[-5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} />
      <WindowPanel position={[5, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <WindowPanel position={[0, 1.5, -5]} />
      
      {/* Particles */}
      <Particles />
    </>
  )
}

/**
 * Office3D Component
 * Main export - 3D office scene for desktop background
 */
function Office3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [8, 6, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
        />
        <Environment preset="night" />
      </Canvas>
      
      {/* Studio Label Overlay */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-slate-500 font-mono text-sm tracking-widest">MUDGALOVERSEAS HQ</p>
        <p className="text-slate-600 font-mono text-xs mt-1">Where games come to life ✨</p>
      </div>
    </div>
  )
}

export default Office3D
