import React, { useEffect, useState } from 'react'

const WordCollection = ({ world = 'jungle', onBackToHub, onGoHome }) => {
  // World configurations
  const worldConfigs = {
    jungle: {
      title: '🌴 My Word Collection',
      subtitle: "Look at all the amazing words you've discovered!",
      gradient: 'from-green-400 via-emerald-300 to-yellow-400',
      backgroundGradient: 'from-green-800 via-emerald-600 to-green-400',
      floatingItems: ['🍃', '🌿', '🌾', '🦋'],
      progressMessage: 'Continue exploring to unlock more jungle words! 🌈',
      progressBarGradient: 'from-green-400 via-emerald-400 to-yellow-400',
      progressBarIcon: '🌿',
      glowColor: '#4CAF50',
      closeButtonColor: 'text-green-600',
    },
    space: {
      title: '🚀 My Word Collection',
      subtitle: "Look at all the cosmic words you've discovered!",
      gradient: 'from-cyan-400 via-blue-500 to-purple-500',
      backgroundGradient: 'from-blue-950 via-indigo-900 to-purple-950',
      floatingItems: ['⭐', '🌟', '✨', '☄️'],
      progressMessage: 'Continue exploring to unlock more space words! 🌌',
      progressBarGradient: 'from-cyan-400 via-blue-500 to-purple-500',
      progressBarIcon: '⭐',
      glowColor: '#3B82F6',
      closeButtonColor: 'text-blue-500',
    },
    food: {
      title: '🍕 My Word Collection',
      subtitle: "Look at all the yummy words you've discovered!",
      gradient: 'from-orange-400 via-red-500 to-pink-500',
      backgroundGradient: 'from-orange-300 via-red-300 to-pink-300',
      floatingItems: ['🍕', '🍰', '🧁', '🎂'],
      progressMessage: 'Continue exploring to unlock more food words! 🍰',
      progressBarGradient: 'from-orange-400 via-red-500 to-pink-500',
      progressBarIcon: '🍰',
      glowColor: '#F97316',
      closeButtonColor: 'text-orange-600',
    },
  }

  const config = worldConfigs[world] || worldConfigs.jungle

  // Sample word data - in real app, fetch from API
  const [allWords, setAllWords] = useState([])
  const [learnedWords, setLearnedWords] = useState([])
  const [selectedWord, setSelectedWord] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch all words from API
  useEffect(() => {
    const fetchWords = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:3001/api/all-words?world=${world}`)
        const data = await response.json()
        
        if (data.success && data.words) {
          setAllWords(data.words)
          
          // Load learned words from localStorage
          const savedWords = localStorage.getItem(`learnedWords_${world}`)
          if (savedWords) {
            setLearnedWords(JSON.parse(savedWords))
          }
        }
      } catch (error) {
        console.error('Error fetching words:', error)
        // Fallback to sample data
        initializeFallbackWords()
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchWords()
  }, [world])

  const initializeFallbackWords = () => {
    const sampleWords = {
      jungle: [
        { word: 'tiger', emoji: '🐯', definition: 'A large wild cat found in jungles with stripes.', example: 'The tiger roared loudly in the forest.', category: 'jungle', hint: 'I have stripes and roar loudly!' },
        { word: 'monkey', emoji: '🐵', definition: 'A playful jungle animal that swings on trees.', example: 'The monkey loves to eat bananas.', category: 'jungle', hint: 'I swing from tree to tree and love bananas!' },
        { word: 'elephant', emoji: '🐘', definition: 'A huge animal with a long trunk.', example: 'The elephant sprayed water with its trunk.', category: 'jungle', hint: 'I have a long trunk and big ears!' },
        { word: 'lion', emoji: '🦁', definition: 'The king of the jungle with a golden mane.', example: 'The lion roared to protect its territory.', category: 'jungle', hint: 'I am the king of the jungle with a golden mane!' },
        { word: 'parrot', emoji: '🦜', definition: 'A colorful bird that can talk and fly.', example: 'The parrot repeated what we said.', category: 'jungle', hint: 'I am colorful and can talk!' },
        { word: 'snake', emoji: '🐍', definition: 'A slithering reptile in the jungle.', example: 'The snake moved silently through the grass.', category: 'jungle', hint: 'I slither through the jungle grass!' },
        { word: 'bird', emoji: '🐦', definition: 'A flying animal with feathers and wings.', example: 'The bird chirped early in the morning.', category: 'jungle', hint: 'I fly and sing beautifully!' },
        { word: 'frog', emoji: '🐸', definition: 'A small jumping animal that lives near water.', example: 'The frog jumped into the pond.', category: 'jungle', hint: 'I jump and live near water!' },
      ],
      space: [
        { word: 'rocket', emoji: '🚀', definition: 'A vehicle that flies to the stars.', example: 'The rocket launched into space.', category: 'space', hint: 'It flies to the stars!' },
        { word: 'planet', emoji: '🪐', definition: 'A large object that circles around a star.', example: 'Earth is a beautiful planet.', category: 'space', hint: 'It circles around a star!' },
        { word: 'star', emoji: '⭐', definition: 'A bright object that shines in the sky.', example: 'We saw a star twinkle at night.', category: 'space', hint: 'It shines in the night sky!' },
        { word: 'comet', emoji: '☄️', definition: 'A space object with a bright tail.', example: 'A comet streaked across the sky.', category: 'space', hint: 'It has a bright tail!' },
        { word: 'alien', emoji: '👽', definition: 'A creature from another planet.', example: 'The alien came from Mars.', category: 'space', hint: 'It comes from another planet!' },
        { word: 'satellite', emoji: '🛰️', definition: 'A machine that orbits Earth.', example: 'The satellite sends signals to Earth.', category: 'space', hint: 'It orbits Earth!' },
        { word: 'astronaut', emoji: '👨‍🚀', definition: 'A person who explores space.', example: 'The astronaut walked on the moon.', category: 'space', hint: 'A person who explores space!' },
        { word: 'meteor', emoji: '⭐', definition: 'A shooting star falling from space.', example: 'A meteor flew across the night sky.', category: 'space', hint: 'A shooting star!' },
      ],
      food: [
        { word: 'pizza', emoji: '🍕', definition: 'A round and cheesy food.', example: 'I love to eat pizza for dinner.', category: 'food', hint: "It's round and cheesy!" },
        { word: 'cookie', emoji: '🍪', definition: 'A sweet treat with chocolate chips.', example: 'The cookie tasted delicious.', category: 'food', hint: "It's sweet with chocolate chips!" },
        { word: 'burger', emoji: '🍔', definition: 'A food with a bun and patty.', example: 'I ordered a big burger.', category: 'food', hint: 'It has a bun and patty!' },
        { word: 'cupcake', emoji: '🧁', definition: 'A small cake with frosting.', example: 'The cupcake was colorful and yummy.', category: 'food', hint: "It's a small cake with frosting!" },
        { word: 'donut', emoji: '🍩', definition: 'A sweet ring-shaped treat.', example: 'The donut was covered in sprinkles.', category: 'food', hint: "It's a sweet ring-shaped treat!" },
        { word: 'icecream', emoji: '🍦', definition: 'A cold and sweet frozen dessert.', example: 'Ice cream is perfect on a hot day.', category: 'food', hint: "It's cold and sweet!" },
        { word: 'apple', emoji: '🍎', definition: 'A red or green fruit.', example: 'An apple a day keeps the doctor away.', category: 'food', hint: "It's a red or green fruit!" },
        { word: 'cake', emoji: '🎂', definition: 'A birthday treat with candles.', example: 'We celebrated with a chocolate cake.', category: 'food', hint: "It's a birthday treat!" },
      ],
    }
    
    const words = sampleWords[world] || sampleWords.jungle
    setAllWords(words)
    
    // Mark first 3 as learned for demo
    const demoLearned = words.slice(0, 3).map(w => w.word)
    setLearnedWords(demoLearned)
  }

  const handleWordClick = (word) => {
    if (isWordLearned(word.word)) {
      setSelectedWord(word)
      setShowDetail(true)
    }
  }

  const isWordLearned = (word) => {
    return learnedWords.includes(word)
  }

  const totalWords = allWords.length
  const learnedCount = learnedWords.length
  const progress = totalWords > 0 ? (learnedCount / totalWords) * 100 : 0

  if (isLoading) {
    return (
      <div className={`min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center bg-gradient-to-b ${config.backgroundGradient}`}>
        <div className="text-center">
          <div className="text-6xl md:text-8xl mb-4 animate-bounce">
            {world === 'jungle' ? '🌴' : world === 'space' ? '🚀' : '🍕'}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-2xl font-playful">
            Loading Your Collection...
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className={`absolute inset-0 bg-gradient-to-b ${config.backgroundGradient}`}></div>
        
        {/* Floating elements */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`float-${i}`}
            className="absolute text-2xl opacity-20 animate-float-quest pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            {config.floatingItems[Math.floor(Math.random() * config.floatingItems.length)]}
          </div>
        ))}
      </div>

      {/* Word Detail Popup */}
      {showDetail && selectedWord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className={`relative bg-gradient-to-br ${
              world === 'jungle'
                ? 'from-yellow-400 via-green-400 to-emerald-500'
                : world === 'space'
                ? 'from-cyan-400 via-blue-500 to-purple-500'
                : 'from-orange-400 via-red-500 to-pink-500'
            } rounded-3xl p-8 md:p-12 max-w-md w-full mx-4 shadow-2xl border-4 border-white animate-victory-pop`}
          >
            <button
              onClick={() => setShowDetail(false)}
              className="absolute top-4 right-4 text-3xl text-white hover:scale-110 transition-transform"
            >
              ✕
            </button>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-2xl font-playful">
                WORD DETAIL
              </h3>
              <div className="text-8xl mb-4">{selectedWord.emoji}</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 drop-shadow-xl font-playful uppercase">
                {selectedWord.word}
              </h2>
              <p className="text-white text-xl md:text-2xl mb-4 font-bold drop-shadow-lg font-playful">
                {selectedWord.definition}
              </p>
              <p className="text-white text-lg md:text-xl mb-6 font-bold drop-shadow-lg font-playful italic">
                Example: {selectedWord.example}
              </p>
              <button
                onClick={() => setShowDetail(false)}
                className={`px-8 py-4 bg-white ${config.closeButtonColor} font-bold text-xl rounded-full hover:scale-110 transition-all duration-300 shadow-xl font-playful`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black mb-3 drop-shadow-2xl font-playful">
            <span className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
              {config.title}
            </span>
          </h1>
          <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg font-playful mb-4">
            {config.subtitle}
          </p>
          
          {/* Progress Counter */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-white text-2xl md:text-3xl font-black drop-shadow-lg">
              Total Words: {learnedCount} / {totalWords}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 mx-auto max-w-2xl">
          <div className="relative h-8 bg-white/20 rounded-full overflow-hidden border-3 border-white/40">
            <div
              className={`absolute top-0 left-0 h-full bg-gradient-to-r ${config.progressBarGradient} transition-all duration-700 ease-out`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-black">{config.progressBarIcon}</span>
              </div>
            </div>
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-base drop-shadow-lg">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Word Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {allWords.map((word, index) => {
            const isLearned = isWordLearned(word.word)
            return (
              <button
                key={`word-${index}`}
                onClick={() => handleWordClick(word)}
                className={`relative rounded-2xl p-6 transition-all duration-300 ${
                  isLearned
                    ? 'bg-white/25 backdrop-blur-lg border-4 border-white/40 hover:scale-110 hover:shadow-xl cursor-pointer'
                    : 'bg-white/10 backdrop-blur-lg border-4 border-gray-400/40 opacity-60 cursor-not-allowed'
                }`}
              >
                {isLearned ? (
                  <>
                    <div className="text-center">
                      <div className="text-5xl md:text-6xl mb-2">{word.emoji}</div>
                      <div className="text-white text-lg md:text-xl font-black drop-shadow-lg font-playful uppercase">
                        {word.word}
                      </div>
                    </div>
                    {/* Glow effect for learned words */}
                    <div className="absolute inset-0 rounded-2xl opacity-30 blur-xl" style={{ backgroundColor: config.glowColor }}></div>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <div className="text-5xl md:text-6xl mb-2">🔒</div>
                      <div className="text-white text-lg md:text-xl font-black drop-shadow-lg font-playful">
                        ???
                      </div>
                    </div>
                  </>
                )}
              </button>
            )
          })}
        </div>

        {/* Progress Message */}
        <div className="text-center mb-8">
          <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg font-playful">
            {config.progressMessage}
          </p>
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
        @keyframes float-quest {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(10deg); }
          66% { transform: translateY(-50px) translateX(-10px) rotate(-5deg); }
        }
        .animate-float-quest {
          animation: float-quest 8s ease-in-out infinite;
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
      `}</style>
    </div>
  )
}

export default WordCollection

