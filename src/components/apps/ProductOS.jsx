import { GamepadIcon } from '../Icons'

/**
 * Game data for the product catalog
 */
const GAMES = [
  { 
    name: 'Project Pancake', 
    status: 'In Development', 
    statusColor: 'accent-yellow', 
    description: 'A deliciously chaotic cooking adventure game.' 
  },
  { 
    name: 'Burger Truck Simulator', 
    status: 'Coming Soon', 
    statusColor: 'accent-purple', 
    description: 'Run your own food truck empire across the city.' 
  },
  { 
    name: 'Bullet Boi', 
    status: 'In Development', 
    statusColor: 'accent-cyan', 
    description: 'Fast-paced bullet hell action with style.' 
  },
]

/**
 * Status badge color mapping
 */
const STATUS_COLORS = {
  'accent-yellow': 'bg-accent-yellow/20 text-accent-yellow',
  'accent-green': 'bg-accent-green/20 text-accent-green',
  'accent-purple': 'bg-accent-purple/20 text-accent-purple',
  'accent-cyan': 'bg-accent-cyan/20 text-accent-cyan',
}

/**
 * ProductOS Component
 * Displays the game catalog with status indicators
 */
function ProductOS() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <GamepadIcon />
        <h2 className="text-xl font-bold text-slate-200">Game Catalog</h2>
      </div>

      {/* Game List */}
      <div className="space-y-4">
        {GAMES.map((game, i) => (
          <div 
            key={i}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-accent-blue/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-slate-200">{game.name}</h3>
              <span className={`text-xs font-mono px-2 py-1 rounded ${STATUS_COLORS[game.statusColor]}`}>
                {game.status}
              </span>
            </div>
            <p className="text-slate-400 text-sm">{game.description}</p>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <p className="text-slate-500 text-xs font-mono">
          // Total Games: {GAMES.length} | Active Development: 2
        </p>
      </div>
    </div>
  )
}

export default ProductOS
