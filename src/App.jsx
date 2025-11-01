import React, { useState } from 'react'
import DifficultySelector from './components/DifficultySelector'
import Homepage from './components/Homepage'

function App() {
  const [currentScreen, setCurrentScreen] = useState('homepage')

  const handleEnterWordyWorld = () => {
    setCurrentScreen('difficulty-selector')
  }

  const handleBackToHome = () => {
    setCurrentScreen('homepage')
  }

  const handleDifficultySelect = (difficulty) => {
    console.log('Selected difficulty:', difficulty)
    // Will navigate to World Selector in next phase
    // For now, just log it
  }

  return (
    <div className="App">
      {currentScreen === 'homepage' && (
        <Homepage onEnterClick={handleEnterWordyWorld} />
      )}
      {currentScreen === 'difficulty-selector' && (
        <DifficultySelector
          onDifficultySelect={handleDifficultySelect}
          onBack={handleBackToHome}
        />
      )}
    </div>
  )
}

export default App

