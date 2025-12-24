import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

/**
 * Space Floor - Metallic Space Station Floor
 */
function SpaceFloor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
        </mesh>
    )
}

/**
 * Space Desk - Futuristic workstation
 */
function SpaceDesk({ position, monitorColor = '#00ffff' }) {
    return (
        <group position={position}>
            {/* Hovering Desk Platform */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.4, 0.08, 0.8]} />
                <meshStandardMaterial color="#2d2d4a" metalness={0.7} roughness={0.2} />
            </mesh>

            {/* Anti-gravity base glow */}
            <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.3, 0.4, 0.1, 16]} />
                <meshStandardMaterial color="#7aa2f7" emissive="#7aa2f7" emissiveIntensity={0.5} />
            </mesh>

            {/* Holographic Monitor */}
            <group position={[0, 0.9, -0.2]}>
                <mesh castShadow>
                    <boxGeometry args={[0.6, 0.4, 0.02]} />
                    <meshStandardMaterial
                        color={monitorColor}
                        emissive={monitorColor}
                        emissiveIntensity={0.6}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
                {/* Monitor frame */}
                <mesh position={[0, 0, -0.015]}>
                    <boxGeometry args={[0.65, 0.45, 0.01]} />
                    <meshStandardMaterial color="#1a1a2e" metalness={0.9} />
                </mesh>
            </group>

            {/* Futuristic Keyboard */}
            <mesh position={[0, 0.56, 0.15]} castShadow>
                <boxGeometry args={[0.4, 0.02, 0.15]} />
                <meshStandardMaterial color="#1a1a2e" emissive="#7aa2f7" emissiveIntensity={0.2} />
            </mesh>
        </group>
    )
}

/**
 * Astronaut Character
 */
function Astronaut({ position }) {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            // Floating animation
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
        }
    })

    return (
        <group ref={meshRef} position={position}>
            {/* Helmet */}
            <mesh position={[0, 0.25, 0]} castShadow>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#f5f5f5" metalness={0.3} />
            </mesh>
            {/* Visor */}
            <mesh position={[0, 0.25, 0.1]}>
                <sphereGeometry args={[0.12, 16, 16, 0, Math.PI]} />
                <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Body */}
            <mesh position={[0, 0, 0]} castShadow>
                <capsuleGeometry args={[0.12, 0.2, 8, 16]} />
                <meshStandardMaterial color="#f5f5f5" />
            </mesh>
            {/* Backpack */}
            <mesh position={[0, 0.05, -0.15]} castShadow>
                <boxGeometry args={[0.15, 0.2, 0.08]} />
                <meshStandardMaterial color="#4a4a6a" metalness={0.5} />
            </mesh>
            {/* Arms */}
            <mesh position={[-0.18, 0.05, 0.05]} rotation={[0.5, 0, -0.3]} castShadow>
                <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
                <meshStandardMaterial color="#f5f5f5" />
            </mesh>
            <mesh position={[0.18, 0.05, 0.05]} rotation={[0.5, 0, 0.3]} castShadow>
                <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
                <meshStandardMaterial color="#f5f5f5" />
            </mesh>
            {/* Legs */}
            <mesh position={[-0.06, -0.2, 0]} castShadow>
                <capsuleGeometry args={[0.04, 0.12, 4, 8]} />
                <meshStandardMaterial color="#f5f5f5" />
            </mesh>
            <mesh position={[0.06, -0.2, 0]} castShadow>
                <capsuleGeometry args={[0.04, 0.12, 4, 8]} />
                <meshStandardMaterial color="#f5f5f5" />
            </mesh>
        </group>
    )
}

/**
 * Earth in the background
 */
function Earth({ position }) {
    const meshRef = useRef()

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001
        }
    })

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[3, 32, 32]} />
            <meshStandardMaterial color="#4a90d9" emissive="#1a4a8a" emissiveIntensity={0.3} />
        </mesh>
    )
}

/**
 * Stars / Space Particles
 */
