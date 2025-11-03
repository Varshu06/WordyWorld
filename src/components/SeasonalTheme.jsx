import React, { useState, useEffect } from 'react'

const SeasonalTheme = ({ children }) => {
  const [theme, setTheme] = useState('normal')

  useEffect(() => {
    const currentDate = new Date()
    const month = currentDate.getMonth() + 1 // 1-12
    const day = currentDate.getDate()

    // Determine seasonal theme
    let seasonalTheme = 'normal'
    
    // Halloween (October)
    if (month === 10) {
      seasonalTheme = 'halloween'
    }
    // Christmas (December)
    else if (month === 12) {
      seasonalTheme = 'christmas'
    }
    // Valentine's Day (February 14)
    else if (month === 2 && day >= 10 && day <= 16) {
      seasonalTheme = 'valentine'
    }
    // Easter (March/April - simplified)
    else if (month === 4 && day >= 1 && day <= 15) {
      seasonalTheme = 'easter'
    }
    // Summer (June-August)
    else if (month >= 6 && month <= 8) {
      seasonalTheme = 'summer'
    }
    // Spring (March-May)
    else if (month >= 3 && month <= 5) {
      seasonalTheme = 'spring'
    }
    // Fall (September-November)
    else if (month >= 9 && month <= 11) {
      seasonalTheme = 'fall'
    }

    setTheme(seasonalTheme)
  }, [])

  const themedDecorations = {
    normal: [],
    halloween: ['🎃', '👻', '🕷️', '🦇'],
    christmas: ['🎄', '🎅', '❄️', '🎁'],
    valentine: ['💝', '💖', '🌹', '💌'],
    easter: ['🐰', '🥚', '🌸', '🌷'],
    summer: ['☀️', '🏖️', '🌊', '🌴'],
    spring: ['🌱', '🦋', '🌸', '🌺'],
    fall: ['🍂', '🎃', '🍁', '🌰'],
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* Seasonal Background Decorations */}
      {themedDecorations[theme].length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={`season-${i}`}
              className="absolute text-3xl md:text-4xl opacity-20 animate-float-season"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            >
              {themedDecorations[theme][Math.floor(Math.random() * themedDecorations[theme].length)]}
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-season {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0.1;
          }
          50% { 
            transform: translateY(-30px) translateX(20px) rotate(180deg); 
            opacity: 0.3;
          }
        }
        .animate-float-season {
          animation: float-season 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default SeasonalTheme

