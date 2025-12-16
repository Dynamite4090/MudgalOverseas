import { useState, useEffect, useRef } from 'react'
import { XIcon, MaximizeIcon } from './Icons'

/**
 * Window Component
 * A draggable, resizable window container for applications
 */
function Window({ 
  id, 
  title, 
  children, 
  onClose, 
  onFocus, 
  zIndex,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 600, height: 400 }
}) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState(initialSize)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  
  const dragOffset = useRef({ x: 0, y: 0 })
  const prevState = useRef({ position, size })

  const handleMouseDown = (e) => {
    if (isMaximized) return
    
    setIsDragging(true)
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
    onFocus(id)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return
      
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const toggleMaximize = () => {
    if (isMaximized) {
      setPosition(prevState.current.position)
      setSize(prevState.current.size)
    } else {
      prevState.current = { position, size }
      setPosition({ x: 0, y: 0 })
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    setIsMaximized(!isMaximized)
  }

  return (
    <div
      className="fixed bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-2xl window-appear"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
      }}
      onClick={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div
        className="h-10 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="text-slate-400 font-mono text-sm">{title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); toggleMaximize() }}
            className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-accent-blue"
          >
            <MaximizeIcon />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(id) }}
            className="p-1 hover:bg-accent-red/20 rounded transition-colors text-slate-400 hover:text-accent-red"
          >
            <XIcon />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-40px)] overflow-auto">
        {children}
      </div>
    </div>
  )
}

export default Window
