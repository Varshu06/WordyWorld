import React, { useEffect, useState } from 'react'
import Achievements from './components/Achievements'
import BananaScramble from './components/BananaScramble'
import CelebrationModal from './components/CelebrationModal'
import DailyQuest from './components/DailyQuest'
import DifficultySelector from './components/DifficultySelector'
import EmptyState from './components/EmptyState'
import ErrorScreen from './components/ErrorScreen'
import FoodWorldHub from './components/FoodWorldHub'
import HelpScreen from './components/HelpScreen'
import Homepage from './components/Homepage'
import JungleWorldHub from './components/JungleWorldHub'
import PicturePop from './components/PicturePop'
import SeasonalTheme from './components/SeasonalTheme'
import SettingsScreen from './components/SettingsScreen'
import SoundSafari from './components/SoundSafari'
import SpaceWorldHub from './components/SpaceWorldHub'
import WordCollection from './components/WordCollection'
import WordMatchingGame from './components/WordMatchingGame'
import WorldSelector from './components/WorldSelector'

function App() {
  const [currentScreen, setCurrentScreen] = useState('homepage')
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy')

  // Load saved difficulty from localStorage on mount
  useEffect(() => {
    const savedDifficulty = localStorage.getItem('difficulty') || localStorage.getItem('selectedDifficulty')
    if (savedDifficulty) {
      setSelectedDifficulty(savedDifficulty)
    }
  }, [])

  // Helper function to get difficulty - check for quest difficulty first, then normal difficulty
  const getDifficultyForGame = () => {
    const questDifficulty = localStorage.getItem('questDifficulty')
    if (questDifficulty) {
      localStorage.removeItem('questDifficulty') // Clear it after use
      return questDifficulty
    }
    return selectedDifficulty
  }

  const handleEnterWordQuest = () => {
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
    <SeasonalTheme>
      <div className="App">
        {currentScreen === 'homepage' && (
          <Homepage 
            onEnterClick={handleEnterWordQuest}
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
      {currentScreen === 'word-matching-game-jungle' && (
        <WordMatchingGame
          difficulty={getDifficultyForGame()}
          world="jungle"
          onBackToHub={() => setCurrentScreen('jungle-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'word-matching-game-space' && (
        <WordMatchingGame
          difficulty={getDifficultyForGame()}
          world="space"
          onBackToHub={() => setCurrentScreen('space-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'word-matching-game-food' && (
        <WordMatchingGame
          difficulty={getDifficultyForGame()}
          world="food"
          onBackToHub={() => setCurrentScreen('food-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'banana-scramble' && (
        <BananaScramble
          difficulty={getDifficultyForGame()}
          world="jungle"
          onBackToHub={() => setCurrentScreen('jungle-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'banana-scramble-space' && (
        <BananaScramble
          difficulty={getDifficultyForGame()}
          world="space"
          onBackToHub={() => setCurrentScreen('space-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'banana-scramble-food' && (
        <BananaScramble
          difficulty={getDifficultyForGame()}
          world="food"
          onBackToHub={() => setCurrentScreen('food-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'picture-pop-jungle' && (
        <PicturePop
          difficulty={getDifficultyForGame()}
          world="jungle"
          onBackToHub={() => setCurrentScreen('jungle-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'picture-pop-space' && (
        <PicturePop
          difficulty={getDifficultyForGame()}
          world="space"
          onBackToHub={() => setCurrentScreen('space-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'picture-pop-food' && (
        <PicturePop
          difficulty={getDifficultyForGame()}
          world="food"
          onBackToHub={() => setCurrentScreen('food-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'sound-safari-jungle' && (
        <SoundSafari
          difficulty={getDifficultyForGame()}
          world="jungle"
          onBackToHub={() => setCurrentScreen('jungle-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'sound-safari-space' && (
        <SoundSafari
          difficulty={getDifficultyForGame()}
          world="space"
          onBackToHub={() => setCurrentScreen('space-hub')}
          onGoHome={handleBackToHome}
        />
      )}
      {currentScreen === 'sound-safari-food' && (
        <SoundSafari
          difficulty={getDifficultyForGame()}
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
      {currentScreen === 'error' && (
        <ErrorScreen 
          errorType="generic"
          onTryAgain={() => window.location.reload()}
          onBackToHome={handleBackToHome}
        />
      )}
      </div>
    </SeasonalTheme>
  )
}

export default App

