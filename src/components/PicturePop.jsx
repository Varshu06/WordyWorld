import React, { useEffect, useState } from 'react'

const PicturePop = ({ difficulty = 'easy', world = 'jungle', onBackToHub, onGoHome }) => {
  // Game configuration based on difficulty
  const gameConfig = {
    easy: { rounds: 5, bubbles: 6, timeLimit: 60, hearts: 3 },
    medium: { rounds: 7, bubbles: 8, timeLimit: 45, hearts: 3 },
    hard: { rounds: 10, bubbles: 10, timeLimit: 30, hearts: 2 },
  }

  const config = gameConfig[difficulty] || gameConfig.easy

  // Word lists organized by difficulty and world
  const worldWordsByDifficulty = {
    easy: {
      jungle: [
        // Animals
        { word: 'cat', emoji: '🐱', trickEmojis: ['🐶', '🐭', '🐹'] },
        { word: 'dog', emoji: '🐶', trickEmojis: ['🐱', '🐻', '🐼'] },
        { word: 'bat', emoji: '🦇', trickEmojis: ['🦉', '🐦', '🕊️'] },
        { word: 'fox', emoji: '🦊', trickEmojis: ['🐺', '🐻', '🐯'] },
        { word: 'bee', emoji: '🐝', trickEmojis: ['🦋', '🐛', '🪲'] },
        { word: 'ant', emoji: '🐜', trickEmojis: ['🐝', '🦟', '🕷️'] },
        { word: 'owl', emoji: '🦉', trickEmojis: ['🦇', '🐦', '🦅'] },
        { word: 'bear', emoji: '🐻', trickEmojis: ['🐼', '🐨', '🐯'] },
        { word: 'duck', emoji: '🦆', trickEmojis: ['🦢', '🐧', '🦩'] },
        { word: 'deer', emoji: '🦌', trickEmojis: ['🦙', '🐴', '🦓'] },
        // Birds
        { word: 'bird', emoji: '🐦', trickEmojis: ['🐤', '🐥', '🦅'] },
        { word: 'crow', emoji: '🐦‍⬛', trickEmojis: ['🐦', '🦅', '🦉'] },
        { word: 'eagle', emoji: '🦅', trickEmojis: ['🐦', '🦉', '🦆'] },
        { word: 'robin', emoji: '🐦', trickEmojis: ['🐤', '🦆', '🦢'] },
        // Trees and Plants
        { word: 'tree', emoji: '🌳', trickEmojis: ['🌲', '🌴', '🌵'] },
        { word: 'leaf', emoji: '🍃', trickEmojis: ['🍂', '🍁', '🌿'] },
        { word: 'oak', emoji: '🌳', trickEmojis: ['🌲', '🌴', '🎄'] },
        { word: 'pine', emoji: '🌲', trickEmojis: ['🌳', '🎄', '🌴'] },
        { word: 'palm', emoji: '🌴', trickEmojis: ['🌳', '🌲', '🎋'] },
        { word: 'fern', emoji: '🌿', trickEmojis: ['🍃', '🍂', '🍁'] },
        { word: 'moss', emoji: '🟢', trickEmojis: ['🌿', '🍃', '🟩'] },
        { word: 'vine', emoji: '🌿', trickEmojis: ['🍃', '🌱', '🌾'] },
        // Nature
        { word: 'rock', emoji: '🪨', trickEmojis: ['💎', '🔷', '🔹'] },
        { word: 'hill', emoji: '⛰️', trickEmojis: ['🏔️', '🌄', '🌅'] },
        { word: 'nest', emoji: '🪺', trickEmojis: ['🥚', '🪹', '🏠'] },
        { word: 'cave', emoji: '🕳️', trickEmojis: ['🏔️', '⛰️', '🪨'] },
        { word: 'lake', emoji: '🌊', trickEmojis: ['🏞️', '🌊', '💧'] },
        { word: 'river', emoji: '🌊', trickEmojis: ['🌊', '🏞️', '💧'] },
      ],
      space: [
        { word: 'moon', emoji: '🌙', trickEmojis: ['⭐', '✨', '🌟'] },
        { word: 'star', emoji: '⭐', trickEmojis: ['✨', '🌟', '💫'] },
        { word: 'sun', emoji: '☀️', trickEmojis: ['🌞', '🌟', '⭐'] },
        { word: 'earth', emoji: '🌍', trickEmojis: ['🌎', '🌏', '🪐'] },
        { word: 'mars', emoji: '🪐', trickEmojis: ['🌍', '🪐', '⭐'] },
        { word: 'jupiter', emoji: '🪐', trickEmojis: ['🌍', '🪐', '⭐'] },
        { word: 'saturn', emoji: '🪐', trickEmojis: ['🌍', '🪐', '⭐'] },
        { word: 'rocket', emoji: '🚀', trickEmojis: ['🛸', '✈️', '🛰️'] },
      ],
      food: [
        { word: 'apple', emoji: '🍎', trickEmojis: ['🍌', '🍊', '🍇'] },
        { word: 'banana', emoji: '🍌', trickEmojis: ['🍎', '🍊', '🍇'] },
        { word: 'orange', emoji: '🍊', trickEmojis: ['🍎', '🍌', '🍇'] },
        { word: 'bread', emoji: '🍞', trickEmojis: ['🥖', '🥐', '🥨'] },
        { word: 'milk', emoji: '🥛', trickEmojis: ['☕', '🍵', '🧃'] },
        { word: 'egg', emoji: '🥚', trickEmojis: ['🍳', '🧈', '🧀'] },
        { word: 'rice', emoji: '🍚', trickEmojis: ['🍜', '🍲', '🥣'] },
        { word: 'cheese', emoji: '🧀', trickEmojis: ['🧈', '🥚', '🍳'] },
        { word: 'potato', emoji: '🥔', trickEmojis: ['🍠', '🌽', '🥕'] },
      ],
    },
    medium: {
      jungle: [
        // Medium Animals
        { word: 'monkey', emoji: '🐵', trickEmojis: ['🍌', '🌳', '🐯'] },
        { word: 'tiger', emoji: '🐯', trickEmojis: ['🦁', '🐻', '🐒'] },
        { word: 'lion', emoji: '🦁', trickEmojis: ['🐯', '🐻', '🐼'] },
        { word: 'snake', emoji: '🐍', trickEmojis: ['🐛', '🦎', '🐢'] },
        { word: 'zebra', emoji: '🦓', trickEmojis: ['🐴', '🦄', '🐷'] },
        { word: 'frog', emoji: '🐸', trickEmojis: ['🐊', '🦎', '🐢'] },
        { word: 'leopard', emoji: '🐆', trickEmojis: ['🐯', '🦁', '🐻'] },
        { word: 'giraffe', emoji: '🦒', trickEmojis: ['🐘', '🦛', '🐄'] },
        { word: 'panda', emoji: '🐼', trickEmojis: ['🐻', '🐨', '🐰'] },
        { word: 'koala', emoji: '🐨', trickEmojis: ['🐼', '🐻', '🐰'] },
        { word: 'rabbit', emoji: '🐰', trickEmojis: ['🐭', '🐹', '🐻'] },
        { word: 'squirrel', emoji: '🐿️', trickEmojis: ['🐭', '🐹', '🐰'] },
        { word: 'raccoon', emoji: '🦝', trickEmojis: ['🐱', '🐻', '🦊'] },
        { word: 'wolf', emoji: '🐺', trickEmojis: ['🐕', '🦊', '🐻'] },
        { word: 'otter', emoji: '🦦', trickEmojis: ['🦆', '🐧', '🦢'] },
        // Medium Birds
        { word: 'parrot', emoji: '🦜', trickEmojis: ['🐦', '🦅', '🐤'] },
        { word: 'toucan', emoji: '🦜', trickEmojis: ['🐦', '🦅', '🦚'] },
        { word: 'hawk', emoji: '🦅', trickEmojis: ['🦉', '🐦', '🦆'] },
        { word: 'woodpecker', emoji: '🐦', trickEmojis: ['🦅', '🦆', '🦢'] },
        { word: 'penguin', emoji: '🐧', trickEmojis: ['🐦', '🦆', '🦢'] },
        { word: 'flamingo', emoji: '🦩', trickEmojis: ['🦢', '🦆', '🐧'] },
        { word: 'peacock', emoji: '🦚', trickEmojis: ['🦜', '🦅', '🦩'] },
        // Medium Nature
        { word: 'bamboo', emoji: '🎋', trickEmojis: ['🌳', '🌴', '🌲'] },
        { word: 'jungle', emoji: '🌳', trickEmojis: ['🌲', '🌴', '🌿'] },
        { word: 'forest', emoji: '🌲', trickEmojis: ['🌳', '🌴', '🎋'] },
        { word: 'waterfall', emoji: '🌊', trickEmojis: ['🏞️', '🌊', '💧'] },
      ],
      space: [
        { word: 'rocket', emoji: '🚀', trickEmojis: ['🛸', '✈️', '🛰️'] },
        { word: 'planet', emoji: '🪐', trickEmojis: ['🌙', '⭐', '☀️'] },
        { word: 'comet', emoji: '☄️', trickEmojis: ['💥', '⚡', '🌠'] },
        { word: 'meteor', emoji: '⭐', trickEmojis: ['💫', '🌟', '✨'] },
        { word: 'galaxy', emoji: '🌌', trickEmojis: ['🌈', '☁️', '🌊'] },
        { word: 'satellite', emoji: '🛰️', trickEmojis: ['🛸', '🚀', '✈️'] },
        { word: 'telescope', emoji: '🔭', trickEmojis: ['📷', '📹', '📺'] },
        { word: 'astronaut', emoji: '👨‍🚀', trickEmojis: ['👽', '🤖', '🦸'] },
        { word: 'alien', emoji: '👽', trickEmojis: ['🤖', '👨‍🚀', '🦸'] },
        { word: 'nebula', emoji: '🌌', trickEmojis: ['🌈', '☁️', '🌊'] },
        { word: 'crater', emoji: '🌑', trickEmojis: ['🌙', '🪨', '💫'] },
      ],
      food: [
        { word: 'pizza', emoji: '🍕', trickEmojis: ['🍔', '🥪', '🌮'] },
        { word: 'burger', emoji: '🍔', trickEmojis: ['🍕', '🥪', '🌮'] },
        { word: 'cookie', emoji: '🍪', trickEmojis: ['🍩', '🧁', '🍰'] },
        { word: 'cupcake', emoji: '🧁', trickEmojis: ['🍰', '🍪', '🍩'] },
        { word: 'donut', emoji: '🍩', trickEmojis: ['🍰', '🧁', '🍪'] },
        { word: 'sandwich', emoji: '🥪', trickEmojis: ['🍔', '🍕', '🌮'] },
        { word: 'icecream', emoji: '🍦', trickEmojis: ['🍧', '🍨', '🧁'] },
        { word: 'pancake', emoji: '🥞', trickEmojis: ['🧇', '🍳', '🥓'] },
        { word: 'taco', emoji: '🌮', trickEmojis: ['🍔', '🥪', '🍕'] },
        { word: 'pasta', emoji: '🍝', trickEmojis: ['🍜', '🍲', '🥘'] },
        { word: 'cake', emoji: '🎂', trickEmojis: ['🍰', '🧁', '🍪'] },
      ],
    },
    hard: {
      jungle: [
        // Large Animals
        { word: 'elephant', emoji: '🐘', trickEmojis: ['🐭', '🐄', '🐕'] },
        { word: 'rhinoceros', emoji: '🦏', trickEmojis: ['🐘', '🦛', '🐄'] },
        { word: 'hippopotamus', emoji: '🦛', trickEmojis: ['🐘', '🦏', '🐄'] },
        { word: 'chimpanzee', emoji: '🦧', trickEmojis: ['🐵', '🐒', '🦍'] },
        { word: 'gorilla', emoji: '🦍', trickEmojis: ['🐵', '🦧', '🐻'] },
        { word: 'orangutan', emoji: '🦧', trickEmojis: ['🐵', '🦍', '🐒'] },
        // Reptiles
        { word: 'crocodile', emoji: '🐊', trickEmojis: ['🐍', '🦎', '🐢'] },
        { word: 'alligator', emoji: '🐊', trickEmojis: ['🐍', '🦎', '🐊'] },
        { word: 'chameleon', emoji: '🦎', trickEmojis: ['🐍', '🐢', '🐊'] },
        { word: 'iguana', emoji: '🦎', trickEmojis: ['🐍', '🐊', '🐢'] },
        { word: 'python', emoji: '🐍', trickEmojis: ['🐛', '🦎', '🐢'] },
        { word: 'anaconda', emoji: '🐍', trickEmojis: ['🐍', '🐊', '🦎'] },
        { word: 'cobra', emoji: '🐍', trickEmojis: ['🐍', '🐛', '🦎'] },
        { word: 'komodo', emoji: '🦎', trickEmojis: ['🐍', '🐊', '🐢'] },
        // Insects
        { word: 'tarantula', emoji: '🕷️', trickEmojis: ['🐝', '🐛', '🦂'] },
        { word: 'scorpion', emoji: '🦂', trickEmojis: ['🕷️', '🐝', '🪲'] },
        { word: 'butterfly', emoji: '🦋', trickEmojis: ['🐝', '🐛', '🦟'] },
        { word: 'dragonfly', emoji: '🦋', trickEmojis: ['🦋', '🐝', '🦟'] },
        // Birds
        { word: 'hummingbird', emoji: '🐦', trickEmojis: ['🦅', '🦉', '🦜'] },
        { word: 'albatross', emoji: '🪽', trickEmojis: ['🦅', '🦆', '🦢'] },
        { word: 'pelican', emoji: '🦢', trickEmojis: ['🦆', '🐧', '🦩'] },
        { word: 'vulture', emoji: '🦅', trickEmojis: ['🦉', '🐦', '🦆'] },
      ],
      space: [
        { word: 'constellation', emoji: '⭐', trickEmojis: ['💫', '🌟', '✨'] },
        { word: 'astronomer', emoji: '👨‍🔬', trickEmojis: ['👨‍🚀', '👽', '🤖'] },
        { word: 'spacecraft', emoji: '🛸', trickEmojis: ['🚀', '🛰️', '✈️'] },
        { word: 'asteroid', emoji: '☄️', trickEmojis: ['💥', '⚡', '🌠'] },
        { word: 'observatory', emoji: '🏛️', trickEmojis: ['🏰', '🏯', '🏟️'] },
        { word: 'telescope', emoji: '🔭', trickEmojis: ['📷', '📹', '📺'] },
        { word: 'milky way', emoji: '🌌', trickEmojis: ['🌈', '☁️', '🌊'] },
        { word: 'black hole', emoji: '⚫', trickEmojis: ['🌑', '🌌', '💫'] },
        { word: 'supernova', emoji: '💥', trickEmojis: ['⭐', '✨', '💫'] },
      ],
      food: [
        { word: 'gastronomy', emoji: '🍽️', trickEmojis: ['👨‍🍳', '🥄', '🍴'] },
        { word: 'ingredient', emoji: '🧄', trickEmojis: ['🧅', '🧂', '🌶️'] },
        { word: 'restaurant', emoji: '🍽️', trickEmojis: ['🏪', '🏬', '🏨'] },
        { word: 'gourmet', emoji: '👨‍🍳', trickEmojis: ['🍽️', '🥄', '🍴'] },
        { word: 'cuisine', emoji: '🍜', trickEmojis: ['🍲', '🍛', '🥘'] },
        { word: 'appetizer', emoji: '🥗', trickEmojis: ['🥙', '🌮', '🌯'] },
        { word: 'recipe', emoji: '📝', trickEmojis: ['📄', '📋', '📖'] },
        { word: 'chef', emoji: '👨‍🍳', trickEmojis: ['🍽️', '🥄', '👨‍🍳'] },
        { word: 'dessert', emoji: '🍰', trickEmojis: ['🍪', '🧁', '🍩'] },
      ],
    },
  }

  // Get words based on difficulty and world
  const difficultyWords = worldWordsByDifficulty[difficulty] || worldWordsByDifficulty.easy
  const worldWords = difficultyWords[world] || difficultyWords.jungle

  // World themes
  const worldThemes = {
    jungle: {
      title: '🌴 Picture Pop 🌳',
      subtitle: 'Pop the bubbles that match the jungle word!',
      backgroundGradient: 'from-green-800 via-emerald-600 to-green-400',
      floatingItems: ['🍃', '🌿', '🌾'],
      hintPrefix: '🦜 Hint:',
    },
    space: {
      title: '⭐ Star Pop 🚀',
      subtitle: 'Pop the bubbles that match the space word!',
      backgroundGradient: 'from-blue-950 via-indigo-900 to-purple-950',
      floatingItems: ['⭐', '🌟', '✨'],
      hintPrefix: '👨‍🚀 Hint:',
    },
    food: {
      title: '🍕 Food Pop 🍰',
      subtitle: 'Pop the bubbles that match the food word!',
      backgroundGradient: 'from-orange-300 via-red-300 to-pink-300',
      floatingItems: ['🍕', '🍰', '🧁'],
      hintPrefix: '👨‍🍳 Hint:',
    },
  }

  const theme = worldThemes[world] || worldThemes.jungle

  // Initialize game
  const initializeGame = () => {
    const wordList = worldWords
    const shuffled = [...wordList].sort(() => Math.random() - 0.5)
    const selectedWords = shuffled.slice(0, config.rounds)

    setWords(selectedWords)
    setCurrentRound(0)
    setScore(0)
    setHearts(config.hearts)
    setGameComplete(false)
    setIsPaused(false)
    setTimeRemaining(config.timeLimit)
    setBubbles([])
    setRoundComplete(false)
    setCelebration(false)
    setWrongPop(false)
    setShowHint(false)
  }

  // Game state
  const [words, setWords] = useState([])
  const [currentRound, setCurrentRound] = useState(0)
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState(config.hearts)
  const [gameComplete, setGameComplete] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(config.timeLimit)
  const [bubbles, setBubbles] = useState([])
  const [roundComplete, setRoundComplete] = useState(false)
  const [celebration, setCelebration] = useState(false)
  const [wrongPop, setWrongPop] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [starsEarned, setStarsEarned] = useState(0)
  const [showVictory, setShowVictory] = useState(false)
  const [hoveredBubbleId, setHoveredBubbleId] = useState(null)

  // Initialize on mount or when world/difficulty changes
  useEffect(() => {
    initializeGame()
  }, [difficulty, world])

  // Generate bubbles for current round
  useEffect(() => {
    if (words.length === 0 || gameComplete || isPaused) return

    const currentWord = words[currentRound]
    if (!currentWord) return

    // Helper function to check if position is too close to existing positions
    const isTooClose = (newPos, existingPositions, minDistance) => {
      return existingPositions.some(pos => {
        if (!pos) return false
        const posToCheck = pos.position || pos // Handle both bubbles and positions
        const dx = newPos.x - posToCheck.x
        const dy = newPos.y - posToCheck.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        return distance < minDistance
      })
    }

    // Get all unique emojis from all words to use as trick options
    const allAvailableEmojis = new Set()
    words.forEach((word, idx) => {
      if (idx !== currentRound && word.emoji && word.emoji !== currentWord.emoji) {
        allAvailableEmojis.add(word.emoji)
      }
      if (word.trickEmojis) {
        word.trickEmojis.forEach(emoji => {
          if (emoji !== currentWord.emoji) {
            allAvailableEmojis.add(emoji)
          }
        })
      }
    })
    
    // Add more world-themed emojis as backup pool
    const trickEmojisNeeded = config.bubbles - 1
    const additionalEmojis = {
      jungle: ['🌳', '🌴', '🍌', '🦁', '🐯', '🐍', '🦓', '🦒', '🐆', '🐘', '🦏', '🦛', '🦧', '🦍', '🐊', '🦎', '🐦', '🦅', '🦜', '🦩', '🦚', '🦉', '🐧', '🐼', '🐨', '🐰', '🐿️', '🦝', '🐺', '🦦', '🦇', '🦊', '🐝', '🐜', '🦉', '🐻', '🦆', '🦌'],
      space: ['🌙', '⭐', '☀️', '🌍', '🪐', '🚀', '🛸', '🛰️', '🔭', '👽', '🤖', '🌌', '☄️', '💫', '🌟', '✨', '🌠', '⚡', '💥', '🌑', '🌕', '🌗', '🌓', '🌔', '🌖'],
      food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥓', '🥩', '🍗', '🍖', '🧆', '🥙', '🌮', '🌯', '🥗', '🥘', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥'],
    }
    
    // Add world emojis to the pool
    const worldEmojis = additionalEmojis[world] || additionalEmojis.jungle
    worldEmojis.forEach(emoji => {
      if (emoji !== currentWord.emoji) {
        allAvailableEmojis.add(emoji)
      }
    })
    
    // Convert to array and shuffle
    let uniqueTrickEmojis = Array.from(allAvailableEmojis).sort(() => Math.random() - 0.5)
    
    // Ensure we have enough unique emojis for all bubbles
    while (uniqueTrickEmojis.length < trickEmojisNeeded) {
      const randomEmoji = worldEmojis[Math.floor(Math.random() * worldEmojis.length)]
      if (!uniqueTrickEmojis.includes(randomEmoji) && randomEmoji !== currentWord.emoji) {
        uniqueTrickEmojis.push(randomEmoji)
      }
    }
    
    // Select unique trick emojis (no duplicates) - shuffle and take unique ones
    const selectedTrickEmojis = []
    const usedEmojis = new Set([currentWord.emoji]) // Start with the correct emoji
    
    // Shuffle the available emojis again
    const shuffledAvailable = [...uniqueTrickEmojis].sort(() => Math.random() - 0.5)
    
    for (const emoji of shuffledAvailable) {
      if (selectedTrickEmojis.length >= trickEmojisNeeded) break
      if (!usedEmojis.has(emoji) && emoji !== currentWord.emoji) {
        selectedTrickEmojis.push(emoji)
        usedEmojis.add(emoji)
      }
    }
    
    // If we still need more, add from world emojis
    while (selectedTrickEmojis.length < trickEmojisNeeded) {
      const remainingEmojis = worldEmojis.filter(emoji => !usedEmojis.has(emoji) && emoji !== currentWord.emoji)
      if (remainingEmojis.length > 0) {
        const randomEmoji = remainingEmojis[Math.floor(Math.random() * remainingEmojis.length)]
        selectedTrickEmojis.push(randomEmoji)
        usedEmojis.add(randomEmoji)
      } else {
        break // No more unique emojis available
      }
    }
    
    // Create final array with correct emoji + unique trick emojis - FORCE UNIQUENESS
    const uniqueFinalEmojis = [currentWord.emoji]
    const usedEmojisSet = new Set([currentWord.emoji])
    
    // Add trick emojis one by one, ensuring no duplicates
    for (const emoji of selectedTrickEmojis) {
      if (!usedEmojisSet.has(emoji)) {
        uniqueFinalEmojis.push(emoji)
        usedEmojisSet.add(emoji)
        if (uniqueFinalEmojis.length >= config.bubbles) break
      }
    }
    
    // Fill remaining slots with unique emojis from world pool
    while (uniqueFinalEmojis.length < config.bubbles) {
      const remainingEmojis = worldEmojis.filter(emoji => !usedEmojisSet.has(emoji))
      if (remainingEmojis.length > 0) {
        const randomEmoji = remainingEmojis[Math.floor(Math.random() * remainingEmojis.length)]
        uniqueFinalEmojis.push(randomEmoji)
        usedEmojisSet.add(randomEmoji)
      } else {
        // Last resort: use ANY emoji that's not in the list
        break
      }
    }
    
    // Final verification - create Set to remove any duplicates (shouldn't happen but safety check)
    const verifiedUnique = Array.from(new Set(uniqueFinalEmojis))
    
    // If we somehow lost emojis, fill again
    while (verifiedUnique.length < config.bubbles) {
      const allEmojis = Array.from(new Set([...uniqueTrickEmojis, ...worldEmojis]))
      const missing = allEmojis.find(emoji => !verifiedUnique.includes(emoji) && emoji !== currentWord.emoji)
      if (missing) {
        verifiedUnique.push(missing)
      } else {
        break
      }
    }
    
    // Shuffle emojis first
    const shuffledEmojis = verifiedUnique.slice(0, config.bubbles)
      .sort(() => Math.random() - 0.5)
    
    // First, generate all positions ensuring they're not too close to each other
    const positions = []
    const minDistance = 15 // Minimum distance between bubble centers (in %)
    
    for (let i = 0; i < shuffledEmojis.length; i++) {
      let position
      let attempts = 0
      
      do {
        position = {
          x: Math.random() * 80 + 10, // 10% to 90% - within bounds
          y: Math.random() * 70 + 15, // 15% to 85% - within bounds
        }
        attempts++
      } while (isTooClose(position, positions, minDistance) && attempts < 50)
      
      positions.push(position)
    }
    
    // Now combine emojis with positions to create bubble objects
    const bubbleEmojis = shuffledEmojis.map((emoji, index) => ({
      id: `bubble-${currentRound}-${index}`,
      emoji,
      isCorrect: emoji === currentWord.emoji,
      position: positions[index],
      velocity: {
        x: (Math.random() - 0.5) * 1.5, // Slower initial velocity
        y: (Math.random() - 0.5) * 1.5,
      },
      size: 80 + Math.random() * 40, // 80-120px
    }))

    setBubbles(bubbleEmojis)
    setTimeRemaining(config.timeLimit)
    setRoundComplete(false)
    setWrongPop(false)
    setShowHint(false)
  }, [currentRound, words, difficulty])

  // Timer countdown - disabled for easy difficulty
  useEffect(() => {
    if (difficulty === 'easy') return // No timer for easy!
    if (isPaused || gameComplete || roundComplete || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - lose a heart
          setHearts((h) => Math.max(0, h - 1))
          if (hearts <= 1) {
            setGameComplete(true)
            calculateStars()
            setShowVictory(true)
          } else {
            nextRound()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaused, gameComplete, roundComplete, timeRemaining, hearts, difficulty])

  // Move bubbles
  useEffect(() => {
    if (isPaused || gameComplete || roundComplete || bubbles.length === 0) return

    const interval = setInterval(() => {
      setBubbles((prev) =>
        prev.map((bubble, index) => {
          let newX = bubble.position.x + bubble.velocity.x
          let newY = bubble.position.y + bubble.velocity.y
          let newVelX = bubble.velocity.x
          let newVelY = bubble.velocity.y

          // Smooth boundary checking with gentle bounce and damping zone
          const minX = 5
          const maxX = 95
          const minY = 5
          const maxY = 95
          const dampingZone = 10 // Distance from edge where slowdown starts

          // Smooth damping near X boundaries - gradual slowdown as approaching edge
          if (newX < minX + dampingZone) {
            const factor = Math.max(0, Math.min(1, (newX - minX) / dampingZone)) // 0 at edge, 1 at dampingZone
            newVelX *= 0.7 + (factor * 0.3) // Slow down more when closer to edge (70% to 100% speed)
            if (newX <= minX) {
              newX = minX
              newVelX = Math.abs(newVelX) * 0.8 // Gentle bounce
            }
          } else if (newX > maxX - dampingZone) {
            const factor = Math.max(0, Math.min(1, (maxX - newX) / dampingZone)) // 0 at edge, 1 at dampingZone
            newVelX *= 0.7 + (factor * 0.3) // Slow down more when closer to edge
            if (newX >= maxX) {
              newX = maxX
              newVelX = -Math.abs(newVelX) * 0.8 // Gentle bounce
            }
          }

          // Smooth damping near Y boundaries - gradual slowdown as approaching edge
          if (newY < minY + dampingZone) {
            const factor = Math.max(0, Math.min(1, (newY - minY) / dampingZone)) // 0 at edge, 1 at dampingZone
            newVelY *= 0.7 + (factor * 0.3) // Slow down more when closer to edge (70% to 100% speed)
            if (newY <= minY) {
              newY = minY
              newVelY = Math.abs(newVelY) * 0.8 // Gentle bounce
            }
          } else if (newY > maxY - dampingZone) {
            const factor = Math.max(0, Math.min(1, (maxY - newY) / dampingZone)) // 0 at edge, 1 at dampingZone
            newVelY *= 0.7 + (factor * 0.3) // Slow down more when closer to edge
            if (newY >= maxY) {
              newY = maxY
              newVelY = -Math.abs(newVelY) * 0.8 // Gentle bounce
            }
          }

          // Collision detection - push bubbles apart when they get too close
          const minDistance = 12 // Minimum distance between bubble centers
          prev.forEach((otherBubble, otherIndex) => {
            if (index === otherIndex) return
            
            const dx = newX - otherBubble.position.x
            const dy = newY - otherBubble.position.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance > 0 && distance < minDistance) {
              // Push bubbles apart
              const pushStrength = (minDistance - distance) / minDistance * 0.5
              const pushX = (dx / distance) * pushStrength
              const pushY = (dy / distance) * pushStrength
              
              newX += pushX
              newY += pushY
              
              // Adjust velocity to push away
              newVelX += pushX * 0.1
              newVelY += pushY * 0.1
            }
          })

          return {
            ...bubble,
            position: { x: newX, y: newY },
            velocity: { x: newVelX, y: newVelY },
          }
        })
      )
    }, 30) // Update more frequently for smoother movement

    return () => clearInterval(interval)
  }, [isPaused, gameComplete, roundComplete, bubbles.length])

  // Handle bubble pop
  const handleBubblePop = (bubble) => {
    if (isPaused || gameComplete || roundComplete) return

    if (bubble.isCorrect) {
      // Correct pop! 🎉
      // For easy difficulty, give fixed score. For others, bonus based on time remaining
      const points = difficulty === 'easy' 
        ? 10 
        : 10 * (Math.floor(timeRemaining / 10) + 1)
      setScore((prev) => prev + points)
      setRoundComplete(true)
      setCelebration(true)

      setTimeout(() => {
        setCelebration(false)
        nextRound()
      }, 1000)
    } else {
      // Wrong pop! 💦
      setWrongPop(true)
      setHearts((prev) => {
        const newHearts = Math.max(0, prev - 1)
        if (newHearts <= 0) {
          setGameComplete(true)
          calculateStars()
          setShowVictory(true)
          return 0
        }
        return newHearts
      })

      setTimeout(() => {
        setWrongPop(false)
      }, 500)
    }
  }

  const nextRound = () => {
    if (currentRound + 1 < words.length) {
      setCurrentRound((prev) => prev + 1)
    } else {
      // Game complete!
      calculateStars()
      setGameComplete(true)
      setShowVictory(true)
    }
  }

  const calculateStars = () => {
    const accuracy = score / (config.rounds * 50)
    let stars = 1

    if (hearts === config.hearts && accuracy >= 0.8) stars = 5
    else if (hearts >= config.hearts - 1 && accuracy >= 0.6) stars = 4
    else if (hearts >= config.hearts - 2 || accuracy >= 0.4) stars = 3
    else if (hearts >= 1 || accuracy >= 0.2) stars = 2

    setStarsEarned(stars)
  }

  const handleHint = () => {
    if (words.length === 0 || roundComplete) return
    const currentWord = words[currentRound]
    const hints = {
      jungle: {
        monkey: "It starts with 'M' and swings from trees!",
        lion: "It's the king of the jungle with a mane!",
        elephant: "It's big, gray, and has a long trunk!",
        tiger: "It has stripes and roars loudly!",
        parrot: "It's colorful and can talk!",
      },
      space: {
        rocket: "It flies to the stars and planets!",
        planet: "It orbits around a star!",
        astronaut: "A person who explores space!",
        star: "It twinkles in the night sky!",
        comet: "It has a bright tail in space!",
      },
      food: {
        pizza: "It's round, cheesy, and delicious!",
        apple: "It's a red or green fruit!",
        burger: "It has a bun and a patty!",
        cookie: "It's sweet with chocolate chips!",
        cupcake: "It's a small cake with frosting!",
      },
    }

    const hint =
      hints[world]?.[currentWord.word] || `It's ${currentWord.word}!`
    setShowHint(true)
  }

  const handlePlayAgain = () => {
    initializeGame()
    setShowVictory(false)
  }

  const currentWord = words[currentRound]

  // Progress percentage
  const progress = ((currentRound + (roundComplete ? 1 : 0)) / config.rounds) * 100

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.backgroundGradient}`}></div>

        {/* Floating items based on world */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`float-${i}`}
            className="absolute text-2xl opacity-20 animate-float-bubbles pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            {theme.floatingItems[Math.floor(Math.random() * theme.floatingItems.length)]}
          </div>
        ))}
      </div>

      {/* Victory Confetti */}
      {celebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute text-3xl animate-bubble-pop"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random() * 1}s`,
              }}
            >
              {['🎉', '✨', '⭐', '🎈', '🎊'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Victory Screen */}
      {showVictory && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className={`relative bg-gradient-to-br ${
              world === 'jungle'
                ? 'from-yellow-400 via-green-400 to-emerald-500'
                : world === 'space'
                ? 'from-cyan-400 via-blue-500 to-purple-500'
                : 'from-orange-400 via-red-500 to-pink-500'
            } rounded-3xl p-8 md:p-12 max-w-2xl w-full mx-4 shadow-2xl border-4 border-white animate-victory-pop`}
          >
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl font-playful">
                🎉 AWESOME JOB! 🎉
              </h2>
              <p className="text-2xl md:text-3xl text-white font-bold mb-6 drop-shadow-lg font-playful">
                You matched all the right pictures!
              </p>
              <p className="text-xl md:text-2xl text-white font-bold mb-4 drop-shadow-lg font-playful">
                Score: {score} Points 🌟
              </p>
              <div className="text-4xl md:text-6xl mb-4">
                {'⭐'.repeat(starsEarned)}
              </div>
              <p className="text-xl md:text-2xl text-white font-bold mb-8 drop-shadow-lg font-playful">
                {starsEarned} Stars Earned! ✨
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={handlePlayAgain}
                  className="px-8 py-4 bg-white text-green-600 font-bold text-xl rounded-full hover:scale-110 transition-all duration-300 shadow-xl font-playful"
                >
                  🔁 Play Again
                </button>
                <button
                  onClick={onBackToHub}
                  className="px-8 py-4 bg-white text-green-600 font-bold text-xl rounded-full hover:scale-110 transition-all duration-300 shadow-xl font-playful"
                >
                  🏡 Back to Hub
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pause Overlay */}
      {isPaused && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 rounded-3xl p-8 text-center">
            <h3 className="text-4xl font-black text-green-600 mb-4 font-playful">
              GAME PAUSED
            </h3>
            <button
              onClick={() => setIsPaused(false)}
              className="px-8 py-4 bg-green-500 text-white font-bold text-xl rounded-full hover:scale-110 transition-all duration-300 font-playful"
            >
              Continue Playing
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-black mb-2 drop-shadow-2xl font-playful">
            <span
              className={`bg-gradient-to-r ${
                world === 'jungle'
                  ? 'from-green-400 via-emerald-300 to-yellow-400'
                  : world === 'space'
                  ? 'from-cyan-400 via-blue-500 to-purple-500'
                  : 'from-orange-400 via-red-500 to-pink-500'
              } bg-clip-text text-transparent`}
            >
              {theme.title}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl">💫</span>
              <span className="text-white text-lg md:text-xl font-bold drop-shadow-lg">
                Score: {score}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(config.hearts)].map((_, i) => (
                <span
                  key={`heart-${i}`}
                  className={`text-2xl md:text-3xl ${
                    i < hearts ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  ❤️
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Current Word Display */}
        {currentWord && (
          <div className="text-center mb-6">
            <div className="bg-white/25 backdrop-blur-lg border-4 border-white/40 rounded-3xl p-6 md:p-8 mb-4">
              <p className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg font-playful">
                Word: {currentWord.emoji} {currentWord.word.toUpperCase()}
              </p>
              <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg font-playful mb-2">
                {difficulty === 'easy' 
                  ? 'Pop the correct picture bubble! 🎈' 
                  : 'Pop the correct picture bubble before time runs out! ⏳'}
              </p>
              <div className="flex items-center justify-center gap-4">
                {difficulty !== 'easy' && (
                  <span className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                    Time: {timeRemaining}s
                  </span>
                )}
                <span className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                  Round: {currentRound + 1}/{config.rounds}
                </span>
              </div>
              {showHint && (
                <div className="mt-4 p-4 bg-yellow-400/30 rounded-xl border-2 border-yellow-400">
                  <p className="text-white text-base md:text-lg font-bold drop-shadow-lg font-playful">
                    {theme.hintPrefix} "{currentWord.word}" is a {world} word!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Wrong Pop Message */}
        {wrongPop && (
          <div className="text-center mb-4 animate-shake">
            <p className="text-red-500 text-2xl md:text-3xl font-bold drop-shadow-lg font-playful">
              ❌ Wrong! Try again! 💦
            </p>
          </div>
        )}

        {/* Bubble Area */}
        <div className="relative w-full h-[400px] md:h-[500px] mb-6 bg-white/10 backdrop-blur-lg rounded-3xl border-4 border-white/30 overflow-hidden">
          {bubbles.map((bubble) => (
            <button
              key={bubble.id}
              onClick={() => handleBubblePop(bubble)}
              onMouseEnter={() => setHoveredBubbleId(bubble.id)}
              onMouseLeave={() => setHoveredBubbleId(null)}
              disabled={roundComplete || gameComplete}
              className="absolute hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              style={{
                left: `${bubble.position.x}%`,
                top: `${bubble.position.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                transform: 'translate(-50%, -50%)',
                willChange: 'transform',
                zIndex: hoveredBubbleId === bubble.id ? 50 : bubbles.length - bubbles.findIndex(b => b.id === bubble.id), // Bring hovered bubble to front
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Bubble glow effect - stronger when hovered */}
                <div
                  className={`absolute inset-0 rounded-full ${
                    bubble.isCorrect ? 'bg-green-400/30' : 'bg-red-400/20'
                  } blur-xl animate-pulse-slow ${hoveredBubbleId === bubble.id ? 'opacity-100 scale-125' : 'opacity-60'}`}
                ></div>
                {/* Highlight ring when hovered */}
                {hoveredBubbleId === bubble.id && (
                  <div className="absolute inset-0 rounded-full border-4 border-yellow-400 shadow-lg animate-pulse pointer-events-none"></div>
                )}
                {/* Bubble */}
                <div className={`relative w-full h-full rounded-full bg-gradient-to-br from-white/90 to-white/70 border-4 border-white shadow-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
                  hoveredBubbleId === bubble.id ? 'shadow-3xl ring-4 ring-yellow-300 ring-opacity-50' : 'hover:shadow-3xl'
                }`}>
                  <span className="text-4xl md:text-5xl">{bubble.emoji}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-6 mx-auto max-w-2xl">
          <div className="relative h-6 bg-white/20 rounded-full overflow-hidden border-2 border-white/40">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-emerald-400 to-yellow-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm drop-shadow-lg">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <button
            onClick={handleHint}
            disabled={roundComplete || gameComplete}
            className="px-6 py-3 bg-yellow-500 text-white font-bold text-lg rounded-full hover:scale-110 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-playful"
          >
            💡 Hint
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-full hover:scale-110 transition-all duration-300 shadow-xl font-playful"
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onBackToHub}
            className="px-6 py-3 bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-110 hover:bg-white/35 hover:shadow-xl font-playful"
          >
            ← Back to Hub
          </button>
          <button
            onClick={onGoHome}
            className="px-6 py-3 bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-110 hover:bg-white/35 hover:shadow-xl font-playful"
          >
            🏠 Home
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-bubbles {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(10deg); }
          66% { transform: translateY(-50px) translateX(-10px) rotate(-5deg); }
        }
        .animate-float-bubbles {
          animation: float-bubbles 8s ease-in-out infinite;
        }

        @keyframes bubble-pop {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(2) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-bubble-pop {
          animation: bubble-pop 2s ease-out forwards;
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

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-10px); }
          20% { transform: translateX(10px); }
          30% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          50% { transform: translateX(-5px); }
          60% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default PicturePop

