import React, { useState } from 'react'

const JungleWorldHub = ({ onBackToWorlds, onGoHome, onGameSelect }) => {
  const [hoveredCard, setHoveredCard] = useState(null)

  // Game cards data
  const gameCards = [
    {
      id: 'word-match',
      icon: '🧩',
      title: 'Word Match',
      description: 'Match animals to their names — vines drop new words!',
      color: '#4CAF50',
      decorations: ['🦜', '🐵', '🦁', '🌿'],
    },
    {
      id: 'banana-scramble',
      icon: '🍌',
      title: 'Banana Scramble',
      description: 'Unscramble words to feed hungry monkeys!',
      color: '#FFC107',
      decorations: ['🐵', '🍌', '🌴', '🦍'],
    },
    {
      id: 'picture-pop',
      icon: '🎈',
      title: 'Picture Pop',
      description: 'Pop the bubbles that match the jungle words!',
      color: '#E91E63',
      decorations: ['🎈', '🦁', '🐘', '🦜'],
    },
    {
      id: 'sound-safari',
      icon: '🐦',
      title: 'Sound Safari',
      description: 'Listen to animal sounds and guess the correct word!',
      color: '#2196F3',
      decorations: ['🐦', '🦜', '🐵', '🌳'],
    },
    {
      id: 'daily-quest',
      icon: '🌿',
      title: 'Daily Jungle Quest',
      description: 'Try todays surprise: Find 3 new words today!',
      color: '#00BCD4',
      decorations: ['🌿', '🦋', '🦜', '✨'],
    },
  ]

  // Button data for Collection and Achievements
  const topButtons = [
    {
      id: 'collection',
      icon: '🎒',
      title: 'My Collection',
      color: '#FFD700',
    },
    {
      id: 'achievements',
      icon: '🏆',
      title: 'Achievements',
      color: '#E91E63',
    },
  ]

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8">
      {/* Animated Jungle Background */}
      <div className="absolute inset-0 w-full h-full transition-all duration-1000">
        {/* Base jungle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-800 via-emerald-600 to-green-400"></div>
        
        {/* Jungle canopy overlay */}
        <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-green-950/60 to-transparent"></div>
        
        {/* Animated jungle animals in background */}
        <div className="absolute top-1/4 left-1/8 text-7xl md:text-8xl opacity-40 animate-monkey-jungle pointer-events-none">
          🐵
        </div>
        <div className="absolute bottom-1/3 right-1/6 text-7xl md:text-8xl opacity-35 animate-lion-jungle pointer-events-none" style={{ animationDelay: '2s' }}>
          🦁
        </div>
        <div className="absolute bottom-1/4 left-2/5 text-6xl md:text-7xl opacity-40 animate-tiger-jungle pointer-events-none" style={{ animationDelay: '4s' }}>
          🐯
        </div>
        <div className="absolute top-1/2 right-1/4 text-6xl md:text-7xl opacity-45 animate-parrot-jungle pointer-events-none" style={{ animationDelay: '1s' }}>
          🦜
        </div>
        <div className="absolute top-1/3 left-1/3 text-5xl md:text-6xl opacity-50 animate-butterfly-jungle pointer-events-none" style={{ animationDelay: '3s' }}>
          🦋
        </div>
        <div className="absolute bottom-1/5 left-1/2 text-5xl md:text-6xl opacity-40 animate-snake-jungle pointer-events-none" style={{ animationDelay: '5s' }}>
          🐍
        </div>
        
        {/* Floating leaves */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`leaf-${i}`}
            className="absolute text-2xl md:text-3xl opacity-30 animate-float-jungle pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          >
            {['🍃', '🌿', '🌾', '🍀'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-8">
        {/* Back to Worlds Button - Left */}
        <div className="absolute top-0 left-0 z-20 mb-4">
          <button
            onClick={onBackToWorlds}
            className="px-4 py-3 bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-full text-white font-bold text-xl transition-all duration-300 hover:scale-110 hover:bg-white/35 hover:shadow-xl flex items-center gap-2"
          >
            <span className="text-2xl">←</span> Worlds
          </button>
        </div>

        {/* Top Right Buttons - Collection and Achievements */}
        <div className="absolute top-0 right-0 flex gap-3 z-20 mb-4">
          {topButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                if (onGameSelect) {
                  if (btn.id === 'collection') {
                    onGameSelect('word-collection-jungle')
                  } else if (btn.id === 'achievements') {
                    onGameSelect('achievements-jungle')
                  }
                }
              }}
              className="px-4 py-3 bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-110 hover:bg-white/35 hover:shadow-xl flex items-center gap-2"
            >
              <span className="text-xl">{btn.icon}</span>
              <span className="hidden md:inline">{btn.title}</span>
            </button>
          ))}
        </div>

        {/* Header Section */}
        <div className="text-center mb-8 mt-20">
          <h1 className="text-5xl md:text-7xl font-black mb-3 drop-shadow-2xl font-playful">
            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-yellow-400 bg-clip-text text-transparent animate-title-glow-jungle">
              🌴 JUNGLE WORLD 🦁
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-3xl md:text-4xl">⭐⭐⭐</span>
            <span className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
              Your Progress
            </span>
          </div>
          <p className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg font-playful">
            🦜 Welcome back, Explorer! Ready for new words? 🌿
          </p>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {gameCards.map((card) => {
            const isHovered = hoveredCard === card.id
            return (
              <div
                key={card.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glassmorphism Card */}
                <div
                  className={`relative rounded-3xl p-6 transition-all duration-500 ${
                    isHovered 
                      ? 'transform translate-y-[-20px] scale-105 shadow-2xl' 
                      : 'shadow-xl'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(255,255,255,0.4)',
                    transform: isHovered ? 'translateY(-20px) scale(1.05)' : 'translateY(0) scale(1)',
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-50 blur-xl transition-all duration-500"
                    style={{
                      backgroundColor: card.color,
                      opacity: isHovered ? 0.7 : 0.3,
                    }}
                  ></div>

                  {/* Shimmer animation */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                      style={{
                        animation: isHovered ? 'shimmer-jungle 2s ease-in-out infinite' : 'none',
                      }}
                    ></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex items-center justify-center mb-4">
                      <div 
                        className={`text-6xl md:text-7xl transition-all duration-500 ${
                          isHovered ? 'scale-125 animate-bounce-jungle' : 'scale-100'
                        }`}
                      >
                        {card.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2 text-center font-playful drop-shadow-xl">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white text-base md:text-lg text-center mb-4 font-playful drop-shadow-lg">
                      {card.description}
                    </p>

                    {/* Play Button */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          if (onGameSelect) {
                            if (card.id === 'word-match') {
                              onGameSelect('word-matching-game')
                            } else if (card.id === 'banana-scramble') {
                              onGameSelect('banana-scramble')
                            } else if (card.id === 'picture-pop') {
                              onGameSelect('picture-pop-jungle')
                            } else if (card.id === 'sound-safari') {
                              onGameSelect('sound-safari-jungle')
                            } else if (card.id === 'daily-quest') {
                              onGameSelect('daily-jungle-quest')
                            }
                          }
                        }}
                        className={`px-6 py-3 rounded-full font-bold text-lg md:text-xl transition-all duration-300 font-playful ${
                          isHovered
                            ? 'transform scale-110 shadow-lg'
                            : 'shadow-md'
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}DD 100%)`,
                          color: 'white',
                          border: '2px solid white',
                        }}
                      >
                        Play Game
                      </button>
                    </div>
                  </div>

                  {/* Floating decorations on hover */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none overflow-visible">
                      {card.decorations.map((decoration, index) => (
                        <div
                          key={`decoration-${card.id}-${index}`}
                          className="absolute text-2xl md:text-3xl animate-pop-out-jungle-card"
                          style={{
                            left: `${15 + (index % 2) * 50}%`,
                            top: `${10 + Math.floor(index / 2) * 50}%`,
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          {decoration}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        /* Title glow */
        @keyframes title-glow-jungle {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(74, 175, 80, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(34, 197, 94, 0.8));
          }
        }
        .animate-title-glow-jungle {
          animation: title-glow-jungle 3s ease-in-out infinite;
        }

        /* Jungle animal animations */
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
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0.35; }
          50% { transform: translateX(-80px) translateY(-15px); opacity: 0.55; }
        }
        .animate-lion-jungle {
          animation: lion-jungle 10s ease-in-out infinite;
        }

        @keyframes tiger-jungle {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0.4; }
          33% { transform: translateX(40px) translateY(-8px); opacity: 0.5; }
          66% { transform: translateX(80px) translateY(-12px); opacity: 0.4; }
        }
        .animate-tiger-jungle {
          animation: tiger-jungle 9s ease-in-out infinite;
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

        @keyframes butterfly-jungle {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          16% { transform: translateY(-15px) translateX(20px) rotate(10deg); }
          33% { transform: translateY(-10px) translateX(35px) rotate(-15deg); }
          50% { transform: translateY(-20px) translateX(50px) rotate(20deg); }
          66% { transform: translateY(-15px) translateX(65px) rotate(-10deg); }
          83% { transform: translateY(-5px) translateX(75px) rotate(15deg); }
        }
        .animate-butterfly-jungle {
          animation: butterfly-jungle 15s ease-in-out infinite;
        }

        @keyframes snake-jungle {
          0%, 100% { transform: translateX(0) skewX(0deg); opacity: 0.4; }
          20% { transform: translateX(35px) skewX(5deg); opacity: 0.5; }
          40% { transform: translateX(65px) skewX(-3deg); opacity: 0.4; }
          60% { transform: translateX(90px) skewX(4deg); opacity: 0.5; }
          80% { transform: translateX(110px) skewX(-2deg); opacity: 0.4; }
        }
        .animate-snake-jungle {
          animation: snake-jungle 11s ease-in-out infinite;
        }

        /* Floating leaves */
        @keyframes float-jungle {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(10deg); }
          66% { transform: translateY(-50px) translateX(-10px) rotate(-5deg); }
        }
        .animate-float-jungle {
          animation: float-jungle 7s ease-in-out infinite;
        }

        /* Card bounce */
        @keyframes bounce-jungle {
          0%, 100% {
            transform: translateY(0) scale(1) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) scale(1.1) rotate(-5deg);
          }
          50% {
            transform: translateY(-12px) scale(1.15) rotate(0deg);
          }
          75% {
            transform: translateY(-8px) scale(1.1) rotate(5deg);
          }
        }
        .animate-bounce-jungle {
          animation: bounce-jungle 1.5s ease-in-out infinite;
        }

        /* Shimmer for cards */
        @keyframes shimmer-jungle {
          0% {
            transform: translateX(-200%) skewX(-12deg);
          }
          100% {
            transform: translateX(400%) skewX(-12deg);
          }
        }

        /* Pop-out decorations */
        @keyframes pop-out-jungle-card {
          0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: translateY(-40px) scale(1.6) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-80px) scale(1) rotate(360deg);
            opacity: 0.7;
          }
        }
        .animate-pop-out-jungle-card {
          animation: pop-out-jungle-card 2.5s ease-out infinite;
        }
      `}</style>
    </div>
  )
}

export default JungleWorldHub
