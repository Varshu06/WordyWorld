import React, { useState } from 'react'

const FoodWorldHub = ({ onBackToWorlds, onGoHome, onGameSelect }) => {
  const [hoveredCard, setHoveredCard] = useState(null)

  // Game cards data
  const gameCards = [
    {
      id: 'word-match',
      icon: '🧩',
      title: 'Word Match',
      description: 'Match foods to their names — yummy treats drop!',
      color: '#FF9800',
      decorations: ['🍕', '🍔', '🍰', '🍩'],
    },
    {
      id: 'banana-scramble',
      icon: '🍰',
      title: 'Dessert Scramble',
      description: 'Unscramble food words to bake sweet treats!',
      color: '#FFC107',
      decorations: ['🍰', '🧁', '🍪', '🍩'],
    },
    {
      id: 'picture-pop',
      icon: '🎈',
      title: 'Food Pop',
      description: 'Pop the bubbles that match the food words!',
      color: '#E91E63',
      decorations: ['🎈', '🍕', '🍔', '🍰'],
    },
    {
      id: 'sound-safari',
      icon: '🍳',
      title: 'Sound Safari',
      description: 'Listen to cooking sounds and guess the word!',
      color: '#FF5722',
      decorations: ['👨‍🍳', '🍪', '🥘', '🍲'],
    },
    {
      id: 'daily-quest',
      icon: '🍬',
      title: 'Daily Food Quest',
      description: 'Try todays surprise: Find 3 delicious words!',
      color: '#E91E63',
      decorations: ['🍬', '🍭', '🍫', '✨'],
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
      {/* Animated Food Background */}
      <div className="absolute inset-0 w-full h-full transition-all duration-1000">
        {/* Base food gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-red-300 to-pink-300"></div>
        
        {/* Floating food */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`food-${i}`}
            className="absolute text-2xl md:text-3xl opacity-30 animate-float-food pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            {['🍕', '🍩', '🍰', '🧁', '🌮', '🍔', '🥐', '🍪'][Math.floor(Math.random() * 8)]}
          </div>
        ))}

        {/* Bakery glow */}
        <div className="absolute top-1/4 left-1/4 text-7xl md:text-8xl opacity-20 animate-pulse-slow pointer-events-none">
          🏪
        </div>

        {/* Floating chef hats */}
        <div className="absolute top-10 right-20 text-6xl md:text-7xl opacity-40 animate-chef-hat-float pointer-events-none">
          👨‍🍳
        </div>
        <div className="absolute bottom-32 left-32 text-5xl md:text-6xl opacity-45 animate-chef-hat-float-delayed pointer-events-none">
          👩‍🍳
        </div>

        {/* Kitchen items floating */}
        <div className="absolute top-1/3 left-1/6 text-7xl md:text-8xl opacity-30 animate-kitchen-float pointer-events-none" style={{ animationDelay: '1s' }}>
          🍳
        </div>
        <div className="absolute bottom-1/4 right-1/5 text-6xl md:text-7xl opacity-35 animate-kitchen-float-delayed pointer-events-none" style={{ animationDelay: '2s' }}>
          🥘
        </div>

        {/* Floating cakes */}
        <div className="absolute top-1/4 left-2/5 text-6xl md:text-7xl opacity-40 animate-cake-bounce pointer-events-none" style={{ animationDelay: '3s' }}>
          🎂
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-5xl md:text-6xl opacity-45 animate-cake-bounce-delayed pointer-events-none" style={{ animationDelay: '4s' }}>
          🧁
        </div>

        {/* Pizza slices */}
        <div className="absolute top-1/2 left-1/3 text-7xl md:text-8xl opacity-35 animate-pizza-rotate pointer-events-none">
          🍕
        </div>
        <div className="absolute bottom-1/5 left-2/3 text-6xl md:text-7xl opacity-40 animate-pizza-rotate-delayed pointer-events-none" style={{ animationDelay: '2s' }}>
          🍕
        </div>
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
                    onGameSelect('word-collection-food')
                  } else if (btn.id === 'achievements') {
                    onGameSelect('achievements-food')
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
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-title-glow-food">
              🍕 FOOD TOWN 👨‍🍳
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-3xl md:text-4xl">⭐⭐⭐</span>
            <span className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
              Your Progress
            </span>
          </div>
          <p className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg font-playful">
            👨‍🍳 Welcome to Food Town, Chef! Ready for yummy words? 🍰
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
                        animation: isHovered ? 'shimmer-food 2s ease-in-out infinite' : 'none',
                      }}
                    ></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex items-center justify-center mb-4">
                      <div 
                        className={`text-6xl md:text-7xl transition-all duration-500 ${
                          isHovered ? 'scale-125 animate-bounce-food' : 'scale-100'
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
                              onGameSelect('banana-scramble-food')
                            } else if (card.id === 'picture-pop') {
                              onGameSelect('picture-pop-food')
                            } else if (card.id === 'sound-safari') {
                              onGameSelect('sound-safari-food')
                            } else if (card.id === 'daily-quest') {
                              onGameSelect('daily-food-quest')
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
                          className="absolute text-2xl md:text-3xl animate-pop-out-food-card"
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
        @keyframes title-glow-food {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(255, 152, 0, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(244, 67, 54, 0.8));
          }
        }
        .animate-title-glow-food {
          animation: title-glow-food 3s ease-in-out infinite;
        }

        /* Food animations */
        @keyframes float-food {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-25px) rotate(15deg); }
          50% { transform: translateY(-40px) translateX(10px) rotate(0deg); }
          75% { transform: translateY(-25px) rotate(-15deg); }
        }
        .animate-float-food {
          animation: float-food 8s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes chef-hat-float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-35px) rotate(10deg); opacity: 0.6; }
        }
        .animate-chef-hat-float {
          animation: chef-hat-float 6s ease-in-out infinite;
        }

        @keyframes chef-hat-float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.45; }
          50% { transform: translateY(-30px) rotate(-8deg); opacity: 0.65; }
        }
        .animate-chef-hat-float-delayed {
          animation: chef-hat-float-delayed 7s ease-in-out infinite;
          animation-delay: 3s;
        }

        @keyframes kitchen-float {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateX(40px) translateY(-25px) rotate(15deg); opacity: 0.5; }
        }
        .animate-kitchen-float {
          animation: kitchen-float 9s ease-in-out infinite;
        }

        @keyframes kitchen-float-delayed {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0.35; }
          50% { transform: translateX(-35px) translateY(-30px) rotate(-12deg); opacity: 0.55; }
        }
        .animate-kitchen-float-delayed {
          animation: kitchen-float-delayed 10s ease-in-out infinite;
        }

        @keyframes cake-bounce {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-40px) scale(1.2); opacity: 0.6; }
        }
        .animate-cake-bounce {
          animation: cake-bounce 4s ease-in-out infinite;
        }

        @keyframes cake-bounce-delayed {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.45; }
          50% { transform: translateY(-35px) scale(1.15); opacity: 0.65; }
        }
        .animate-cake-bounce-delayed {
          animation: cake-bounce-delayed 5s ease-in-out infinite;
        }

        @keyframes pizza-rotate {
          0%, 100% { transform: rotate(0deg) translateY(0); opacity: 0.35; }
          50% { transform: rotate(180deg) translateY(-20px); opacity: 0.55; }
        }
        .animate-pizza-rotate {
          animation: pizza-rotate 8s ease-in-out infinite;
        }

        @keyframes pizza-rotate-delayed {
          0%, 100% { transform: rotate(0deg) translateY(0); opacity: 0.4; }
          50% { transform: rotate(-180deg) translateY(-25px); opacity: 0.6; }
        }
        .animate-pizza-rotate-delayed {
          animation: pizza-rotate-delayed 9s ease-in-out infinite;
        }

        /* Card bounce */
        @keyframes bounce-food {
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
        .animate-bounce-food {
          animation: bounce-food 1.5s ease-in-out infinite;
        }

        /* Shimmer for cards */
        @keyframes shimmer-food {
          0% {
            transform: translateX(-200%) skewX(-12deg);
          }
          100% {
            transform: translateX(400%) skewX(-12deg);
          }
        }

        /* Pop-out decorations */
        @keyframes pop-out-food-card {
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
        .animate-pop-out-food-card {
          animation: pop-out-food-card 2.5s ease-out infinite;
        }
      `}</style>
    </div>
  )
}

export default FoodWorldHub

