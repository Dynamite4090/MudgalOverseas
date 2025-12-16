import { useState, useEffect, useRef } from 'react'
import { SendIcon } from '../Icons'

/**
 * Initial messages displayed when the chat opens
 */
const INITIAL_MESSAGES = [
  { from: 'system', text: '// ESTABLISHING SECURE CHANNEL...' },
  { from: 'system', text: '// CONNECTION ESTABLISHED.' },
  { from: 'bot', text: 'Hey there! 👋 Thanks for reaching out to MudgalOverseas.' },
  { from: 'bot', text: "We're probably busy making games, but leave a message and we'll get back to you!" },
]

/**
 * Bot response messages (randomly selected)
 */
const BOT_RESPONSES = [
  'Message received! A human will respond soon. In the meantime, check out our games! 🎮',
  'Thanks for reaching out! Someone from the team will get back to you shortly. 🚀',
  "Got it! We're in the middle of a boss battle, but we'll respond ASAP! ⚔️",
]

/**
 * TalkToHuman Component
 * A retro-styled chat interface for contact
 */
function TalkToHuman() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    
    // Add user message
    setMessages(prev => [...prev, { from: 'user', text: input }])
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)]
      setMessages(prev => [...prev, { from: 'bot', text: randomResponse }])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  const getMessageStyle = (from) => {
    switch (from) {
      case 'system':
        return 'text-slate-600 font-mono text-xs'
      case 'user':
        return 'ml-auto bg-accent-blue/20 text-accent-blue max-w-[80%] p-3 rounded-lg rounded-br-none'
      case 'bot':
        return 'bg-slate-800 text-slate-300 max-w-[80%] p-3 rounded-lg rounded-bl-none'
      default:
        return ''
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-accent-green pulse" />
          <span className="text-slate-300 font-mono">HUMAN_INTERFACE_v2</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={getMessageStyle(msg.from)}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent-blue transition-colors"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-accent-blue/20 hover:bg-accent-blue/30 border border-accent-blue/50 rounded-lg text-accent-blue transition-colors"
          >
            <SendIcon />
          </button>
        </div>
        <p className="text-slate-600 text-xs mt-2 font-mono">
          // Or email: hello@mudgaloverseas.dev
        </p>
      </div>
    </div>
  )
}

export default TalkToHuman
