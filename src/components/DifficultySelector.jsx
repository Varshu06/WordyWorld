import React, { useState } from 'react'

const DifficultySelector = ({ onDifficultySelect, onBack }) => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [clickedCard, setClickedCard] = useState(null)

  const difficulties = [
    {
      id: 'easy',
      icon: '🌱',
      title: 'Easy',
      subtitle: 'Meadow of Words',
      glowColor: 'green',
      decorations: ['🍃', '🌿', '🌾', '🪴'],
      bgGradient: 'from-green-200 via-emerald-200 to-teal-300',
      glowGradient: 'from-green-400 via-emerald-300 to-teal-400',
    },
    {
      id: 'medium',
      icon: '⭐',
      title: 'Medium',
      subtitle: 'Sky of Puzzles',
      glowColor: 'orange',
      decorations: ['✨', '💫', '🌟', '⚡'],
      bgGradient: 'from-orange-200 via-yellow-200 to-amber-300',
      glowGradient: 'from-orange-400 via-yellow-300 to-amber-400',
    },
    {
      id: 'hard',
      icon: '🚀',
      title: 'Hard',
      subtitle: 'Galaxy of Grammar',
      glowColor: 'purple',
      decorations: ['🌌', '⭐', '🔮', '💎'],
      bgGradient: 'from-purple-200 via-indigo-200 to-blue-300',
      glowGradient: 'from-purple-400 via-indigo-300 to-blue-400',
    },
  ]

  const handleCardClick = (difficulty) => {
    setClickedCard(difficulty.id)
    setSelectedDifficulty(difficulty)
    
    // Save to localStorage
    localStorage.setItem('difficulty', difficulty.id)
    
    // Portal opening animation (0.5s) then navigate
    setTimeout(() => {
      if (onDifficultySelect) {
        onDifficultySelect(difficulty.id)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8">
      {/* Magical Dreamy Background with Parallax */}
      <div className="absolute inset-0 w-full h-full">
        {/* Super smooth gradient background - like a fairy tale sunset! */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 via-indigo-200 to-blue-300 animate-gradient-shift"></div>
        
        {/* Animated gradient overlay for extra dreaminess */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-300/30 via-transparent to-pink-300/30"></div>
        
        {/* Floating sparkles - the magical sprinkles! */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-2xl md:text-3xl opacity-30 animate-float-sparkle pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            {['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]}
          </div>
        ))}

        {/* Floating books and cute things (parallax effect) */}
        <div className="absolute top-32 left-1/4 text-4xl md:text-5xl opacity-15 animate-float-parallax pointer-events-none" style={{ animationDelay: '0s' }}>
          📚
        </div>
        <div className="absolute bottom-48 right-1/4 text-3xl md:text-4xl opacity-20 animate-float-parallax pointer-events-none" style={{ animationDelay: '2s' }}>
          📖
        </div>
        <div className="absolute top-1/4 right-1/5 text-2xl md:text-3xl opacity-20 animate-float-parallax pointer-events-none" style={{ animationDelay: '1s' }}>
          ⭐
        </div>
        <div className="absolute bottom-1/3 left-1/5 text-3xl md:text-4xl opacity-15 animate-float-parallax pointer-events-none" style={{ animationDelay: '3s' }}>
          🎈
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl px-4">
        {/* Back Button - Top Left */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
          <button
            onClick={onBack}
            className="w-12 h-12 md:w-16 md:h-16 bg-white/80 backdrop-blur-lg border-2 border-white/40 rounded-full text-2xl md:text-3xl transition-all duration-300 hover:scale-110 hover:bg-white/100 hover:shadow-xl flex items-center justify-center"
            title="Back to Home"
          >
            ←
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 drop-shadow-2xl font-playful">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-title-glow">
              🌈 Choose Your Level!
            </span>
          </h1>
          <p className="text-lg md:text-2xl lg:text-3xl text-gray-800 font-bold drop-shadow-lg font-playful">
            "Step into a world of words!" ✨
          </p>
        </div>

        {/* Difficulty Cards Grid */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12 w-full justify-center items-center">
          {difficulties.map((difficulty) => {
            const isHovered = hoveredCard === difficulty.id
            const isClicked = clickedCard === difficulty.id
            
            return (
              <div
                key={difficulty.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard(difficulty.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(difficulty)}
              >
                {/* Glassmorphism Card - The Fancy Frosted Glass! */}
                <div
                  className={`relative w-[250px] h-[250px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] rounded-[2rem] md:rounded-[2.5rem] border-2 border-white/40 transition-all duration-700 ease-out ${
                    isHovered
                      ? 'scale-110 shadow-[0_20px_60px_rgba(0,0,0,0.3)]'
                      : 'scale-100 shadow-[0_10px_40px_rgba(0,0,0,0.2)]'
                  } ${
                    isClicked ? 'scale-105 animate-portal-open' : ''
                  }`}
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 100%)`,
                    backdropFilter: isHovered ? 'blur(25px)' : 'blur(20px)',
                    transform: isHovered 
                      ? 'perspective(1000px) rotateY(5deg) rotateX(-5deg) translateZ(20px)' 
                      : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)',
                  }}
                >
                  {/* Magical Glow Effect - Changes based on difficulty! */}
                  <div
                    className={`absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br ${difficulty.glowGradient} opacity-0 blur-2xl transition-all duration-700 ${
                      isHovered ? 'opacity-70 scale-110' : isClicked ? 'opacity-60' : 'opacity-40'
                    }`}
                  ></div>

                  {/* Continuous Shimmer Animation - Like a Unicorn Skating Across! */}
                  <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer-continuous"
                      style={{
                        width: '50%',
                        height: '100%',
                      }}
                    ></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                    {/* Icon with Bounce Animation */}
                    <div 
                      className={`text-7xl md:text-8xl lg:text-9xl mb-3 md:mb-4 transition-all duration-500 ${
                        isHovered ? 'scale-125 animate-bounce-magic' : 'scale-100'
                      } ${isClicked ? 'animate-spin-once' : ''}`}
                    >
                      {difficulty.icon}
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-1 md:mb-2 font-playful drop-shadow-xl tracking-tight">
                      {difficulty.title}
                    </h2>

                    {/* Magical Subtitle */}
                    <p className="text-base md:text-lg lg:text-xl text-gray-700 font-bold font-playful drop-shadow-md">
                      {difficulty.subtitle}
                    </p>
                  </div>

                  {/* Floating Decorations that Pop Out on Hover! */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none overflow-visible">
                      {difficulty.decorations.map((decoration, index) => (
                        <div
                          key={`decoration-${index}`}
                          className={`absolute text-2xl md:text-3xl animate-pop-out-${difficulty.id}`}
                          style={{
                            left: `${15 + (index % 2) * 35}%`,
                            top: `${10 + Math.floor(index / 2) * 30}%`,
                            animationDelay: `${index * 0.15}s`,
                          }}
                        >
                          {decoration}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Enhanced Border Glow on Hover */}
                  {isHovered && (
                    <div 
                      className={`absolute -inset-1 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br ${difficulty.glowGradient} opacity-50 blur-md animate-pulse-slow`}
                      style={{ zIndex: -1 }}
                    ></div>
                  )}

                  {/* Portal Opening Effect When Clicked */}
                  {isClicked && (
                    <>
                      <div 
                        className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] animate-portal-expand"
                        style={{
                          background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 30%, transparent 70%)',
                        }}
                      ></div>
                      <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] ring-4 ring-yellow-400/60 animate-portal-ring"></div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* All the Magical Animations - The Secret Sauce! */}
      <style>{`
        /* Floating sparkles in the background */
        @keyframes float-sparkle {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-15px) translateX(8px) rotate(90deg) scale(1.1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-25px) translateX(15px) rotate(180deg) scale(1.2);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-15px) translateX(8px) rotate(270deg) scale(1.1);
            opacity: 0.4;
          }
        }
        .animate-float-sparkle {
          animation: float-sparkle 4s ease-in-out infinite;
        }

        /* Parallax floating for books and cute things */
        @keyframes float-parallax {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
          }
          66% {
            transform: translateY(-35px) translateX(15px) rotate(-5deg);
          }
        }
        .animate-float-parallax {
          animation: float-parallax 8s ease-in-out infinite;
        }

        /* Continuous shimmer that slides across forever */
        @keyframes shimmer-continuous {
          0% {
            transform: translateX(-200%) skewX(-12deg);
          }
          100% {
            transform: translateX(400%) skewX(-12deg);
          }
        }
        .animate-shimmer-continuous {
          animation: shimmer-continuous 3s ease-in-out infinite;
        }

        /* Bouncy magic for icons */
        @keyframes bounce-magic {
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
        .animate-bounce-magic {
          animation: bounce-magic 1.5s ease-in-out infinite;
        }

        /* Pop-out animations for each difficulty */
        @keyframes pop-out-easy {
          0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: translateY(-35px) scale(1.6) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-70px) scale(1) rotate(360deg);
            opacity: 0.7;
          }
        }
        .animate-pop-out-easy {
          animation: pop-out-easy 2.5s ease-out infinite;
        }

        @keyframes pop-out-medium {
          0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          40% {
            transform: translateY(-30px) scale(1.5) rotate(150deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-65px) scale(1.2) rotate(360deg);
            opacity: 0.7;
          }
        }
        .animate-pop-out-medium {
          animation: pop-out-medium 2.5s ease-out infinite;
        }

        @keyframes pop-out-hard {
          0% {
            transform: translateX(0) translateY(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          40% {
            transform: translateX(25px) translateY(-35px) scale(1.7) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateX(50px) translateY(-70px) scale(1) rotate(360deg);
            opacity: 0.7;
          }
        }
        .animate-pop-out-hard {
          animation: pop-out-hard 2.5s ease-out infinite;
        }

        /* Sparkle shower when hovering */
        @keyframes sparkle-shower {
          0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: translateY(-40px) scale(1.8) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-80px) scale(0.5) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-sparkle-shower {
          animation: sparkle-shower 2.5s ease-out infinite;
        }

        /* Portal opening effect when clicked */
        @keyframes portal-open {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .animate-portal-open {
          animation: portal-open 0.5s ease-out;
        }

        @keyframes portal-expand {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }
        .animate-portal-expand {
          animation: portal-expand 0.5s ease-out;
        }

        @keyframes portal-ring {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        .animate-portal-ring {
          animation: portal-ring 0.5s ease-out;
        }

        /* Spin once on click */
        @keyframes spin-once {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        .animate-spin-once {
          animation: spin-once 0.6s ease-out;
        }

        /* Gradient shift for background */
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 10s ease infinite;
        }

        /* Title glow */
        @keyframes title-glow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(147, 51, 234, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.7));
          }
        }
        .animate-title-glow {
          animation: title-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default DifficultySelector

