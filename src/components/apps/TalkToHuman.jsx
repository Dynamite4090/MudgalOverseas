import { useState } from 'react'
import { SendIcon } from '../Icons'

/**
 * Role options for the dropdown
 */
const ROLE_OPTIONS = [
  'Select role',
  'Game Developer',
  'Publisher',
  'Investor',
  'Content Creator',
  'Student',
  'Other',
]

/**
 * TalkToHuman Component
 * A contact form interface styled like a mail client
 */
function TalkToHuman() {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    role: '',
    favoriteGame: '',
    heardFrom: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputClass = "w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent-blue transition-colors"

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Header with Send Button */}
      <div className="p-3 border-b border-slate-800 bg-slate-900">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-accent-yellow/20 hover:bg-accent-yellow/30 border border-accent-yellow/50 rounded text-accent-yellow font-mono text-sm transition-colors"
        >
          <SendIcon className="w-4 h-4" />
          Send
        </button>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto p-4">
        {submitted ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl mb-4">✉️</div>
              <p className="text-accent-green font-mono">Message sent successfully!</p>
              <p className="text-slate-500 text-sm mt-2">We'll get back to you soon.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* To Field */}
            <div className="flex items-center gap-4">
              <label className="text-slate-400 font-mono text-sm w-32 shrink-0">To</label>
              <span className="text-slate-300">contact@mudgaloverseas.dev</span>
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-4">
              <label className="text-slate-400 font-mono text-sm w-32 shrink-0">
                Your email <span className="text-accent-yellow">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className={inputClass}
              />
            </div>

            {/* Company Field */}
            <div className="flex items-center gap-4">
              <label className="text-slate-400 font-mono text-sm w-32 shrink-0">
                Company <span className="text-accent-yellow">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className={inputClass}
              />
            </div>

            {/* Role Field */}
            <div className="flex items-center gap-4">
              <label className="text-slate-400 font-mono text-sm w-32 shrink-0">
                Role <span className="text-accent-yellow">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              >
                {ROLE_OPTIONS.map((role, i) => (
                  <option key={i} value={i === 0 ? '' : role} disabled={i === 0}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Favorite Game Field */}
            <div className="flex items-center gap-4">
              <label className="text-slate-400 font-mono text-sm w-32 shrink-0">
                Favorite game <span className="text-accent-yellow">*</span>
              </label>
              <input
                type="text"
                name="favoriteGame"
                value={formData.favoriteGame}
                onChange={handleChange}
                placeholder="Your favorite game"
                className={inputClass}
              />
            </div>

            {/* Heard From Field */}
            <div className="flex items-center gap-4">
              <label className="text-slate-400 font-mono text-sm w-32 shrink-0">
                Where did you<br/>hear about us?
              </label>
              <input
                type="text"
                name="heardFrom"
                value={formData.heardFrom}
                onChange={handleChange}
                placeholder="Where did you hear about us?"
                className={inputClass}
              />
            </div>

            {/* Message Field */}
            <div className="pt-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What do you want to talk about?"
                rows={6}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TalkToHuman
