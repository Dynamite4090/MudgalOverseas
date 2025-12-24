import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import Desktop from './components/Desktop'
import CRTOverlay from './components/CRTOverlay'
import { SettingsProvider } from './context/SettingsContext'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleLogin = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIsLoggedIn(true)
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <SettingsProvider>
      <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {isLoggedIn ? <Desktop /> : <LoginScreen onLogin={handleLogin} />}
      </div>
      <CRTOverlay />
    </SettingsProvider>
  )
}

export default App

