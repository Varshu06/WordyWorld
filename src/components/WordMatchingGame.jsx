import React, { useEffect, useState } from 'react'

const WordMatchingGame = ({ difficulty = 'easy', onBackToHub, onGoHome }) => {
  // Game configuration based on difficulty
  const gameConfig = {
    easy: { pairs: 4, timeBonus: 60 },
    medium: { pairs: 6, timeBonus: 90 },
    hard: { pairs: 8, timeBonus: 120 },
  }

  const config = gameConfig[difficulty] || gameConfig.easy

  // Jungle animal words and emojis
  const jungleAnimals = [
    { word: 'monkey', emoji: '🐵', definition: 'A playful jungle animal that swings on trees' },
    { word: 'lion', emoji: '🦁', definition: 'The king of the jungle with a golden mane' },
    { word: 'tiger', emoji: '🐯', definition: 'A striped big cat that roams the jungle' },
    { word: 'parrot', emoji: '🦜', definition: 'A colorful bird that can talk and fly' },
    { word: 'snake', emoji: '🐍', definition: 'A slithering reptile in the jungle' },
    { word: 'elephant', emoji: '🐘', definition: 'A huge animal with a long trunk' },
    { word: 'frog', emoji: '🐸', definition: 'A small jumping animal that lives near water' },
    { word: 'zebra', emoji: '🦓', definition: 'A striped horse-like animal' },
  ]

  // Select animals based on difficulty
  const selectedAnimals = jungleAnimals.slice(0, config.pairs)
  
  // Game state
  const [pictures, setPictures] = useState([])
  const [words, setWords] = useState([])
  const [selectedPicture, setSelectedPicture] = useState(null)
  const [selectedWord, setSelectedWord] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState([])
  const [matchedCount, setMatchedCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [starsEarned, setStarsEarned] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [hintPair, setHintPair] = useState(null)
  const [draggedWord, setDraggedWord] = useState(null)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [celebration, setCelebration] = useState(false)

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [difficulty])

  // Timer
  useEffect(() => {
    if (isPaused || gameComplete) return
    
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaused, gameComplete])

  // Check for game completion
  useEffect(() => {
    if (matchedCount === config.pairs) {
      calculateStars()
      setGameComplete(true)
      setCelebration(true)
    }
  }, [matchedCount, config.pairs])

  const initializeGame = () => {
    // Create picture cards
    const pics = selectedAnimals.map((animal, index) => ({
      id: `pic-${index}`,
      animal: animal.word,
      emoji: animal.emoji,
      matched: false,
    }))
    
    // Create word cards (shuffled)
    const wordCards = [...selectedAnimals]
      .sort(() => Math.random() - 0.5)
      .map((animal, index) => ({
        id: `word-${index}`,
        word: animal.word,
        matched: false,
      }))

    setPictures(pics)
    setWords(wordCards)
    setMatchedPairs([])
    setMatchedCount(0)
    setSelectedPicture(null)
    setSelectedWord(null)
    setGameComplete(false)
    setTimeElapsed(0)
    setStarsEarned(0)
    setIsPaused(false)
  }

  const calculateStars = () => {
    let stars = 1
    
    // For easy difficulty, no time pressure - just focus on accuracy
    if (difficulty === 'easy') {
      stars = 5 // Always max stars for completing on easy!
    } else {
      // Medium/Hard: Time-based bonus still applies
      const timeBonus = config.timeBonus - timeElapsed
      if (timeBonus > config.timeBonus * 0.6) stars = 5
      else if (timeBonus > config.timeBonus * 0.4) stars = 4
      else if (timeBonus > config.timeBonus * 0.2) stars = 3
      else if (timeBonus > 0) stars = 2
    }
    
    setStarsEarned(stars)
  }

  const handlePictureClick = (picture) => {
    if (picture.matched || isPaused || gameComplete) return
    
    if (selectedPicture?.id === picture.id) {
      setSelectedPicture(null)
    } else {
      setSelectedPicture(picture)
      checkMatch(picture, selectedWord)
    }
  }

  const handleWordClick = (word) => {
    if (word.matched || isPaused || gameComplete) return
    
    if (selectedWord?.id === word.id) {
      setSelectedWord(null)
    } else {
      setSelectedWord(word)
      checkMatch(selectedPicture, word)
    }
  }

  const checkMatch = (picture, word) => {
    if (!picture || !word) return

    // Wait a moment to show selection, then check match
    setTimeout(() => {
      const pictureAnimal = selectedAnimals.find(a => a.word === picture.animal)
      const wordAnimal = selectedAnimals.find(a => a.word === word.word)

      if (pictureAnimal?.word === wordAnimal?.word) {
        // Correct match! 🎉
        setPictures((prev) =>
          prev.map((p) =>
            p.id === picture.id ? { ...p, matched: true } : p
          )
        )
        setWords((prev) =>
          prev.map((w) =>
            w.id === word.id ? { ...w, matched: true } : w
          )
        )
        setMatchedPairs((prev) => [...prev, { picture, word }])
        setMatchedCount((prev) => prev + 1)
        
        // Reset selections
        setSelectedPicture(null)
        setSelectedWord(null)
      } else {
        // Wrong match - shake animation
        setTimeout(() => {
          setSelectedPicture(null)
          setSelectedWord(null)
        }, 500)
      }
    }, 300)
  }

  const handleDragStart = (e, word) => {
    if (word.matched || isPaused || gameComplete) return
    setDraggedWord(word)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, picture) => {
    e.preventDefault()
    if (!draggedWord || picture.matched || isPaused || gameComplete) return

    const pictureAnimal = selectedAnimals.find(a => a.word === picture.animal)
    const wordAnimal = selectedAnimals.find(a => a.word === draggedWord.word)

    if (pictureAnimal?.word === wordAnimal?.word) {
      // Correct match! 🎉
      setPictures((prev) =>
        prev.map((p) =>
          p.id === picture.id ? { ...p, matched: true } : p
        )
      )
      setWords((prev) =>
        prev.map((w) =>
          w.id === draggedWord.id ? { ...w, matched: true } : w
        )
      )
      setMatchedPairs((prev) => [...prev, { picture, word: draggedWord }])
      setMatchedCount((prev) => prev + 1)
    } else {
      // Wrong match - shake effect will happen via CSS
    }
    
    setDraggedWord(null)
  }

  const handleHint = () => {
    if (matchedCount === config.pairs) return
    
    // Find an unmatched pair
    const unmatchedPic = pictures.find((p) => !p.matched)
    if (unmatchedPic) {
      setShowHint(true)
      setHintPair(unmatchedPic)
      setTimeout(() => setShowHint(false), 2000)
    }
  }

  const handlePlayAgain = () => {
    initializeGame()
    setCelebration(false)
  }

  // Progress percentage
  const progress = (matchedCount / config.pairs) * 100

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8">
      {/* Animated Jungle Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-green-800 via-emerald-600 to-green-400"></div>
        
        {/* Floating jungle elements */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`leaf-${i}`}
            className="absolute text-2xl opacity-30 animate-float-jungle pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          >
            {['🍃', '🌿', '🌾'][Math.floor(Math.random() * 3)]}
          </div>
        ))}
      </div>

      {/* Celebration Confetti */}
      {celebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute text-2xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {['🍃', '🌿', '⭐', '✨', '🎉'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Victory Screen */}
      {gameComplete && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-yellow-400 via-green-400 to-emerald-500 rounded-3xl p-8 md:p-12 max-w-2xl w-full mx-4 shadow-2xl border-4 border-white animate-victory-pop">
            <div className="text-center">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl font-playful">
                🎉 AMAZING JOB! 🎉
              </h2>
              <p className="text-2xl md:text-3xl text-white font-bold mb-6 drop-shadow-lg font-playful">
                You matched all jungle words perfectly!
              </p>
              <div className="text-4xl md:text-6xl mb-6">
                {'⭐'.repeat(starsEarned)}
              </div>
              <p className="text-xl md:text-2xl text-white font-bold mb-8 drop-shadow-lg font-playful">
                {starsEarned} Stars Earned!
              </p>
              <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg font-playful">
                🐒 "You're the jungle word champion!" 🦜
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={handlePlayAgain}
                  className="px-8 py-4 bg-white text-green-600 font-bold text-xl rounded-full hover:scale-110 transition-all duration-300 shadow-xl font-playful"
                >
                  🔁 Play Again
                </button>
                <button
                  onClick={onBackToHub}
                  className="px-8 py-4 bg-white text-green-600 font-bold text-xl rounded-full hover:scale-110 transition-all duration-300 shadow-xl font-playful"
                >
                  🏡 Back to Jungle Hub
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pause Overlay */}
      {isPaused && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 rounded-3xl p-8 text-center">
            <h3 className="text-4xl font-black text-green-600 mb-4 font-playful">GAME PAUSED</h3>
            <button
              onClick={() => setIsPaused(false)}
              className="px-8 py-4 bg-green-500 text-white font-bold text-xl rounded-full hover:scale-110 transition-all duration-300 font-playful"
            >
              Continue Playing
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-black mb-2 drop-shadow-2xl font-playful">
            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-yellow-400 bg-clip-text text-transparent">
              🌴 Word Matching Puzzle 🐒
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl md:text-3xl">⭐</span>
            <span className="text-white text-lg md:text-xl font-bold drop-shadow-lg">
              Progress: {matchedCount}/{config.pairs} Stars Earned
            </span>
          </div>
          <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg font-playful mb-4">
            Match the words with the right jungle friends! 🌟
          </p>
        </div>

        {/* Progress Bar (Vine) */}
        <div className="mb-6 mx-auto max-w-2xl">
          <div className="relative h-8 bg-white/20 rounded-full overflow-hidden border-2 border-white/40">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-emerald-400 to-yellow-400 transition-all duration-500 ease-out flex items-center justify-center"
              style={{ width: `${progress}%` }}
            >
              <span className="text-white font-bold text-sm drop-shadow-lg">
                {Math.round(progress)}%
              </span>
            </div>
            {/* Stars hanging from vine */}
            {[...Array(config.pairs)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute top-0 text-xl animate-star-swing"
                style={{
                  left: `${(i + 1) * (100 / (config.pairs + 1))}%`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: i < matchedCount ? 1 : 0.3,
                }}
              >
                ⭐
              </div>
            ))}
          </div>
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pictures Section */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-4 drop-shadow-xl font-playful">
              PICTURES
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              {pictures.map((picture) => {
                const isSelected = selectedPicture?.id === picture.id
                const isMatched = picture.matched
                const showHintGlow = showHint && hintPair?.id === picture.id

                return (
                  <div
                    key={picture.id}
                    onDrop={(e) => handleDrop(e, picture)}
                    onDragOver={handleDragOver}
                    onClick={() => handlePictureClick(picture)}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      isMatched
                        ? 'opacity-60 scale-95'
                        : isSelected
                        ? 'scale-110 z-20'
                        : 'hover:scale-105'
                    } ${showHintGlow ? 'animate-hint-glow' : ''}`}
                  >
                    {/* Glassmorphism Card */}
                    <div
                      className={`rounded-2xl p-4 md:p-6 backdrop-blur-lg border-2 transition-all duration-300 ${
                        isMatched
                          ? 'bg-green-500/50 border-green-400'
                          : isSelected
                          ? 'bg-yellow-400/40 border-yellow-300 shadow-2xl'
                          : 'bg-white/25 border-white/40 hover:bg-white/35'
                      } ${showHintGlow ? 'ring-4 ring-yellow-400' : ''}`}
                    >
                      <div className="text-center">
                        <div className="text-6xl md:text-8xl mb-2">
                          {picture.emoji}
                        </div>
                        {isMatched && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl animate-star-pop">⭐</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Animal animation */}
                    {!isMatched && (
                      <div className="absolute -top-2 -right-2 text-3xl animate-bounce-gentle pointer-events-none">
                        {picture.emoji}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Words Section */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-4 drop-shadow-xl font-playful">
              WORDS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              {words.map((word) => {
                const isSelected = selectedWord?.id === word.id
                const isMatched = word.matched
                const showHintGlow =
                  showHint &&
                  hintPair &&
                  selectedAnimals.find((a) => a.word === hintPair.animal)?.word === word.word

                return (
                  <div
                    key={word.id}
                    draggable={!isMatched && !isPaused && !gameComplete}
                    onDragStart={(e) => handleDragStart(e, word)}
                    onClick={() => handleWordClick(word)}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      isMatched
                        ? 'opacity-60 scale-95'
                        : isSelected
                        ? 'scale-110 z-20'
                        : 'hover:scale-105'
                    } ${showHintGlow ? 'animate-hint-glow' : ''}`}
                  >
                    {/* Glassmorphism Card */}
                    <div
                      className={`rounded-2xl p-4 md:p-6 backdrop-blur-lg border-2 transition-all duration-300 ${
                        isMatched
                          ? 'bg-green-500/50 border-green-400'
                          : isSelected
                          ? 'bg-yellow-400/40 border-yellow-300 shadow-2xl'
                          : 'bg-white/25 border-white/40 hover:bg-white/35'
                      } ${showHintGlow ? 'ring-4 ring-yellow-400' : ''}`}
                    >
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-black text-white drop-shadow-lg font-playful uppercase">
                          {word.word}
                        </div>
                        {isMatched && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl animate-star-pop">⭐</span>
                          </div>
                        )}
                      </div>
                      {/* Leaf trail effect when dragging */}
                      {draggedWord?.id === word.id && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="text-4xl animate-pulse">🍃</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mb-6">
          <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg font-playful">
            <span className="hidden md:inline">Drag or Tap to Match the Pairs! 🌟</span>
            <span className="md:hidden">Tap to Match the Pairs! 🌟</span>
          </p>
        </div>

        {/* Game Controls */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div className="text-white text-lg md:text-xl font-bold drop-shadow-lg font-playful">
            Matched: {matchedCount}/{config.pairs}
          </div>
          <button
            onClick={handleHint}
            disabled={matchedCount === config.pairs}
            className="px-6 py-3 bg-yellow-500 text-white font-bold text-lg rounded-full hover:scale-110 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-playful"
          >
            💡 Hint
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-full hover:scale-110 transition-all duration-300 shadow-xl font-playful"
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onBackToHub}
            className="px-6 py-3 bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-110 hover:bg-white/35 hover:shadow-xl font-playful"
          >
            ← Back to Hub
          </button>
          <button
            onClick={onGoHome}
            className="px-6 py-3 bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-110 hover:bg-white/35 hover:shadow-xl font-playful"
          >
            🏠 Home
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-jungle {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(10deg); }
          66% { transform: translateY(-50px) translateX(-10px) rotate(-5deg); }
        }
        .animate-float-jungle {
          animation: float-jungle 7s ease-in-out infinite;
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }

        @keyframes victory-pop {
          0% {
            transform: scale(0.5) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) rotate(5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .animate-victory-pop {
          animation: victory-pop 0.6s ease-out;
        }

        @keyframes star-pop {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }
        .animate-star-pop {
          animation: star-pop 0.6s ease-out;
        }

        @keyframes star-swing {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-star-swing {
          animation: star-swing 2s ease-in-out infinite;
        }

        @keyframes hint-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.9);
          }
        }
        .animate-hint-glow {
          animation: hint-glow 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default WordMatchingGame

