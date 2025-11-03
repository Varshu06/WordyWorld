import React, { useEffect, useState } from 'react'

const DailyQuest = ({ difficulty = 'easy', world = 'jungle', onBackToHub, onGoHome, onGameSelect }) => {
  // World configurations
  const worldConfigs = {
    jungle: {
      title: '🌿 Daily Jungle Quest 🌿',
      subtitle: 'Your adventure starts here!',
      gradient: 'from-green-400 via-emerald-300 to-yellow-400',
      backgroundGradient: 'from-green-800 via-emerald-600 to-green-400',
      floatingItems: ['🍃', '🌿', '🌾', '🦋'],
      characters: [
        { emoji: '🐵', class: 'animate-monkey-jungle', position: 'top-1/4 left-1/8' },
        { emoji: '🦁', class: 'animate-lion-jungle', position: 'bottom-1/3 right-1/6', delay: '2s' },
        { emoji: '🦜', class: 'animate-parrot-jungle', position: 'top-1/2 left-2/5', delay: '1s' },
      ],
      color: '#4CAF50',
      tasks: [
        {
          id: 'find-words',
          title: '🐒 Word Discovery Challenge',
          description: 'Find 3 new words hidden in the jungle vines!',
          emoji: '🐒',
          gameType: 'word-matching-game',
          reward: { stars: 3, badge: '🍌', message: "You discovered 3 new jungle friends!" },
        },
        {
          id: 'sound-match',
          title: '🦜 Sound Safari Quick',
          description: 'Match sounds to words before time runs out!',
          emoji: '🦜',
          gameType: 'sound-safari-jungle',
          reward: { stars: 3, badge: '🌟', message: "Amazing ears! You matched all sounds!" },
        },
        {
          id: 'spell-animals',
          title: '🐍 Spelling Champion',
          description: 'Spell jungle animals correctly to earn stars!',
          emoji: '🐍',
          gameType: 'banana-scramble',
          reward: { stars: 3, badge: '🏆', message: "You're a spelling champion!" },
        },
        {
          id: 'pop-pictures',
          title: '🐘 Picture Pop Challenge',
          description: 'Pop the right pictures fast to unlock rewards!',
          emoji: '🐘',
          gameType: 'picture-pop-jungle',
          reward: { stars: 3, badge: '🎈', message: "Pop perfection! Well done!" },
        },
      ],
    },
    space: {
      title: '🚀 Daily Space Quest ⭐',
      subtitle: 'Blast off into daily discovery!',
      gradient: 'from-cyan-400 via-blue-500 to-purple-500',
      backgroundGradient: 'from-blue-950 via-indigo-900 to-purple-950',
      floatingItems: ['⭐', '🌟', '✨', '☄️', '💫'],
      characters: [
        { emoji: '👨‍🚀', class: 'animate-astronaut-space', position: 'top-1/4 left-1/8' },
        { emoji: '🚀', class: 'animate-rocket-space', position: 'bottom-1/3 right-1/6', delay: '2s' },
        { emoji: '🛸', class: 'animate-ufo-space', position: 'top-1/2 left-2/5', delay: '1s' },
      ],
      color: '#2196F3',
      tasks: [
        {
          id: 'find-words',
          title: '🌌 Cosmic Word Discovery',
          description: 'Find 3 space words hidden among the stars!',
          emoji: '🌌',
          gameType: 'word-matching-game',
          reward: { stars: 3, badge: '⭐', message: "You discovered 3 cosmic friends!" },
        },
        {
          id: 'sound-match',
          title: '🔊 Cosmic Sound Safari',
          description: 'Match space sounds to words before time runs out!',
          emoji: '🔊',
          gameType: 'sound-safari-space',
          reward: { stars: 3, badge: '🌟', message: "Out of this world hearing!" },
        },
        {
          id: 'spell-objects',
          title: '🪐 Spelling Explorer',
          description: 'Spell space objects correctly to earn stars!',
          emoji: '🪐',
          gameType: 'banana-scramble-space',
          reward: { stars: 3, badge: '🏆', message: "You're a space spelling champion!" },
        },
        {
          id: 'pop-pictures',
          title: '☄️ Meteor Pop Challenge',
          description: 'Pop the right space objects fast!',
          emoji: '☄️',
          gameType: 'picture-pop-space',
          reward: { stars: 3, badge: '🎈', message: "Meteor perfection! Well done!" },
        },
      ],
    },
    food: {
      title: '🍕 Daily Food Quest 🍰',
      subtitle: 'Taste the fun of learning!',
      gradient: 'from-orange-400 via-red-500 to-pink-500',
      backgroundGradient: 'from-orange-300 via-red-300 to-pink-300',
      floatingItems: ['🍕', '🍰', '🧁', '🎂', '🍪'],
      characters: [
        { emoji: '👨‍🍳', class: 'animate-chef-food', position: 'top-1/4 left-1/8' },
        { emoji: '🍕', class: 'animate-pizza-food', position: 'bottom-1/3 right-1/6', delay: '2s' },
        { emoji: '🍰', class: 'animate-cake-food', position: 'top-1/2 left-2/5', delay: '1s' },
      ],
      color: '#FF9800',
      tasks: [
        {
          id: 'find-words',
          title: '🍎 Food Word Discovery',
          description: 'Find 3 yummy words hidden in the kitchen!',
          emoji: '🍎',
          gameType: 'word-matching-game',
          reward: { stars: 3, badge: '🍪', message: "You discovered 3 delicious friends!" },
        },
        {
          id: 'sound-match',
          title: '🔊 Food Sound Safari',
          description: 'Match food sounds to words before time runs out!',
          emoji: '🔊',
          gameType: 'sound-safari-food',
          reward: { stars: 3, badge: '🌟', message: "Amazing taste hearing!" },
        },
        {
          id: 'spell-foods',
          title: '🧁 Spelling Chef',
          description: 'Spell food names correctly to earn stars!',
          emoji: '🧁',
          gameType: 'banana-scramble-food',
          reward: { stars: 3, badge: '🏆', message: "You're a food spelling champion!" },
        },
        {
          id: 'pop-pictures',
          title: '🎂 Cake Pop Challenge',
          description: 'Pop the right food pictures fast!',
          emoji: '🎂',
          gameType: 'picture-pop-food',
          reward: { stars: 3, badge: '🎈', message: "Yummy perfection! Well done!" },
        },
      ],
    },
  }

  const config = worldConfigs[world] || worldConfigs.jungle

  const [todayQuest, setTodayQuest] = useState(null)
  const [streak, setStreak] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const config = worldConfigs[world] || worldConfigs.jungle
    
    // Get today's quest based on date
    const getTodayQuest = () => {
      const today = new Date().toDateString()
      const storageKey = `dailyQuestDate_${world}`
      const storedDate = localStorage.getItem(storageKey)
      
      if (storedDate === today) {
        return null
      }
      
      const dayOfWeek = new Date().getDay()
      const taskIndex = dayOfWeek % config.tasks.length
      return config.tasks[taskIndex]
    }
    
    const quest = getTodayQuest()
    setTodayQuest(quest)
    
    const streakKey = `dailyStreak_${world}`
    const savedStreak = localStorage.getItem(streakKey)
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10))
    }
  }, [world])

  const handlePlayQuest = () => {
    if (!todayQuest) return
    
    localStorage.setItem('currentDailyQuest', JSON.stringify(todayQuest))
    localStorage.setItem('questDifficulty', difficulty)
    
    // Use the gameType from quest which already includes world suffix
    if (onGameSelect) {
      onGameSelect(todayQuest.gameType)
    }
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
        
        {/* World characters */}
        {config.characters.map((char, idx) => (
          <div
            key={`char-${idx}`}
            className={`absolute text-7xl md:text-8xl opacity-20 ${char.class} pointer-events-none ${char.position}`}
            style={{ animationDelay: char.delay || '0s' }}
          >
            {char.emoji}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black mb-3 drop-shadow-2xl font-playful">
            <span className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
              {config.title}
            </span>
          </h1>
          <p className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg font-playful">
            {config.subtitle}
          </p>
        </div>

        {/* Quest Card */}
        <div className="relative">
          {/* Glassmorphism Card */}
          <div
            className={`relative rounded-3xl p-8 md:p-12 transition-all duration-500 ${
              hovered ? 'transform translate-y-[-20px] scale-105 shadow-2xl' : 'shadow-xl'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: '3px solid rgba(255,255,255,0.4)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-3xl opacity-50 blur-xl transition-all duration-500"
              style={{
                backgroundColor: config.color,
                opacity: hovered ? 0.7 : 0.3,
              }}
            ></div>

            {/* Shimmer animation */}
            {hovered && (
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                  style={{
                    animation: 'shimmer-daily 2s ease-in-out infinite',
                  }}
                ></div>
              </div>
            )}

            <div className="relative z-10 text-center">
              {todayQuest ? (
                <>
                  {/* Quest Available */}
                  <div className={`text-8xl md:text-9xl mb-6 transition-all duration-500 ${hovered ? 'animate-bounce-quest' : ''}`}>
                    {todayQuest.emoji}
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-xl font-playful">
                    {todayQuest.title}
                  </h2>
                  
                  <p className="text-white text-xl md:text-2xl mb-8 font-bold drop-shadow-lg font-playful">
                    {todayQuest.description}
                  </p>
                  
                  {/* Rewards Preview */}
                  <div className="mb-8 flex items-center justify-center gap-3">
                    <span className="text-4xl">⭐ × {todayQuest.reward.stars}</span>
                    <span className="text-4xl">{todayQuest.reward.badge}</span>
                  </div>
                  
                  {/* Play Button */}
                  <button
                    onClick={handlePlayQuest}
                    className={`px-12 py-5 rounded-full font-bold text-2xl md:text-3xl transition-all duration-300 font-playful ${
                      hovered
                        ? 'transform scale-110 shadow-lg'
                        : 'shadow-md'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${config.color} 0%, ${config.color}DD 100%)`,
                      color: 'white',
                      border: '3px solid white',
                    }}
                  >
                    🎮 Start Quest
                  </button>
                </>
              ) : (
                <>
                  {/* Quest Already Completed Today */}
                  <div className="text-8xl md:text-9xl mb-6 animate-bounce">
                    ✅
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-xl font-playful">
                    Great Job Today! 🎉
                  </h2>
                  
                  <p className="text-white text-xl md:text-2xl mb-4 font-bold drop-shadow-lg font-playful">
                    You've completed today's quest!
                  </p>
                  
                  <p className="text-white text-lg md:text-xl mb-8 font-bold drop-shadow-lg font-playful">
                    Come back tomorrow for a new adventure! 🌟
                  </p>
                  
                  {streak > 0 && (
                    <div className="bg-yellow-400/30 rounded-xl p-4 mb-4 border-2 border-yellow-400">
                      <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg font-playful">
                        🔥 You're on a {streak} day streak! Keep it up! 🔥
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Streak Display */}
          {streak > 0 && todayQuest && (
            <div className="mt-4 text-center">
              <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg font-playful">
                🔥 {streak} Day Streak! 🔥
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
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
        /* Floating animation */
        @keyframes float-quest {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(10deg); }
          66% { transform: translateY(-50px) translateX(-10px) rotate(-5deg); }
        }
        .animate-float-quest {
          animation: float-quest 8s ease-in-out infinite;
        }

        /* Jungle animations */
        @keyframes monkey-jungle {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          20% { transform: translateY(-25px) translateX(30px) rotate(20deg); }
          40% { transform: translateY(-35px) translateX(45px) rotate(-15deg); }
          60% { transform: translateY(-20px) translateX(60px) rotate(25deg); }
          80% { transform: translateY(-15px) translateX(70px) rotate(0deg); }
        }
        .animate-monkey-jungle {
          animation: monkey-jungle 8s ease-in-out infinite;
        }

        @keyframes lion-jungle {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0.2; }
          50% { transform: translateX(-80px) translateY(-15px); opacity: 0.3; }
        }
        .animate-lion-jungle {
          animation: lion-jungle 10s ease-in-out infinite;
        }

        @keyframes parrot-jungle {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(-40px) translateY(-25px) rotate(-15deg); }
          50% { transform: translateX(-80px) translateY(-40px) rotate(20deg); }
          75% { transform: translateX(-120px) translateY(-30px) rotate(-10deg); }
        }
        .animate-parrot-jungle {
          animation: parrot-jungle 12s ease-in-out infinite;
        }

        /* Space animations */
        @keyframes astronaut-space {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-30px) translateX(20px) rotate(-10deg); }
          50% { transform: translateY(-40px) translateX(40px) rotate(15deg); }
          75% { transform: translateY(-20px) translateX(50px) rotate(-5deg); }
        }
        .animate-astronaut-space {
          animation: astronaut-space 8s ease-in-out infinite;
        }

        @keyframes rocket-space {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-100px) rotate(-5deg); opacity: 0.4; }
        }
        .animate-rocket-space {
          animation: rocket-space 10s ease-in-out infinite;
        }

        @keyframes ufo-space {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          33% { transform: translateX(-50px) translateY(-20px) rotate(10deg); }
          66% { transform: translateX(-90px) translateY(-10px) rotate(-10deg); }
        }
        .animate-ufo-space {
          animation: ufo-space 12s ease-in-out infinite;
        }

        /* Food animations */
        @keyframes chef-food {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          20% { transform: translateY(-15px) translateX(10px) rotate(-5deg); }
          40% { transform: translateY(-25px) translateX(25px) rotate(10deg); }
          60% { transform: translateY(-20px) translateX(35px) rotate(-5deg); }
          80% { transform: translateY(-10px) translateX(40px) rotate(0deg); }
        }
        .animate-chef-food {
          animation: chef-food 8s ease-in-out infinite;
        }

        @keyframes pizza-food {
          0%, 100% { transform: translateX(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateX(-60px) rotate(180deg); opacity: 0.3; }
        }
        .animate-pizza-food {
          animation: pizza-food 10s ease-in-out infinite;
        }

        @keyframes cake-food {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          33% { transform: translateX(-40px) translateY(-15px) rotate(-8deg); }
          66% { transform: translateX(-70px) translateY(-5px) rotate(8deg); }
        }
        .animate-cake-food {
          animation: cake-food 12s ease-in-out infinite;
        }

        /* Quest animations */
        @keyframes bounce-quest {
          0%, 100% {
            transform: translateY(0) scale(1) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) scale(1.1) rotate(10deg);
          }
        }
        .animate-bounce-quest {
          animation: bounce-quest 1s ease-in-out infinite;
        }

        @keyframes shimmer-daily {
          0% {
            transform: translateX(-200%) skewX(-12deg);
          }
          100% {
            transform: translateX(400%) skewX(-12deg);
          }
        }
      `}</style>
    </div>
  )
}

export default DailyQuest

