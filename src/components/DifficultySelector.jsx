import React, { useState } from 'react'

const DifficultySelector = ({ onDifficultySelect, onBack }) => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)

  const difficulties = [
    {
      id: 'easy',
      icon: '🌱',
      title: 'Easy',
      subtitle: 'Meadow of Words',
      glowColor: 'green',
      decorations: ['🍃', '🌿', '🌾'],
    },
    {
      id: 'medium',
      icon: '⭐',
      title: 'Medium',
      subtitle: 'Sky of Puzzles',
      glowColor: 'orange',
      decorations: ['✨', '💫', '🌟'],
    },
    {
      id: 'hard',
      icon: '🚀',
      title: 'Hard',
      subtitle: 'Galaxy of Grammar',
      glowColor: 'purple',
      decorations: ['🌌', '⭐', '🔮'],
    },
  ]

  const handleCardClick = (difficulty) => {
    setSelectedDifficulty(difficulty)
    // Save to localStorage
    localStorage.setItem('difficulty', difficulty.id)
    // Trigger animation then navigate
    setTimeout(() => {
      if (onDifficultySelect) {
        onDifficultySelect(difficulty.id)
      }
    }, 500)
  }

  const getGlowColor = (color) => {
    const colors = {
      green: 'from-green-400/40 via-green-300/30 to-green-500/40',
      orange: 'from-orange-400/40 via-yellow-300/30 to-orange-500/40',
      purple: 'from-purple-400/40 via-blue-300/30 to-purple-500/40',
    }
    return colors[color] || colors.green
  }

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8">
      {/* Magical Background with Gradient */}
      <div className="absolute inset-0 w-full h-full">
        {/* Dreamy gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400"></div>
        
        {/* Floating sparkles */}
        <div className="absolute top-20 left-20 text-3xl opacity-40 animate-float-sparkle" style={{ animationDelay: '0s' }}>
          ✨
        </div>
        <div className="absolute top-40 right-32 text-2xl opacity-35 animate-float-sparkle" style={{ animationDelay: '1s' }}>
          ⭐
        </div>
        <div className="absolute bottom-32 left-1/4 text-xl opacity-30 animate-float-sparkle" style={{ animationDelay: '2s' }}>
          💫
        </div>
        <div className="absolute top-60 right-1/3 text-2xl opacity-35 animate-float-sparkle" style={{ animationDelay: '1.5s' }}>
          ✨
        </div>
        <div className="absolute bottom-40 right-20 text-xl opacity-30 animate-float-sparkle" style={{ animationDelay: '0.5s' }}>
          🌟
        </div>

        {/* Floating books (parallax effect) */}
        <div className="absolute top-32 left-1/3 text-4xl opacity-20 animate-float-parallax" style={{ animationDelay: '0s' }}>
          📚
        </div>
        <div className="absolute bottom-48 right-1/4 text-3xl opacity-25 animate-float-parallax" style={{ animationDelay: '2s' }}>
          📖
        </div>

        {/* Floating stars */}
        <div className="absolute top-1/4 right-1/5 text-2xl opacity-30 animate-float-parallax" style={{ animationDelay: '1s' }}>
          ⭐
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl font-playful text-center">
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            🌈 Choose Your Adventure!
          </span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 font-semibold mb-12 drop-shadow-lg font-playful text-center">
          "Step into a world of words!" ✨
        </p>

        {/* Difficulty Cards */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 mb-12 w-full justify-center items-center">
          {difficulties.map((difficulty) => (
            <div
              key={difficulty.id}
              className="relative group"
              onMouseEnter={() => setHoveredCard(difficulty.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(difficulty)}
            >
              {/* Glassmorphism Card */}
              <div
                className={`relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-3xl backdrop-blur-xl border-2 border-white/30 transition-all duration-500 cursor-pointer ${
                  hoveredCard === difficulty.id
                    ? 'scale-110 shadow-2xl transform rotate-3'
                    : 'scale-100 shadow-xl'
                } ${
                  selectedDifficulty === difficulty
                    ? 'ring-4 ring-yellow-400 ring-opacity-60'
                    : ''
                }`}
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)`,
                  backdropFilter: hoveredCard === difficulty.id ? 'blur(25px)' : 'blur(20px)',
                }}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${getGlowColor(difficulty.glowColor)} opacity-60 blur-xl transition-opacity duration-500 ${
                    hoveredCard === difficulty.id ? 'opacity-100' : 'opacity-60'
                  }`}
                ></div>

                {/* Shimmer Animation */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slide transform -skew-x-12"></div>
                </div>

                {/* Card Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                  {/* Icon */}
                  <div className={`text-7xl md:text-8xl lg:text-9xl mb-4 transition-all duration-500 ${
                    hoveredCard === difficulty.id ? 'scale-125 animate-bounce-gentle' : 'scale-100'
                  }`}>
                    {difficulty.icon}
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 font-playful drop-shadow-lg">
                    {difficulty.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-700 font-medium font-playful drop-shadow-md">
                    {difficulty.subtitle}
                  </p>
                </div>

                {/* Hover Pop-out Decorations */}
                {hoveredCard === difficulty.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {difficulty.decorations.map((decoration, index) => (
                      <div
                        key={index}
                        className={`absolute text-3xl animate-pop-out-${difficulty.id}`}
                        style={{
                          left: `${20 + index * 30}%`,
                          top: `${15 + index * 25}%`,
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        {decoration}
                      </div>
                    ))}
                  </div>
                )}

                {/* Border Glow on Hover */}
                {hoveredCard === difficulty.id && (
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${getGlowColor(difficulty.glowColor)} opacity-40 blur-md animate-pulse`}></div>
                )}
              </div>

              {/* 3D Tilt Effect (on hover) */}
              {hoveredCard === difficulty.id && (
                <style>{`
                  .group:hover > div:first-child {
                    transform: perspective(1000px) rotateY(5deg) rotateX(-5deg) scale(1.1);
                  }
                `}</style>
              )}
            </div>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="px-6 py-3 md:px-8 md:py-4 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-full text-gray-800 font-semibold text-lg md:text-xl font-playful transition-all duration-300 hover:scale-105 hover:bg-white/30 hover:shadow-lg"
        >
          ← Back to Home 🏠
        </button>
      </div>

      {/* Sparkle Shower when all cards hovered (desktop only) */}
      {hoveredCard !== null && (
        <div className="fixed inset-0 pointer-events-none z-20">
          <div className="absolute top-1/4 left-1/4 text-2xl opacity-60 animate-sparkle-shower" style={{ animationDelay: '0s' }}>
            ✨
          </div>
          <div className="absolute top-1/3 right-1/4 text-xl opacity-50 animate-sparkle-shower" style={{ animationDelay: '0.2s' }}>
            ⭐
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-2xl opacity-55 animate-sparkle-shower" style={{ animationDelay: '0.4s' }}>
            💫
          </div>
          <div className="absolute top-1/2 right-1/3 text-xl opacity-50 animate-sparkle-shower" style={{ animationDelay: '0.6s' }}>
            ✨
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes float-sparkle {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px) rotate(180deg);
            opacity: 0.6;
          }
        }
        .animate-float-sparkle {
          animation: float-sparkle 4s ease-in-out infinite;
        }

        @keyframes float-parallax {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-30px) translateX(15px);
          }
        }
        .animate-float-parallax {
          animation: float-parallax 6s ease-in-out infinite;
        }

        @keyframes shimmer-slide {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shimmer-slide {
          animation: shimmer-slide 3s ease-in-out infinite;
        }

        @keyframes pop-out-easy {
          0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: translateY(-30px) scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-60px) scale(1) rotate(360deg);
            opacity: 0.8;
          }
        }

        @keyframes pop-out-medium {
          0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: translateY(-25px) scale(1.4) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-50px) scale(1.2) rotate(360deg);
            opacity: 0.8;
          }
        }

        @keyframes pop-out-hard {
          0% {
            transform: translateX(0) translateY(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: translateX(20px) translateY(-30px) scale(1.6) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateX(40px) translateY(-60px) scale(1) rotate(360deg);
            opacity: 0.8;
          }
        }

        .animate-pop-out-easy {
          animation: pop-out-easy 2s ease-out infinite;
        }

        .animate-pop-out-medium {
          animation: pop-out-medium 2s ease-out infinite;
        }

        .animate-pop-out-hard {
          animation: pop-out-hard 2s ease-out infinite;
        }

        @keyframes sparkle-shower {
          0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: translateY(-30px) scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-60px) scale(0.5) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-sparkle-shower {
          animation: sparkle-shower 2s ease-out infinite;
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default DifficultySelector

