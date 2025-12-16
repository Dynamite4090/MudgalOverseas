import { useState, useEffect } from 'react'
import { PlayIcon } from '../Icons'

/**
 * PancakeVideo Component
 * A simulated video player interface
 */
function PancakeVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(p => Math.min(p + 0.5, 100))
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, progress])

  const formatTime = (percentage) => {
    const totalSeconds = (percentage / 100) * 180 // 3 minutes = 180 seconds
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)
    return `${minutes}:${String(seconds).padStart(2, '0')}`
  }

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const newProgress = ((e.clientX - rect.left) / rect.width) * 100
    setProgress(newProgress)
  }

  return (
    <div className="h-full bg-black flex flex-col">
      {/* Video Area */}
      <div className="flex-1 relative flex items-center justify-center bg-gradient-to-br from-slate-900 to-black">
        {/* REC Indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-red rec-blink" />
          <span className="text-accent-red font-mono text-sm">REC</span>
        </div>

        {/* Play Button / Content */}
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="w-24 h-24 rounded-full bg-accent-blue/20 border-2 border-accent-blue flex items-center justify-center hover:bg-accent-blue/30 transition-colors"
          >
            <div className="text-accent-blue ml-2">
              <PlayIcon />
            </div>
          </button>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">🥞</div>
            <p className="text-slate-400 font-mono">pancake_demo_v1.mov</p>
            <p className="text-slate-500 text-sm mt-2">Now Playing...</p>
          </div>
        )}

        {/* Timestamp */}
        <div className="absolute bottom-4 left-4 font-mono text-slate-500 text-sm">
          {formatTime(progress)} / 3:00
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-900 p-4 border-t border-slate-800">
        {/* Progress Bar */}
        <div 
          className="h-1 bg-slate-700 rounded-full mb-4 cursor-pointer" 
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-accent-blue rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4">
          <button 
            className="text-slate-400 hover:text-accent-blue transition-colors text-xl"
            onClick={() => setProgress(Math.max(0, progress - 10))}
          >
            ⏮
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center hover:bg-accent-blue/30 transition-colors"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button 
            className="text-slate-400 hover:text-accent-blue transition-colors text-xl"
            onClick={() => setProgress(Math.min(100, progress + 10))}
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  )
}

export default PancakeVideo
