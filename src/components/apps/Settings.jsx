import { useSettings } from '../../context/SettingsContext'
import { SunIcon, MoonIcon, VolumeIcon, VolumeMuteIcon } from '../Icons'

/**
 * Wallpaper options with preview colors
 */
const WALLPAPERS = [
    {
        id: 'office',
        name: 'Christmas Office',
        description: 'Cozy office with Christmas decorations',
        gradient: 'from-slate-800 to-emerald-900',
        emoji: '🎄'
    },
    {
        id: 'space',
        name: 'Space Station',
        description: 'Futuristic space station in orbit',
        gradient: 'from-slate-900 to-purple-900',
        emoji: '🚀'
    },
    {
        id: 'forest',
        name: 'Enchanted Forest',
        description: 'Magical forest with woodland creatures',
        gradient: 'from-emerald-900 to-teal-900',
        emoji: '🌲'
    },
]

/**
 * Settings App Component
 * Allows users to customize wallpaper, theme, and sound settings
 */
function Settings() {
    const {
        wallpaper,
        setWallpaper,
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound
    } = useSettings()

    const isDark = theme === 'dark'

    // Theme-aware classes
    const sectionTitleClass = `text-lg font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`
    const cardClass = `w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between group ${isDark
            ? 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
            : 'border-slate-300 bg-white/80 hover:border-slate-400 hover:bg-white'
        }`
    const primaryTextClass = `font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`
    const secondaryTextClass = `text-xs ${isDark ? 'text-slate-500' : 'text-slate-600'}`
    const footerClass = `text-center text-xs pt-4 border-t ${isDark ? 'text-slate-600 border-slate-800' : 'text-slate-500 border-slate-300'}`

    return (
        <div className="h-full overflow-y-auto p-4 space-y-6">
            {/* Wallpaper Section */}
            <section>
                <h2 className={sectionTitleClass}>
                    🖼️ Wallpaper
                </h2>
                <div className="grid grid-cols-1 gap-3">
                    {WALLPAPERS.map((wp) => (
                        <button
                            key={wp.id}
                            onClick={() => setWallpaper(wp.id)}
                            className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left group hover:scale-[1.02] ${wallpaper === wp.id
                                ? 'border-accent-blue bg-accent-blue/20 shadow-lg shadow-accent-blue/20'
                                : isDark
                                    ? 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                                    : 'border-slate-300 bg-white/80 hover:border-slate-400 hover:bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                {/* Preview */}
                                <div className={`w-16 h-12 rounded-lg bg-gradient-to-br ${wp.gradient} flex items-center justify-center text-2xl shadow-inner`}>
                                    {wp.emoji}
                                </div>
                                {/* Info */}
                                <div className="flex-1">
                                    <p className={`font-semibold ${wallpaper === wp.id ? 'text-accent-blue' : isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                        {wp.name}
                                    </p>
                                    <p className={secondaryTextClass}>{wp.description}</p>
                                </div>
                                {/* Selected indicator */}
                                {wallpaper === wp.id && (
                                    <div className="w-6 h-6 rounded-full bg-accent-blue flex items-center justify-center">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Theme Section */}
            <section>
                <h2 className={sectionTitleClass}>
                    🎨 Theme
                </h2>
                <button
                    onClick={toggleTheme}
                    className={cardClass}
                >
                    <div className="flex items-center gap-3">
                        {isDark ? (
                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-yellow-400">
                                <MoonIcon />
                            </div>
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                <SunIcon />
                            </div>
                        )}
                        <div className="text-left">
                            <p className={primaryTextClass}>
                                {isDark ? 'Dark Mode' : 'Light Mode'}
                            </p>
                            <p className={secondaryTextClass}>
                                {isDark ? 'Easy on the eyes' : 'Bright and clear'}
                            </p>
                        </div>
                    </div>
                    {/* Toggle Switch */}
                    <div className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${isDark ? 'bg-slate-600' : 'bg-yellow-400'
                        }`}>
                        <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${isDark ? 'translate-x-0' : 'translate-x-6'
                            }`} />
                    </div>
                </button>
            </section>

            {/* Sound Section */}
            <section>
                <h2 className={sectionTitleClass}>
                    🔊 Sound Effects
                </h2>
                <button
                    onClick={toggleSound}
                    className={cardClass}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${soundEnabled
                            ? 'bg-accent-green/20 text-accent-green'
                            : isDark ? 'bg-slate-700 text-slate-500' : 'bg-slate-200 text-slate-500'
                            }`}>
                            {soundEnabled ? <VolumeIcon /> : <VolumeMuteIcon />}
                        </div>
                        <div className="text-left">
                            <p className={primaryTextClass}>
                                {soundEnabled ? 'Sound On' : 'Sound Off'}
                            </p>
                            <p className={secondaryTextClass}>
                                Click, boot, and window sounds
                            </p>
                        </div>
                    </div>
                    {/* Toggle Switch */}
                    <div className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${soundEnabled ? 'bg-accent-green' : isDark ? 'bg-slate-600' : 'bg-slate-300'
                        }`}>
                        <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${soundEnabled ? 'translate-x-6' : 'translate-x-0'
                            }`} />
                    </div>
                </button>
            </section>

            {/* Info */}
            <div className={footerClass}>
                Settings are saved automatically
            </div>
        </div>
    )
}

export default Settings
