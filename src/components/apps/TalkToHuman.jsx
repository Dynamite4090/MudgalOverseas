import { useState } from 'react'
import { SendIcon } from '../Icons'

/**
 * Web3Forms Access Key from environment variable
 * Set VITE_WEB3FORMS_ACCESS_KEY in your .env file
 */
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

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
 * Uses Web3Forms for email delivery
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.email || !formData.company || !formData.role || !formData.message) {
      setError('Please fill in all required fields')
      setTimeout(() => setError(null), 3000)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Contact from ${formData.company} - MudgalOverseas`,
          from_name: formData.email,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          favorite_game: formData.favoriteGame,
          heard_from: formData.heardFrom,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setFormData({
          email: '',
          company: '',
          role: '',
          favoriteGame: '',
          heardFrom: '',
          message: '',
        })
      } else {
        setError(result.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Failed to send message. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = "w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent-blue transition-colors"

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Header with Send Button */}
      <div className="p-3 border-b border-slate-800 bg-slate-900">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`flex items-center gap-2 px-4 py-2 border rounded font-mono text-sm transition-colors ${isSubmitting
              ? 'bg-slate-700 border-slate-600 text-slate-400 cursor-not-allowed'
              : 'bg-accent-yellow/20 hover:bg-accent-yellow/30 border-accent-yellow/50 text-accent-yellow'
            }`}
        >
          <SendIcon className="w-4 h-4" />
          {isSubmitting ? 'Sending...' : 'Send'}
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
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm text-slate-300 transition-colors"
              >
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-accent-red/10 border border-accent-red/50 rounded text-accent-red text-sm">
                {error}
              </div>
            )}
            {/* To Field */}
            <div className="flex items-center gap-4">
              <label className="text-slate-400 font-mono text-sm w-32 shrink-0">To</label>
              <span className="text-slate-300">contact@mudgaloverseas.com</span>
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
                Where did you<br />hear about us?
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
