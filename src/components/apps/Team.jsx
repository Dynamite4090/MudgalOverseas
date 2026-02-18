import { useState } from 'react'

/**
 * LinkedIn Icon
 */
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

/**
 * GitHub Icon
 */
const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

/**
 * Team members data
 * Add your team member images to: public/images/team/
 * Image names: shanu.png, sujal.png, brijesh.png (or .jpg)
 */
const TEAM_MEMBERS = [
  {
    name: 'Shanu Mudgal',
    role: 'Founder & Director',
    image: '/images/team/shanu.png',
    color: 'accent-yellow',
    description: 'Visionary leader and creative mind behind MudgalOverseas. Passionate about creating unique gaming experiences that push boundaries.',
    social: {
      linkedin: 'https://www.linkedin.com/in/shanu-mudgal-a6a4bb20a/',
      github: 'https://github.com/Shanu1010mudgal',
    }
  },

  {
    name: 'Ganesh Chavan',
    role: 'Game Programmer',
    image: '/images/team/Ganesh.webp',
    color: 'accent-cyan',
    description: 'Skilled programmer bringing game concepts to life through clean, efficient code. Specializes in gameplay systems and optimization.',
    social: {
      linkedin: 'https://www.linkedin.com/in/ganesh-chavan-343319381/',
      github: 'https://github.com/Dynamite4090',
    }
  },
  {
    name: 'Siddhant Shirgave',
    role: 'Game Designer',
    image: '/images/team/siddhant.png',
    color: 'accent-red',
    description: 'Creative game designer crafting engaging gameplay experiences. Expert in level design and game mechanics that keep players hooked.',
    social: {
      linkedin: '',
      github: '',
    }
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
              className={`bg-slate-900 border rounded-lg p-4 cursor-pointer transition-all duration-300 ${selectedMember === i
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
                  <div className={`overflow-hidden transition-all duration-300 ${selectedMember === i ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {member.description}
                    </p>

                    {/* Social Links */}
                    {(member.social?.linkedin || member.social?.github) && (
                      <div className="flex gap-3 mt-3">
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-slate-400 hover:text-[#0077B5] transition-colors"
                            title="LinkedIn"
                          >
                            <LinkedInIcon />
                          </a>
                        )}
                        {member.social.github && (
                          <a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-slate-400 hover:text-white transition-colors"
                            title="GitHub"
                          >
                            <GitHubIcon />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expand Indicator */}
                <div className={`text-slate-500 transition-transform duration-300 ${selectedMember === i ? 'rotate-180' : ''
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
