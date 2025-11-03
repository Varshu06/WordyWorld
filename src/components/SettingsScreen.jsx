import React, { useState, useEffect } from 'react'

const SettingsScreen = ({ onBack }) => {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [soundVolume, setSoundVolume] = useState(80)
  const [musicVolume, setMusicVolume] = useState(60)
  const [difficulty, setDifficulty] = useState('easy')

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSound = localStorage.getItem('soundEnabled')
    const savedMusic = localStorage.getItem('musicEnabled')
    const savedSoundVol = localStorage.getItem('soundVolume')
    const savedMusicVol = localStorage.getItem('musicVolume')
    const savedDifficulty = localStorage.getItem('selectedDifficulty')

    if (savedSound !== null) setSoundEnabled(savedSound === 'true')
    if (savedMusic !== null) setMusicEnabled(savedMusic === 'true')
    if (savedSoundVol !== null) setSoundVolume(parseInt(savedSoundVol, 10))
    if (savedMusicVol !== null) setMusicVolume(parseInt(savedMusicVol, 10))
    if (savedDifficulty) setDifficulty(savedDifficulty)
  }, [])

  const handleSoundToggle = () => {
    const newValue = !soundEnabled
    setSoundEnabled(newValue)
    localStorage.setItem('soundEnabled', newValue)
  }

  const handleMusicToggle = () => {
    const newValue = !musicEnabled
    setMusicEnabled(newValue)
    localStorage.setItem('musicEnabled', newValue)
  }

  const handleSoundVolumeChange = (value) => {
    setSoundVolume(value)
    localStorage.setItem('soundVolume', value)
  }

  const handleMusicVolumeChange = (value) => {
    setMusicVolume(value)
    localStorage.setItem('musicVolume', value)
  }

  const handleDifficultyChange = (value) => {
    setDifficulty(value)
    localStorage.setItem('selectedDifficulty', value)
  }

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      localStorage.clear()
      alert('Progress reset! Page will reload.')
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-indigo-800 via-purple-900 to-pink-900">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Floating decorative elements */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`float-${i}`}
            className="absolute text-3xl opacity-20 animate-float-settings pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            {['⚙️', '🔧', '🎛️', '🎚️', '🎚️'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-8xl md:text-9xl mb-6 animate-bounce">⚙️</div>
          <h1 className="text-6xl md:text-8xl font-black mb-4 drop-shadow-2xl font-playful">
            <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-500 bg-clip-text text-transparent animate-title-glow-settings">
              SETTINGS
            </span>
          </h1>
          <p className="text-white text-2xl md:text-3xl font-bold drop-shadow-xl font-playful">
            Customize your learning experience! 🎨
          </p>
        </div>

        {/* Audio Settings */}
        <div className="bg-white/30 backdrop-blur-lg border-4 border-white/50 rounded-3xl p-8 mb-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-xl text-center font-playful">
            🔊 Audio Settings
          </h2>
          
          {/* Sound Effects Toggle */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">
                Sound Effects
              </span>
              <button
                onClick={handleSoundToggle}
                className={`w-20 h-10 rounded-full transition-all duration-300 ${
                  soundEnabled
                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                    : 'bg-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 bg-white rounded-full shadow-lg transition-all duration-300 ${
                    soundEnabled ? 'translate-x-10' : 'translate-x-2'
                  }`}
                />
              </button>
            </div>

            {/* Sound Volume Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xl font-bold drop-shadow-lg">Volume</span>
                <span className="text-white text-xl font-bold drop-shadow-lg">{soundVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={soundVolume}
                onChange={(e) => handleSoundVolumeChange(parseInt(e.target.value, 10))}
                className="w-full h-4 bg-white/50 rounded-lg appearance-none cursor-pointer slider-thumb"
                disabled={!soundEnabled}
              />
            </div>
          </div>

          {/* Music Toggle */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">
                Background Music
              </span>
              <button
                onClick={handleMusicToggle}
                className={`w-20 h-10 rounded-full transition-all duration-300 ${
                  musicEnabled
                    ? 'bg-gradient-to-r from-purple-400 to-pink-600'
                    : 'bg-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 bg-white rounded-full shadow-lg transition-all duration-300 ${
                    musicEnabled ? 'translate-x-10' : 'translate-x-2'
                  }`}
                />
              </button>
            </div>

            {/* Music Volume Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xl font-bold drop-shadow-lg">Volume</span>
                <span className="text-white text-xl font-bold drop-shadow-lg">{musicVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={musicVolume}
                onChange={(e) => handleMusicVolumeChange(parseInt(e.target.value, 10))}
                className="w-full h-4 bg-white/50 rounded-lg appearance-none cursor-pointer slider-thumb"
                disabled={!musicEnabled}
              />
            </div>
          </div>
        </div>

        {/* Game Settings */}
        <div className="bg-white/30 backdrop-blur-lg border-4 border-white/50 rounded-3xl p-8 mb-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-xl text-center font-playful">
            🎮 Game Settings
          </h2>
          
          {/* Difficulty Selector */}
          <div>
            <span className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg block mb-4">
              Default Difficulty
            </span>
            <div className="grid grid-cols-3 gap-4">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => handleDifficultyChange(level)}
                  className={`py-4 px-6 rounded-2xl font-black text-xl md:text-2xl transition-all duration-300 ${
                    difficulty === level
                      ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 border-4 border-white scale-110 shadow-2xl'
                      : 'bg-white/30 backdrop-blur-lg border-4 border-white/50'
                  } text-white drop-shadow-lg hover:scale-105`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reset Progress */}
        <div className="bg-red-500/30 backdrop-blur-lg border-4 border-red-400/50 rounded-3xl p-8 mb-6">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-xl text-center font-playful">
            ⚠️ Danger Zone
          </h2>
          <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg text-center mb-6">
            Reset all your progress, achievements, and collected words
          </p>
          <div className="text-center">
            <button
              onClick={handleResetProgress}
              className="px-8 py-4 bg-red-600 border-4 border-white rounded-full text-white font-black text-xl md:text-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl font-playful"
            >
              🔄 Reset Progress
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="px-12 py-6 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 border-4 border-white rounded-full text-white font-black text-2xl md:text-3xl transition-all duration-300 hover:scale-110 hover:shadow-2xl font-playful"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Custom Animations and Styles */}
      <style>{`
        @keyframes float-settings {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-30px) translateX(20px) rotate(180deg); 
            opacity: 0.5;
          }
        }
        .animate-float-settings {
          animation: float-settings 8s ease-in-out infinite;
        }

        @keyframes title-glow-settings {
          0%, 100% {
            text-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
          }
          50% {
            text-shadow: 0 0 40px rgba(147, 51, 234, 1);
          }
        }
        .animate-title-glow-settings {
          animation: title-glow-settings 2s ease-in-out infinite;
        }

        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .slider-thumb:disabled::-webkit-slider-thumb {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .slider-thumb:disabled::-moz-range-thumb {
          background: #9ca3af;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}

export default SettingsScreen

