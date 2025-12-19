import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Floor Component - Snowy floor for Christmas
 */
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#e8f0f8" metalness={0.1} roughness={0.9} />
    </mesh>
  )
}

/**
 * Desk Component - Office desk with monitor, keyboard, mouse
 */
function Desk({ position, monitorColor = '#7aa2f7' }) {
  return (
    <group position={position}>
      {/* Desk Top */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.06, 0.7]} />
        <meshStandardMaterial color="#5c4d3d" metalness={0.1} roughness={0.8} />
      </mesh>
      
      {/* Desk edge trim */}
      <mesh position={[0, 0.48, 0.35]} castShadow>
        <boxGeometry args={[1.2, 0.04, 0.02]} />
        <meshStandardMaterial color="#4a3f32" />
      </mesh>
      
      {/* Desk Legs */}
      {[[-0.55, 0, -0.3], [0.55, 0, -0.3], [-0.55, 0, 0.3], [0.55, 0, 0.3]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.25, pos[2]]} castShadow>
          <boxGeometry args={[0.04, 0.5, 0.04]} />
          <meshStandardMaterial color="#3d3d3d" metalness={0.3} />
        </mesh>
      ))}
      
      {/* Monitor */}
      <group position={[0, 0.85, -0.2]}>
        {/* Screen bezel */}
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.38, 0.025]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[0.5, 0.32, 0.01]} />
          <meshStandardMaterial color={monitorColor} emissive={monitorColor} emissiveIntensity={0.4} />
        </mesh>
        {/* Monitor Stand neck */}
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[0.06, 0.12, 0.06]} />
          <meshStandardMaterial color="#2d2d2d" metalness={0.5} />
        </mesh>
        {/* Monitor Stand base */}
        <mesh position={[0, -0.32, 0.05]}>
          <boxGeometry args={[0.2, 0.02, 0.15]} />
          <meshStandardMaterial color="#2d2d2d" metalness={0.5} />
        </mesh>
      </group>
      
      {/* Keyboard */}
      <mesh position={[0, 0.545, 0.1]} castShadow>
        <boxGeometry args={[0.35, 0.015, 0.12]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      {/* Keyboard keys indication */}
      <mesh position={[0, 0.555, 0.1]}>
        <boxGeometry args={[0.32, 0.005, 0.09]} />
        <meshStandardMaterial color="#3d3d3d" />
      </mesh>
      
      {/* Mouse */}
      <mesh position={[0.28, 0.54, 0.12]} castShadow>
        <boxGeometry args={[0.05, 0.02, 0.08]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      
      {/* Coffee mug */}
      <group position={[-0.4, 0.58, 0.15]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.035, 0.03, 0.08, 12]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        {/* Coffee */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 12]} />
          <meshStandardMaterial color="#4a2c17" />
        </mesh>
        {/* Handle */}
        <mesh position={[0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.025, 0.008, 8, 12, Math.PI]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
      </group>
    </group>
  )
}

/**
 * Chair Component - Office chair with armrests
 */
