import { useState, useEffect } from 'react'
import Window from './Window'
import Clock from './Clock'
import Office3D from './Office3D'
import SpaceStation3D from './SpaceStation3D'
import Forest3D from './Forest3D'
import MobileBackground3D from './MobileBackground3D'
import { FolderIcon, PlayIcon, MessageSquareIcon, FileTextIcon, UsersIcon, BriefcaseIcon, SettingsIcon } from './Icons'
import { ProductOS, PancakeVideo, TalkToHuman, ChangeLog, Team, WorkHere, Settings } from './apps'
import { useSettings } from '../context/SettingsContext'
import { useSounds } from '../hooks/useSounds'

/**
 * Desktop icon configuration
 */
const DESKTOP_ICONS = [
  { id: 'product-os', name: 'Game OS', icon: FolderIcon, color: 'text-accent-yellow' },
  { id: 'pancake', name: 'pancake.mov', icon: PlayIcon, color: 'text-accent-red' },
  { id: 'talk', name: 'Talk to Human', icon: MessageSquareIcon, color: 'text-accent-cyan' },
  { id: 'team', name: 'Team', icon: UsersIcon, color: 'text-accent-green' },
  { id: 'workhere', name: 'Work Here', icon: BriefcaseIcon, color: 'text-accent-blue' },
  { id: 'settings', name: 'Settings', icon: SettingsIcon, color: 'text-accent-purple' },
]

/**
 * Window configuration for each app
 */
const WINDOW_CONFIGS = {
  'product-os': {
    title: 'Game OS',
    component: ProductOS,
    size: { width: 500, height: 450 }
  },
  'pancake': {
    title: 'pancake.mov',
    component: PancakeVideo,
    size: { width: 500, height: 400 }
  },
  'talk': {
    title: 'Talk to Human',
    component: TalkToHuman,
    size: { width: 450, height: 500 }
  },
  'changelog': {
    title: 'changelog.txt',
    component: ChangeLog,
    size: { width: 500, height: 450 }
  },
  'team': {
    title: 'Team',
    component: Team,
    size: { width: 450, height: 500 }
  },
  'workhere': {
    title: 'Careers - Work Here',
    component: WorkHere,
    size: { width: 900, height: 600 }
  },
  'settings': {
    title: 'Settings',
    component: Settings,
    size: { width: 400, height: 500 }
  },
}

/**
 * Check if device is mobile
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

/**
 * Desktop Component
 * Main desktop environment with icons and window management
 */
function Desktop() {
  const [windows, setWindows] = useState([])
  const [maxZIndex, setMaxZIndex] = useState(100)
  const isMobile = useIsMobile()
  const { wallpaper, theme } = useSettings()
  const { playClick, playWindowOpen, playWindowClose } = useSounds()

  const openWindow = (id) => {
    // If window already open, just focus it
    if (windows.find(w => w.id === id)) {
      focusWindow(id)
      return
    }

    const config = WINDOW_CONFIGS[id]
    const newZ = maxZIndex + 1
    setMaxZIndex(newZ)

    // Mobile: fullscreen windows, Desktop: positioned windows
    const mobileSize = {
      width: window.innerWidth,
      height: window.innerHeight - 60
    }
    const mobilePosition = { x: 0, y: 0 }

    setWindows(prev => [...prev, {
      id,
      title: config.title,
      Component: config.component,
      position: isMobile ? mobilePosition : {
        x: 150 + (prev.length * 30),
        y: 80 + (prev.length * 30)
      },
      size: isMobile ? mobileSize : config.size,
      zIndex: newZ,
    }])
  }

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }

  const focusWindow = (id) => {
    const newZ = maxZIndex + 1
    setMaxZIndex(newZ)
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, zIndex: newZ } : w
    ))
  }

  return (
    <div className={`fixed inset-0 crt-flicker overflow-hidden transition-colors duration-300 ${isMobile ? 'bg-slate-950' : (theme === 'light' ? 'bg-slate-200' : 'bg-slate-950')
      }`}>
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #7aa2f7 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* 3D Background - Dynamic based on wallpaper setting */}
      {!isMobile && (
        <>
          {wallpaper === 'office' && <Office3D />}
          {wallpaper === 'space' && <SpaceStation3D />}
          {wallpaper === 'forest' && <Forest3D />}
        </>
      )}

      {/* Mobile 3D Background - Lightweight version for mobile */}
      {isMobile && <MobileBackground3D />}

      {/* Mobile Branding */}
      {isMobile && (
        <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center pointer-events-none z-5">
          <div className="text-center">
            <h1
              className="text-2xl font-bold tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #7aa2f7 0%, #bb9af7 50%, #f7768e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(122, 162, 247, 0.4)',
              }}
            >
              MUDGALOVERSEAS
            </h1>
            <p className="text-slate-400 text-xs font-mono mt-1 tracking-widest">
              INDIE GAME STUDIO
            </p>
          </div>
        </div>
      )}

      {/* Desktop Icons - Grid layout on mobile */}
      <div className={`absolute z-10 ${isMobile
        ? 'inset-x-4 top-4 grid grid-cols-3 gap-3'
        : 'left-6 top-6 space-y-2'
        }`}>
        {DESKTOP_ICONS.map((icon) => {
          const IconComponent = icon.icon
          return (
            <div
              key={icon.id}
              onClick={() => {
                playClick()
                openWindow(icon.id)
              }}
              className={`icon-container relative flex flex-col items-center p-3 rounded-lg cursor-pointer backdrop-blur-sm transition-all group ${isMobile ? 'w-full' : 'w-20'} ${theme === 'light'
                ? 'bg-white/70 border border-slate-300/50 hover:bg-white/90 hover:border-slate-400/50'
                : 'bg-slate-900/70 border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50'
                }`}
            >
              <div className="icon-glow" />
              <div className={`${icon.color} mb-2 group-hover:scale-110 transition-transform ${isMobile ? 'scale-110' : ''}`}>
                <IconComponent />
              </div>
              <span className={`text-center font-mono transition-colors drop-shadow-md ${isMobile ? 'text-[10px] leading-tight' : 'text-xs'} ${theme === 'light' ? 'text-slate-700 group-hover:text-slate-900' : 'text-slate-300 group-hover:text-white'
                }`}>
                {icon.name}
              </span>
            </div>
          )
        })}
      </div>

      {/* Windows */}
      {windows.map((win) => {
        const WindowContent = win.Component
        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            onClose={closeWindow}
            onFocus={focusWindow}
            zIndex={win.zIndex}
            initialPosition={win.position}
            initialSize={win.size}
            isMobile={isMobile}
          >
            <WindowContent />
          </Window>
        )
      })}

      {/* Clock - Repositioned on mobile */}
      <Clock isMobile={isMobile} />

      {/* Status Bar - Hidden on mobile */}
      {!isMobile && (
        <div className="absolute bottom-4 right-4 text-slate-600 font-mono text-xs">
          MUDGALOVERSEAS v2.0.1
        </div>
      )}
    </div>
  )
}

export default Desktop
