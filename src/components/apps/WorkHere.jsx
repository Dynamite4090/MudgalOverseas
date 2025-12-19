import { useState } from 'react'

/**
 * Job listings data
 */
const JOB_CATEGORIES = [
  {
    name: 'Game Development',
    jobs: [
      { 
        title: 'Game Programmer', 
        teams: 2,
        location: 'Remote',
        timezone: 'IST',
        description: 'Implement 2D gameplay mechanics, game states & UI interactions in Unity. Work closely with designers and artists to integrate assets & features. Write optimized, reusable, readable C# scripts. Troubleshoot bugs, performance issues & mobile deployment problems. Contribute to rapid prototypes and release-ready builds.',
        requirements: [
          'Strong C# fundamentals + Unity API',
          'Understanding of physics, collisions, events, UI, and animation controllers',
          'Movement + input controls (tap / drag / swipe)',
          'Collision & trigger handling, Physics2D & Rigidbody2D',
          'Animation Controller & basic VFX scripting',
          'Game states (Start → Play → Win/Lose → Restart)',
          'Score, collectibles, power-ups & simple economy',
          'Endless generation and difficulty scaling',
          'Object pooling (very important)',
          'Mobile optimization, low physics overhead',
          'Modular scripts and reusable components',
          'Prefabs & Scriptable Objects for configuration',
          'Version control basics (Git/GitHub)',
          'UI + Gameplay linking (buttons, events)',
          'Audio triggers and feedback elements',
          'Quick prototyping mindset',
          '"Satisfying feel" — juice, feedback, polish',
          'Understanding of hyper-casual loops and player retention'
        ]
      },
    ]
  },
  {
    name: 'Design',
    jobs: [
      { 
        title: 'Game Designer', 
        teams: 1,
        location: 'Remote',
        timezone: 'IST',
        description: 'Design hyper-casual game concepts, mechanics, and progression systems. Create Game Design Documents (GDD), flowcharts, user journeys & feature lists. Work with programmers, artists and level designers to ensure design execution. Analyze hyper-casual market trends and deconstruct hit titles. Balance difficulty, in-game economy, pacing and user retention.',
        requirements: [
          'Strong understanding of 2D/3D games (Hyper-Casual preferred)',
          'Understanding of hyper-casual gameplay loops & feedback systems',
          'Knowledge of Unity to validate gameplay ideas (basic prototyping preferred)',
          'Analytical mindset for player behaviour & economy balancing',
          'Good documentation skills (GDD, spreadsheets, diagrams)'
        ]
      },
    ]
  },
  {
    name: 'Art & Design',
    jobs: [
      { 
        title: '2D Artist / Level Designer', 
        teams: 1,
        location: 'Remote',
        timezone: 'IST',
        description: 'Build engaging, challenging and scalable 2D hyper-casual levels. Balance pacing, timing, obstacles and difficulty curves. Work closely with designers & programmers to validate level flow. Perform play-tests & iterate based on feedback. Create levels that encourage retention and replay value.',
        requirements: [
          'Portfolio of 2D game levels (mandatory)',
          'Understanding of pacing, challenge balance, difficulty curve',
          'Strong sense of spatial layout, timing and visual readability',
          'Knowledge of Unity tilemaps, colliders & prefabs',
          'Understanding of player psychology and challenge-reward loop'
        ]
      },
      { 
        title: 'UI/UX Designer', 
        teams: 1,
        location: 'Remote',
        timezone: 'IST',
        description: 'Design complete UI layout for hyper-casual games — menus, HUD, victory/defeat screens. Create wireframes, mockups, assets and UI states for mobile devices. Ensure smooth UX with intuitive flow and clear feedback cues. Export UI for Unity & collaborate with programmers for implementation. Maintain consistency in style, color palette and typography.',
        requirements: [
          'Portfolio required (Non-AI artwork only)',
          'Ability to design intuitive and polished game screens',
          'Figma / Photoshop / Illustrator / Adobe XD / Krita',
          'Knowledge of UI for mobile resolutions & touch interactions',
          'Understanding of Unity canvas system is a plus'
        ]
      },
    ]
  },
]

const TOTAL_POSITIONS = JOB_CATEGORIES.reduce((acc, cat) => acc + cat.jobs.length, 0)

/**
 * Isometric Office SVG Component
 */
