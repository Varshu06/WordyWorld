import React, { useState } from 'react'
import BananaScramble from './components/BananaScramble'
import DailyJungleQuest from './components/DailyJungleQuest'
import DifficultySelector from './components/DifficultySelector'
import FoodWorldHub from './components/FoodWorldHub'
import Homepage from './components/Homepage'
import JungleWorldHub from './components/JungleWorldHub'
import PicturePop from './components/PicturePop'
import SoundSafari from './components/SoundSafari'
import SpaceWorldHub from './components/SpaceWorldHub'
import WordMatchingGame from './components/WordMatchingGame'
import WorldSelector from './components/WorldSelector'

function App() {
  const [currentScreen, setCurrentScreen] = useState('homepage')
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy')

  const handleEnterWordyWorld = () => {
    setCurrentScreen('difficulty-selector')
  }

  const handleBackToHome = () => {
    setCurrentScreen('homepage')
  }

  const handleBackToDifficulty = () => {
    setCurrentScreen('difficulty-selector')
  }

  const handleDifficultySelect = (difficulty) => {
    console.log('Selected difficulty:', difficulty)
    setSelectedDifficulty(difficulty)
    setCurrentScreen('world-selector')
  }

  const handleWorldSelect = (world) => {
    console.log('Selected world:', world)
    // Navigate to the appropriate world hub
    if (world === 'jungle') {
      setCurrentScreen('jungle-hub')
    } else if (world === 'space') {
      setCurrentScreen('space-hub')
    } else if (world === 'food') {
      setCurrentScreen('food-hub')
    }
  }

  const handleBackToWorlds = () => {
    setCurrentScreen('world-selector')
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
      {currentScreen === 'world-selector' && (
        <WorldSelector
          onWorldSelect={handleWorldSelect}
          onBack={handleBackToDifficulty}
        />
      )}
      {currentScreen === 'jungle-hub' && (
        <JungleWorldHub
          onBackToWorlds={handleBackToWorlds}
          onGoHome={handleBackToHome}
          onGameSelect={(game) => setCurrentScreen(game)}
        />
      )}
      {currentScreen === 'space-hub' && (
        <SpaceWorldHub
          onBackToWorlds={handleBackToWorlds}
          onGoHome={handleBackToHome}
          onGameSelect={(game) => setCurrentScreen(game)}
        />
      )}
      {currentScreen === 'food-hub' && (
        <FoodWorldHub
          onBackToWorlds={handleBackToWorlds}
          onGoHome={handleBackToHome}
          onGameSelect={(game) => setCurrentScreen(game)}
        />
      )}
      {currentScreen === 'word-matching-game' && (
        <WordMatchingGame
          difficulty={selectedDifficulty}
          onBackToHub={() => setCurrentScreen('jungle-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'banana-scramble' && (
        <BananaScramble
          difficulty={selectedDifficulty}
          world="jungle"
          onBackToHub={() => setCurrentScreen('jungle-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'banana-scramble-space' && (
        <BananaScramble
          difficulty={selectedDifficulty}
          world="space"
          onBackToHub={() => setCurrentScreen('space-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'banana-scramble-food' && (
        <BananaScramble
          difficulty={selectedDifficulty}
          world="food"
          onBackToHub={() => setCurrentScreen('food-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'picture-pop-jungle' && (
        <PicturePop
          difficulty={selectedDifficulty}
          world="jungle"
          onBackToHub={() => setCurrentScreen('jungle-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'picture-pop-space' && (
        <PicturePop
          difficulty={selectedDifficulty}
          world="space"
          onBackToHub={() => setCurrentScreen('space-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'picture-pop-food' && (
        <PicturePop
          difficulty={selectedDifficulty}
          world="food"
          onBackToHub={() => setCurrentScreen('food-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'sound-safari-jungle' && (
        <SoundSafari
          difficulty={selectedDifficulty}
          world="jungle"
          onBackToHub={() => setCurrentScreen('jungle-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'sound-safari-space' && (
        <SoundSafari
          difficulty={selectedDifficulty}
          world="space"
          onBackToHub={() => setCurrentScreen('space-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'sound-safari-food' && (
        <SoundSafari
          difficulty={selectedDifficulty}
          world="food"
          onBackToHub={() => setCurrentScreen('food-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'daily-jungle-quest' && (
        <DailyJungleQuest
          difficulty={selectedDifficulty}
          onBackToHub={() => setCurrentScreen('jungle-hub')}
          onGoHome={handleBackToHome}
        />
      )}
    </div>
  )
}

export default App

