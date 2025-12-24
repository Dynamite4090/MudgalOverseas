import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

/**
 * Forest Floor - Grassy ground with moss
 */
function ForestFloor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#2d5a3d" roughness={0.9} />
        </mesh>
    )
}

/**
 * Tree Component
 */
function Tree({ position, scale = 1 }) {
    return (
        <group position={position} scale={scale}>
            {/* Trunk */}
            <mesh position={[0, 0.8, 0]} castShadow>
                <cylinderGeometry args={[0.15, 0.2, 1.6, 8]} />
                <meshStandardMaterial color="#5c3d2e" roughness={0.9} />
            </mesh>
            {/* Leaves layers */}
            <mesh position={[0, 2, 0]} castShadow>
                <coneGeometry args={[0.8, 1.5, 8]} />
                <meshStandardMaterial color="#1a5c32" />
            </mesh>
            <mesh position={[0, 2.8, 0]} castShadow>
                <coneGeometry args={[0.6, 1.2, 8]} />
                <meshStandardMaterial color="#24703c" />
            </mesh>
            <mesh position={[0, 3.4, 0]} castShadow>
                <coneGeometry args={[0.4, 0.9, 8]} />
                <meshStandardMaterial color="#2e8446" />
            </mesh>
        </group>
    )
}

/**
 * Mushroom Component
 */
function Mushroom({ position, color = '#ff6b6b', scale = 1 }) {
    return (
        <group position={position} scale={scale}>
            {/* Stem */}
            <mesh position={[0, 0.08, 0]} castShadow>
                <cylinderGeometry args={[0.03, 0.04, 0.15, 8]} />
                <meshStandardMaterial color="#f5f5dc" />
            </mesh>
            {/* Cap */}
            <mesh position={[0, 0.18, 0]} castShadow>
                <sphereGeometry args={[0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color={color} />
            </mesh>
            {/* Spots */}
            <mesh position={[0.03, 0.22, 0.02]}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[-0.02, 0.2, 0.04]}>
                <sphereGeometry args={[0.01, 8, 8]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
        </group>
    )
}

/**
 * Woodland Desk - Natural stump desk
 */
function WoodlandDesk({ position }) {
    return (
        <group position={position}>
            {/* Tree stump as desk */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.5, 0.6, 0.6, 12]} />
                <meshStandardMaterial color="#5c4033" roughness={0.9} />
            </mesh>
            {/* Wood rings on top */}
            <mesh position={[0, 0.61, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.1, 0.45, 24]} />
                <meshStandardMaterial color="#8b6914" />
            </mesh>
            {/* Leaf laptop */}
            <group position={[0, 0.65, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[0.35, 0.02, 0.25]} />
                    <meshStandardMaterial color="#3d5c2e" />
                </mesh>
                {/* Screen (magic leaf) */}
                <mesh position={[0, 0.1, -0.08]} rotation={[-0.3, 0, 0]}>
                    <boxGeometry args={[0.3, 0.2, 0.01]} />
                    <meshStandardMaterial color="#90EE90" emissive="#50C878" emissiveIntensity={0.4} />
                </mesh>
            </group>
        </group>
    )
}

/**
 * Squirrel Character
 */
function Squirrel({ position }) {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02
        }
    })

    return (
        <group ref={meshRef} position={position}>
            {/* Body */}
            <mesh position={[0, 0, 0]} castShadow>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="#8b4513" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.12, 0.05]} castShadow>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#a0522d" />
            </mesh>
            {/* Ears */}
            <mesh position={[-0.05, 0.2, 0.03]}>
                <coneGeometry args={[0.02, 0.04, 4]} />
                <meshStandardMaterial color="#8b4513" />
            </mesh>
            <mesh position={[0.05, 0.2, 0.03]}>
                <coneGeometry args={[0.02, 0.04, 4]} />
                <meshStandardMaterial color="#8b4513" />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.025, 0.14, 0.11]}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.025, 0.14, 0.11]}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Tail */}
            <mesh position={[0, 0.05, -0.15]} rotation={[-0.5, 0, 0]} castShadow>
                <capsuleGeometry args={[0.04, 0.2, 4, 8]} />
                <meshStandardMaterial color="#a0522d" />
            </mesh>
        </group>
    )
}

/**
 * Deer Character
 */
function Deer({ position }) {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }
    })

    return (
        <group ref={meshRef} position={position}>
            {/* Body */}
            <mesh position={[0, 0.3, 0]} castShadow rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
                <meshStandardMaterial color="#d2691e" />
            </mesh>
            {/* Head */}
            <mesh position={[0.35, 0.45, 0]} castShadow>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="#d2691e" />
            </mesh>
            {/* Antlers */}
            <mesh position={[0.38, 0.6, 0.03]} rotation={[0, 0, 0.3]}>
                <cylinderGeometry args={[0.01, 0.02, 0.2, 4]} />
                <meshStandardMaterial color="#8b4513" />
            </mesh>
            <mesh position={[0.38, 0.6, -0.03]} rotation={[0, 0, -0.3]}>
                <cylinderGeometry args={[0.01, 0.02, 0.2, 4]} />
                <meshStandardMaterial color="#8b4513" />
            </mesh>
            {/* Legs */}
            {[[-0.15, 0, 0.08], [-0.15, 0, -0.08], [0.15, 0, 0.08], [0.15, 0, -0.08]].map((pos, i) => (
                <mesh key={i} position={pos} castShadow>
                    <cylinderGeometry args={[0.02, 0.025, 0.3, 6]} />
                    <meshStandardMaterial color="#8b4513" />
                </mesh>
            ))}
        </group>
    )
}

