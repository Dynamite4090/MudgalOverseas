import { useState, useEffect, useRef } from 'react'
import { TerminalIcon } from './Icons'

/**
 * Boot sequence messages displayed during loading
 */
const BOOT_SEQUENCE = [
  '> INITIALIZING KERNEL...',
  '> LOADING SYSTEM MODULES...',
  '> ESTABLISHING SECURE CONNECTION...',
  '> MOUNTING VIRTUAL DRIVES...',
  '> LOADING USER INTERFACE...',
  '> SYSTEM READY.',
]

/**
 * LoginScreen Component
 * Displays the system initialization and login interface
 */
function LoginScreen({ onLogin }) {
  const [phase, setPhase] = useState('init') // init | loading | ready
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [bootLines, setBootLines] = useState([])
  const intervalRef = useRef(null)
  const lineIndexRef = useRef(0)

  useEffect(() => {
    if (phase === 'loading') {
      // Reset state
      setBootLines([])
      setLoadingProgress(0)
      lineIndexRef.current = 0
      
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      
      intervalRef.current = setInterval(() => {
        if (lineIndexRef.current < BOOT_SEQUENCE.length) {
          const currentLine = BOOT_SEQUENCE[lineIndexRef.current]
          setBootLines(prev => [...prev, currentLine])
          setLoadingProgress(((lineIndexRef.current + 1) / BOOT_SEQUENCE.length) * 100)
          lineIndexRef.current++
        } else {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          setTimeout(() => setPhase('ready'), 500)
        }
      }, 400)
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }
  }, [phase])

  const handleInitialize = () => {
    setPhase('loading')
  }

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center crt-flicker p-4">
      <div className="text-center w-full max-w-md">
        {/* Logo */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-2 tracking-wider">
          <span className="text-slate-400">MUDGAL</span>
          <span className="text-accent-blue glow-text-subtle">OVERSEAS</span>
        </h1>
        <p className="text-slate-500 tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-8 sm:mb-12 font-mono">
          INDIE GAME STUDIO
        </p>

        {/* Terminal Box */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 sm:p-6 w-full max-w-[400px] mx-auto">
          {/* Initial State */}
          {phase === 'init' && (
            <div className="fade-in">
              <div className="flex items-center gap-2 text-slate-400 font-mono text-xs sm:text-sm mb-4 sm:mb-6">
                <TerminalIcon />
                <span>SECURE_LOGIN_V1</span>
              </div>
              <button
                onClick={handleInitialize}
                className="w-full py-3 sm:py-4 bg-accent-blue/20 hover:bg-accent-blue/30 active:bg-accent-blue/40 border border-accent-blue/50 rounded-lg text-accent-blue font-mono tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20 text-sm sm:text-base"
              >
                INITIALIZE SYSTEM →
              </button>
            </div>
          )}

          {/* Loading State */}
          {phase === 'loading' && (
            <div className="text-left font-mono text-sm">
              {bootLines.map((line, i) => (
                <div 
                  key={i} 
                  className={`boot-text ${line.includes('READY') ? 'text-accent-green' : 'text-slate-400'}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {line}
                </div>
              ))}
              <div className="mt-4">
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent-green transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Ready State */}
          {phase === 'ready' && (
            <div className="fade-in">
              <div className="text-accent-green font-mono text-sm mb-4">
                &gt; AUTHENTICATION COMPLETE
              </div>
              <button
                onClick={onLogin}
                className="w-full py-4 bg-accent-green/20 hover:bg-accent-green/30 border border-accent-green/50 rounded-lg text-accent-green font-mono tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-accent-green/20"
              >
                ENTER SYSTEM →
              </button>
            </div>
          )}
        </div>

        {/* Version Info */}
        <p className="text-slate-600 text-xs font-mono mt-8">
          v2.0.1 | BUILD 20251216
        </p>
      </div>
    </div>
  )
}

export default LoginScreen
