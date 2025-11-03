import React, { useEffect, useState } from 'react'

const Achievements = ({ world = 'jungle', onBackToHub, onGoHome }) => {
  // World configurations
  const worldConfigs = {
    jungle: {
      title: '🏆 Your Achievements',
      subtitle: "Look at all the awesome badges you've earned!",
      gradient: 'from-green-400 via-emerald-300 to-yellow-400',
      backgroundGradient: 'from-green-800 via-emerald-600 to-green-400',
      floatingItems: ['🍃', '🌿', '🌾', '🦋'],
      worldName: 'Jungle',
    },
    space: {
      title: '🏆 Your Achievements',
      subtitle: "Look at all the cosmic badges you've earned!",
      gradient: 'from-cyan-400 via-blue-500 to-purple-500',
      backgroundGradient: 'from-blue-950 via-indigo-900 to-purple-950',
      floatingItems: ['⭐', '🌟', '✨', '☄️'],
      worldName: 'Space',
    },
    food: {
      title: '🏆 Your Achievements',
      subtitle: "Look at all the yummy badges you've earned!",
      gradient: 'from-orange-400 via-red-500 to-pink-500',
      backgroundGradient: 'from-orange-300 via-red-300 to-pink-300',
      floatingItems: ['🍕', '🍰', '🧁', '🎂'],
      worldName: 'Food',
    },
  }

  const config = worldConfigs[world] || worldConfigs.jungle

  // Badge definitions
  const badges = [
    {
      id: 'world-scout',
      emoji: world === 'jungle' ? '🌴' : world === 'space' ? '🚀' : '🍕',
      name: `${config.worldName} Scout`,
      description: `Complete all ${config.worldName.toLowerCase()} games`,
      requirement: 'Complete 5 games',
      earned: true,
    },
    {
      id: 'word-collector',
      emoji: '🎒',
      name: 'Word Collector',
      description: `Learn 10 ${config.worldName.toLowerCase()} words`,
      requirement: 'Learn 10 words',
      earned: true,
    },
    {
      id: 'speed-learner',
      emoji: '⚡',
      name: 'Speed Learner',
      description: 'Finish a game in under 2 minutes',
      requirement: 'Finish in < 2 min',
      earned: false,
    },
    {
      id: 'banana-hero',
      emoji: '🐵',
      name: world === 'jungle' ? 'Banana Hero' : world === 'space' ? 'Rocket Hero' : 'Chef Hero',
      description: 'Score full stars in scramble game',
      requirement: '5 stars × 1',
      earned: true,
    },
    {
      id: 'sound-master',
      emoji: '🔊',
      name: 'Sound Master',
      description: 'Match 5 sounds correctly in a row',
      requirement: '5 correct sounds',
      earned: false,
    },
    {
      id: 'star-learner',
      emoji: '⭐',
      name: 'Star Learner',
      description: 'Earn 50 total stars',
      requirement: '50 stars total',
      earned: false,
    },
    {
      id: 'perfect-player',
      emoji: '🎯',
      name: 'Perfect Player',
      description: 'Get 100% in any game',
      requirement: '100% score',
      earned: false,
    },
    {
      id: 'world-champion',
      emoji: '🏆',
      name: `${config.worldName} Champion`,
      description: `Finish the whole ${config.worldName} World!`,
      requirement: `Complete ${config.worldName.toLowerCase()}`,
      earned: false,
    },
  ]

  const [stats, setStats] = useState({
    totalStars: 38,
    totalWords: 12,
    gamesCompleted: 6,
    perfectScores: 3,
    worldProgress: 85,
  })

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem(`stats_${world}`)
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [world])

  const earnedBadges = badges.filter(badge => badge.earned)
  const lockedBadges = badges.filter(badge => !badge.earned)

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

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black mb-3 drop-shadow-2xl font-playful">
            <span className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
              {config.title}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-3xl md:text-4xl">⭐⭐⭐</span>
          </div>
          <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg font-playful mb-4">
            {config.subtitle}
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-xl p-4 text-center">
            <div className="text-3xl md:text-4xl mb-2">🌟</div>
            <div className="text-white text-lg md:text-xl font-black drop-shadow-lg font-playful">
              {stats.totalStars}
            </div>
            <div className="text-white text-sm md:text-base font-bold drop-shadow-lg">
              Total Stars
            </div>
          </div>
          <div className="bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-xl p-4 text-center">
            <div className="text-3xl md:text-4xl mb-2">📚</div>
            <div className="text-white text-lg md:text-xl font-black drop-shadow-lg font-playful">
              {stats.totalWords}
            </div>
            <div className="text-white text-sm md:text-base font-bold drop-shadow-lg">
              Words Learned
            </div>
          </div>
          <div className="bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-xl p-4 text-center">
            <div className="text-3xl md:text-4xl mb-2">🎮</div>
            <div className="text-white text-lg md:text-xl font-black drop-shadow-lg font-playful">
              {stats.gamesCompleted}
            </div>
            <div className="text-white text-sm md:text-base font-bold drop-shadow-lg">
              Games Completed
            </div>
          </div>
          <div className="bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-xl p-4 text-center">
            <div className="text-3xl md:text-4xl mb-2">🏅</div>
            <div className="text-white text-lg md:text-xl font-black drop-shadow-lg font-playful">
              {stats.perfectScores}
            </div>
            <div className="text-white text-sm md:text-base font-bold drop-shadow-lg">
              Perfect Scores
            </div>
          </div>
          <div className="bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-xl p-4 text-center">
            <div className="text-3xl md:text-4xl mb-2">🌍</div>
            <div className="text-white text-lg md:text-xl font-black drop-shadow-lg font-playful">
              {stats.worldProgress}%
            </div>
            <div className="text-white text-sm md:text-base font-bold drop-shadow-lg">
              World Progress
            </div>
          </div>
        </div>

        {/* Earned Badges Section */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 drop-shadow-xl font-playful text-center">
            EARNED BADGES
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-white/25 backdrop-blur-lg border-4 border-yellow-400 rounded-2xl p-6 text-center hover:scale-110 transition-all duration-300 animate-glow-badge"
              >
                <div className="text-6xl md:text-7xl mb-3 animate-bounce">
                  {badge.emoji}
                </div>
                <h3 className="text-white text-lg md:text-xl font-black drop-shadow-lg font-playful mb-2">
                  {badge.name}
                </h3>
                <p className="text-white text-xs md:text-sm font-bold drop-shadow-lg">
                  ✓ Earned!
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Locked Badges Section */}
        {lockedBadges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 drop-shadow-xl font-playful text-center">
              LOCKED BADGES
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {lockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-white/10 backdrop-blur-lg border-4 border-gray-400/60 rounded-2xl p-6 text-center opacity-60"
                >
                  <div className="text-6xl md:text-7xl mb-3">
                    🔒
                  </div>
                  <div className="text-6xl md:text-7xl mb-3 opacity-30 absolute">
                    {badge.emoji}
                  </div>
                  <h3 className="text-white text-lg md:text-xl font-black drop-shadow-lg font-playful mb-2">
                    {badge.name}
                  </h3>
                  <p className="text-white text-xs md:text-sm font-bold drop-shadow-lg">
                    {badge.requirement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

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

        @keyframes glow-badge {
          0%, 100% {
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          }
          50% {
            box-shadow: 0 0 25px rgba(255, 215, 0, 0.9);
          }
        }
        .animate-glow-badge {
          animation: glow-badge 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Achievements

