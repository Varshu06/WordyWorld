import React, { useEffect, useState } from 'react'

const DailyJungleQuest = ({ difficulty = 'easy', onBackToHub, onGoHome }) => {
  // Daily quest tasks pool
  const dailyTasks = [
    {
      id: 'find-words',
      title: '🐒 Word Discovery Challenge',
      description: 'Find 3 new words hidden in the jungle vines!',
      emoji: '🐒',
      gameType: 'word-matching',
      reward: { stars: 3, badge: '🍌', message: "You discovered 3 new jungle friends!" },
    },
    {
      id: 'sound-match',
      title: '🦜 Sound Safari Quick',
      description: 'Match sounds to words before time runs out!',
      emoji: '🦜',
      gameType: 'sound-safari',
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
      gameType: 'picture-pop',
      reward: { stars: 3, badge: '🎈', message: "Pop perfection! Well done!" },
    },
  ]

  // Get today's quest based on date
  const getTodayQuest = () => {
    const today = new Date().toDateString()
    const storedDate = localStorage.getItem('dailyQuestDate')
    
    if (storedDate === today) {
      // Quest already done today
      return null
    }
    
    // Get quest based on day of week (so it changes daily but is consistent for the day)
    const dayOfWeek = new Date().getDay()
    const taskIndex = dayOfWeek % dailyTasks.length
    return dailyTasks[taskIndex]
  }

  const [todayQuest, setTodayQuest] = useState(null)
  const [streak, setStreak] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    // Get today's quest
    const quest = getTodayQuest()
    setTodayQuest(quest)
    
    // Load streak from localStorage
    const savedStreak = localStorage.getItem('dailyStreak')
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10))
    }
  }, [])

  const handlePlayQuest = () => {
    if (!todayQuest) return
    
    // Store quest info for game to access
    localStorage.setItem('currentDailyQuest', JSON.stringify(todayQuest))
    localStorage.setItem('questDifficulty', difficulty)
    
    // Navigate to the appropriate game
    window.location.href = `#${todayQuest.gameType}-jungle`
  }

  const handleCompleteQuest = () => {
    if (!todayQuest) return
    
    // Mark as completed
    const today = new Date().toDateString()
    localStorage.setItem('dailyQuestDate', today)
    
    // Update streak
    const newStreak = streak + 1
    setStreak(newStreak)
    localStorage.setItem('dailyStreak', newStreak.toString())
    
    // Show completion screen
    setIsCompleted(true)
  }

  // Check if quest was just completed from localStorage
  useEffect(() => {
    const completedQuest = localStorage.getItem('questCompleted')
    if (completedQuest === 'true') {
      handleCompleteQuest()
      localStorage.removeItem('questCompleted')
    }
  }, [])

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8">
      {/* Animated Jungle Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-green-800 via-emerald-600 to-green-400"></div>
        
        {/* Floating jungle elements */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`jungle-${i}`}
            className="absolute text-2xl opacity-20 animate-float-jungle pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            {['🍃', '🌿', '🌾', '🦋'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
        
        {/* Hidden jungle animals */}
        <div className="absolute top-1/4 left-1/8 text-7xl md:text-8xl opacity-20 animate-monkey-jungle pointer-events-none">
          🐵
        </div>
        <div className="absolute bottom-1/3 right-1/6 text-6xl md:text-7xl opacity-20 animate-lion-jungle pointer-events-none" style={{ animationDelay: '2s' }}>
          🦁
        </div>
        <div className="absolute top-1/2 left-2/5 text-6xl md:text-7xl opacity-20 animate-parrot-jungle pointer-events-none" style={{ animationDelay: '1s' }}>
          🦜
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black mb-3 drop-shadow-2xl font-playful">
            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-yellow-400 bg-clip-text text-transparent">
              🌿 Daily Jungle Quest 🌿
            </span>
          </h1>
          <p className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg font-playful">
            Your adventure starts here!
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
                backgroundColor: '#4CAF50',
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
                      background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
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
                    You've completed today's jungle quest!
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
        /* Floating jungle animation */
        @keyframes float-jungle {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(10deg); }
          66% { transform: translateY(-50px) translateX(-10px) rotate(-5deg); }
        }
        .animate-float-jungle {
          animation: float-jungle 8s ease-in-out infinite;
        }

        /* Monkey animation */
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

        /* Lion animation */
        @keyframes lion-jungle {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0.2; }
          50% { transform: translateX(-80px) translateY(-15px); opacity: 0.3; }
        }
        .animate-lion-jungle {
          animation: lion-jungle 10s ease-in-out infinite;
        }

        /* Parrot animation */
        @keyframes parrot-jungle {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(-40px) translateY(-25px) rotate(-15deg); }
          50% { transform: translateX(-80px) translateY(-40px) rotate(20deg); }
          75% { transform: translateX(-120px) translateY(-30px) rotate(-10deg); }
        }
        .animate-parrot-jungle {
          animation: parrot-jungle 12s ease-in-out infinite;
        }

        /* Bounce quest animation */
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

        /* Shimmer for daily quest */
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

export default DailyJungleQuest

