import React, { useState } from 'react'
import Achievements from './components/Achievements'
import BananaScramble from './components/BananaScramble'
import DailyQuest from './components/DailyQuest'
import DifficultySelector from './components/DifficultySelector'
import FoodWorldHub from './components/FoodWorldHub'
import HelpScreen from './components/HelpScreen'
import Homepage from './components/Homepage'
import JungleWorldHub from './components/JungleWorldHub'
import PicturePop from './components/PicturePop'
import SettingsScreen from './components/SettingsScreen'
import SoundSafari from './components/SoundSafari'
import SpaceWorldHub from './components/SpaceWorldHub'
import WordCollection from './components/WordCollection'
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
        <Homepage 
          onEnterClick={handleEnterWordyWorld}
          onSettingsClick={() => setCurrentScreen('settings')}
          onHelpClick={() => setCurrentScreen('help')}
        />
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
      {currentScreen === 'daily-jungle-quest' && (
        <DailyQuest
          difficulty={selectedDifficulty}
          world="jungle"
          onBackToHub={() => setCurrentScreen('jungle-hub')}
          onGoHome={handleBackToHome}
          onGameSelect={(game) => setCurrentScreen(game)}
        />
      )}
      {currentScreen === 'daily-space-quest' && (
        <DailyQuest
          difficulty={selectedDifficulty}
          world="space"
          onBackToHub={() => setCurrentScreen('space-hub')}
          onGoHome={handleBackToHome}
          onGameSelect={(game) => setCurrentScreen(game)}
        />
      )}
      {currentScreen === 'daily-food-quest' && (
        <DailyQuest
          difficulty={selectedDifficulty}
          world="food"
          onBackToHub={() => setCurrentScreen('food-hub')}
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
      {currentScreen === 'word-collection-jungle' && (
        <WordCollection
          world="jungle"
          onBackToHub={() => setCurrentScreen('jungle-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'word-collection-space' && (
        <WordCollection
          world="space"
          onBackToHub={() => setCurrentScreen('space-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'word-collection-food' && (
        <WordCollection
          world="food"
          onBackToHub={() => setCurrentScreen('food-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'achievements-jungle' && (
        <Achievements
          world="jungle"
          onBackToHub={() => setCurrentScreen('jungle-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'achievements-space' && (
        <Achievements
          world="space"
          onBackToHub={() => setCurrentScreen('space-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'achievements-food' && (
        <Achievements
          world="food"
          onBackToHub={() => setCurrentScreen('food-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'help' && (
        <HelpScreen onBack={() => setCurrentScreen('homepage')} />
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen onBack={() => setCurrentScreen('homepage')} />
      )}
    </div>
  )
}

export default App

