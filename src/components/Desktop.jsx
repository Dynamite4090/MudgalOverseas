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

      {/* Center Illustration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          {/* Office Illustration Container */}
          <div className="w-[700px] h-[450px] relative opacity-90">
            {/* Isometric Office SVG Illustration */}
            <svg viewBox="0 0 700 450" className="w-full h-full">
              {/* Main Floor */}
              <polygon points="350,380 600,250 350,120 100,250" fill="#3d4f5f" stroke="#4a6572" strokeWidth="2"/>
              <polygon points="350,120 600,250 600,290 350,160" fill="#2d3a44" stroke="#4a6572" strokeWidth="1"/>
              <polygon points="350,120 100,250 100,290 350,160" fill="#344955" stroke="#4a6572" strokeWidth="1"/>
              
              {/* Carpet Area */}
              <polygon points="200,300 350,220 500,300 350,380" fill="#5d4e37" opacity="0.6"/>

              {/* Cubicle Walls - Back */}
              <g transform="translate(180, 180)">
                <polygon points="0,40 80,-20 80,30 0,90" fill="#c9a66b" stroke="#b8956a" strokeWidth="1"/>
                <polygon points="80,-20 160,40 160,90 80,30" fill="#d4b896" stroke="#b8956a" strokeWidth="1"/>
              </g>
              
              <g transform="translate(320, 160)">
                <polygon points="0,40 80,-20 80,30 0,90" fill="#c9a66b" stroke="#b8956a" strokeWidth="1"/>
                <polygon points="80,-20 160,40 160,90 80,30" fill="#d4b896" stroke="#b8956a" strokeWidth="1"/>
              </g>

              {/* Desk 1 - Left Back */}
              <g transform="translate(160, 230)">
                <polygon points="0,0 50,-25 100,0 50,25" fill="#5c5346"/>
                <polygon points="0,0 0,10 50,35 50,25" fill="#4a4339"/>
                <polygon points="50,25 50,35 100,10 100,0" fill="#524a3e"/>
                {/* Monitor */}
                <rect x="25" y="-45" width="28" height="22" fill="#1a1a2e" stroke="#7aa2f7" strokeWidth="1"/>
                <rect x="36" y="-23" width="6" height="8" fill="#4a4339"/>
                {/* Keyboard */}
                <rect x="28" y="-8" width="22" height="6" rx="1" fill="#2d2d2d"/>
                {/* Chair */}
                <ellipse cx="50" cy="35" rx="15" ry="8" fill="#4a7c59"/>
                {/* Cat Character */}
                <g transform="translate(50, 10)">
                  <ellipse cx="0" cy="-8" rx="10" ry="12" fill="#f5f5f5"/>
                  <polygon points="-8,-18 -4,-28 0,-18" fill="#f5f5f5"/>
                  <polygon points="0,-18 4,-28 8,-18" fill="#f5f5f5"/>
                  <circle cx="-4" cy="-10" r="2" fill="#1a1a2e"/>
                  <circle cx="4" cy="-10" r="2" fill="#1a1a2e"/>
                  <path d="M-2,-5 Q0,-3 2,-5" stroke="#ffb6c1" strokeWidth="1" fill="none"/>
                </g>
              </g>

              {/* Desk 2 - Center Back */}
              <g transform="translate(300, 200)">
                <polygon points="0,0 50,-25 100,0 50,25" fill="#5c5346"/>
                <polygon points="0,0 0,10 50,35 50,25" fill="#4a4339"/>
                <polygon points="50,25 50,35 100,10 100,0" fill="#524a3e"/>
                {/* Monitor */}
                <rect x="25" y="-45" width="28" height="22" fill="#1a1a2e" stroke="#9ece6a" strokeWidth="1"/>
                <rect x="36" y="-23" width="6" height="8" fill="#4a4339"/>
                {/* Chair */}
                <ellipse cx="50" cy="35" rx="15" ry="8" fill="#4a7c59"/>
                {/* Panda Character */}
                <g transform="translate(50, 10)">
                  <ellipse cx="0" cy="-8" rx="11" ry="13" fill="#f5f5f5"/>
                  <ellipse cx="-6" cy="-14" rx="5" ry="4" fill="#1a1a2e"/>
                  <ellipse cx="6" cy="-14" rx="5" ry="4" fill="#1a1a2e"/>
                  <circle cx="-4" cy="-8" r="3" fill="#1a1a2e"/>
                  <circle cx="4" cy="-8" r="3" fill="#1a1a2e"/>
                  <ellipse cx="0" cy="-3" rx="3" ry="2" fill="#1a1a2e"/>
                </g>
              </g>

              {/* Desk 3 - Right Back */}
              <g transform="translate(440, 230)">
                <polygon points="0,0 50,-25 100,0 50,25" fill="#5c5346"/>
                <polygon points="0,0 0,10 50,35 50,25" fill="#4a4339"/>
                <polygon points="50,25 50,35 100,10 100,0" fill="#524a3e"/>
                {/* Monitor */}
                <rect x="25" y="-45" width="28" height="22" fill="#1a1a2e" stroke="#bb9af7" strokeWidth="1"/>
                <rect x="36" y="-23" width="6" height="8" fill="#4a4339"/>
                {/* Chair */}
                <ellipse cx="50" cy="35" rx="15" ry="8" fill="#4a7c59"/>
                {/* Dog/Pug Character */}
                <g transform="translate(50, 10)">
                  <ellipse cx="0" cy="-6" rx="12" ry="10" fill="#d4a574"/>
                  <ellipse cx="0" cy="-2" rx="8" ry="6" fill="#f5e6d3"/>
                  <circle cx="-5" cy="-8" r="3" fill="#1a1a2e"/>
                  <circle cx="5" cy="-8" r="3" fill="#1a1a2e"/>
                  <ellipse cx="0" cy="-2" rx="4" ry="3" fill="#1a1a2e"/>
                </g>
              </g>

              {/* Desk 4 - Left Front */}
              <g transform="translate(200, 300)">
                <polygon points="0,0 50,-25 100,0 50,25" fill="#5c5346"/>
                <polygon points="0,0 0,10 50,35 50,25" fill="#4a4339"/>
                <polygon points="50,25 50,35 100,10 100,0" fill="#524a3e"/>
                {/* Monitor */}
                <rect x="25" y="-45" width="28" height="22" fill="#1a1a2e" stroke="#7dcfff" strokeWidth="1"/>
                <rect x="36" y="-23" width="6" height="8" fill="#4a4339"/>
                {/* Chair */}
                <ellipse cx="50" cy="35" rx="15" ry="8" fill="#4a7c59"/>
                {/* Penguin Character */}
                <g transform="translate(50, 8)">
                  <ellipse cx="0" cy="-6" rx="9" ry="14" fill="#1a1a2e"/>
                  <ellipse cx="0" cy="-2" rx="6" ry="9" fill="#f5f5f5"/>
                  <circle cx="-3" cy="-10" r="2" fill="#f5f5f5"/>
                  <circle cx="3" cy="-10" r="2" fill="#f5f5f5"/>
                  <polygon points="-2,-6 0,-2 2,-6" fill="#ff9e64"/>
                </g>
              </g>

              {/* Desk 5 - Right Front */}
              <g transform="translate(400, 300)">
                <polygon points="0,0 50,-25 100,0 50,25" fill="#5c5346"/>
                <polygon points="0,0 0,10 50,35 50,25" fill="#4a4339"/>
                <polygon points="50,25 50,35 100,10 100,0" fill="#524a3e"/>
                {/* Monitor */}
                <rect x="25" y="-45" width="28" height="22" fill="#1a1a2e" stroke="#f7768e" strokeWidth="1"/>
                <rect x="36" y="-23" width="6" height="8" fill="#4a4339"/>
                {/* Chair */}
                <ellipse cx="50" cy="35" rx="15" ry="8" fill="#4a7c59"/>
                {/* Fox Character */}
                <g transform="translate(50, 10)">
                  <ellipse cx="0" cy="-6" rx="10" ry="12" fill="#ff9e64"/>
                  <polygon points="-8,-16 -4,-26 0,-16" fill="#ff9e64"/>
                  <polygon points="0,-16 4,-26 8,-16" fill="#ff9e64"/>
                  <circle cx="-4" cy="-8" r="2" fill="#1a1a2e"/>
                  <circle cx="4" cy="-8" r="2" fill="#1a1a2e"/>
                  <ellipse cx="0" cy="-2" rx="4" ry="3" fill="#f5f5f5"/>
                  <ellipse cx="0" cy="-1" rx="2" ry="1.5" fill="#1a1a2e"/>
                </g>
              </g>

              {/* Coffee Station */}
              <g transform="translate(530, 180)">
                <rect x="0" y="0" width="50" height="60" fill="#4a5568" rx="2"/>
                <rect x="5" y="5" width="40" height="25" fill="#2d3748"/>
                <rect x="10" y="35" width="12" height="15" fill="#6b7280"/>
                <rect x="28" y="38" width="15" height="10" fill="#374151"/>
                {/* Coffee cup */}
                <rect x="32" y="28" width="8" height="10" fill="#f5f5f5"/>
                {/* Squirrel */}
                <g transform="translate(25, -15)">
                  <ellipse cx="0" cy="0" rx="8" ry="10" fill="#c9a66b"/>
                  <circle cx="-3" cy="-2" r="1.5" fill="#1a1a2e"/>
                  <circle cx="3" cy="-2" r="1.5" fill="#1a1a2e"/>
                  <ellipse cx="0" cy="3" rx="2" ry="1" fill="#1a1a2e"/>
                  <path d="M8,5 Q20,0 15,-15" stroke="#c9a66b" strokeWidth="6" fill="none"/>
                </g>
              </g>

              {/* Plants */}
              <g transform="translate(100, 290)">
                <rect x="5" y="10" width="18" height="25" fill="#8b5a2b"/>
                <ellipse cx="14" cy="5" rx="18" ry="22" fill="#4a7c59"/>
                <ellipse cx="14" cy="0" rx="14" ry="18" fill="#5a9c69"/>
              </g>
              
              <g transform="translate(560, 280)">
                <rect x="5" y="10" width="18" height="25" fill="#8b5a2b"/>
                <ellipse cx="14" cy="5" rx="18" ry="22" fill="#4a7c59"/>
                <ellipse cx="14" cy="0" rx="14" ry="18" fill="#5a9c69"/>
              </g>

              <g transform="translate(330, 100)">
                <rect x="5" y="10" width="14" height="20" fill="#8b5a2b"/>
                <ellipse cx="12" cy="5" rx="15" ry="18" fill="#4a7c59"/>
              </g>

              {/* Window/Glass Panel - Right side */}
              <g transform="translate(520, 60)">
                <rect x="0" y="0" width="100" height="80" fill="none" stroke="#7aa2f7" strokeWidth="2" opacity="0.4"/>
                <line x1="50" y1="0" x2="50" y2="80" stroke="#7aa2f7" strokeWidth="1" opacity="0.3"/>
                <line x1="0" y1="40" x2="100" y2="40" stroke="#7aa2f7" strokeWidth="1" opacity="0.3"/>
                {/* City silhouette */}
                <rect x="10" y="50" width="15" height="25" fill="#4a5568" opacity="0.3"/>
                <rect x="30" y="40" width="20" height="35" fill="#4a5568" opacity="0.3"/>
                <rect x="55" y="55" width="12" height="20" fill="#4a5568" opacity="0.3"/>
                <rect x="72" y="45" width="18" height="30" fill="#4a5568" opacity="0.3"/>
              </g>

              {/* Window - Left side */}
              <g transform="translate(80, 100)">
                <rect x="0" y="0" width="60" height="70" fill="none" stroke="#7aa2f7" strokeWidth="2" opacity="0.4"/>
                <line x1="30" y1="0" x2="30" y2="70" stroke="#7aa2f7" strokeWidth="1" opacity="0.3"/>
              </g>

              {/* Filing Cabinet */}
              <g transform="translate(130, 320)">
                <rect x="0" y="0" width="30" height="45" fill="#5c5c5c"/>
                <rect x="3" y="5" width="24" height="12" fill="#4a4a4a" stroke="#6b6b6b" strokeWidth="1"/>
                <rect x="3" y="20" width="24" height="12" fill="#4a4a4a" stroke="#6b6b6b" strokeWidth="1"/>
                <rect x="3" y="35" width="24" height="8" fill="#4a4a4a" stroke="#6b6b6b" strokeWidth="1"/>
              </g>

              {/* Floating particles */}
              <circle cx="200" cy="100" r="2" fill="#7aa2f7" opacity="0.6">
                <animate attributeName="cy" values="100;85;100" dur="4s" repeatCount="indefinite"/>
              </circle>
              <circle cx="450" cy="90" r="2" fill="#bb9af7" opacity="0.6">
                <animate attributeName="cy" values="90;75;90" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="350" cy="70" r="3" fill="#9ece6a" opacity="0.5">
                <animate attributeName="cy" values="70;55;70" dur="5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="550" cy="150" r="2" fill="#7dcfff" opacity="0.5">
                <animate attributeName="cy" values="150;135;150" dur="3.5s" repeatCount="indefinite"/>
              </circle>
            </svg>

            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-accent-blue/5 via-transparent to-transparent rounded-full blur-3xl" />
          </div>

          {/* Studio Label */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
            <p className="text-slate-500 font-mono text-sm tracking-widest">MUDGALOVERSEAS HQ</p>
            <p className="text-slate-600 font-mono text-xs mt-1">Where games come to life ✨</p>
          </div>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute left-6 top-6 space-y-2 z-10">
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
