import { useState } from 'react'
import Window from './Window'
import Clock from './Clock'
import { FolderIcon, PlayIcon, MessageSquareIcon, FileTextIcon, UsersIcon } from './Icons'
import { ProductOS, PancakeVideo, TalkToHuman, ChangeLog, Team } from './apps'

/**
 * Desktop icon configuration
 */
const DESKTOP_ICONS = [
  { id: 'product-os', name: 'Game OS', icon: FolderIcon, color: 'text-accent-yellow' },
  { id: 'pancake', name: 'pancake.mov', icon: PlayIcon, color: 'text-accent-red' },
  { id: 'talk', name: 'Talk to Human', icon: MessageSquareIcon, color: 'text-accent-cyan' },
  { id: 'team', name: 'Team', icon: UsersIcon, color: 'text-accent-green' },
  { id: 'changelog', name: 'Change Log', icon: FileTextIcon, color: 'text-accent-purple' },
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
}

/**
 * Desktop Component
 * Main desktop environment with icons and window management
 */
function Desktop() {
  const [windows, setWindows] = useState([])
  const [maxZIndex, setMaxZIndex] = useState(100)

  const openWindow = (id) => {
    // If window already open, just focus it
    if (windows.find(w => w.id === id)) {
      focusWindow(id)
      return
    }

    const config = WINDOW_CONFIGS[id]
    const newZ = maxZIndex + 1
    setMaxZIndex(newZ)

    setWindows(prev => [...prev, {
      id,
      title: config.title,
      Component: config.component,
      position: { 
        x: 150 + (prev.length * 30), 
        y: 80 + (prev.length * 30) 
      },
      size: config.size,
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
    <div className="fixed inset-0 bg-slate-950 crt-flicker">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #7aa2f7 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Desktop Icons */}
      <div className="absolute left-6 top-6 space-y-2">
        {DESKTOP_ICONS.map((icon) => {
          const IconComponent = icon.icon
          return (
            <div
              key={icon.id}
              onClick={() => openWindow(icon.id)}
              className="icon-container relative flex flex-col items-center p-3 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-colors group w-20"
            >
              <div className="icon-glow" />
              <div className={`${icon.color} mb-2 group-hover:scale-110 transition-transform`}>
                <IconComponent />
              </div>
              <span className="text-slate-400 text-xs text-center font-mono group-hover:text-slate-200 transition-colors">
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
          >
            <WindowContent />
          </Window>
        )
      })}

      {/* Clock */}
      <Clock />

      {/* Status Bar */}
      <div className="absolute bottom-4 right-4 text-slate-600 font-mono text-xs">
        MUDGALOVERSEAS_OS v2.0.1
      </div>
    </div>
  )
}

export default Desktop
