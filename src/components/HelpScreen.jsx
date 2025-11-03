import React from 'react'

const HelpScreen = ({ onBack }) => {
  const gameInstructions = [
    {
      icon: '🧩',
      title: 'Word Matching',
      description: 'Drag words to match with their pictures!',
    },
    {
      icon: '🍌',
      title: 'Banana Scramble',
      description: 'Unscramble the letters to spell jungle words!',
    },
    {
      icon: '🎈',
      title: 'Picture Pop',
      description: 'Pop the correct picture bubbles before time runs out!',
    },
    {
      icon: '🐦',
      title: 'Sound Safari',
      description: 'Listen to animal sounds and pick the correct word!',
    },
    {
      icon: '🎒',
      title: 'Word Collection',
      description: "View all the awesome words you've learned!",
    },
    {
      icon: '🏆',
      title: 'Achievements',
      description: 'Earn badges and rewards by completing games!',
    },
  ]

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-400">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Floating decorative elements */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`float-${i}`}
            className="absolute text-3xl opacity-20 animate-float-help pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            {['⭐', '🌟', '✨', '💫', '🎈'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-8xl md:text-9xl mb-6 animate-bounce">🎮</div>
          <h1 className="text-6xl md:text-8xl font-black mb-4 drop-shadow-2xl font-playful">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-title-glow">
              HOW TO PLAY
            </span>
          </h1>
          <p className="text-white text-2xl md:text-3xl font-bold drop-shadow-xl font-playful">
            Ready to become a word master? Let's learn! 🚀
          </p>
        </div>

        {/* Game Instructions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {gameInstructions.map((game, index) => (
            <div
              key={index}
              className="bg-white/30 backdrop-blur-lg border-4 border-white/50 rounded-3xl p-6 md:p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="text-6xl md:text-7xl">{game.icon}</div>
                <div className="flex-1">
                  <h3 className="text-white text-2xl md:text-3xl font-black mb-3 drop-shadow-lg font-playful">
                    {game.title}
                  </h3>
                  <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg">
                    {game.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-white/30 backdrop-blur-lg border-4 border-white/50 rounded-3xl p-8 mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-xl text-center font-playful">
            🌟 Quick Tips!
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-3xl">✨</span>
              <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg">
                Complete games to earn stars and unlock new worlds!
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">🎯</span>
              <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg">
                Play daily quests for special rewards and badges!
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">🏆</span>
              <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg">
                Collect all words in each world to become a champion!
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">🌈</span>
              <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg">
                Have fun and learn at your own pace!
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="px-12 py-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 border-4 border-white rounded-full text-white font-black text-2xl md:text-3xl transition-all duration-300 hover:scale-110 hover:shadow-2xl font-playful"
          >
            Got it! 🎉
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-help {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-30px) translateX(20px) rotate(180deg); 
            opacity: 0.5;
          }
        }
        .animate-float-help {
          animation: float-help 8s ease-in-out infinite;
        }

        @keyframes title-glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
          }
          50% {
            text-shadow: 0 0 40px rgba(255, 215, 0, 1);
          }
        }
        .animate-title-glow {
          animation: title-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default HelpScreen

