import { useState, useEffect, useRef } from 'react'
import { XIcon, MaximizeIcon } from './Icons'
import { useSettings } from '../context/SettingsContext'

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
  initialSize = { width: 600, height: 400 },
  isMobile = false
}) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState(initialSize)
  const [isMaximized, setIsMaximized] = useState(isMobile) // Auto-maximize on mobile
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState(null)

  const dragOffset = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 })
  const prevState = useRef({ position, size })
  const { theme } = useSettings()

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

  // Mobile: always fullscreen
  const windowStyle = isMobile ? {
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex,
    borderRadius: 0,
  } : {
    left: isMaximized ? 0 : position.x,
    top: isMaximized ? 0 : position.y,
    width: isMaximized ? '100%' : size.width,
    height: isMaximized ? '100%' : size.height,
    zIndex,
  }

  return (
    <div
      className={`fixed border overflow-hidden shadow-2xl window-appear transition-colors duration-300 ${isMobile ? 'rounded-none' : 'rounded-lg'
        } ${theme === 'light'
          ? 'bg-white border-slate-300'
          : 'bg-slate-900 border-slate-700'
        }`}
      style={windowStyle}
      onClick={() => onFocus(id)}
    >
      {/* Resize Handles - Hidden on mobile */}
      {!isMaximized && !isMobile && (
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
        className={`h-10 border-b flex items-center justify-between px-4 select-none transition-colors duration-300 ${isMobile ? '' : 'cursor-move'
          } ${theme === 'light'
            ? 'bg-slate-100 border-slate-200'
            : 'bg-slate-800 border-slate-700'
          }`}
        onMouseDown={isMobile ? undefined : handleMouseDown}
      >
        <span className={`font-mono text-sm truncate flex-1 ${theme === 'light' ? 'text-slate-700' : 'text-slate-400'
          }`}>{title}</span>
        <div className="flex items-center gap-2 ml-2">
          {/* Hide maximize button on mobile */}
          {!isMobile && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleMaximize() }}
              className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-accent-blue"
            >
              <MaximizeIcon />
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(id) }}
            className="p-2 hover:bg-accent-red/20 rounded transition-colors text-slate-400 hover:text-accent-red"
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
