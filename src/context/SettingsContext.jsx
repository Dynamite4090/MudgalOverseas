import { createContext, useContext, useState, useEffect } from 'react'

/**
 * Settings Context
 * Manages wallpaper, theme, and sound settings globally
 */
const SettingsContext = createContext(null)

// Default settings
const DEFAULT_SETTINGS = {
    wallpaper: 'office', // 'office' | 'space' | 'forest'
    theme: 'dark', // 'dark' | 'light'
    soundEnabled: true,
}

// Storage key for localStorage
const STORAGE_KEY = 'mudgal-settings'

/**
 * Load settings from localStorage
 */
function loadSettings() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
        }
    } catch (e) {
        console.warn('Failed to load settings:', e)
    }
    return DEFAULT_SETTINGS
}

/**
 * Save settings to localStorage
 */
function saveSettings(settings) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch (e) {
        console.warn('Failed to save settings:', e)
    }
}

/**
 * Settings Provider Component
 */
export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(loadSettings)

    // Persist settings changes
    useEffect(() => {
        saveSettings(settings)
    }, [settings])

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', settings.theme)
    }, [settings.theme])

    const setWallpaper = (wallpaper) => {
        setSettings(prev => ({ ...prev, wallpaper }))
    }

    const setTheme = (theme) => {
        setSettings(prev => ({ ...prev, theme }))
    }

    const toggleTheme = () => {
        setSettings(prev => ({
            ...prev,
            theme: prev.theme === 'dark' ? 'light' : 'dark'
        }))
    }

    const setSoundEnabled = (soundEnabled) => {
        setSettings(prev => ({ ...prev, soundEnabled }))
    }

    const toggleSound = () => {
        setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))
    }

    const value = {
        ...settings,
        setWallpaper,
        setTheme,
        toggleTheme,
        setSoundEnabled,
        toggleSound,
    }

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}

/**
 * Hook to access settings
 */
export function useSettings() {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider')
    }
    return context
}

export default SettingsContext
