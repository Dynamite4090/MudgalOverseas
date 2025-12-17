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
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState(null)
  
  const dragOffset = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 })
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

  const handleResizeStart = (e, direction) => {
    if (isMaximized) return
    e.stopPropagation()
    setIsResizing(true)
    setResizeDirection(direction)
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
      posY: position.y,
    }
    onFocus(id)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        })
      }
      
      if (isResizing && resizeDirection) {
        const deltaX = e.clientX - resizeStart.current.x
        const deltaY = e.clientY - resizeStart.current.y
        const minWidth = 300
        const minHeight = 200
        
        let newWidth = resizeStart.current.width
        let newHeight = resizeStart.current.height
        let newX = resizeStart.current.posX
        let newY = resizeStart.current.posY
        
        // Handle horizontal resize
        if (resizeDirection.includes('e')) {
          newWidth = Math.max(minWidth, resizeStart.current.width + deltaX)
        }
        if (resizeDirection.includes('w')) {
          const possibleWidth = resizeStart.current.width - deltaX
          if (possibleWidth >= minWidth) {
            newWidth = possibleWidth
            newX = resizeStart.current.posX + deltaX
          }
        }
        
        // Handle vertical resize
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(minHeight, resizeStart.current.height + deltaY)
        }
        if (resizeDirection.includes('n')) {
          const possibleHeight = resizeStart.current.height - deltaY
          if (possibleHeight >= minHeight) {
            newHeight = possibleHeight
            newY = resizeStart.current.posY + deltaY
          }
        }
        
        setSize({ width: newWidth, height: newHeight })
        setPosition({ x: newX, y: newY })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeDirection(null)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, resizeDirection])

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

  // Resize handle styles
  const resizeHandleClass = "absolute bg-transparent hover:bg-accent-blue/30 transition-colors z-10"

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
      {/* Resize Handles */}
      {!isMaximized && (
        <>
          {/* Edges */}
          <div 
            className={`${resizeHandleClass} top-0 left-2 right-2 h-1 cursor-n-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div 
            className={`${resizeHandleClass} bottom-0 left-2 right-2 h-1 cursor-s-resize`}
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div 
            className={`${resizeHandleClass} left-0 top-2 bottom-2 w-1 cursor-w-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div 
            className={`${resizeHandleClass} right-0 top-2 bottom-2 w-1 cursor-e-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          
          {/* Corners */}
          <div 
            className={`${resizeHandleClass} top-0 left-0 w-3 h-3 cursor-nw-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div 
            className={`${resizeHandleClass} top-0 right-0 w-3 h-3 cursor-ne-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div 
            className={`${resizeHandleClass} bottom-0 left-0 w-3 h-3 cursor-sw-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div 
            className={`${resizeHandleClass} bottom-0 right-0 w-3 h-3 cursor-se-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
        </>
      )}

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
