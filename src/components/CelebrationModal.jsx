import React, { useEffect, useState } from 'react'

const CelebrationModal = ({ 
  type = 'threeStars', 
  message = '', 
  onClose, 
  world = 'jungle',
  autoCloseDelay = 3000,
}) => {
  const [showConfetti, setShowConfetti] = useState(true)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Create confetti particles
    const createConfetti = () => {
      const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
      const newParticles = []
      
      for (let i = 0; i < 100; i++) {
        newParticles.push({
          id: Math.random(),
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
          duration: 2 + Math.random() * 2,
        })
      }
      
      setParticles(newParticles)
    }

    createConfetti()

    // Auto-close after delay
    if (autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        if (onClose) {
          onClose()
        }
      }, autoCloseDelay)

      return () => clearTimeout(timer)
    }
  }, [autoCloseDelay, onClose])

  const celebrations = {
    threeStars: {
      emoji: '⭐⭐⭐',
      title: 'Perfect Score!',
      message: message || 'You matched everything perfectly!',
      gradient: 'from-yellow-400 via-orange-400 to-red-400',
    },
    firstWord: {
      emoji: '🎉',
      title: 'First Word Learned!',
      message: message || 'Way to go! Your collection is growing!',
      gradient: 'from-green-400 via-emerald-400 to-teal-400',
    },
    perfectGame: {
      emoji: '🏆',
      title: 'Flawless Victory!',
      message: message || 'You got EVERYTHING right! Amazing!',
      gradient: 'from-purple-400 via-indigo-400 to-blue-400',
    },
    allWorlds: {
      emoji: '🌍',
      title: 'WORLD MASTER!',
      message: message || 'You conquered all worlds! You are incredible!',
      gradient: 'from-cyan-400 via-blue-400 to-purple-400',
    },
    hiddenWord: {
      emoji: '🎁',
      title: 'Secret Discovered!',
      message: message || 'Wow! You found a hidden word! Special!',
      gradient: 'from-pink-400 via-purple-400 to-indigo-400',
    },
    dailyQuest: {
      emoji: world === 'jungle' ? '🌿' : world === 'space' ? '🚀' : '🍕',
      title: 'Daily Quest Complete!',
      message: message || 'Great job on your daily challenge!',
      gradient: world === 'jungle' 
        ? 'from-green-400 via-emerald-400 to-teal-400'
        : world === 'space'
        ? 'from-blue-400 via-indigo-400 to-purple-400'
        : 'from-orange-400 via-red-400 to-pink-400',
    },
    achievement: {
      emoji: '🏅',
      title: 'Achievement Unlocked!',
      message: message || 'New badge earned! Keep it up!',
      gradient: 'from-yellow-400 via-amber-400 to-orange-400',
    },
  }

  const celebration = celebrations[type] || celebrations.threeStars

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Confetti Overlay */}
      {showConfetti && particles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-3 h-3 rounded-full animate-confetti-fall"
              style={{
                left: `${particle.x}%`,
                backgroundColor: particle.color,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Modal */}
      <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-8 md:p-12 max-w-2xl w-full mx-4 shadow-2xl border-4 border-white animate-victory-pop">
        {/* Close Button */}
        {onClose && autoCloseDelay === 0 && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}

        {/* Content */}
        <div className="text-center">
          {/* Animated Emoji */}
          <div className="mb-6 animate-bounce-magic text-7xl md:text-8xl">
            {celebration.emoji}
          </div>

          {/* Title */}
          <h2 className={`text-4xl md:text-5xl font-black mb-4 drop-shadow-2xl font-playful bg-gradient-to-r ${celebration.gradient} bg-clip-text text-transparent`}>
            {celebration.title}
          </h2>

          {/* Message */}
          <p className="text-xl md:text-2xl text-gray-700 font-bold mb-8 drop-shadow-lg font-playful">
            {celebration.message}
          </p>

          {/* Fun Decorations */}
          <div className="flex justify-center gap-4 text-4xl mb-6">
            {['✨', '🌟', '🎊', '🎉'].map((decoration, index) => (
              <span
                key={index}
                className="animate-spin-slow"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {decoration}
              </span>
            ))}
          </div>

          {/* Optional Close Button (if auto-close is disabled) */}
          {onClose && autoCloseDelay === 0 && (
            <button
              onClick={onClose}
              className={`px-8 py-4 bg-gradient-to-r ${celebration.gradient} rounded-full text-white font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-xl font-playful`}
            >
              Awesome! 🎉
            </button>
          )}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall linear forwards;
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

        @keyframes bounce-magic {
          0%, 100% {
            transform: translateY(0) scale(1) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) scale(1.1) rotate(-5deg);
          }
          50% {
            transform: translateY(-15px) scale(1.15) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) scale(1.1) rotate(5deg);
          }
        }
        .animate-bounce-magic {
          animation: bounce-magic 1.5s ease-in-out infinite;
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg) scale(1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default CelebrationModal

