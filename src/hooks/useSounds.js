import { useCallback, useRef, useEffect } from 'react'
import { useSettings } from '../context/SettingsContext'

/**
 * Create an AudioContext (lazy initialization)
 */
let audioContext = null

function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioContext
}

/**
 * Play a beep/tone sound using Web Audio API
 */
function playTone(frequency, duration, type = 'sine', volume = 0.3) {
    try {
        const ctx = getAudioContext()

        // Resume context if suspended (browser autoplay policy)
        if (ctx.state === 'suspended') {
            ctx.resume()
        }

        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.type = type
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

        // Envelope for smoother sound
        gainNode.gain.setValueAtTime(0, ctx.currentTime)
        gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01)
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration)

        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + duration)
    } catch (e) {
        console.debug('Sound generation failed:', e.message)
    }
}

/**
 * Custom hook for playing sound effects
 * Uses Web Audio API to generate sounds programmatically
 */
export function useSounds() {
    const { soundEnabled } = useSettings()
    const hasInteracted = useRef(false)

    // Track user interaction to enable audio
    useEffect(() => {
        const handleInteraction = () => {
            hasInteracted.current = true
            // Initialize audio context on first interaction
            getAudioContext()
        }

        window.addEventListener('click', handleInteraction, { once: true })
        window.addEventListener('keydown', handleInteraction, { once: true })

        return () => {
            window.removeEventListener('click', handleInteraction)
            window.removeEventListener('keydown', handleInteraction)
        }
    }, [])

    const playBoot = useCallback(() => {
        if (!soundEnabled) return
        // Boot sound: ascending tones
        playTone(200, 0.15, 'square', 0.2)
        setTimeout(() => playTone(300, 0.15, 'square', 0.2), 100)
        setTimeout(() => playTone(400, 0.15, 'square', 0.2), 200)
        setTimeout(() => playTone(600, 0.3, 'sine', 0.3), 300)
    }, [soundEnabled])

    const playClick = useCallback(() => {
        if (!soundEnabled) return
        // Click sound: short high beep
        playTone(800, 0.05, 'square', 0.15)
    }, [soundEnabled])

    const playWindowOpen = useCallback(() => {
        if (!soundEnabled) return
        // Window open: ascending whoosh
        playTone(300, 0.1, 'sine', 0.2)
        setTimeout(() => playTone(500, 0.1, 'sine', 0.15), 50)
    }, [soundEnabled])

    const playWindowClose = useCallback(() => {
        if (!soundEnabled) return
        // Window close: descending tone
        playTone(500, 0.1, 'sine', 0.2)
        setTimeout(() => playTone(300, 0.1, 'sine', 0.15), 50)
    }, [soundEnabled])

    const playToggle = useCallback(() => {
        if (!soundEnabled) return
        // Toggle sound: quick blip
        playTone(600, 0.08, 'sine', 0.2)
    }, [soundEnabled])

    return {
        playBoot,
        playClick,
        playWindowOpen,
        playWindowClose,
        playToggle,
    }
}

export default useSounds
