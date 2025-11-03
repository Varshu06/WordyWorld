import React, { useState } from 'react'

const Homepage = ({ onEnterClick, onSettingsClick, onHelpClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex items-center justify-center">
      {/* Background - 2D Cartoon Landscape */}
      <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ${isClicked ? 'transform translate-y-20' : ''}`}>
        {/* Bright Blue Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-300"></div>
        
        {/* Sun in corner with soft glow */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 lg:top-16 lg:right-16 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-300 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
            <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full shadow-lg"></div>
          </div>
        </div>
        
        {/* Drifting Clouds - move horizontally */}
        <div className={`absolute top-16 left-0 w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 bg-white rounded-full opacity-90 animate-cloud-drift-1 ${isClicked ? 'animate-cloud-drift-away-1' : ''}`}>
          <div className="absolute -top-6 left-4 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute -top-6 right-4 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute top-2 left-8 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-2 right-8 w-18 h-18 bg-white rounded-full"></div>
        </div>
        
        <div className={`absolute top-32 right-0 w-28 h-18 md:w-36 md:h-22 lg:w-44 lg:h-26 bg-white rounded-full opacity-85 animate-cloud-drift-2 ${isClicked ? 'animate-cloud-drift-away-2' : ''}`}>
          <div className="absolute -top-5 left-3 w-14 h-14 bg-white rounded-full"></div>
          <div className="absolute -top-5 right-3 w-14 h-14 bg-white rounded-full"></div>
          <div className="absolute top-1 left-6 w-18 h-18 bg-white rounded-full"></div>
          <div className="absolute top-1 right-6 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        <div className={`absolute top-24 left-1/4 w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-24 bg-white rounded-full opacity-80 animate-cloud-drift-3 ${isClicked ? 'animate-cloud-drift-away-3' : ''}`}>
          <div className="absolute -top-4 left-2 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute -top-4 right-2 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute top-1 left-5 w-16 h-16 bg-white rounded-full"></div>
        </div>

        {/* Rolling Green Hills at Bottom */}
        <div className={`absolute bottom-0 w-full transition-transform duration-1000 ${isClicked ? 'transform translate-y-full' : ''}`}>
          {/* Hill 1 - Back layer */}
          <div className="absolute bottom-0 left-0 w-full md:w-2/3 h-32 md:h-40 lg:h-48 bg-gradient-to-t from-green-600 to-green-500 rounded-t-full"></div>
          
          {/* Hill 2 - Mid layer */}
          <div className="absolute bottom-0 right-0 w-full md:w-3/4 h-40 md:h-52 lg:h-64 bg-gradient-to-t from-green-700 to-green-600 rounded-t-full"></div>
          
          {/* Hill 3 - Front layer */}
          <div className="absolute bottom-0 left-1/4 w-2/3 md:w-1/2 h-48 md:h-64 lg:h-80 bg-gradient-to-t from-green-800 to-green-700 rounded-t-full"></div>
        </div>

        {/* Ground layer with brown earth */}
        <div className={`absolute bottom-0 w-full h-16 md:h-20 lg:h-24 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700 transition-transform duration-1000 ${isClicked ? 'transform translate-y-full' : ''}`}>
          {/* Grass texture */}
          <div className="absolute top-0 left-0 w-full h-4 md:h-6 lg:h-8 bg-gradient-to-b from-green-500 to-green-600"></div>
        </div>

        {/* Winding Path */}
        <div className={`absolute bottom-16 left-0 w-full h-12 md:h-16 lg:h-20 transition-transform duration-1000 ${isClicked ? 'transform translate-y-full' : ''}`}>
          <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path d="M 0 50 Q 200 30 400 40 T 800 35 T 1200 45" stroke="#D2B48C" strokeWidth="60" fill="none" strokeLinecap="round" opacity="0.8"/>
          </svg>
        </div>

        {/* Trees - bob up and down */}
        <div className={`absolute bottom-16 right-20 md:right-32 lg:right-40 text-5xl md:text-6xl lg:text-7xl animate-tree-bob transition-transform duration-1000 ${isClicked ? 'transform translate-y-full' : ''}`} style={{ animationDelay: '0s' }}>
          🌳
        </div>
        
        <div className={`absolute bottom-20 left-16 md:left-24 lg:left-32 text-4xl md:text-5xl lg:text-6xl animate-tree-bob transition-transform duration-1000 ${isClicked ? 'transform translate-y-full' : ''}`} style={{ animationDelay: '0.3s' }}>
          🌲
        </div>

        {/* Bushes - bob up and down */}
        <div className={`absolute bottom-20 right-1/3 text-3xl md:text-4xl lg:text-5xl animate-tree-bob transition-transform duration-1000 ${isClicked ? 'transform translate-y-full' : ''}`} style={{ animationDelay: '0.6s' }}>
          🌿
        </div>
        
        <div className={`absolute bottom-16 left-1/2 text-2xl md:text-3xl lg:text-4xl animate-tree-bob transition-transform duration-1000 ${isClicked ? 'transform translate-y-full' : ''}`} style={{ animationDelay: '0.9s' }}>
          🍃
        </div>

        {/* Mushrooms - red with white spots */}
        <div className={`absolute bottom-20 left-1/4 flex flex-col items-center transition-transform duration-1000 ${isClicked ? 'transform translate-y-full' : ''}`}>
          <div className="text-2xl md:text-3xl lg:text-4xl">🍄</div>
        </div>
        
        <div className={`absolute bottom-16 right-1/4 flex flex-col items-center transition-transform duration-1000 ${isClicked ? 'transform translate-y-full' : ''}`}>
          <div className="text-xl md:text-2xl lg:text-3xl">🍄</div>
          <div className="text-lg md:text-xl lg:text-2xl -mt-2">🍄</div>
        </div>

        {/* Colorful Flowers */}
        <div className={`absolute bottom-20 left-12 md:left-16 text-xl md:text-2xl lg:text-3xl transition-transform duration-1000 ${isClicked ? 'transform translate-y-full' : ''}`}>
          🌸
        </div>
        
        <div className={`absolute bottom-16 left-2/3 text-lg md:text-xl lg:text-2xl transition-transform duration-1000 ${isClicked ? 'transform translate-y-full' : ''}`}>
          🌺
        </div>
        
        <div className={`absolute bottom-16 right-16 md:right-20 text-xl md:text-2xl lg:text-3xl transition-transform duration-1000 ${isClicked ? 'transform translate-y-full' : ''}`}>
          🌻
        </div>

        {/* Butterfly fluttering across screen - flies in all directions */}
        <div className="absolute top-0 left-0 text-2xl md:text-3xl lg:text-4xl animate-butterfly-flutter z-30">
          🦋
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 py-8 text-center">
        {/* Title - WORDYWORLD */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 md:mb-6 drop-shadow-2xl font-playful">
          <span className="bg-gradient-to-r from-green-600 via-yellow-400 to-green-600 bg-clip-text text-transparent animate-pulse-slow">
            WORDYWORLD
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-800 font-semibold mb-8 md:mb-12 drop-shadow-lg max-w-2xl px-4 font-playful">
          Explore, play, and learn new words every day! ✨
        </p>

        {/* Hero Button - ENTER WORDYWORLD */}
        <div className="relative">
          <button
            className={`relative px-8 py-4 md:px-12 md:py-6 lg:px-16 lg:py-8 bg-gradient-to-r from-green-500 via-green-400 to-green-500 rounded-full shadow-2xl text-white font-bold text-xl md:text-2xl lg:text-3xl transform transition-all duration-300 font-playful ${
              isHovered 
                ? 'scale-105 shadow-green-400 ring-4 ring-green-300 ring-opacity-50' 
                : 'scale-100 hover:scale-105'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              setIsClicked(true)
              // Trigger navigation after animation
              setTimeout(() => {
                if (onEnterClick) {
                  onEnterClick()
                }
              }, 1000)
            }}
          >
            <span className="flex items-center gap-3 md:gap-4 relative z-10">
              <span className="inline-flex">
                {'ENTER WORDYWORLD'.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block transform transition-all duration-200 ${
                      isHovered ? 'animate-letter-pop' : ''
                    }`}
                    style={{
                      animationDelay: isHovered ? `${index * 0.05}s` : '0s',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <span className={`text-2xl md:text-3xl lg:text-4xl transform transition-transform duration-300 ${
                isHovered ? 'rotate-12 scale-125' : ''
              }`}>
                🚀
              </span>
            </span>
            
            {/* Glow effect on hover */}
            {isHovered && (
              <div className="absolute inset-0 rounded-full bg-green-300 opacity-30 blur-xl animate-pulse"></div>
            )}
          </button>

          {/* Sparkles that pop up on hover */}
          {isHovered && (
            <>
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-2xl md:text-3xl lg:text-4xl animate-sparkle-pop" style={{ animationDelay: '0s' }}>
                ✨
              </span>
              <span className="absolute top-1/4 right-0 transform translate-x-full text-xl md:text-2xl lg:text-3xl animate-sparkle-pop" style={{ animationDelay: '0.1s' }}>
                ✨
              </span>
              <span className="absolute top-1/2 right-0 transform translate-x-full translate-y-1/2 text-2xl md:text-3xl lg:text-4xl animate-sparkle-pop" style={{ animationDelay: '0.2s' }}>
                ✨
              </span>
              <span className="absolute bottom-1/4 right-0 transform translate-x-full text-xl md:text-2xl lg:text-3xl animate-sparkle-pop" style={{ animationDelay: '0.3s' }}>
                ✨
              </span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-2xl md:text-3xl lg:text-4xl animate-sparkle-pop" style={{ animationDelay: '0.4s' }}>
                ✨
              </span>
              <span className="absolute bottom-1/4 left-0 transform -translate-x-full text-xl md:text-2xl lg:text-3xl animate-sparkle-pop" style={{ animationDelay: '0.5s' }}>
                ✨
              </span>
              <span className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 text-2xl md:text-3xl lg:text-4xl animate-sparkle-pop" style={{ animationDelay: '0.6s' }}>
                ✨
              </span>
              <span className="absolute top-1/4 left-0 transform -translate-x-full text-xl md:text-2xl lg:text-3xl animate-sparkle-pop" style={{ animationDelay: '0.7s' }}>
                ✨
              </span>
            </>
          )}
        </div>

        {/* Secondary text - No signup needed */}
        <p className="mt-6 md:mt-8 text-sm md:text-base lg:text-lg text-gray-700 font-medium drop-shadow-md font-playful">
          No signup needed! Just play! 🎮
        </p>

        {/* Settings and Help Buttons */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-3 z-40">
          {onSettingsClick && (
            <button
              onClick={onSettingsClick}
              className="w-12 h-12 md:w-16 md:h-16 bg-white/80 backdrop-blur-lg border-2 border-white/40 rounded-full text-2xl md:text-3xl transition-all duration-300 hover:scale-110 hover:bg-white/100 hover:shadow-xl flex items-center justify-center"
              title="Settings"
            >
              ⚙️
            </button>
          )}
          {onHelpClick && (
            <button
              onClick={onHelpClick}
              className="w-12 h-12 md:w-16 md:h-16 bg-white/80 backdrop-blur-lg border-2 border-white/40 rounded-full text-2xl md:text-3xl transition-all duration-300 hover:scale-110 hover:bg-white/100 hover:shadow-xl flex items-center justify-center"
              title="Help"
            >
              ❓
            </button>
          )}
        </div>
      </div>

      {/* All Animations */}
      <style>{`
        @keyframes cloud-drift-1 {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(calc(100vw + 50px)); }
        }
        @keyframes cloud-drift-2 {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(calc(100vw + 50px)); }
        }
        @keyframes cloud-drift-3 {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(calc(100vw + 50px)); }
        }
        
        .animate-cloud-drift-1 {
          animation: cloud-drift-1 30s linear infinite;
        }
        .animate-cloud-drift-2 {
          animation: cloud-drift-2 40s linear infinite;
          animation-delay: -10s;
        }
        .animate-cloud-drift-3 {
          animation: cloud-drift-3 35s linear infinite;
          animation-delay: -5s;
        }
        
        @keyframes cloud-drift-away-1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 200px)) translateY(-100px); opacity: 0; }
        }
        @keyframes cloud-drift-away-2 {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 200px)) translateY(-100px); opacity: 0; }
        }
        @keyframes cloud-drift-away-3 {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 200px)) translateY(-100px); opacity: 0; }
        }
        
        .animate-cloud-drift-away-1 {
          animation: cloud-drift-away-1 2s ease-out forwards;
        }
        .animate-cloud-drift-away-2 {
          animation: cloud-drift-away-2 2s ease-out forwards;
        }
        .animate-cloud-drift-away-3 {
          animation: cloud-drift-away-3 2s ease-out forwards;
        }
        
        @keyframes tree-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-tree-bob {
          animation: tree-bob 3s ease-in-out infinite;
        }
        
        @keyframes butterfly-flutter {
          0% {
            transform: translateX(-50px) translateY(20vh) rotate(-10deg);
          }
          8% {
            transform: translateX(10vw) translateY(10vh) rotate(15deg);
          }
          16% {
            transform: translateX(20vw) translateY(30vh) rotate(-20deg);
          }
          24% {
            transform: translateX(35vw) translateY(15vh) rotate(25deg);
          }
          32% {
            transform: translateX(50vw) translateY(40vh) rotate(-15deg);
          }
          40% {
            transform: translateX(65vw) translateY(20vh) rotate(20deg);
          }
          48% {
            transform: translateX(80vw) translateY(35vh) rotate(-25deg);
          }
          56% {
            transform: translateX(85vw) translateY(10vh) rotate(30deg);
          }
          64% {
            transform: translateX(75vw) translateY(25vh) rotate(-20deg);
          }
          72% {
            transform: translateX(60vw) translateY(45vh) rotate(15deg);
          }
          80% {
            transform: translateX(40vw) translateY(30vh) rotate(-25deg);
          }
          88% {
            transform: translateX(20vw) translateY(15vh) rotate(20deg);
          }
          96% {
            transform: translateX(5vw) translateY(35vh) rotate(-15deg);
          }
          100% {
            transform: translateX(calc(100vw + 50px)) translateY(20vh) rotate(10deg);
          }
        }
        .animate-butterfly-flutter {
          animation: butterfly-flutter 25s ease-in-out infinite;
        }
        
        @keyframes sparkle-pop-1 {
          0% { opacity: 0; transform: translate(0, 0) scale(0) rotate(0deg); }
          50% { opacity: 1; transform: translate(0, -60px) scale(1.5) rotate(180deg); }
          100% { opacity: 0; transform: translate(0, -80px) scale(0.5) rotate(360deg); }
        }
        @keyframes sparkle-pop-2 {
          0% { opacity: 0; transform: translate(0, 0) scale(0) rotate(0deg); }
          50% { opacity: 1; transform: translate(40px, -40px) scale(1.5) rotate(180deg); }
          100% { opacity: 0; transform: translate(50px, -60px) scale(0.5) rotate(360deg); }
        }
        @keyframes sparkle-pop-3 {
          0% { opacity: 0; transform: translate(0, 0) scale(0) rotate(0deg); }
          50% { opacity: 1; transform: translate(60px, 0) scale(1.5) rotate(180deg); }
          100% { opacity: 0; transform: translate(80px, 0) scale(0.5) rotate(360deg); }
        }
        @keyframes sparkle-pop-4 {
          0% { opacity: 0; transform: translate(0, 0) scale(0) rotate(0deg); }
          50% { opacity: 1; transform: translate(40px, 40px) scale(1.5) rotate(180deg); }
          100% { opacity: 0; transform: translate(50px, 60px) scale(0.5) rotate(360deg); }
        }
        @keyframes sparkle-pop-5 {
          0% { opacity: 0; transform: translate(0, 0) scale(0) rotate(0deg); }
          50% { opacity: 1; transform: translate(0, 60px) scale(1.5) rotate(180deg); }
          100% { opacity: 0; transform: translate(0, 80px) scale(0.5) rotate(360deg); }
        }
        @keyframes sparkle-pop-6 {
          0% { opacity: 0; transform: translate(0, 0) scale(0) rotate(0deg); }
          50% { opacity: 1; transform: translate(-40px, 40px) scale(1.5) rotate(180deg); }
          100% { opacity: 0; transform: translate(-50px, 60px) scale(0.5) rotate(360deg); }
        }
        @keyframes sparkle-pop-7 {
          0% { opacity: 0; transform: translate(0, 0) scale(0) rotate(0deg); }
          50% { opacity: 1; transform: translate(-60px, 0) scale(1.5) rotate(180deg); }
          100% { opacity: 0; transform: translate(-80px, 0) scale(0.5) rotate(360deg); }
        }
        @keyframes sparkle-pop-8 {
          0% { opacity: 0; transform: translate(0, 0) scale(0) rotate(0deg); }
          50% { opacity: 1; transform: translate(-40px, -40px) scale(1.5) rotate(180deg); }
          100% { opacity: 0; transform: translate(-50px, -60px) scale(0.5) rotate(360deg); }
        }
        
        .animate-sparkle-pop {
          pointer-events: none;
        }
        .animate-sparkle-pop[style*="0s"] {
          animation: sparkle-pop-1 1s ease-out forwards;
        }
        .animate-sparkle-pop[style*="0.1s"] {
          animation: sparkle-pop-2 1s ease-out forwards;
        }
        .animate-sparkle-pop[style*="0.2s"] {
          animation: sparkle-pop-3 1s ease-out forwards;
        }
        .animate-sparkle-pop[style*="0.3s"] {
          animation: sparkle-pop-4 1s ease-out forwards;
        }
        .animate-sparkle-pop[style*="0.4s"] {
          animation: sparkle-pop-5 1s ease-out forwards;
        }
        .animate-sparkle-pop[style*="0.5s"] {
          animation: sparkle-pop-6 1s ease-out forwards;
        }
        .animate-sparkle-pop[style*="0.6s"] {
          animation: sparkle-pop-7 1s ease-out forwards;
        }
        .animate-sparkle-pop[style*="0.7s"] {
          animation: sparkle-pop-8 1s ease-out forwards;
        }
        
        @keyframes letter-pop {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.2);
          }
        }
        .animate-letter-pop {
          animation: letter-pop 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Homepage
