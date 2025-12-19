# MudgalOverseas

A custom, immersive "OS" experience website for MudgalOverseas Indie Game Studio.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)

## ✨ Features

### Login Phase
- System initialization screen with CRT scanline effect
- Secure terminal login with boot sequence animation
- Progress bar loading animation

### Desktop Environment
- Clean, dark Tokyo Night themed desktop
- No taskbar design for minimal aesthetic
- Live clock display
- Subtle dot grid background pattern

### Interactive Windows
- Draggable windows with title bar controls
- Click to focus (z-index stacking)
- Maximize/close functionality
- Smooth appear animations

### App Modules
- **Product OS** - Game catalog with status tags
- **pancake.mov** - Video player simulation with REC indicator
- **Talk to Human** - Retro chat interface
- **Change Log** - Terminal-style version history

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
MudgalOverseas/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── apps/
│   │   │   ├── ChangeLog.jsx
│   │   │   ├── PancakeVideo.jsx
│   │   │   ├── ProductOS.jsx
│   │   │   ├── TalkToHuman.jsx
│   │   │   └── index.js
│   │   ├── Clock.jsx
│   │   ├── CRTOverlay.jsx
│   │   ├── Desktop.jsx
│   │   ├── Icons.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── Window.jsx
│   │   └── index.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Color Palette (Tokyo Night)

| Color | Hex | Usage |
|-------|-----|-------|
| Slate 950 | `#0a0a0f` | Background |
| Slate 900 | `#0f0f17` | Panels |
| Slate 800 | `#1a1a2e` | Cards |
| Accent Blue | `#7aa2f7` | Primary |
| Accent Purple | `#bb9af7` | Secondary |
| Accent Green | `#9ece6a` | Success |
| Accent Red | `#f7768e` | Error/Recording |
| Accent Yellow | `#e0af68` | Warning |

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **JetBrains Mono** - Monospace Font
- **Space Grotesk** - Sans-serif Font

## 📝 Customization

### Adding New Games
Edit `src/components/apps/ProductOS.jsx` and update the `GAMES` array.

### Changing Colors
Modify `tailwind.config.js` to update the color palette.

### Adding New Apps
1. Create a new component in `src/components/apps/`
2. Export it from `src/components/apps/index.js`
3. Add configuration in `Desktop.jsx` (`DESKTOP_ICONS` and `WINDOW_CONFIGS`)

## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with 💜 by MudgalOverseas
