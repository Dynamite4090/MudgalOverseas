/**
 * PancakeVideo Component
 * Embedded YouTube video player
 */
function PancakeVideo() {
  const videoId = '0j_-YrIwKpA'

  return (
    <div className="h-full bg-black flex flex-col">
      {/* Video Header */}
      <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-sm">pancake.mov</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-500 font-mono text-xs">LIVE</span>
        </div>
      </div>

      {/* YouTube Embed */}
      <div className="flex-1 relative bg-slate-900">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Pancake Game Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
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