import React, { useState } from 'react'

const SpaceWorldHub = ({ onBackToWorlds, onGoHome, onGameSelect }) => {
  const [hoveredCard, setHoveredCard] = useState(null)

  // Game cards data
  const gameCards = [
    {
      id: 'word-match',
      icon: '🧩',
      title: 'Word Match',
      description: 'Match aliens to their names — stars drop new words!',
      color: '#2196F3',
      decorations: ['🚀', '🛸', '👽', '⭐'],
    },
    {
      id: 'banana-scramble',
      icon: '☄️',
      title: 'Cosmic Scramble',
      description: 'Unscramble space words to power up rockets!',
      color: '#FFC107',
      decorations: ['🚀', '⭐', '🛸', '🌌'],
    },
    {
      id: 'picture-pop',
      icon: '🎈',
      title: 'Star Pop',
      description: 'Pop the bubbles that match the space words!',
      color: '#E91E63',
      decorations: ['🎈', '🚀', '⭐', '🛸'],
    },
    {
      id: 'sound-safari',
      icon: '🔊',
      title: 'Sound Safari',
      description: 'Listen to space sounds and guess the correct word!',
      color: '#00BCD4',
      decorations: ['👽', '🛸', '🔊', '🌠'],
    },
    {
      id: 'daily-quest',
      icon: '⭐',
      title: 'Daily Space Quest',
      description: 'Try todays surprise: Find 3 new cosmic words!',
      color: '#FF9800',
      decorations: ['⭐', '🚀', '👨‍🚀', '✨'],
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
      {/* Animated Space Background */}
      <div className="absolute inset-0 w-full h-full transition-all duration-1000">
        {/* Base space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-indigo-900 to-purple-950"></div>
        
        {/* Twinkling stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-80 animate-twinkle pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          ></div>
        ))}

        {/* Floating planets */}
        <div className="absolute top-10 right-10 text-6xl md:text-7xl opacity-40 animate-float-slow pointer-events-none">
          🪐
        </div>
        <div className="absolute bottom-20 left-20 text-5xl md:text-6xl opacity-50 animate-float-slow-delayed pointer-events-none">
          🌙
        </div>

        {/* Comet trail */}
        <div className="absolute top-1/4 right-1/4 text-4xl md:text-5xl animate-comet pointer-events-none">
          ☄️
        </div>

        {/* Floating rockets */}
        <div className="absolute top-1/3 left-1/4 text-7xl md:text-8xl opacity-30 animate-rocket-float pointer-events-none">
          🚀
        </div>
        <div className="absolute bottom-1/4 right-1/6 text-6xl md:text-7xl opacity-35 animate-rocket-float-delayed pointer-events-none" style={{ animationDelay: '3s' }}>
          🛸
        </div>

        {/* Space creatures */}
        <div className="absolute top-1/4 left-2/5 text-6xl md:text-7xl opacity-40 animate-alien-float pointer-events-none" style={{ animationDelay: '2s' }}>
          👽
        </div>
        <div className="absolute bottom-1/3 right-1/5 text-5xl md:text-6xl opacity-45 animate-alien-float-delayed pointer-events-none" style={{ animationDelay: '4s' }}>
          👾
        </div>

        {/* Shooting stars */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`shooting-star-${i}`}
            className="absolute text-2xl md:text-3xl opacity-30 animate-shooting-star pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          >
            {['⭐', '💫', '🌟', '✨'][Math.floor(Math.random() * 4)]}
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
                    onGameSelect('word-collection-space')
                  } else if (btn.id === 'achievements') {
                    onGameSelect('achievements-space')
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
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-title-glow-space">
              🚀 SPACE WORLD 👨‍🚀
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-3xl md:text-4xl">⭐⭐⭐</span>
            <span className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
              Your Progress
            </span>
          </div>
          <p className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg font-playful">
            👨‍🚀 Welcome to Space, Explorer! Ready for cosmic words? ⭐
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
                        animation: isHovered ? 'shimmer-space 2s ease-in-out infinite' : 'none',
                      }}
                    ></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex items-center justify-center mb-4">
                      <div 
                        className={`text-6xl md:text-7xl transition-all duration-500 ${
                          isHovered ? 'scale-125 animate-bounce-space' : 'scale-100'
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
                              onGameSelect('banana-scramble-space')
                            } else if (card.id === 'picture-pop') {
                              onGameSelect('picture-pop-space')
                            } else if (card.id === 'sound-safari') {
                              onGameSelect('sound-safari-space')
                            } else if (card.id === 'daily-quest') {
                              onGameSelect('daily-space-quest')
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
                          className="absolute text-2xl md:text-3xl animate-pop-out-space-card"
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
        @keyframes title-glow-space {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(33, 150, 243, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(156, 39, 176, 0.8));
          }
        }
        .animate-title-glow-space {
          animation: title-glow-space 3s ease-in-out infinite;
        }

        /* Space animations */
        @keyframes twinkle {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.5); }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(20deg); }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        @keyframes float-slow-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(-15deg); }
        }
        .animate-float-slow-delayed {
          animation: float-slow-delayed 15s ease-in-out infinite;
          animation-delay: 5s;
        }

        @keyframes comet {
          0% {
            transform: translateX(-100px) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(-50px);
            opacity: 0;
          }
        }
        .animate-comet {
          animation: comet 8s ease-out infinite;
        }

        @keyframes rocket-float {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(30px) translateY(-40px) rotate(15deg); }
          50% { transform: translateX(60px) translateY(-60px) rotate(30deg); }
          75% { transform: translateX(90px) translateY(-40px) rotate(15deg); }
        }
        .animate-rocket-float {
          animation: rocket-float 8s ease-in-out infinite;
        }

        @keyframes rocket-float-delayed {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0.35; }
          33% { transform: translateX(-40px) translateY(-50px) rotate(-20deg); opacity: 0.55; }
          66% { transform: translateX(-80px) translateY(-70px) rotate(-40deg); opacity: 0.35; }
        }
        .animate-rocket-float-delayed {
          animation: rocket-float-delayed 10s ease-in-out infinite;
        }

        @keyframes alien-float {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0.4; }
          50% { transform: translateX(-60px) translateY(-30px) rotate(15deg); opacity: 0.6; }
        }
        .animate-alien-float {
          animation: alien-float 9s ease-in-out infinite;
        }

        @keyframes alien-float-delayed {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0.45; }
          50% { transform: translateX(50px) translateY(-35px) rotate(-15deg); opacity: 0.65; }
        }
        .animate-alien-float-delayed {
          animation: alien-float-delayed 11s ease-in-out infinite;
        }

        @keyframes shooting-star {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-100vh) translateX(200px) rotate(45deg); opacity: 0.8; }
        }
        .animate-shooting-star {
          animation: shooting-star 10s ease-out infinite;
        }

        /* Card bounce */
        @keyframes bounce-space {
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
        .animate-bounce-space {
          animation: bounce-space 1.5s ease-in-out infinite;
        }

        /* Shimmer for cards */
        @keyframes shimmer-space {
          0% {
            transform: translateX(-200%) skewX(-12deg);
          }
          100% {
            transform: translateX(400%) skewX(-12deg);
          }
        }

        /* Pop-out decorations */
        @keyframes pop-out-space-card {
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
        .animate-pop-out-space-card {
          animation: pop-out-space-card 2.5s ease-out infinite;
        }
      `}</style>
    </div>
  )
}

export default SpaceWorldHub

