/**
 * Changelog content
 */
const CHANGELOG_CONTENT = `
=====================================
  MUDGALOVERSEAS SYSTEM CHANGELOG
=====================================

[v2.0.1] - 2025-12-16
---------------------
* Fixed window drag boundaries
* Improved CRT effect performance
* Added new icon hover animations
* Minor UI polish

[v2.0.0] - 2025-12-15
---------------------
* Complete OS redesign
* New Tokyo Night color scheme
* Draggable window system
* Added Product OS module
* Added video player simulation
* New chat interface

[v1.5.0] - 2025-11-28
---------------------
* Added loading animations
* Improved boot sequence
* Better mobile responsiveness

[v1.0.0] - 2025-11-01
---------------------
* Initial release
* Basic login system
* Desktop environment
* Core functionality

=====================================
  END OF LOG
=====================================

> System uptime: 847 hours
> Last maintenance: 2025-12-16
> Status: OPERATIONAL
`.trim()

/**
 * ChangeLog Component
 * Displays version history in a terminal-style format
 */
function ChangeLog() {
  return (
    <div className="h-full bg-black p-4 font-mono text-sm">
      <pre className="text-accent-green whitespace-pre-wrap leading-relaxed">
        {CHANGELOG_CONTENT}
      </pre>
      <div className="mt-4 text-slate-500 flex items-center gap-2">
        <span className="blink">_</span>
        <span>EOF</span>
      </div>
    </div>
  )
}

export default ChangeLog
