import { useState } from 'react'

/**
 * Icon components for changelog items
 */
const GamepadIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 6H3a2 2 0 00-2 2v8a2 2 0 002 2h18a2 2 0 002-2V8a2 2 0 00-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
  </svg>
)

const RocketIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.5c0 0 4.5 2.04 4.5 10.5 0 2.49-1.04 5.57-1.6 7H9.1c-.56-1.43-1.6-4.51-1.6-7C7.5 4.54 12 2.5 12 2.5zm2 8.5a2 2 0 10-4 0 2 2 0 004 0zm-6.31 9.52a1 1 0 01-.13-1.41l1.55-2.04a1 1 0 011.48-.12l.7.62a1 1 0 01.12 1.35l-1.55 2.04a1 1 0 01-1.41.13l-.76-.57zm8.62 0a1 1 0 001.41-.13l1.55-2.04a1 1 0 00-.12-1.35l-.7-.62a1 1 0 00-1.48.12l-1.55 2.04a1 1 0 00.13 1.41l.76.57z"/>
  </svg>
)

const SparkleIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/>
  </svg>
)

const BugIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 12h-4v-2h4v2zm0 4h-4v-2h4v2zm6-3a8 8 0 01-1.32 4.39l1.74 1.74-1.42 1.42-1.74-1.74A7.97 7.97 0 0112 21a8 8 0 01-5.26-2.19l-1.74 1.74-1.42-1.42 1.74-1.74A8 8 0 014 13h2a6 6 0 006 6 6 6 0 006-6h2zM12 3a4 4 0 014 4H8a4 4 0 014-4z"/>
  </svg>
)

const PaletteIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10a2.5 2.5 0 002.5-2.5c0-.61-.23-1.2-.64-1.67a.528.528 0 01.36-.83H17c2.76 0 5-2.24 5-5 0-4.42-4.03-8-10-8zm-5.5 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
  </svg>
)

const CodeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>
)

const BoltIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
  </svg>
)

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3.5 18.5l6-6 4 4L22 6.92 20.59 5.5l-7.09 8.58-4-4L2 18.5h1.5z"/>
  </svg>
)

/**
 * Changelog data organized by time periods
 */
const CHANGELOG_DATA = [
  {
    period: 'December 2025 - Weeks I-II',
    tagline: '8 awesome updates',
    headerImage: '🎮',
    weeks: [
      {
        name: 'Week I',
        updates: [
          { title: '3D Office background', team: 'Core Team', icon: SparkleIcon, color: 'text-accent-purple' },
          { title: 'Team section added', team: 'Core Team', icon: RocketIcon, color: 'text-accent-blue' },
          { title: 'PostHog-style contact form', team: 'Design Team', icon: PaletteIcon, color: 'text-accent-green' },
          { title: 'YouTube video embed', team: 'Media Team', icon: GamepadIcon, color: 'text-accent-red' },
        ]
      },
      {
        name: 'Week II',
        updates: [
          { title: 'Game OS renamed & updated', team: 'Core Team', icon: GamepadIcon, color: 'text-yellow-400' },
          { title: 'New game titles added', team: 'Game Dev Team', icon: RocketIcon, color: 'text-accent-purple' },
          { title: 'Window drag improvements', team: 'UI Team', icon: BoltIcon, color: 'text-accent-blue' },
          { title: 'CRT effect optimization', team: 'Performance Team', icon: ChartIcon, color: 'text-accent-green' },
        ]
      }
    ]
  },
  {
    period: 'November 2025 - Weeks III-IV',
    tagline: '6 game-changing updates',
    headerImage: '🚀',
    weeks: [
      {
        name: 'Week III',
        updates: [
          { title: 'Complete OS redesign', team: 'Design Team', icon: PaletteIcon, color: 'text-accent-purple' },
          { title: 'Tokyo Night color scheme', team: 'Design Team', icon: SparkleIcon, color: 'text-accent-blue' },
          { title: 'Draggable window system', team: 'Core Team', icon: CodeIcon, color: 'text-accent-green' },
        ]
      },
      {
        name: 'Week IV',
        updates: [
          { title: 'Loading animations', team: 'UI Team', icon: BoltIcon, color: 'text-yellow-400' },
          { title: 'Boot sequence improved', team: 'Core Team', icon: RocketIcon, color: 'text-accent-red' },
          { title: 'Mobile responsiveness', team: 'UI Team', icon: ChartIcon, color: 'text-accent-purple' },
        ]
      }
    ]
  },
  {
    period: 'November 2025 - Weeks I-II',
    tagline: '4 foundational updates',
    headerImage: '🏗️',
    weeks: [
      {
        name: 'Week I',
        updates: [
          { title: 'Initial release', team: 'Core Team', icon: RocketIcon, color: 'text-accent-green' },
          { title: 'Basic login system', team: 'Auth Team', icon: CodeIcon, color: 'text-accent-blue' },
        ]
      },
      {
        name: 'Week II',
        updates: [
          { title: 'Desktop environment', team: 'Core Team', icon: PaletteIcon, color: 'text-accent-purple' },
          { title: 'Core functionality', team: 'Core Team', icon: BoltIcon, color: 'text-yellow-400' },
        ]
      }
    ]
  }
]

/**
 * Timeline months
 */
const TIMELINE_MONTHS = [
  { month: 'Sep', year: '2025', active: false },
  { month: 'Oct', year: '2025', active: false },
  { month: 'Nov', year: '2025', active: true },
  { month: 'Dec', year: '2025', active: true },
  { month: 'Jan', year: '2026', active: false },
  { month: 'Feb', year: '2026', active: false },
  { month: 'Mar', year: '2026', active: false },
]

/**
 * Categories and teams for filters
 */
const CATEGORIES = ['All categories', 'Features', 'Fixes', 'Design', 'Performance']
const TEAMS = ['All teams', 'Core Team', 'Design Team', 'UI Team', 'Game Dev Team']

/**
 * ChangeLog Component
 * PostHog-style changelog with time periods and visual updates
 */
function ChangeLog() {
  const [selectedCategory, setSelectedCategory] = useState('All categories')
  const [selectedTeam, setSelectedTeam] = useState('All teams')

  return (
    <div className="h-full bg-slate-950 overflow-auto">
      {/* Header with filters */}
      <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 pr-8 text-sm text-slate-300 cursor-pointer hover:border-slate-600 transition-colors"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="relative">
            <select 
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 pr-8 text-sm text-slate-300 cursor-pointer hover:border-slate-600 transition-colors"
            >
              {TEAMS.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Changelog sections */}
      <div className="p-4 space-y-6">
        {CHANGELOG_DATA.map((section, sectionIndex) => (
          <div 
            key={section.period}
            className={`rounded-xl border ${sectionIndex === 0 ? 'border-accent-blue/50 bg-accent-blue/5' : 'border-slate-800 bg-slate-900/50'}`}
          >
            {/* Section header */}
            <div className="flex items-start justify-between p-4 border-b border-slate-800/50">
              <div>
                <h2 className="text-lg font-semibold text-white">{section.period}</h2>
                <p className="text-sm text-slate-400 mt-0.5">{section.tagline}</p>
              </div>
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-3xl">
                {section.headerImage}
              </div>
            </div>

            {/* Weeks grid */}
            <div className="grid grid-cols-2 divide-x divide-slate-800/50">
              {section.weeks.map((week) => (
                <div key={week.name} className="p-4">
                  <h3 className="text-sm font-medium text-slate-500 mb-3">{week.name}</h3>
                  <div className="space-y-3">
                    {week.updates.map((update, updateIndex) => (
                      <div 
                        key={updateIndex}
                        className="flex items-center justify-between group cursor-pointer hover:bg-slate-800/30 rounded-lg p-2 -mx-2 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white group-hover:text-accent-blue transition-colors truncate">
                            {update.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">{update.team}</p>
                        </div>
                        <div className={`ml-3 p-2 rounded-lg bg-slate-800/50 ${update.color} group-hover:scale-110 transition-transform`}>
                          <update.icon />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline footer */}
      <div className="sticky bottom-0 bg-slate-950/95 backdrop-blur border-t border-slate-800 px-4 py-3">
        <div className="flex items-center justify-center gap-1">
          {TIMELINE_MONTHS.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-8 h-2 rounded-sm ${item.active ? 'bg-accent-green' : 'bg-slate-700'}`}
              />
              <span className="text-[10px] text-slate-500 mt-1">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-600 mt-1 px-2">
          <span>2025</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  )
}

export default ChangeLog
