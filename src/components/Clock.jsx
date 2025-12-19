import { useState, useEffect } from 'react'

/**
 * Clock Component
 * Displays current time and date in the desktop corner
 */
function Clock({ isMobile = false }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`absolute text-right z-20 ${
      isMobile 
        ? 'bottom-4 left-1/2 -translate-x-1/2 text-center bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50' 
        : 'top-4 right-4'
    }`}>
      <div className={`text-slate-400 font-mono ${isMobile ? 'text-sm' : 'text-lg'}`}>
        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
      </div>
      {!isMobile && (
        <div className="text-slate-600 font-mono text-xs">
          {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
      )}
    </div>
  )
}

export default Clock
