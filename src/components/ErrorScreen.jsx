import React, { useEffect, useState } from 'react'

const ErrorScreen = ({ errorType = 'generic', onTryAgain, onBackToHome, onReload }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Create floating particles for visual appeal
    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = [...prev, {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 2,
        }]
        // Keep only last 50 particles
        return newParticles.slice(-50)
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const errorMessages = {
    generic: {
      emoji: '😅',
      title: 'Oops! Something went wrong!',
      message: "Don't worry, it happens sometimes!",
      color: 'from-red-400 via-orange-400 to-yellow-400',
    },
    network: {
      emoji: '📡',
      title: 'Connection Trouble!',
      message: "Looks like you're offline. Check your internet!",
      color: 'from-blue-400 via-purple-400 to-pink-400',
    },
    notFound: {
      emoji: '🔍',
      title: "Can't Find That!",
      message: 'The page you are looking for got lost in space!',
      color: 'from-indigo-400 via-purple-400 to-pink-400',
    },
    server: {
      emoji: '🔧',
      title: 'Server Taking a Break!',
      message: 'Our server is resting. Try again in a moment!',
      color: 'from-orange-400 via-red-400 to-pink-400',
    },
  }

  const error = errorMessages[errorType] || errorMessages.generic

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-gray-800 via-purple-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Animated Error Emoji */}
        <div className="mb-8 animate-bounce-slow">
          <div className="text-8xl md:text-9xl lg:text-[200px]">{error.emoji}</div>
        </div>

        {/* Error Title */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 text-white drop-shadow-2xl font-playful">
          {error.title}
        </h1>

        {/* Friendly Message */}
        <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-bold mb-12 drop-shadow-lg font-playful">
          {error.message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {onTryAgain && (
            <button
              onClick={onTryAgain}
              className="px-8 py-4 bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-full text-white font-bold text-lg md:text-xl transition-all duration-300 hover:scale-110 hover:bg-white/35 hover:shadow-xl font-playful min-w-[160px]"
            >
              🔄 Try Again
            </button>
          )}
          
          {onReload && (
            <button
              onClick={onReload}
              className="px-8 py-4 bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-full text-white font-bold text-lg md:text-xl transition-all duration-300 hover:scale-110 hover:bg-white/35 hover:shadow-xl font-playful min-w-[160px]"
            >
              🔃 Reload Page
            </button>
          )}
          
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-8 py-4 bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-full text-white font-bold text-lg md:text-xl transition-all duration-300 hover:scale-110 hover:bg-white/35 hover:shadow-xl font-playful min-w-[160px]"
            >
              🏠 Back to Home
            </button>
          )}
        </div>

        {/* Fun Encouragement */}
        <div className="mt-12 bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-3xl p-6">
          <p className="text-white text-lg md:text-xl font-bold font-playful drop-shadow-lg">
            🌟 Remember: Every adventurer faces obstacles! You've got this! 🌟
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        .animate-float-particle {
          animation: float-particle 4s ease-out forwards;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default ErrorScreen

