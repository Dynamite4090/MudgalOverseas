/**
 * PancakeVideo Component
 * Embedded YouTube video player
 */
function PancakeVideo() {
  return (
    <div className="h-full bg-black flex flex-col">
      {/* Video Header */}
      <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-sm">pancake.mov</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-red rec-blink" />
          <span className="text-accent-red font-mono text-xs">LIVE</span>
        </div>
      </div>

      {/* Video Placeholder */}
      <div className="flex-1 relative flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="text-6xl mb-4">🥞</div>
          <p className="text-slate-400 font-mono text-lg">Coming Soon</p>
          <p className="text-slate-600 font-mono text-sm mt-2">Video under production</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 p-2 border-t border-slate-800">
        <p className="text-slate-600 font-mono text-xs text-center">
          // Project Pancake - Official Trailer
        </p>
      </div>
    </div>
  )
}

export default PancakeVideo
