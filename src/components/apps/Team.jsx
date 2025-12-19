import { useState } from 'react'

/**
 * Team members data
 * Add your team member images to: public/images/team/
 * Image names: shanu.png, sujal.png, brijesh.png (or .jpg)
 */
const TEAM_MEMBERS = [
  {
    name: 'Shanu Mudgal',
    role: 'CEO & Founder',
    image: '/images/team/shanu.png',
    color: 'accent-yellow',
    description: 'Visionary leader and creative mind behind MudgalOverseas. Passionate about creating unique gaming experiences that push boundaries.',
  },
  {
    name: 'Sujal Pachpande',
    role: 'Intern Indie Game Developer',
    image: '/images/team/sujal.png',
    color: 'accent-blue',
    description: 'Talented developer with a knack for gameplay mechanics. Brings fresh ideas and energy to every project.',
  },
  {
    name: 'Brijesh Malaviya',
    role: 'Intern Indie Game Developer',
    image: '/images/team/brijesh.png',
    color: 'accent-purple',
    description: 'Creative problem solver specializing in game systems. Always exploring new ways to make games more engaging.',
  },
]

/**
 * Team Component
 * Displays team members with their roles and descriptions
 */
function Team() {
  const [selectedMember, setSelectedMember] = useState(null)

  return (
    <div className="h-full bg-slate-950 overflow-auto">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900">
        <h2 className="text-xl font-bold text-slate-200 flex items-center gap-3">
          <span className="text-2xl">👥</span>
          The Team
        </h2>
        <p className="text-slate-500 text-sm mt-1 font-mono">
          // The people behind the games
        </p>
      </div>

      {/* Team Grid */}
      <div className="p-6">
        <div className="grid gap-4">
          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={i}
              onClick={() => setSelectedMember(selectedMember === i ? null : i)}
              className={`bg-slate-900 border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                selectedMember === i 
                  ? `border-${member.color} shadow-lg shadow-${member.color}/20` 
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar Image */}
                <div className={`w-16 h-16 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-700`}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xl font-bold text-slate-400">${member.name.split(' ').map(n => n[0]).join('')}</div>`
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-200">{member.name}</h3>
                  <p className={`text-${member.color} text-sm font-mono`}>{member.role}</p>
                  
                  {/* Description - shows when selected */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    selectedMember === i ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>

                {/* Expand Indicator */}
                <div className={`text-slate-500 transition-transform duration-300 ${
                  selectedMember === i ? 'rotate-180' : ''
                }`}>
                  ▼
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <p className="text-slate-600 text-xs font-mono text-center">
            // Small team, big dreams 🚀
          </p>
        </div>
      </div>
    </div>
  )
}

export default Team