function IsometricOffice() {
  return (
    <div className="relative w-full h-48 bg-gradient-to-b from-orange-600 to-orange-700 overflow-hidden rounded-t-lg">
      {/* Zigzag pattern background */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="zigzag" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 L5 0 L10 5 L5 10 Z" fill="none" stroke="#8B4513" strokeWidth="0.5"/>
        </pattern>
        <rect width="100" height="100" fill="url(#zigzag)"/>
      </svg>
      
      {/* Isometric cubicles */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
        {/* Left cubicle cluster */}
        <g transform="translate(30, 60)">
          {/* Cubicle walls */}
          <polygon points="0,30 40,10 80,30 40,50" fill="#d4a574" stroke="#8B4513" strokeWidth="1"/>
          <polygon points="0,30 0,60 40,80 40,50" fill="#c49464" stroke="#8B4513" strokeWidth="1"/>
          <polygon points="40,50 40,80 80,60 80,30" fill="#b48454" stroke="#8B4513" strokeWidth="1"/>
          {/* Desk */}
          <polygon points="15,35 40,25 65,35 40,45" fill="#5c3d2e" stroke="#3d2619" strokeWidth="0.5"/>
          {/* Monitor */}
          <rect x="35" y="20" width="10" height="8" fill="#1a1a2e" stroke="#333" strokeWidth="0.5"/>
          <rect x="36" y="21" width="8" height="6" fill="#7aa2f7"/>
          {/* Character */}
          <circle cx="40" cy="40" r="5" fill="#f5f5f5"/>
          <circle cx="40" cy="35" r="3" fill="#f5f5f5"/>
        </g>
        
        {/* Center cubicle */}
        <g transform="translate(150, 40)">
          <polygon points="0,30 40,10 80,30 40,50" fill="#d4a574" stroke="#8B4513" strokeWidth="1"/>
          <polygon points="0,30 0,60 40,80 40,50" fill="#c49464" stroke="#8B4513" strokeWidth="1"/>
          <polygon points="40,50 40,80 80,60 80,30" fill="#b48454" stroke="#8B4513" strokeWidth="1"/>
          <polygon points="15,35 40,25 65,35 40,45" fill="#5c3d2e" stroke="#3d2619" strokeWidth="0.5"/>
          <rect x="35" y="20" width="10" height="8" fill="#1a1a2e" stroke="#333" strokeWidth="0.5"/>
          <rect x="36" y="21" width="8" height="6" fill="#9ece6a"/>
          <circle cx="40" cy="40" r="5" fill="#ff9e64"/>
          <circle cx="40" cy="35" r="3" fill="#ff9e64"/>
          <polygon points="37,32 40,28 43,32" fill="#ff9e64"/>
        </g>
        
        {/* Right cubicle cluster */}
        <g transform="translate(270, 60)">
          <polygon points="0,30 40,10 80,30 40,50" fill="#d4a574" stroke="#8B4513" strokeWidth="1"/>
          <polygon points="0,30 0,60 40,80 40,50" fill="#c49464" stroke="#8B4513" strokeWidth="1"/>
          <polygon points="40,50 40,80 80,60 80,30" fill="#b48454" stroke="#8B4513" strokeWidth="1"/>
          <polygon points="15,35 40,25 65,35 40,45" fill="#5c3d2e" stroke="#3d2619" strokeWidth="0.5"/>
          <rect x="35" y="20" width="10" height="8" fill="#1a1a2e" stroke="#333" strokeWidth="0.5"/>
          <rect x="36" y="21" width="8" height="6" fill="#bb9af7"/>
          <circle cx="40" cy="40" r="5" fill="#1a1a2e"/>
          <circle cx="40" cy="35" r="3" fill="#f5f5f5"/>
        </g>
        
        {/* Plants */}
        <g transform="translate(120, 110)">
          <rect x="0" y="10" width="8" height="12" fill="#8b5a2b"/>
          <circle cx="4" cy="5" r="8" fill="#4a7c59"/>
        </g>
        <g transform="translate(280, 130)">
          <rect x="0" y="10" width="8" height="12" fill="#8b5a2b"/>
          <circle cx="4" cy="5" r="8" fill="#5a9c69"/>
        </g>
        
        {/* Water cooler */}
        <g transform="translate(220, 120)">
          <rect x="0" y="5" width="12" height="20" fill="#7dcfff" opacity="0.5"/>
          <rect x="2" y="0" width="8" height="8" fill="#4a5568"/>
        </g>
      </svg>
      
      {/* Heading overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-white drop-shadow-lg">Who's hiring?</h1>
        <p className="text-white/90 mt-2">
          Our small teams are looking to add <span className="font-bold">{TOTAL_POSITIONS} team members</span>.
        </p>
      </div>
    </div>
  )
}

/**
 * Search Icon
 */
const SearchIcon = () => (
  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

/**
 * Location Icon
 */
const LocationIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
  </svg>
)

/**
 * Clock Icon
 */
const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

/**
 * WorkHere Component
 * Careers page styled like PostHog
 */
function WorkHere() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState(JOB_CATEGORIES[0].jobs[0])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    portfolio: '',
    experience: '',
    coverLetter: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Filter jobs based on search
  const filteredCategories = JOB_CATEGORIES.map(category => ({
    ...category,
    jobs: category.jobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    selectedCategory ? category.name === selectedCategory : true
  ).filter(category => category.jobs.length > 0)

  // Handle application submission
  const handleApply = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For now, just show success (you can integrate with email/backend later)
    setSubmitStatus('success')
    setApplicationData({
      name: '',
      email: '',
      portfolio: '',
      experience: '',
      coverLetter: '',
    })
    setTimeout(() => {
      setShowApplyModal(false)
      setSubmitStatus(null)
    }, 2000)
    
    setIsSubmitting(false)
  }

  return (
    <div className="h-full bg-slate-950 overflow-auto">
      {/* Hero Banner */}
      <IsometricOffice />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-slate-800 p-4">
          {/* Search */}
          <div className="relative mb-4">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-accent-blue"
            />
          </div>

          {/* Categories */}
          {filteredCategories.map((category) => (
            <div key={category.name} className="mb-4">
              <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                {category.name}
              </h3>
              {category.jobs.map((job) => (
                <button
                  key={job.title}
                  onClick={() => setSelectedJob(job)}
                  className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
                    selectedJob?.title === job.title 
                      ? 'bg-slate-800 border border-slate-600' 
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className="font-medium text-white text-sm">{job.title}</div>
                  <div className="text-xs text-slate-500">
                    {job.teams} {job.teams === 1 ? 'team' : 'teams'}
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Job Details */}
        <div className="flex-1 p-6">
          {selectedJob && (
            <>
              <h2 className="text-2xl font-bold text-white mb-4">{selectedJob.title}</h2>
              
              {/* Teams hiring badge */}
              <div className="inline-block bg-slate-800 rounded-lg px-4 py-2 mb-6">
                <span className="text-slate-300 text-sm">
                  {selectedJob.teams} small {selectedJob.teams === 1 ? 'team is' : 'teams are'} hiring for this role
                </span>
              </div>

              {/* Location & Timezone */}
              <div className="flex items-center gap-8 mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-accent-yellow">
                    <LocationIcon />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Location</div>
                    <div className="text-white font-medium">{selectedJob.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-accent-blue">
                    <ClockIcon />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Timezone(s)</div>
                    <div className="text-white font-medium">{selectedJob.timezone}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">About the role</h3>
                <p className="text-slate-400">{selectedJob.description}</p>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-green"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <button 
                onClick={() => setShowApplyModal(true)}
                className="px-6 py-3 bg-accent-blue hover:bg-accent-blue/80 text-white font-medium rounded-lg transition-colors"
              >
                Apply for this role
              </button>
            </>
          )}
        </div>

        {/* Right Sidebar - About teams */}
        <div className="w-72 border-l border-slate-800 p-4">
          <h3 className="text-lg font-semibold text-white mb-4">About the small teams</h3>
          
          <div className="space-y-3">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">Core Game Team</span>
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-sm text-slate-500">Building Project Pancake and core gameplay systems</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">Art & Animation</span>
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-sm text-slate-500">Creating visual magic for all our games</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">Platform Team</span>
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-sm text-slate-500">Infrastructure and backend services</p>
            </div>
          </div>

          {/* Company perks */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <h4 className="text-sm font-medium text-slate-400 mb-3">Why join us?</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <span className="text-accent-green">✓</span> Fully remote
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent-green">✓</span> Flexible hours
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent-green">✓</span> Work on cool games
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent-green">✓</span> Small team, big impact
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Apply Modal with Google Form */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl mx-4 h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700 shrink-0">
              <div>
                <h3 className="text-lg font-semibold text-white">Apply for {selectedJob?.title}</h3>
                <p className="text-sm text-slate-500">Fill out the application form</p>
              </div>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Google Form Iframe */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src="https://docs.google.com/forms/d/14nTEixh75YFjNtOOAorWgAKVnsOOc2G5VOF4wvKKxto/viewform?embedded=true"
                className="w-full h-full border-0"
                title="Job Application Form"
              >
                Loading form...
              </iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkHere
