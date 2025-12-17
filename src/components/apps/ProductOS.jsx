import { useState } from 'react'

/**
 * Icon components for different game categories
 */
const GameIcon = ({ color = '#7aa2f7' }) => (
  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
    <svg className="w-6 h-6" fill={color} viewBox="0 0 24 24">
      <path d="M21 6H3a2 2 0 00-2 2v8a2 2 0 002 2h18a2 2 0 002-2V8a2 2 0 00-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
    </svg>
  </div>
)

const RocketIcon = ({ color = '#bb9af7' }) => (
  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
    <svg className="w-6 h-6" fill={color} viewBox="0 0 24 24">
      <path d="M12 2.5c0 0 4.5 2.04 4.5 10.5 0 2.49-1.04 5.57-1.6 7H9.1c-.56-1.43-1.6-4.51-1.6-7C7.5 4.54 12 2.5 12 2.5zm2 8.5a2 2 0 10-4 0 2 2 0 004 0z"/>
    </svg>
  </div>
)

const PuzzleIcon = ({ color = '#9ece6a' }) => (
  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
    <svg className="w-6 h-6" fill={color} viewBox="0 0 24 24">
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 00-5 0V5H4c-1.1 0-2 .9-2 2v3.8h1.5c1.5 0 2.7 1.2 2.7 2.7s-1.2 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 000-5z"/>
    </svg>
  </div>
)

const SwordIcon = ({ color = '#f7768e' }) => (
  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
    <svg className="w-6 h-6" fill={color} viewBox="0 0 24 24">
      <path d="M6.92 5H5l9 9 1-.94-7.08-8.06zm10.06 9.32l.94.94-.94.94-3.76-3.76L12 13.66l5.32 5.32.94-.94-4.38-4.38 3.1-3.1-1.42-1.42-3.1 3.1-1.22-1.22 1.22-1.22 5.32 5.32zM15.06 5l3 3L17 9.06l-3-3L15.06 5z"/>
    </svg>
  </div>
)

const CarIcon = ({ color = '#ff9e64' }) => (
  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
    <svg className="w-6 h-6" fill={color} viewBox="0 0 24 24">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  </div>
)

const BulletIcon = ({ color = '#7dcfff' }) => (
  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
    <svg className="w-6 h-6" fill={color} viewBox="0 0 24 24">
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25v4.7z"/>
    </svg>
  </div>
)

const ChefIcon = ({ color = '#e0af68' }) => (
  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
    <svg className="w-6 h-6" fill={color} viewBox="0 0 24 24">
      <path d="M12 3C8.43 3 5.23 4.54 3.01 7H3c-1.1 0-2 .9-2 2 0 1.04.8 1.9 1.82 1.99L5 14.09V22h14v-7.91l2.18-3.1A2.003 2.003 0 0021 7h-.01A8.966 8.966 0 0012 3zm0 2c2.53 0 4.77 1.17 6.25 3H5.75A6.97 6.97 0 0112 5z"/>
    </svg>
  </div>
)

const ToolsIcon = ({ color = '#bb9af7' }) => (
  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
    <svg className="w-6 h-6" fill={color} viewBox="0 0 24 24">
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
    </svg>
  </div>
)

const ChartIcon = ({ color = '#9ece6a' }) => (
  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
    <svg className="w-6 h-6" fill={color} viewBox="0 0 24 24">
      <path d="M3.5 18.5l6-6 4 4L22 6.92 20.59 5.5l-7.09 8.58-4-4L2 18.5h1.5z"/>
    </svg>
  </div>
)

/**
 * Game data organized by categories
 */
const GAME_CATEGORIES = [
  {
    title: 'Active Development',
    items: [
      { name: 'Project Pancake', icon: ChefIcon, color: '#e0af68', badge: 'ALPHA', description: 'Cooking chaos adventure' },
    ]
  },
  {
    title: 'Upcoming',
    items: [
      { name: 'Bullet Boi', icon: BulletIcon, color: '#7dcfff', description: 'Bullet hell action' },
      { name: 'Burger Truck Simulator', icon: CarIcon, color: '#ff9e64', description: 'Food truck empire builder' },
    ]
  },
]

/**
 * Collapsible Section Component
 */
function Section({ title, count, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors w-full text-left mb-3"
      >
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
        <span className="font-medium">{title}</span>
        <span className="text-slate-500">({count})</span>
      </button>
      
      {isOpen && (
        <div className="grid grid-cols-3 gap-3">
          {children}
        </div>
      )}
    </div>
  )
}

/**
 * Game Card Component
 */
function GameCard({ name, icon: Icon, color, badge, description }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
        isHovered 
          ? 'bg-slate-700/80 border-accent-blue' 
          : 'bg-slate-800/50 border-slate-700'
      } border`}
    >
      <Icon color={color} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white truncate">{name}</span>
          {badge && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              badge === 'BETA' ? 'bg-accent-purple/30 text-accent-purple' :
              badge === 'ALPHA' ? 'bg-accent-yellow/30 text-accent-yellow' :
              'bg-accent-green/30 text-accent-green'
            }`}>
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 truncate">{description}</p>
      </div>
    </div>
  )
}

/**
 * ProductOS Component
 * PostHog-style game catalog with categories and grid layout
 */
function ProductOS() {
  return (
    <div className="h-full bg-slate-950 overflow-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 6H3a2 2 0 00-2 2v8a2 2 0 002 2h18a2 2 0 002-2V8a2 2 0 00-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Game OS</h1>
            <p className="text-xs text-slate-500">MudgalOverseas Game Catalog</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">v2.0.0</span>
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></div>
        </div>
      </div>

      {/* Categories */}
      {GAME_CATEGORIES.map((category, index) => (
        <Section 
          key={category.title} 
          title={category.title} 
          count={category.items.length}
          defaultOpen={index < 2}
        >
          {category.items.map((game, i) => (
            <GameCard key={i} {...game} />
          ))}
        </Section>
      ))}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
        <p className="text-slate-600 text-xs font-mono">
          Total: {GAME_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0)} items
        </p>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-yellow"></span>
            <span className="text-slate-500">Alpha</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-purple"></span>
            <span className="text-slate-500">Beta</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-green"></span>
            <span className="text-slate-500">New</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductOS
