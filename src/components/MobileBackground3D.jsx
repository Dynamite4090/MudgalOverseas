import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Snowy Floor
 */
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
      <planeGeometry args={[15, 15]} />
      <meshStandardMaterial color="#e8f0f8" />
    </mesh>
  )
}

/**
 * Simple Desk with Monitor
 */
function SimpleDesk({ position, monitorColor = '#7aa2f7' }) {
  return (
    <group position={position}>
      {/* Desk Top */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.04, 0.5]} />
        <meshStandardMaterial color="#5c4d3d" />
      </mesh>
      
      {/* Desk Legs */}
      {[[-0.35, -0.25, -0.2], [0.35, -0.25, -0.2], [-0.35, -0.25, 0.2], [0.35, -0.25, 0.2]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.03, 0.5, 0.03]} />
          <meshStandardMaterial color="#3d3d3d" />
        </mesh>
      ))}
      
      {/* Monitor */}
      <group position={[0, 0.25, -0.1]}>
        <mesh>
          <boxGeometry args={[0.4, 0.28, 0.02]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[0.35, 0.22, 0.01]} />
          <meshStandardMaterial color={monitorColor} emissive={monitorColor} emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <boxGeometry args={[0.04, 0.08, 0.04]} />
          <meshStandardMaterial color="#2d2d2d" />
        </mesh>
      </group>
    </group>
  )
}

/**
 * Simple Chair
 */
function SimpleChair({ position }) {
  return (
    <group position={position}>
      {/* Seat */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.04, 0.3]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.2, -0.13]}>
        <boxGeometry args={[0.28, 0.35, 0.04]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>
      {/* Pole */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 8]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
    </group>
  )
}

/**
 * Simple Character (cute animal)
 */
function SimpleCharacter({ position, type = 'cat', facingDesk = true }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.01
    }
  })

  const colors = {
    cat: { body: '#f5f5f5', accent: '#ffb6c1' },
    panda: { body: '#f5f5f5', accent: '#1a1a2e' },
    fox: { body: '#ff9e64', accent: '#f5f5f5' },
  }

  const c = colors[type] || colors.cat
  const rotation = facingDesk ? [0, Math.PI, 0] : [0, 0, 0]

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={c.body} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.14, 0.02]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={c.body} />
      </mesh>
      
      {/* Ears */}
      {type !== 'panda' && (
        <>
          <mesh position={[-0.05, 0.22, 0.02]} rotation={[0, 0, -0.3]}>
            <coneGeometry args={[0.025, 0.05, 4]} />
            <meshStandardMaterial color={c.body} />
          </mesh>
          <mesh position={[0.05, 0.22, 0.02]} rotation={[0, 0, 0.3]}>
            <coneGeometry args={[0.025, 0.05, 4]} />
            <meshStandardMaterial color={c.body} />
          </mesh>
        </>
      )}
      
      {/* Panda ears */}
      {type === 'panda' && (
        <>
          <mesh position={[-0.06, 0.2, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={c.accent} />
          </mesh>
          <mesh position={[0.06, 0.2, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={c.accent} />
          </mesh>
        </>
      )}
      
      {/* Eyes */}
      <mesh position={[-0.025, 0.16, 0.07]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.025, 0.16, 0.07]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
    </group>
  )
}

/**
 * Christmas Tree
 */
function ChristmasTree({ position, scale = 1 }) {
  const lightsRef = useRef()
  
  useFrame((state) => {
    if (lightsRef.current) {
      lightsRef.current.children.forEach((light, i) => {
        light.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.3
      })
    }
  })
  
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.3, 6]} />
        <meshStandardMaterial color="#5c3d2e" />
      </mesh>
      
      {/* Tree layers */}
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.5, 0.7, 6]} />
        <meshStandardMaterial color="#1a5c32" />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <coneGeometry args={[0.38, 0.6, 6]} />
        <meshStandardMaterial color="#1f6b3a" />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <coneGeometry args={[0.25, 0.5, 6]} />
        <meshStandardMaterial color="#247a42" />
      </mesh>
      
      {/* Star */}
      <mesh position={[0, 1.6, 0]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.1]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.8} />
      </mesh>
      
      {/* Lights */}
      <group ref={lightsRef}>
        {[
          [0.3, 0.4, 0.2, '#ff0000'],
          [-0.25, 0.55, 0.25, '#00ff00'],
          [0.2, 0.75, -0.15, '#0000ff'],
          [-0.15, 0.95, 0.15, '#ffff00'],
          [0.1, 1.15, 0.08, '#ff00ff'],
        ].map((light, i) => (
          <mesh key={i} position={[light[0], light[1], light[2]]}>
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshStandardMaterial color={light[3]} emissive={light[3]} emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/**
 * Gift Box
 */
function GiftBox({ position, color = '#ff0000', ribbonColor = '#ffd700', scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[0.2, 0.16, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.22, 0.035, 0.06]} />
        <meshStandardMaterial color={ribbonColor} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.06, 0.18, 0.22]} />
        <meshStandardMaterial color={ribbonColor} />
      </mesh>
    </group>
  )
}

/**
 * Snowflakes
 */
function Snowflakes({ count = 60 }) {
  const ref = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 12,
          Math.random() * 6,
          (Math.random() - 0.5) * 8
        ],
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        const p = particles[i]
        child.position.y -= p.speed * 0.015
        child.position.x += Math.sin(state.clock.elapsedTime * 0.5 + p.offset) * 0.002
        
        if (child.position.y < -1.5) {
          child.position.y = 5
          child.position.x = (Math.random() - 0.5) * 12
        }
      })
    }
  })

  return (
    <group ref={ref}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Main Scene - Christmas Office
 */
function Scene() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floor */}
      <Floor />
      
      {/* Christmas Tree */}
      <ChristmasTree position={[0, -1.5, -2]} scale={0.9} />
      
      {/* Gifts under tree */}
      <GiftBox position={[-0.4, -1.42, -1.6]} color="#ff0000" ribbonColor="#ffd700" scale={0.8} />
      <GiftBox position={[0.3, -1.42, -1.5]} color="#4444ff" ribbonColor="#ffffff" scale={0.7} />
      <GiftBox position={[0, -1.42, -1.3]} color="#00aa00" ribbonColor="#ff0000" scale={0.6} />
      
      {/* Desk with character - left */}
      <SimpleDesk position={[-1.5, -1, -1]} monitorColor="#7aa2f7" />
      <SimpleChair position={[-1.5, -1.15, -0.5]} />
      <SimpleCharacter position={[-1.5, -0.85, -0.5]} type="cat" />
      
      {/* Desk with character - right */}
      <SimpleDesk position={[1.5, -1, -1]} monitorColor="#ff9e64" />
      <SimpleChair position={[1.5, -1.15, -0.5]} />
      <SimpleCharacter position={[1.5, -0.85, -0.5]} type="panda" />
      
      {/* Snowflakes */}
      <Snowflakes count={50} />
    </group>
  )
}

/**
 * Mobile Background 3D Component
 * Christmas office scene optimized for mobile
 */
function MobileBackground3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 50 }}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        dpr={1}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-3, 3, 2]} intensity={0.3} color="#ff9e64" />
        
        {/* Fog */}
        <fog attach="fog" args={['#0f172a', 4, 12]} />
        
        <Scene />
      </Canvas>
    </div>
  )
}

export default MobileBackground3D