/**
 * Fireflies
 */
function Fireflies() {
    const particlesRef = useRef()

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < 50; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 15,
                    Math.random() * 3 + 0.5,
                    (Math.random() - 0.5) * 15,
                ],
                speed: Math.random() * 0.5 + 0.3,
                phase: Math.random() * Math.PI * 2,
            })
        }
        return temp
    }, [])

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.children.forEach((firefly, i) => {
                const p = particles[i]
                // Floating movement
                firefly.position.y = p.position[1] + Math.sin(state.clock.elapsedTime * p.speed + p.phase) * 0.3
                firefly.position.x = p.position[0] + Math.sin(state.clock.elapsedTime * 0.5 + p.phase) * 0.2
                // Glowing effect
                firefly.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3 + p.phase) * 0.4
            })
        }
    })

    return (
        <group ref={particlesRef}>
            {particles.map((p, i) => (
                <mesh key={i} position={p.position}>
                    <sphereGeometry args={[0.03, 8, 8]} />
                    <meshStandardMaterial
                        color="#ffff00"
                        emissive="#ffff00"
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            ))}
        </group>
    )
}

/**
 * Campfire
 */
function Campfire({ position }) {
    const flameRef = useRef()

    useFrame((state) => {
        if (flameRef.current) {
            flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.2
            flameRef.current.rotation.y += 0.05
        }
    })

    return (
        <group position={position}>
            {/* Logs */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180
                return (
                    <mesh
                        key={i}
                        position={[Math.sin(rad) * 0.15, 0.05, Math.cos(rad) * 0.15]}
                        rotation={[Math.PI / 2, rad, 0]}
                        castShadow
                    >
                        <cylinderGeometry args={[0.03, 0.04, 0.25, 6]} />
                        <meshStandardMaterial color="#3d2817" />
                    </mesh>
                )
            })}
            {/* Flames */}
            <group ref={flameRef} position={[0, 0.15, 0]}>
                <mesh>
                    <coneGeometry args={[0.1, 0.3, 8]} />
                    <meshStandardMaterial color="#ff4500" emissive="#ff4500" emissiveIntensity={1} transparent opacity={0.9} />
                </mesh>
                <mesh position={[0.03, 0.05, 0]}>
                    <coneGeometry args={[0.05, 0.2, 6]} />
                    <meshStandardMaterial color="#ffa500" emissive="#ffa500" emissiveIntensity={1} transparent opacity={0.8} />
                </mesh>
            </group>
            {/* Light from fire */}
            <pointLight position={[0, 0.3, 0]} intensity={1} color="#ff6600" distance={5} />
        </group>
    )
}

/**
 * Main Forest Scene
 */
function ForestScene() {
    return (
        <>
            {/* Lighting - Warm forest light */}
            <ambientLight intensity={0.4} color="#90a090" />
            <directionalLight
                position={[5, 8, 5]}
                intensity={0.5}
                castShadow
                color="#fff5e6"
            />

            {/* Floor */}
            <ForestFloor />

            {/* Trees in background */}
            <Tree position={[-5, -0.5, -4]} scale={1.2} />
            <Tree position={[-3, -0.5, -5]} scale={0.9} />
            <Tree position={[0, -0.5, -6]} scale={1.1} />
            <Tree position={[3, -0.5, -5]} scale={0.95} />
            <Tree position={[5, -0.5, -4]} scale={1.15} />
            <Tree position={[-6, -0.5, -2]} scale={1} />
            <Tree position={[6, -0.5, -2]} scale={1.05} />

            {/* Mushrooms scattered around */}
            <Mushroom position={[-2, -0.5, 1]} color="#ff6b6b" scale={1.2} />
            <Mushroom position={[1.5, -0.5, 2]} color="#ffd93d" scale={0.8} />
            <Mushroom position={[-3, -0.5, -1]} color="#ff6b6b" scale={1} />
            <Mushroom position={[3, -0.5, 0]} color="#c084fc" scale={1.1} />

            {/* Workstations */}
            <WoodlandDesk position={[-2, -0.5, 0]} />
            <Squirrel position={[-2, 0.2, 0.5]} />

            <WoodlandDesk position={[0, -0.5, -1]} />
            <Squirrel position={[0, 0.2, -0.5]} />

            <WoodlandDesk position={[2, -0.5, 0]} />
            <Squirrel position={[2, 0.2, 0.5]} />

            {/* Deer in background */}
            <Deer position={[4, -0.5, 2]} />

            {/* Campfire */}
            <Campfire position={[0, -0.5, 3]} />

            {/* Fireflies */}
            <Fireflies />
        </>
    )
}

/**
 * Forest3D Component
 * Enchanted forest themed 3D background
 */
function Forest3D() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                shadows
                camera={{ position: [8, 5, 8], fov: 45 }}
                style={{ background: 'linear-gradient(to bottom, #1a3a2a, #0d1f15)' }}
            >
                <ForestScene />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.15}
                    maxPolarAngle={Math.PI / 2.2}
                    minPolarAngle={Math.PI / 4}
                />
                <Environment preset="forest" />
            </Canvas>

            {/* Label */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none bg-slate-900/70 backdrop-blur-sm px-6 py-3 rounded-xl border border-emerald-500/50">
                <p className="text-emerald-300 font-mono text-sm tracking-widest font-bold drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]">🌲 MUDGALOVERSEAS GROVE 🍄</p>
                <p className="text-yellow-300 font-mono text-xs mt-1 font-semibold drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]">Where Magic & Games Grow Together</p>
            </div>
        </div>
    )
}

export default Forest3D
