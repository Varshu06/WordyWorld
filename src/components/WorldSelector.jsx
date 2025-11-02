import React, { useEffect, useRef, useState } from 'react'

const WorldSelector = ({ onWorldSelect, onBack }) => {
  const [hoveredWorld, setHoveredWorld] = useState(null)
  const [clickedWorld, setClickedWorld] = useState(null)
  const [activeBackground, setActiveBackground] = useState('default')

  const worlds = [
    {
      id: 'jungle',
      icon: '🌴',
      title: 'Jungle World',
      subtitle: 'Wild Adventures!',
      unlocked: true,
      starsRequired: 0,
      bgTheme: 'jungle',
      decorations: ['🐵', '🦁', '🐯', '🦜', '🌿'],
      position: { top: '10%', left: '0%' },
      glowColor: '#4CAF50',
    },
    {
      id: 'space',
      icon: '🚀',
      title: 'Space World',
      subtitle: 'Cosmic Words!',
      unlocked: true,
      starsRequired: 0,
      bgTheme: 'space',
      decorations: ['⭐', '🛸', '👽', '🌙', '💫'],
      position: { top: '35%', left: '20%' },
      glowColor: '#2196F3',
    },
    {
      id: 'food',
      icon: '🍔',
      title: 'Food Town',
      subtitle: 'Yummy Words!',
      unlocked: false,
      starsRequired: 15,
      bgTheme: 'food',
      decorations: ['🍕', '🍩', '🍰', '🌮', '🧁'],
      position: { top: '10%', left: '40%' },
      glowColor: '#FF9800',
    },
    {
      id: 'ocean',
      icon: '🌊',
      title: 'Ocean World',
      subtitle: 'Aquatic Words!',
      unlocked: false,
      starsRequired: 45,
      bgTheme: 'ocean',
      decorations: ['🐠', '🐙', '🦈', '🐋', '🌊'],
      position: { top: '35%', left: '60%' },
      glowColor: '#00BCD4',
    },
    {
      id: 'castle',
      icon: '🏰',
      title: 'Castle Realm',
      subtitle: 'Royal Words!',
      unlocked: false,
      starsRequired: 30,
      bgTheme: 'castle',
      decorations: ['👑', '🏰', '⚔️', '🛡️', '🐉'],
      position: { top: '10%', left: '80%' },
      glowColor: '#9C27B0',
    },
  ]

  const mapContainerRef = useRef(null)
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 })
  const [cardSize, setCardSize] = useState(140)

  // Update map dimensions on resize
  useEffect(() => {
    const updateMapDimensions = () => {
      if (mapContainerRef.current) {
        setMapDimensions({
          width: mapContainerRef.current.offsetWidth,
          height: mapContainerRef.current.offsetHeight,
        })
      }
    }

    const updateCardSize = () => {
      if (window.innerWidth >= 1024) {
        setCardSize(180)
      } else if (window.innerWidth >= 768) {
        setCardSize(160)
      } else {
        setCardSize(140)
      }
    }

    updateMapDimensions()
    updateCardSize()
    window.addEventListener('resize', updateMapDimensions)
    window.addEventListener('resize', updateCardSize)
    return () => {
      window.removeEventListener('resize', updateMapDimensions)
      window.removeEventListener('resize', updateCardSize)
    }
  }, [])

  // Change background based on hovered world
  useEffect(() => {
    if (hoveredWorld) {
      const world = worlds.find(w => w.id === hoveredWorld)
      setActiveBackground(world.bgTheme)
    } else {
      setActiveBackground('default')
    }
  }, [hoveredWorld])

  const handleWorldClick = (world) => {
    if (!world.unlocked) {
      // Show locked message
      setClickedWorld(world.id)
      setTimeout(() => setClickedWorld(null), 2000)
      return
    }

    setClickedWorld(world.id)
    
    // Save to localStorage
    localStorage.setItem('selectedWorld', world.id)
    
    // Smooth zoom animation
    setTimeout(() => {
      if (onWorldSelect) {
        onWorldSelect(world.id)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8">
      {/* Dynamic 3D Background - Changes based on hover! */}
      <div className="absolute inset-0 w-full h-full transition-all duration-1000">
        {/* Default Background - Magical floating space */}
        {activeBackground === 'default' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300"></div>
            
            {/* Floating sparkles everywhere */}
            {[...Array(30)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute text-xl md:text-2xl opacity-40 animate-float-delayed pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                }}
              >
                {['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]}
              </div>
            ))}

            {/* Floating map elements */}
            <div className="absolute top-20 left-1/4 text-5xl md:text-6xl opacity-20 animate-float-map pointer-events-none">
              🗺️
            </div>
            <div className="absolute bottom-32 right-1/4 text-4xl md:text-5xl opacity-25 animate-float-map-delayed pointer-events-none">
              🌍
            </div>
          </>
        )}

        {/* Jungle Background - Vibrant Animated Jungle */}
        {activeBackground === 'jungle' && (
          <>
            {/* Base jungle gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-800 via-emerald-600 to-green-400"></div>
            
            {/* Floating leaves */}
            {[...Array(25)].map((_, i) => (
              <div
                key={`leaf-${i}`}
                className="absolute text-2xl md:text-3xl opacity-40 animate-float-jungle pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 6}s`,
                }}
              >
                {['🍃', '🌿', '🌾', '🍀'][Math.floor(Math.random() * 4)]}
              </div>
            ))}

            {/* Jungle canopy overlay */}
            <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-green-950/50 to-transparent"></div>

            {/* Animated jungle animals */}
            {/* Monkey swinging */}
            <div className="absolute top-1/4 left-1/8 text-7xl md:text-8xl opacity-50 animate-monkey-jungle pointer-events-none">
              🐵
            </div>

            {/* Lion prowling */}
            <div className="absolute bottom-1/3 right-1/6 text-7xl md:text-8xl opacity-45 animate-lion-jungle pointer-events-none" style={{ animationDelay: '2s' }}>
              🦁
            </div>

            {/* Tiger walking */}
            <div className="absolute bottom-1/4 left-2/5 text-6xl md:text-7xl opacity-50 animate-tiger-jungle pointer-events-none" style={{ animationDelay: '4s' }}>
              🐯
            </div>

            {/* Parrot flying */}
            <div className="absolute top-1/2 right-1/4 text-6xl md:text-7xl opacity-55 animate-parrot-jungle pointer-events-none" style={{ animationDelay: '1s' }}>
              🦜
            </div>

            {/* Butterfly fluttering */}
            <div className="absolute top-1/3 left-1/3 text-5xl md:text-6xl opacity-60 animate-butterfly-jungle pointer-events-none" style={{ animationDelay: '3s' }}>
              🦋
            </div>

            {/* Snake slithering */}
            <div className="absolute bottom-1/5 left-1/2 text-5xl md:text-6xl opacity-50 animate-snake-jungle pointer-events-none" style={{ animationDelay: '5s' }}>
              🐍
            </div>

            {/* Tropical fish (if pond) */}
            <div className="absolute bottom-1/6 right-2/5 text-4xl md:text-5xl opacity-55 animate-fish-jungle pointer-events-none" style={{ animationDelay: '6s' }}>
              🐠
            </div>

            {/* Bird flying */}
            <div className="absolute top-2/5 left-1/5 text-4xl md:text-5xl opacity-60 animate-bird-jungle pointer-events-none" style={{ animationDelay: '7s' }}>
              🐦
            </div>
          </>
        )}

        {/* Space Background */}
        {activeBackground === 'space' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950"></div>
            
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
          </>
        )}

        {/* Food Background */}
        {activeBackground === 'food' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-red-300 to-pink-300"></div>
            
            {/* Floating food */}
            {[...Array(25)].map((_, i) => (
              <div
                key={`food-${i}`}
                className="absolute text-2xl md:text-3xl opacity-30 animate-float-food pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                }}
              >
                {['🍕', '🍩', '🍰', '🧁', '🌮', '🍔'][Math.floor(Math.random() * 6)]}
              </div>
            ))}

            {/* Bakery glow */}
            <div className="absolute top-1/4 left-1/4 text-7xl md:text-8xl opacity-20 animate-pulse-slow pointer-events-none">
              🏪
            </div>
          </>
        )}

        {/* Castle Background - Royal Fairy Tale Realm */}
        {activeBackground === 'castle' && (
          <>
            {/* Pink-gold magical gradient sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-pink-200 via-purple-300 to-indigo-400"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 via-transparent to-transparent"></div>
            
            {/* Twinkling sparkles - fairy dust */}
            {[...Array(50)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-80 animate-twinkle pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              ></div>
            ))}

            {/* Castle silhouettes in background - depth layering */}
            <div className="absolute bottom-0 left-1/4 text-[20rem] opacity-15 animate-float-very-slow pointer-events-none">
              🏰
            </div>
            <div className="absolute bottom-10 right-1/5 text-[18rem] opacity-20 animate-float-very-slow-delayed pointer-events-none">
              🏯
            </div>

            {/* Floating crowns */}
            <div className="absolute top-1/5 left-1/6 text-6xl md:text-7xl opacity-50 animate-crown-float pointer-events-none">
              👑
            </div>
            <div className="absolute top-1/3 right-1/6 text-6xl md:text-7xl opacity-45 animate-crown-float-delayed pointer-events-none" style={{ animationDelay: '3s' }}>
              👑
            </div>

            {/* Floating diamonds/gems */}
            <div className="absolute top-1/2 left-1/4 text-5xl md:text-6xl opacity-60 animate-diamond-float pointer-events-none">
              💎
            </div>
            <div className="absolute top-2/3 right-1/4 text-5xl md:text-6xl opacity-55 animate-diamond-float-delayed pointer-events-none" style={{ animationDelay: '2s' }}>
              💎
            </div>

            {/* Royal stars */}
            <div className="absolute top-10 right-10 text-5xl md:text-6xl opacity-70 animate-float-slow pointer-events-none">
              ⭐
            </div>
            <div className="absolute bottom-20 left-20 text-5xl md:text-6xl opacity-65 animate-float-slow-delayed pointer-events-none">
              ⭐
            </div>

            {/* Magic beams of light */}
            <div className="absolute bottom-0 left-1/4 w-[300px] h-[600px] bg-gradient-to-t from-yellow-300/30 via-pink-300/15 to-transparent blur-2xl animate-beam-glow pointer-events-none"></div>
          </>
        )}

        {/* Ocean Background - Vibrant Underwater Scene */}
        {activeBackground === 'ocean' && (
          <>
            {/* Water background - gradient from cyan to deep blue */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-700"></div>
            
            {/* Light rays from surface */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[400px] h-full bg-gradient-to-b from-white/10 to-transparent transform -skew-x-12 animate-light-rays"></div>
              <div className="absolute top-0 left-1/2 w-[300px] h-full bg-gradient-to-b from-white/15 to-transparent transform skew-x-6 animate-light-rays-delayed"></div>
              <div className="absolute top-0 right-1/4 w-[350px] h-full bg-gradient-to-b from-white/12 to-transparent transform -skew-x-6 animate-light-rays"></div>
            </div>

            {/* Floating bubbles of all sizes */}
            {[...Array(50)].map((_, i) => (
              <div
                key={`bubble-${i}`}
                className="absolute rounded-full bg-white/30 animate-float-bubbles pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `-${Math.random() * 100}px`,
                  width: `${5 + Math.random() * 35}px`,
                  height: `${5 + Math.random() * 35}px`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${10 + Math.random() * 10}s`,
                }}
              ></div>
            ))}

            {/* Shipwreck silhouette in the background */}
            <div className="absolute top-1/3 right-1/4 text-[20rem] opacity-20 animate-ship-sway pointer-events-none">
              ⛵
            </div>

            {/* School of fish */}
            <div className="absolute top-32 left-1/4 text-6xl opacity-30 animate-fish-swim pointer-events-none">
              🐠🐠🐠
            </div>
            <div className="absolute top-40 right-1/4 text-5xl opacity-35 animate-fish-swim-delayed pointer-events-none">
              🐟🐟🐟🐟
            </div>

            {/* Seabed layer */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-amber-200 via-yellow-100 to-transparent"></div>
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-yellow-300/60 to-transparent"></div>

            {/* Rocks on seabed */}
            <div className="absolute bottom-10 left-1/4 text-8xl opacity-30 pointer-events-none">
              🪨
            </div>
            <div className="absolute bottom-8 right-1/3 text-6xl opacity-25 pointer-events-none">
              🪨
            </div>
            <div className="absolute bottom-12 left-2/3 text-5xl opacity-25 pointer-events-none">
              🪨
            </div>

            {/* Seaweed and plants */}
            <div className="absolute bottom-0 left-1/5 text-7xl opacity-50 animate-weed-sway pointer-events-none">
              🌿
            </div>
            <div className="absolute bottom-0 left-1/3 text-8xl opacity-60 animate-weed-sway-delayed pointer-events-none">
              🌿
            </div>
            <div className="absolute bottom-0 right-1/4 text-7xl opacity-55 animate-weed-sway pointer-events-none">
              🌿
            </div>
            <div className="absolute bottom-0 right-2/5 text-6xl opacity-45 animate-weed-sway-delayed pointer-events-none">
              🌿
            </div>

            {/* Corals - colorful accents */}
            <div className="absolute bottom-8 left-1/6 text-4xl opacity-60 pointer-events-none">
              🪸
            </div>
            <div className="absolute bottom-12 right-1/5 text-5xl opacity-70 pointer-events-none">
              🪸
            </div>

            {/* Sponges */}
            <div className="absolute bottom-6 left-1/8 text-3xl opacity-50 pointer-events-none">
              🧽
            </div>
            <div className="absolute bottom-10 left-1/4 text-2xl opacity-40 pointer-events-none">
              🧽
            </div>

            {/* Starfish */}
            <div className="absolute bottom-6 left-3/4 text-4xl opacity-60 pointer-events-none">
              ⭐
            </div>

            {/* Shells */}
            <div className="absolute bottom-4 left-1/12 text-3xl opacity-70 pointer-events-none">
              🐚
            </div>
            <div className="absolute bottom-8 right-1/6 text-2xl opacity-65 pointer-events-none">
              🐚
            </div>

            {/* Sea creatures swimming */}
            <div className="absolute top-1/4 left-1/5 text-7xl opacity-45 animate-float-ocean-1 pointer-events-none">
              🐠
            </div>
            <div className="absolute top-1/3 right-1/5 text-6xl opacity-50 animate-float-ocean-2 pointer-events-none">
              🐙
            </div>
            <div className="absolute bottom-1/4 left-2/5 text-5xl opacity-40 animate-float-ocean-1 pointer-events-none">
              🦀
            </div>
            <div className="absolute bottom-1/3 right-2/5 text-6xl opacity-50 animate-float-ocean-2 pointer-events-none">
              🐡
            </div>
          </>
        )}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl px-4">
        {/* Back Button - Top Left */}
        <div className="absolute top-0 left-0 m-4 z-20">
          <button
            onClick={onBack}
            className="px-4 py-4 bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-full text-white font-bold text-2xl md:text-3xl font-playful transition-all duration-300 hover:scale-110 hover:bg-white/35 hover:shadow-xl hover:border-white/60 active:scale-95 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center"
          >
            ←
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-2 drop-shadow-2xl font-playful">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent animate-title-glow-world">
              Choose Your World!
            </span>
          </h1>
          <p className="text-lg md:text-2xl lg:text-3xl text-white font-bold drop-shadow-lg font-playful">
            Step into your next word adventure! ✨
          </p>
        </div>

        {/* 3D Map Container - The Floating Islands! */}
        <div ref={mapContainerRef} className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] perspective-1000 mb-4">
          {/* Map base - tilted for 3D effect */}
          <div 
            className="relative w-full h-full transform-gpu transition-transform duration-700"
            style={{
              transformStyle: 'preserve-3d',
              transform: hoveredWorld 
                ? 'perspective(1200px) rotateX(5deg) rotateY(-2deg)' 
                : 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
            }}
          >
            {/* Curved SVG Paths */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              style={{ overflow: 'visible' }}
            >
              {worlds.map((world, index) => {
                if (index === worlds.length - 1) return null
                const nextWorld = worlds[index + 1]
                
                // Calculate actual pixel positions
                const currentX = (mapDimensions.width * parseFloat(world.position.left)) / 100 + cardSize / 2
                const currentY = (mapDimensions.height * parseFloat(world.position.top)) / 100 + cardSize / 2
                const nextX = (mapDimensions.width * parseFloat(nextWorld.position.left)) / 100 + cardSize / 2
                const nextY = (mapDimensions.height * parseFloat(nextWorld.position.top)) / 100 + cardSize / 2
                
                // Create control points for curves
                const midX = (currentX + nextX) / 2
                const midY = (currentY + nextY) / 2
                const offset = 40 // Curve offset
                const controlY = midY + (index % 2 === 0 ? offset : -offset)
                
                // Generate unique path ID for gradient
                const pathId = `path-gradient-${index}`
                
                return (
                  <g key={`path-group-${index}`}>
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id={pathId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="50%" stopColor={world.unlocked && nextWorld.unlocked ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"} />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </linearGradient>
                    </defs>
                    
                    {/* Animated path */}
                    <path
                      d={`M ${currentX} ${currentY} Q ${midX} ${controlY} ${nextX} ${nextY}`}
                      fill="none"
                      stroke={`url(#${pathId})`}
                      strokeWidth="6"
                      strokeLinecap="round"
                      className="animate-path-flow"
                      style={{
                        filter: world.unlocked && nextWorld.unlocked
                          ? 'drop-shadow(0 0 8px rgba(255,255,255,0.6))'
                          : 'drop-shadow(0 0 4px rgba(255,255,255,0.3))',
                      }}
                    />
                  </g>
                )
              })}
            </svg>
            
            {/* World Islands positioned absolutely */}
            {worlds.map((world) => {
              const isHovered = hoveredWorld === world.id
              const isClicked = clickedWorld === world.id
              
              return (
                <div
                  key={world.id}
                  className="absolute cursor-pointer group z-10"
                  style={{
                    ...world.position,
                    transition: 'all 0.7s ease-out',
                    transform: isHovered 
                      ? 'translateY(-30px) translateZ(50px) scale(1.15)' 
                      : isClicked 
                        ? 'translateZ(100px) scale(1.3)' 
                        : 'translateY(0) translateZ(0) scale(1)',
                  }}
                  onMouseEnter={() => setHoveredWorld(world.id)}
                  onMouseLeave={() => setHoveredWorld(null)}
                  onClick={() => handleWorldClick(world)}
                >
                  {/* Lock overlay for locked worlds */}
                  {!world.unlocked && (
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl animate-pulse-slow pointer-events-none">
                      🔒
                    </div>
                  )}

                  {/* World Glass Bowl Card */}
                  <div
                    className={`relative w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] rounded-full border-2 transition-all duration-700 ${
                      world.unlocked 
                        ? `border-white/60 ${isHovered ? 'shadow-[0_20px_80px_rgba(0,0,0,0.4)]' : 'shadow-[0_15px_50px_rgba(0,0,0,0.3)]'}`
                        : 'border-gray-400/60 opacity-60 shadow-[0_10px_40px_rgba(0,0,0,0.2)]'
                    }`}
                    style={{
                      background: world.unlocked
                        ? `linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 100%)`
                        : 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.2) 100%)',
                      backdropFilter: 'blur(20px)',
                      transform: isHovered && world.unlocked
                        ? 'perspective(1000px) rotateY(8deg) rotateX(-8deg)'
                        : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
                      // Bowl effect with inner shadow
                      boxShadow: isHovered 
                        ? 'inset 0 0 30px rgba(255,255,255,0.3), 0 20px 80px rgba(0,0,0,0.4)' 
                        : 'inset 0 0 25px rgba(255,255,255,0.2), 0 15px 50px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Glow effect for unlocked worlds */}
                    {world.unlocked && (
                      <div
                        className="absolute inset-0 rounded-full opacity-60 blur-2xl transition-all duration-700"
                        style={{
                          backgroundColor: world.glowColor,
                          opacity: isHovered ? 0.8 : 0.5,
                        }}
                      ></div>
                    )}

                    {/* Shimmer animation */}
                    {world.unlocked && (
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer-world"></div>
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-3">
                      {/* World Icon */}
                      <div 
                        className={`text-5xl md:text-6xl lg:text-7xl mb-1 transition-all duration-500 ${
                          isHovered && world.unlocked ? 'scale-125 animate-bounce-world' : 'scale-100'
                        } ${isClicked && world.unlocked ? 'animate-spin-once' : ''}`}
                      >
                        {world.icon}
                      </div>

                      {/* World Title */}
                      <h2 className="text-base md:text-lg lg:text-xl font-black text-white mb-0 font-playful drop-shadow-xl text-center">
                        {world.title}
                      </h2>

                      {/* Locked message */}
                      {!world.unlocked && (
                        <div className="mt-1 px-2 py-0.5 bg-yellow-400/30 rounded-full">
                          <p className="text-xs font-bold text-white">
                            {world.starsRequired}⭐
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Floating Decorations that Pop Out on Hover! */}
                    {isHovered && world.unlocked && (
                      <div className="absolute inset-0 pointer-events-none overflow-visible">
                        {world.decorations.map((decoration, index) => (
                          <div
                            key={`decoration-${world.id}-${index}`}
                            className={`absolute text-xl md:text-2xl animate-pop-out-world-${world.id}`}
                            style={{
                              left: `${10 + (index % 3) * 30}%`,
                              top: `${5 + Math.floor(index / 3) * 40}%`,
                              animationDelay: `${index * 0.1}s`,
                            }}
                          >
                            {decoration}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Locked message popup */}
                    {isClicked && !world.unlocked && (
                      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[200px] bg-red-500/90 backdrop-blur-lg rounded-full px-4 py-3 text-center animate-locked-pop">
                        <p className="text-white font-bold text-sm md:text-base font-playful">
                          Locked 🔒 — Earn ⭐ to unlock!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* All the Magical Animations! */}
      <style>{`
        /* Perspective for 3D effect */
        .perspective-1000 {
          perspective: 1200px;
        }

        /* Floating animations with delays */
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(8px) rotate(90deg) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-35px) translateX(15px) rotate(180deg) scale(1.2);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-20px) translateX(8px) rotate(270deg) scale(1.1);
            opacity: 0.5;
          }
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        @keyframes float-map {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        .animate-float-map {
          animation: float-map 6s ease-in-out infinite;
        }

        @keyframes float-map-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-10deg); }
        }
        .animate-float-map-delayed {
          animation: float-map-delayed 8s ease-in-out infinite;
          animation-delay: 3s;
        }

        /* Jungle animations */
        @keyframes float-jungle {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(10deg); }
          66% { transform: translateY(-50px) translateX(-10px) rotate(-5deg); }
        }
        .animate-float-jungle {
          animation: float-jungle 7s ease-in-out infinite;
        }

        @keyframes light-rays-jungle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .animate-light-rays-jungle {
          animation: light-rays-jungle 4s ease-in-out infinite;
        }
        @keyframes light-rays-jungle-delayed {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .animate-light-rays-jungle-delayed {
          animation: light-rays-jungle-delayed 5s ease-in-out infinite;
          animation-delay: 2s;
        }

        @keyframes breeze-tree {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(2px) rotate(1deg); }
          50% { transform: translateX(-2px) rotate(-1deg); }
          75% { transform: translateX(1px) rotate(0.5deg); }
        }
        .animate-breeze-tree {
          animation: breeze-tree 10s ease-in-out infinite;
        }
        @keyframes breeze-tree-delayed {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-2px) rotate(-1deg); }
          50% { transform: translateX(2px) rotate(1deg); }
          75% { transform: translateX(-1px) rotate(-0.5deg); }
        }
        .animate-breeze-tree-delayed {
          animation: breeze-tree-delayed 12s ease-in-out infinite;
          animation-delay: 4s;
        }

        @keyframes weed-sway-small {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          33% { transform: translateX(3px) rotate(2deg); }
          66% { transform: translateX(-3px) rotate(-2deg); }
        }
        .animate-weed-sway-small {
          animation: weed-sway-small 5s ease-in-out infinite;
          transform-origin: bottom center;
        }

        @keyframes particle-jungle {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0.4; 
          }
          33% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: 0.7; 
          }
          66% { 
            transform: translateY(-35px) translateX(-5px); 
            opacity: 0.9; 
          }
        }
        .animate-particle-jungle {
          animation: particle-jungle 8s ease-in-out infinite;
        }

        /* Jungle animal animations */
        @keyframes monkey-jungle {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          20% { transform: translateY(-25px) translateX(30px) rotate(20deg); }
          40% { transform: translateY(-35px) translateX(45px) rotate(-15deg); }
          60% { transform: translateY(-20px) translateX(60px) rotate(25deg); }
          80% { transform: translateY(-15px) translateX(70px) rotate(0deg); }
        }
        .animate-monkey-jungle {
          animation: monkey-jungle 8s ease-in-out infinite;
        }

        @keyframes lion-jungle {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0.45; }
          50% { transform: translateX(-80px) translateY(-15px); opacity: 0.6; }
        }
        .animate-lion-jungle {
          animation: lion-jungle 10s ease-in-out infinite;
        }

        @keyframes tiger-jungle {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0.5; }
          33% { transform: translateX(40px) translateY(-8px); opacity: 0.6; }
          66% { transform: translateX(80px) translateY(-12px); opacity: 0.5; }
        }
        .animate-tiger-jungle {
          animation: tiger-jungle 9s ease-in-out infinite;
        }

        @keyframes parrot-jungle {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(-40px) translateY(-25px) rotate(-15deg); }
          50% { transform: translateX(-80px) translateY(-40px) rotate(20deg); }
          75% { transform: translateX(-120px) translateY(-30px) rotate(-10deg); }
        }
        .animate-parrot-jungle {
          animation: parrot-jungle 12s ease-in-out infinite;
        }

        @keyframes butterfly-jungle {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          16% { transform: translateY(-15px) translateX(20px) rotate(10deg); }
          33% { transform: translateY(-10px) translateX(35px) rotate(-15deg); }
          50% { transform: translateY(-20px) translateX(50px) rotate(20deg); }
          66% { transform: translateY(-15px) translateX(65px) rotate(-10deg); }
          83% { transform: translateY(-5px) translateX(75px) rotate(15deg); }
        }
        .animate-butterfly-jungle {
          animation: butterfly-jungle 15s ease-in-out infinite;
        }

        @keyframes snake-jungle {
          0%, 100% { transform: translateX(0) skewX(0deg); opacity: 0.5; }
          20% { transform: translateX(35px) skewX(5deg); opacity: 0.6; }
          40% { transform: translateX(65px) skewX(-3deg); opacity: 0.5; }
          60% { transform: translateX(90px) skewX(4deg); opacity: 0.6; }
          80% { transform: translateX(110px) skewX(-2deg); opacity: 0.5; }
        }
        .animate-snake-jungle {
          animation: snake-jungle 11s ease-in-out infinite;
        }

        @keyframes fish-jungle {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          33% { transform: translateX(30px) translateY(-15px) rotate(15deg); }
          66% { transform: translateX(60px) translateY(-25px) rotate(-10deg); }
        }
        .animate-fish-jungle {
          animation: fish-jungle 7s ease-in-out infinite;
        }

        @keyframes bird-jungle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(-8deg); }
          50% { transform: translateY(2px) rotate(5deg); }
          75% { transform: translateY(-5px) rotate(-6deg); }
        }
        .animate-bird-jungle {
          animation: bird-jungle 3s ease-in-out infinite;
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

        /* Castle animations */
        @keyframes float-sparkle-castle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.3); opacity: 0.8; }
        }
        .animate-float-sparkle-castle {
          animation: float-sparkle-castle 5s ease-in-out infinite;
        }

        @keyframes float-very-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float-very-slow {
          animation: float-very-slow 20s ease-in-out infinite;
        }

        @keyframes float-very-slow-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        .animate-float-very-slow-delayed {
          animation: float-very-slow-delayed 25s ease-in-out infinite;
          animation-delay: 8s;
        }

        @keyframes crown-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(20deg); }
        }
        .animate-crown-float {
          animation: crown-float 5s ease-in-out infinite;
        }
        @keyframes crown-float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(-15deg); }
        }
        .animate-crown-float-delayed {
          animation: crown-float-delayed 6s ease-in-out infinite;
        }

        @keyframes diamond-float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          33% { transform: translateY(-25px) rotate(180deg); opacity: 0.8; }
          66% { transform: translateY(-50px) rotate(360deg); opacity: 0.9; }
        }
        .animate-diamond-float {
          animation: diamond-float 8s ease-in-out infinite;
        }
        @keyframes diamond-float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.55; }
          33% { transform: translateY(-30px) rotate(-180deg); opacity: 0.85; }
          66% { transform: translateY(-55px) rotate(-360deg); opacity: 0.95; }
        }
        .animate-diamond-float-delayed {
          animation: diamond-float-delayed 9s ease-in-out infinite;
        }

        @keyframes beam-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-beam-glow {
          animation: beam-glow 3s ease-in-out infinite;
        }

        /* Ocean animations */
        @keyframes float-bubbles {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0.3;
          }
          30% {
            transform: translateY(-40px) scale(1.2);
            opacity: 0.5;
          }
          70% {
            transform: translateY(-80px) scale(1.5);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-120vh) scale(0.3);
            opacity: 0;
          }
        }
        .animate-float-bubbles {
          animation: float-bubbles 10s ease-out infinite;
        }

        @keyframes float-ocean-1 {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          50% { transform: translateX(30px) translateY(-25px) rotate(15deg); }
        }
        .animate-float-ocean-1 {
          animation: float-ocean-1 10s ease-in-out infinite;
        }

        @keyframes float-ocean-2 {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          50% { transform: translateX(-25px) translateY(-30px) rotate(-20deg); }
        }
        .animate-float-ocean-2 {
          animation: float-ocean-2 12s ease-in-out infinite;
          animation-delay: 5s;
        }

        /* Light rays animation */
        @keyframes light-rays {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-light-rays {
          animation: light-rays 4s ease-in-out infinite;
        }
        @keyframes light-rays-delayed {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-light-rays-delayed {
          animation: light-rays-delayed 5s ease-in-out infinite;
          animation-delay: 2s;
        }

        /* Ship sway */
        @keyframes ship-sway {
          0%, 100% { transform: translateX(0) rotate(-2deg); }
          50% { transform: translateX(10px) rotate(2deg); }
        }
        .animate-ship-sway {
          animation: ship-sway 15s ease-in-out infinite;
        }

        /* Fish swimming */
        @keyframes fish-swim {
          0%, 100% { transform: translateX(0); opacity: 0.3; }
          50% { transform: translateX(50px); opacity: 0.5; }
        }
        .animate-fish-swim {
          animation: fish-swim 8s ease-in-out infinite;
        }
        @keyframes fish-swim-delayed {
          0%, 100% { transform: translateX(0); opacity: 0.35; }
          50% { transform: translateX(-60px); opacity: 0.5; }
        }
        .animate-fish-swim-delayed {
          animation: fish-swim-delayed 10s ease-in-out infinite;
          animation-delay: 3s;
        }

        /* Weed sway */
        @keyframes weed-sway {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          33% { transform: translateX(5px) rotate(2deg); }
          66% { transform: translateX(-5px) rotate(-2deg); }
        }
        .animate-weed-sway {
          animation: weed-sway 6s ease-in-out infinite;
          transform-origin: bottom center;
        }
        @keyframes weed-sway-delayed {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          33% { transform: translateX(-5px) rotate(-2deg); }
          66% { transform: translateX(5px) rotate(2deg); }
        }
        .animate-weed-sway-delayed {
          animation: weed-sway-delayed 7s ease-in-out infinite;
          animation-delay: 2s;
          transform-origin: bottom center;
        }

        /* World card animations */
        @keyframes bounce-world {
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
        .animate-bounce-world {
          animation: bounce-world 1.5s ease-in-out infinite;
        }

        @keyframes shimmer-world {
          0% {
            transform: translateX(-200%) skewX(-12deg);
          }
          100% {
            transform: translateX(400%) skewX(-12deg);
          }
        }
        .animate-shimmer-world {
          animation: shimmer-world 4s ease-in-out infinite;
        }

        /* Pop-out for each world */
        @keyframes pop-out-world-jungle {
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
        .animate-pop-out-world-jungle {
          animation: pop-out-world-jungle 2.5s ease-out infinite;
        }

        @keyframes pop-out-world-space {
          0% {
            transform: translateX(0) translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateX(30px) translateY(-45px) scale(1.7) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateX(60px) translateY(-85px) scale(1) rotate(360deg);
            opacity: 0.7;
          }
        }
        .animate-pop-out-world-space {
          animation: pop-out-world-space 2.5s ease-out infinite;
        }

        @keyframes pop-out-world-food {
          0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          40% {
            transform: translateY(-35px) scale(1.5) rotate(150deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-70px) scale(1.2) rotate(360deg);
            opacity: 0.7;
          }
        }
        .animate-pop-out-world-food {
          animation: pop-out-world-food 2.5s ease-out infinite;
        }

        @keyframes pop-out-world-castle {
          0% {
            transform: translateX(-10px) translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateX(-20px) translateY(-50px) scale(1.6) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateX(-30px) translateY(-90px) scale(1) rotate(360deg);
            opacity: 0.7;
          }
        }
        .animate-pop-out-world-castle {
          animation: pop-out-world-castle 2.5s ease-out infinite;
        }

        @keyframes pop-out-world-ocean {
          0% {
            transform: translateX(0) translateY(0) scale(0);
            opacity: 0;
          }
          40% {
            transform: translateX(-40px) translateY(-40px) scale(1.6) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateX(-80px) translateY(-80px) scale(1) rotate(360deg);
            opacity: 0.7;
          }
        }
        .animate-pop-out-world-ocean {
          animation: pop-out-world-ocean 2.5s ease-out infinite;
        }

        /* Locked popup animation */
        @keyframes locked-pop {
          0%, 100% {
            transform: translateX(-50%) translateY(0) scale(1);
            opacity: 0;
          }
          20%, 80% {
            transform: translateX(-50%) translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateX(-50%) translateY(-10px) scale(1.05);
            opacity: 1;
          }
        }
        .animate-locked-pop {
          animation: locked-pop 2s ease-out;
        }

        /* Spin once */
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
          animation: spin-once 0.8s ease-out;
        }

        /* Title glow */
        @keyframes title-glow-world {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.7));
          }
        }
        .animate-title-glow-world {
          animation: title-glow-world 3s ease-in-out infinite;
        }

        /* Path flow animation for SVG paths */
        @keyframes path-flow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 2000;
          }
        }
        .animate-path-flow {
          stroke-dasharray: 2000;
          stroke-dashoffset: 0;
          animation: path-flow 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default WorldSelector