function Chair({ position }) {
  return (
    <group position={position}>
      {/* Seat cushion */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[0.4, 0.06, 0.4]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>
      {/* Seat padding */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.36, 0.04, 0.36]} />
        <meshStandardMaterial color="#5a9c69" />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.65, -0.18]} castShadow>
        <boxGeometry args={[0.38, 0.45, 0.05]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>
      {/* Backrest padding */}
      <mesh position={[0, 0.65, -0.15]} castShadow>
        <boxGeometry args={[0.32, 0.38, 0.04]} />
        <meshStandardMaterial color="#5a9c69" />
      </mesh>
      {/* Armrests */}
      <mesh position={[-0.22, 0.5, 0]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.3]} />
        <meshStandardMaterial color="#3d3d3d" />
      </mesh>
      <mesh position={[0.22, 0.5, 0]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.3]} />
        <meshStandardMaterial color="#3d3d3d" />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.03, 16]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      {/* Pole */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.25, 8]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.8} />
      </mesh>
      {/* Wheels */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        return (
          <mesh key={i} position={[Math.sin(rad) * 0.15, 0.03, Math.cos(rad) * 0.15]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        )
      })}
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
function Character({ position, type = 'cat', color = '#f5f5f5', facingDesk = true }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle breathing/working animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.01
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
  const rotation = facingDesk ? [0, Math.PI, 0] : [0, 0, 0]

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Body - slightly tilted forward like sitting and working */}
      <mesh castShadow position={[0, 0, 0]} rotation={[0.15, 0, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color={c.body} />
      </mesh>
      
      {/* Head - looking at monitor */}
      <mesh position={[0, 0.18, 0.02]} castShadow>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color={c.body} />
      </mesh>
      
      {/* Ears (for cat/fox) */}
      {(type === 'cat' || type === 'fox') && (
        <>
          <mesh position={[-0.07, 0.28, 0.02]} rotation={[0, 0, -0.3]}>
            <coneGeometry args={[0.035, 0.07, 4]} />
            <meshStandardMaterial color={c.body} />
          </mesh>
          <mesh position={[0.07, 0.28, 0.02]} rotation={[0, 0, 0.3]}>
            <coneGeometry args={[0.035, 0.07, 4]} />
            <meshStandardMaterial color={c.body} />
          </mesh>
        </>
      )}

      {/* Panda ears */}
      {type === 'panda' && (
        <>
          <mesh position={[-0.08, 0.26, 0]} castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color={c.accent} />
          </mesh>
          <mesh position={[0.08, 0.26, 0]} castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color={c.accent} />
          </mesh>
        </>
      )}
      
      {/* Eyes */}
      <mesh position={[-0.035, 0.2, 0.09]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.035, 0.2, 0.09]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* Eye shine */}
      <mesh position={[-0.03, 0.21, 0.105]}>
        <sphereGeometry args={[0.005, 6, 6]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.04, 0.21, 0.105]}>
        <sphereGeometry args={[0.005, 6, 6]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Panda eye patches */}
      {type === 'panda' && (
        <>
          <mesh position={[-0.035, 0.2, 0.085]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color={c.accent} />
          </mesh>
          <mesh position={[0.035, 0.2, 0.085]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color={c.accent} />
          </mesh>
        </>
      )}
      
      {/* Nose */}
      <mesh position={[0, 0.16, 0.1]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial color={type === 'fox' ? '#1a1a2e' : '#ffb6c1'} />
      </mesh>

      {/* Arms reaching toward keyboard */}
      <mesh position={[-0.1, -0.02, 0.08]} rotation={[0.8, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.025, 0.12, 4, 8]} />
        <meshStandardMaterial color={c.body} />
      </mesh>
      <mesh position={[0.1, -0.02, 0.08]} rotation={[0.8, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.025, 0.12, 4, 8]} />
        <meshStandardMaterial color={c.body} />
      </mesh>

      {/* Legs (bent, sitting) */}
      <mesh position={[-0.06, -0.12, 0.05]} rotation={[1.2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.03, 0.08, 4, 8]} />
        <meshStandardMaterial color={c.body} />
      </mesh>
      <mesh position={[0.06, -0.12, 0.05]} rotation={[1.2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.03, 0.08, 4, 8]} />
        <meshStandardMaterial color={c.body} />
      </mesh>

      {/* Tail for cat/fox */}
      {(type === 'cat' || type === 'fox') && (
        <mesh position={[0, -0.05, -0.12]} rotation={[-0.5, 0, 0]} castShadow>
          <capsuleGeometry args={[0.025, 0.15, 4, 8]} />
          <meshStandardMaterial color={c.body} />
        </mesh>
      )}
    </group>
  )
}

/**
 * Floating Particles - Snowflakes for Christmas
 */
function Particles() {
  const particlesRef = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 100; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          Math.random() * 8 + 2,
          (Math.random() - 0.5) * 20,
        ],
        speed: Math.random() * 0.5 + 0.3,
        size: Math.random() * 0.03 + 0.02,
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        // Falling snow effect
        particle.position.y -= particles[i].speed * 0.02
        particle.position.x += Math.sin(state.clock.elapsedTime + i) * 0.002
        
        // Reset snow when it falls below ground
        if (particle.position.y < -0.5) {
          particle.position.y = 8
          particle.position.x = (Math.random() - 0.5) * 20
          particle.position.z = (Math.random() - 0.5) * 20
        }
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Christmas Tree Component
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
      {/* Tree trunk */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.4, 8]} />
        <meshStandardMaterial color="#5c3d2e" />
      </mesh>
      
      {/* Tree layers */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <coneGeometry args={[0.8, 1, 8]} />
        <meshStandardMaterial color="#1a5c32" />
      </mesh>
      <mesh position={[0, 1.3, 0]} castShadow>
        <coneGeometry args={[0.6, 0.9, 8]} />
        <meshStandardMaterial color="#1f6b3a" />
      </mesh>
      <mesh position={[0, 1.8, 0]} castShadow>
        <coneGeometry args={[0.4, 0.7, 8]} />
        <meshStandardMaterial color="#247a42" />
      </mesh>
      
      {/* Star on top */}
      <mesh position={[0, 2.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.15]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.8} />
      </mesh>
      
      {/* Christmas lights */}
      <group ref={lightsRef}>
        {[
          [0.5, 0.5, 0.3, '#ff0000'],
          [-0.4, 0.6, 0.4, '#00ff00'],
          [0.3, 0.9, -0.3, '#0000ff'],
          [-0.3, 1.1, 0.3, '#ffff00'],
          [0.2, 1.4, 0.2, '#ff00ff'],
          [-0.2, 1.6, -0.2, '#00ffff'],
          [0.15, 1.9, 0.1, '#ff0000'],
        ].map((light, i) => (
          <mesh key={i} position={[light[0], light[1], light[2]]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color={light[3]} 
              emissive={light[3]} 
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>
      
      {/* Ornaments */}
      {[
        [0.4, 0.7, 0.2, '#ff4444'],
        [-0.35, 0.8, 0.3, '#4444ff'],
        [0.25, 1.2, -0.2, '#ffd700'],
        [-0.2, 1.5, 0.15, '#ff44ff'],
      ].map((ornament, i) => (
        <mesh key={i} position={[ornament[0], ornament[1], ornament[2]]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={ornament[3]} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Gift Box Component
 */
function GiftBox({ position, color = '#ff0000', ribbonColor = '#ffd700', scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Box */}
      <mesh castShadow>
        <boxGeometry args={[0.3, 0.25, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Ribbon horizontal */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.32, 0.05, 0.08]} />
        <meshStandardMaterial color={ribbonColor} metalness={0.5} />
      </mesh>
      {/* Ribbon vertical */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.27, 0.32]} />
        <meshStandardMaterial color={ribbonColor} metalness={0.5} />
      </mesh>
      {/* Bow */}
      <mesh position={[0, 0.15, 0]} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[0.06, 0.02, 8, 16]} />
        <meshStandardMaterial color={ribbonColor} metalness={0.5} />
      </mesh>
    </group>
  )
}

/**
 * Candy Cane Component
 */
function CandyCane({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Straight part */}
      <mesh castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      {/* Stripe */}
      <mesh position={[0, 0.1, 0.001]}>
        <cylinderGeometry args={[0.035, 0.035, 0.08, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, -0.1, 0.001]}>
        <cylinderGeometry args={[0.035, 0.035, 0.08, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Curved hook */}
      <mesh position={[0.08, 0.28, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.08, 0.03, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
    </group>
  )
}

/**
 * Christmas Lights String Component
 */
function ChristmasLights({ startPos, endPos, segments = 10 }) {
  const lightsRef = useRef()
  
  const lightPositions = useMemo(() => {
    const positions = []
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const x = startPos[0] + (endPos[0] - startPos[0]) * t
      const y = startPos[1] - Math.sin(t * Math.PI) * 0.3 // Sagging effect
      const z = startPos[2] + (endPos[2] - startPos[2]) * t
      positions.push([x, y, z])
    }
    return positions
  }, [startPos, endPos, segments])
  
  useFrame((state) => {
    if (lightsRef.current) {
      lightsRef.current.children.forEach((light, i) => {
        light.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 4 + i * 0.5) * 0.4
      })
    }
  })
  
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
  
  return (
    <group ref={lightsRef}>
      {lightPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial 
            color={colors[i % colors.length]}
            emissive={colors[i % colors.length]}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Snowman Component
 */
function Snowman({ position }) {
  return (
    <group position={position}>
      {/* Bottom ball */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Middle ball */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Carrot nose */}
      <mesh position={[0, 1.1, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.03, 0.15, 8]} />
        <meshStandardMaterial color="#ff6b35" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.06, 1.15, 0.15]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.06, 1.15, 0.15]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      {/* Hat */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.25, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0, 1.18, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.03, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      {/* Scarf */}
      <mesh position={[0, 0.9, 0.05]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.35, 0.08, 0.08]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      {/* Buttons */}
      {[0.65, 0.75, 0.85].map((y, i) => (
        <mesh key={i} position={[0, y, 0.23]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#1a1a2e" />
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
 * Main 3D Scene - Christmas Theme
 */
function Scene() {
  return (
    <>
      {/* Lighting - Warmer Christmas lighting */}
      <ambientLight intensity={0.5} color="#ffe4c4" />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={0.6} 
        castShadow
        shadow-mapSize={[2048, 2048]}
        color="#fff5e6"
      />
      <pointLight position={[-3, 3, 0]} intensity={0.4} color="#ff4444" />
      <pointLight position={[3, 3, 0]} intensity={0.4} color="#44ff44" />
      <pointLight position={[0, 4, -3]} intensity={0.3} color="#ffd700" />
      
      {/* Floor - Snowy */}
      <Floor />
      
      {/* Christmas Trees */}
      <ChristmasTree position={[-4, -0.5, -3]} scale={1.2} />
      <ChristmasTree position={[4, -0.5, -3]} scale={1} />
      <ChristmasTree position={[0, -0.5, 4]} scale={0.8} />
      
      {/* Snowman */}
      <Snowman position={[-3, -0.5, 2]} />
      
      {/* Gift Boxes */}
      <GiftBox position={[-3.5, -0.35, -2.5]} color="#ff0000" ribbonColor="#ffd700" scale={0.8} />
      <GiftBox position={[-4.3, -0.35, -2.8]} color="#00aa00" ribbonColor="#ff0000" scale={0.6} />
      <GiftBox position={[-3.8, -0.35, -3.3]} color="#0066ff" ribbonColor="#ffffff" scale={0.7} />
      <GiftBox position={[3.5, -0.35, -2.5]} color="#ff00ff" ribbonColor="#00ff00" scale={0.8} />
      <GiftBox position={[4.2, -0.35, -2.3]} color="#ffaa00" ribbonColor="#ff0000" scale={0.5} />
      
      {/* Candy Canes */}
      <CandyCane position={[-4.5, 0, -2]} rotation={[0, 0, 0.3]} />
      <CandyCane position={[4.5, 0, -2]} rotation={[0, 0, -0.3]} />
      
      {/* Christmas Lights Strings */}
      <ChristmasLights startPos={[-5, 3, -4]} endPos={[5, 3, -4]} segments={15} />
      <ChristmasLights startPos={[-5, 2.5, 4]} endPos={[5, 2.5, 4]} segments={12} />
      <ChristmasLights startPos={[-5, 3, -2]} endPos={[-5, 3, 4]} segments={10} />
      <ChristmasLights startPos={[5, 3, -2]} endPos={[5, 3, 4]} segments={10} />
      
      {/* Desks with characters - festive monitor colors */}
      {/* Back row - facing monitors (away from camera) */}
      <Desk position={[-2.5, -0.5, -1]} monitorColor="#ff4444" />
      <Chair position={[-2.5, -0.5, -0.3]} />
      <Character position={[-2.5, -0.02, -0.3]} type="cat" facingDesk={true} />
      
      <Desk position={[0, -0.5, -1.5]} monitorColor="#44ff44" />
      <Chair position={[0, -0.5, -0.8]} />
      <Character position={[0, -0.02, -0.8]} type="panda" facingDesk={true} />
      
      <Desk position={[2.5, -0.5, -1]} monitorColor="#ffd700" />
      <Chair position={[2.5, -0.5, -0.3]} />
      <Character position={[2.5, -0.02, -0.3]} type="dog" facingDesk={true} />
      
      {/* Front row - facing their monitors (toward camera background) */}
      <Desk position={[-1.5, -0.5, 1.5]} monitorColor="#ff4444" />
      <Chair position={[-1.5, -0.5, 2.2]} />
      <Character position={[-1.5, -0.02, 2.2]} type="penguin" facingDesk={true} />
      
      <Desk position={[1.5, -0.5, 1.5]} monitorColor="#44ff44" />
      <Chair position={[1.5, -0.5, 2.2]} />
      <Character position={[1.5, -0.02, 2.2]} type="fox" facingDesk={true} />
      
      {/* Coffee Machine */}
      <CoffeeMachine position={[4, -0.2, 0]} />
      
      {/* Snowfall Particles */}
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
      
      {/* Studio Label Overlay - Christmas themed */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-red-400 font-mono text-sm tracking-widest">🎄 MUDGALOVERSEAS HQ 🎄</p>
        <p className="text-green-400 font-mono text-xs mt-1">Merry Christmas & Happy Holidays! ❄️</p>
      </div>
    </div>
  )
}

export default Office3D
