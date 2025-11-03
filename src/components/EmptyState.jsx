import React from 'react'

const EmptyState = ({ 
  emoji = '📭',
  title = 'Nothing Here Yet!',
  message = "Looks like this area is still empty. Keep playing to fill it up!",
  actionLabel = '',
  onAction,
  world = 'jungle',
}) => {
  const worldEmojis = {
    jungle: ['🐵', '🦁', '🐯', '🌿'],
    space: ['👨‍🚀', '🛸', '⭐', '🌙'],
    food: ['🍕', '🍰', '🍎', '🥑'],
  }

  const decorations = worldEmojis[world] || worldEmojis.jungle

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Subtle floating decorations */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className="absolute text-4xl opacity-10 animate-float-empty pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            {decorations[Math.floor(Math.random() * decorations.length)]}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Emoji */}
        <div className="mb-8">
          <div className="text-9xl md:text-[200px] animate-bounce-gentle">{emoji}</div>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-700 drop-shadow-xl font-playful">
          {title}
        </h2>

        {/* Message */}
        <p className="text-xl md:text-2xl text-gray-600 font-bold mb-8 drop-shadow-lg font-playful">
          {message}
        </p>

        {/* Action Button */}
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-4 border-white rounded-full text-white font-black text-xl md:text-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl font-playful"
          >
            {actionLabel}
          </button>
        )}

        {/* Fun Encouragement */}
        <div className="mt-12 bg-white/50 backdrop-blur-lg border-2 border-white rounded-3xl p-8 shadow-xl">
          <p className="text-gray-700 text-lg md:text-xl font-bold font-playful">
            💡 Tip: Complete games to unlock more content! Your journey is just beginning! 🚀
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-empty {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
          }
          50% { 
            transform: translateY(-30px) translateX(20px) rotate(180deg); 
          }
        }
        .animate-float-empty {
          animation: float-empty 8s ease-in-out infinite;
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default EmptyState