function SpaceParticles() {
    const particlesRef = useRef()

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < 200; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 40,
                    Math.random() * 20 - 5,
                    (Math.random() - 0.5) * 40,
                ],
                size: Math.random() * 0.05 + 0.02,
            })
        }
        return temp
    }, [])

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.children.forEach((star, i) => {
                // Twinkling effect
                star.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3
            })
        }
    })

    return (
        <group ref={particlesRef}>
            {particles.map((p, i) => (
                <mesh key={i} position={p.position}>
                    <sphereGeometry args={[p.size, 6, 6]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#ffffff"
                        emissiveIntensity={0.5}
                    />
                </mesh>
            ))}
        </group>
    )
}

/**
 * Satellite
 */
function Satellite({ position }) {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01
        }
    })

    return (
        <group ref={meshRef} position={position}>
            {/* Body */}
            <mesh castShadow>
                <boxGeometry args={[0.3, 0.2, 0.2]} />
                <meshStandardMaterial color="#4a4a6a" metalness={0.8} />
            </mesh>
            {/* Solar Panels */}
            <mesh position={[-0.4, 0, 0]}>
                <boxGeometry args={[0.5, 0.01, 0.3]} />
                <meshStandardMaterial color="#2a4a8a" emissive="#4a6aaa" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[0.4, 0, 0]}>
                <boxGeometry args={[0.5, 0.01, 0.3]} />
                <meshStandardMaterial color="#2a4a8a" emissive="#4a6aaa" emissiveIntensity={0.3} />
            </mesh>
            {/* Antenna */}
            <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
                <meshStandardMaterial color="#8a8a8a" metalness={0.9} />
            </mesh>
        </group>
    )
}

/**
 * Main Space Scene
 */
function SpaceScene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} color="#4a6a9a" />
            <directionalLight
                position={[10, 10, 5]}
                intensity={0.8}
                castShadow
                color="#ffffff"
            />
            <pointLight position={[-5, 5, 5]} intensity={0.5} color="#00ffff" />
            <pointLight position={[5, 5, -5]} intensity={0.5} color="#ff00ff" />

            {/* Floor */}
            <SpaceFloor />

            {/* Earth in background */}
            <Earth position={[15, 5, -20]} />

            {/* Workstations */}
            <SpaceDesk position={[-2, -0.5, 0]} monitorColor="#00ffff" />
            <Astronaut position={[-2, 0.1, 0.6]} />

            <SpaceDesk position={[0, -0.5, -1]} monitorColor="#ff00ff" />
            <Astronaut position={[0, 0.1, -0.4]} />

            <SpaceDesk position={[2, -0.5, 0]} monitorColor="#00ff88" />
            <Astronaut position={[2, 0.1, 0.6]} />

            {/* Satellites */}
            <Satellite position={[-4, 3, -3]} />
            <Satellite position={[4, 4, -5]} />

            {/* Stars */}
            <SpaceParticles />
        </>
    )
}

/**
 * SpaceStation3D Component
 * Space-themed 3D background
 */
function SpaceStation3D() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                shadows
                camera={{ position: [8, 5, 8], fov: 45 }}
                style={{ background: 'linear-gradient(to bottom, #0a0a1a, #1a1a3a)' }}
            >
                <SpaceScene />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.2}
                    maxPolarAngle={Math.PI / 2.2}
                    minPolarAngle={Math.PI / 4}
                />
                <Environment preset="night" />
            </Canvas>

            {/* Label */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none bg-slate-900/70 backdrop-blur-sm px-6 py-3 rounded-xl border border-purple-500/50">
                <p className="text-purple-300 font-mono text-sm tracking-widest font-bold drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">🚀 MUDGALOVERSEAS STATION 🛸</p>
                <p className="text-cyan-300 font-mono text-xs mt-1 font-semibold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">Orbiting Earth • Making Games in Space</p>
            </div>
        </div>
    )
}

export default SpaceStation3D
