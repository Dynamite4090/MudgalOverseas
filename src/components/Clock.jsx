import { useState, useEffect } from 'react'

/**
 * Clock Component
 * Displays current time and date in the desktop corner
 */
function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-4 right-4 text-right">
      <div className="text-slate-400 font-mono text-lg">
        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-slate-600 font-mono text-xs">
        {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
      </div>
    </div>
  )
}

export default Clock
