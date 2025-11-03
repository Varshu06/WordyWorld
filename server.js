// Express Backend Server for WordQuest
// This server provides game data and can store/retrieve user progress

import cors from 'cors'
import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// In-memory storage (in a real app, use a database!)
let userProgress = {}

// Game data - Jungle World animals
const jungleAnimals = [
  { word: 'monkey', emoji: '🐵', definition: 'A playful jungle animal that swings on trees', category: 'jungle', hint: 'I swing from tree to tree and love bananas!' },
  { word: 'lion', emoji: '🦁', definition: 'The king of the jungle with a golden mane', category: 'jungle', hint: 'I am the king of the jungle with a golden mane!' },
  { word: 'tiger', emoji: '🐯', definition: 'A striped big cat that roams the jungle', category: 'jungle', hint: 'I have stripes and roar loudly!' },
  { word: 'parrot', emoji: '🦜', definition: 'A colorful bird that can talk and fly', category: 'jungle', hint: 'I am colorful and can talk!' },
  { word: 'snake', emoji: '🐍', definition: 'A slithering reptile in the jungle', category: 'jungle', hint: 'I slither through the jungle grass!' },
  { word: 'elephant', emoji: '🐘', definition: 'A huge animal with a long trunk', category: 'jungle', hint: 'I have a long trunk and big ears!' },
  { word: 'frog', emoji: '🐸', definition: 'A small jumping animal that lives near water', category: 'jungle', hint: 'I jump and live near water!' },
  { word: 'zebra', emoji: '🦓', definition: 'A striped horse-like animal', category: 'jungle', hint: 'I have black and white stripes!' },
]

// Helper function to scramble a word
const scrambleWord = (word) => {
  return word.split('').sort(() => Math.random() - 0.5).join('').toUpperCase()
}

// API Routes

// Get game words for a specific world and difficulty
app.get('/api/game-words', (req, res) => {
  const { world = 'jungle', difficulty = 'easy' } = req.query
  
  // Filter animals by world (for now, all are jungle)
  const worldAnimals = jungleAnimals.filter(animal => animal.category === world)
  
  // Get count based on difficulty
  const countMap = { easy: 4, medium: 6, hard: 8 }
  const count = countMap[difficulty] || 4
  
  // Shuffle and return requested count
  const shuffled = [...worldAnimals].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count)
  
  res.json({
    success: true,
    words: selected,
    difficulty,
    world,
    totalPairs: count,
  })
})

// Save user progress
app.post('/api/progress', (req, res) => {
  const { userId = 'default', progress } = req.body
  
  if (!progress) {
    return res.status(400).json({ success: false, error: 'Progress data required' })
  }
  
  if (!userProgress[userId]) {
    userProgress[userId] = {}
  }
  
  // Merge progress
  userProgress[userId] = {
    ...userProgress[userId],
    ...progress,
    lastUpdated: new Date().toISOString(),
  }
  
  res.json({
    success: true,
    message: 'Progress saved',
    progress: userProgress[userId],
  })
})

// Get user progress
app.get('/api/progress/:userId', (req, res) => {
  const { userId = 'default' } = req.params
  
  const progress = userProgress[userId] || {
    starsEarned: {},
    wordsLearned: [],
    achievements: [],
    worldsCompleted: [],
    gamesPlayed: 0,
  }
  
  res.json({
    success: true,
    progress,
  })
})

// Get all game words (for collection view)
app.get('/api/all-words', (req, res) => {
  const { world } = req.query
  
  const words = world
    ? jungleAnimals.filter(animal => animal.category === world)
    : jungleAnimals
  
  res.json({
    success: true,
    words,
    total: words.length,
  })
})

// Get Banana Scramble words with hints
app.get('/api/banana-scramble', (req, res) => {
  const { world = 'jungle', difficulty = 'easy' } = req.query
  
  // Filter animals by world
  const worldAnimals = jungleAnimals.filter(animal => animal.category === world)
  
  // Get count based on difficulty
  const countMap = { easy: 4, medium: 6, hard: 8 }
  const count = countMap[difficulty] || 4
  
  // Shuffle and return requested count with scrambled versions
  const shuffled = [...worldAnimals].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count).map(animal => ({
    word: animal.word,
    emoji: animal.emoji,
    hint: animal.hint,
    scrambled: scrambleWord(animal.word),
  }))
  
  res.json({
    success: true,
    words: selected,
    difficulty,
    world,
    totalWords: count,
  })
})

// Picture Pop game words with trick emojis
const picturePopWords = {
  jungle: [
    { word: 'monkey', emoji: '🐵', trickEmojis: ['🍌', '🌳', '🐯'] },
    { word: 'lion', emoji: '🦁', trickEmojis: ['🐯', '🐻', '🐒'] },
    { word: 'elephant', emoji: '🐘', trickEmojis: ['🐭', '🐄', '🐕'] },
    { word: 'tiger', emoji: '🐯', trickEmojis: ['🦁', '🐻', '🐒'] },
    { word: 'parrot', emoji: '🦜', trickEmojis: ['🐦', '🦅', '🐤'] },
    { word: 'snake', emoji: '🐍', trickEmojis: ['🐛', '🦎', '🐢'] },
    { word: 'zebra', emoji: '🦓', trickEmojis: ['🐴', '🦄', '🐷'] },
    { word: 'frog', emoji: '🐸', trickEmojis: ['🐊', '🦎', '🐢'] },
    { word: 'tree', emoji: '🌳', trickEmojis: ['🌹', '🍀', '🌻'] },
    { word: 'banana', emoji: '🍌', trickEmojis: ['🍎', '🥭', '🍇'] },
  ],
  space: [
    { word: 'rocket', emoji: '🚀', trickEmojis: ['🛸', '✈️', '🛰️'] },
    { word: 'planet', emoji: '🪐', trickEmojis: ['🌙', '⭐', '☀️'] },
    { word: 'astronaut', emoji: '👨‍🚀', trickEmojis: ['👽', '🤖', '🦸'] },
    { word: 'star', emoji: '⭐', trickEmojis: ['💫', '🌟', '✨'] },
    { word: 'comet', emoji: '☄️', trickEmojis: ['💥', '⚡', '🌠'] },
    { word: 'alien', emoji: '👽', trickEmojis: ['🤖', '👨‍🚀', '🛸'] },
    { word: 'satellite', emoji: '🛰️', trickEmojis: ['🛸', '🚀', '✈️'] },
    { word: 'telescope', emoji: '🔭', trickEmojis: ['📷', '📹', '📺'] },
    { word: 'moon', emoji: '🌙', trickEmojis: ['🌞', '⭐', '🪐'] },
    { word: 'galaxy', emoji: '🌌', trickEmojis: ['🌈', '☁️', '🌊'] },
  ],
  food: [
    { word: 'pizza', emoji: '🍕', trickEmojis: ['🍔', '🥪', '🌮'] },
    { word: 'apple', emoji: '🍎', trickEmojis: ['🍌', '🥭', '🍇'] },
    { word: 'burger', emoji: '🍔', trickEmojis: ['🍕', '🥪', '🌮'] },
    { word: 'cookie', emoji: '🍪', trickEmojis: ['🍩', '🧁', '🍰'] },
    { word: 'cupcake', emoji: '🧁', trickEmojis: ['🍰', '🍪', '🍩'] },
    { word: 'donut', emoji: '🍩', trickEmojis: ['🍰', '🧁', '🍪'] },
    { word: 'icecream', emoji: '🍦', trickEmojis: ['🍧', '🍨', '🧁'] },
    { word: 'banana', emoji: '🍌', trickEmojis: ['🍎', '🥭', '🍇'] },
    { word: 'orange', emoji: '🍊', trickEmojis: ['🍋', '🍎', '🍑'] },
    { word: 'cake', emoji: '🎂', trickEmojis: ['🍰', '🧁', '🍪'] },
  ],
}

// Get Picture Pop words
app.get('/api/picture-pop', (req, res) => {
  const { world = 'jungle', difficulty = 'easy' } = req.query
  
  const worldWords = picturePopWords[world] || picturePopWords.jungle
  
  // Get count based on difficulty
  const countMap = { easy: 5, medium: 7, hard: 10 }
  const count = countMap[difficulty] || 5
  
  // Shuffle and return requested count
  const shuffled = [...worldWords].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count)
  
  res.json({
    success: true,
    words: selected,
    difficulty,
    world,
    totalRounds: count,
  })
})

// Sound Safari game words with sound descriptions
const soundSafariWords = {
  jungle: [
    { word: 'lion', emoji: '🦁', soundText: 'ROARRR!', hint: "It's the king of the jungle!", description: 'A mighty roar that shakes the trees!' },
    { word: 'snake', emoji: '🐍', soundText: 'HISSSS!', hint: 'It slithers through the grass!', description: 'A slithering hiss in the leaves!' },
    { word: 'bird', emoji: '🐦', soundText: 'CHIRP!', hint: 'It flies and sings beautifully!', description: 'A cheerful chirp from the trees!' },
    { word: 'elephant', emoji: '🐘', soundText: 'TRUMPET!', hint: "It's huge with a long trunk!", description: 'A loud trumpet call!' },
    { word: 'monkey', emoji: '🐵', soundText: 'OOH OOH!', hint: 'It swings from tree to tree!', description: 'Playful chattering sounds!' },
    { word: 'tiger', emoji: '🐯', soundText: 'GROWL!', hint: 'It has stripes and is fierce!', description: 'A deep, powerful growl!' },
    { word: 'frog', emoji: '🐸', soundText: 'RIBBIT!', hint: 'It jumps and lives near water!', description: 'A croaky ribbit sound!' },
    { word: 'parrot', emoji: '🦜', soundText: 'SQUAWK!', hint: 'It can talk and is colorful!', description: 'A colorful squawk!' },
  ],
  space: [
    { word: 'rocket', emoji: '🚀', soundText: 'WHOOSH!', hint: 'It flies to the stars!', description: 'A powerful rocket engine sound!' },
    { word: 'planet', emoji: '🪐', soundText: 'ORBIT!', hint: 'It circles around a star!', description: 'A mysterious cosmic hum!' },
    { word: 'star', emoji: '⭐', soundText: 'TWINKLE!', hint: 'It shines in the night sky!', description: 'A magical twinkling sound!' },
    { word: 'comet', emoji: '☄️', soundText: 'SWOOSH!', hint: 'It has a bright tail!', description: 'A comet zipping through space!' },
    { word: 'alien', emoji: '👽', soundText: 'BEEP BOOP!', hint: 'It comes from another planet!', description: 'Mysterious alien sounds!' },
    { word: 'satellite', emoji: '🛰️', soundText: 'BEEP!', hint: 'It orbits Earth!', description: 'A satellite beeping signal!' },
    { word: 'astronaut', emoji: '👨‍🚀', soundText: 'HELLO!', hint: 'A person who explores space!', description: 'An astronaut greeting from space!' },
    { word: 'meteor', emoji: '⭐', soundText: 'ZIP!', hint: 'A shooting star!', description: 'A meteor streaking by!' },
  ],
  food: [
    { word: 'pizza', emoji: '🍕', soundText: 'SIZZLE!', hint: "It's round and cheesy!", description: 'A pizza sizzling in the oven!' },
    { word: 'cookie', emoji: '🍪', soundText: 'CRUNCH!', hint: "It's sweet with chocolate chips!", description: 'A satisfying cookie crunch!' },
    { word: 'burger', emoji: '🍔', soundText: 'YUMMY!', hint: 'It has a bun and patty!', description: 'A delicious burger sound!' },
    { word: 'cupcake', emoji: '🧁', soundText: 'POP!', hint: "It's a small cake with frosting!", description: 'A fun cupcake pop!' },
    { word: 'donut', emoji: '🍩', soundText: 'MUNCH!', hint: "It's a sweet ring-shaped treat!", description: 'A yummy donut munch!' },
    { word: 'icecream', emoji: '🍦', soundText: 'SLURP!', hint: "It's cold and sweet!", description: 'A refreshing ice cream slurp!' },
    { word: 'apple', emoji: '🍎', soundText: 'CRUNCH!', hint: "It's a red or green fruit!", description: 'A crisp apple crunch!' },
    { word: 'cake', emoji: '🎂', soundText: 'YAY!', hint: "It's a birthday treat!", description: 'A celebration cake sound!' },
  ],
}

// Get Sound Safari words
app.get('/api/sound-safari', (req, res) => {
  const { world = 'jungle', difficulty = 'easy' } = req.query
  
  const worldWords = soundSafariWords[world] || soundSafariWords.jungle
  
  // Get count based on difficulty
  const countMap = { easy: 5, medium: 7, hard: 10 }
  const count = countMap[difficulty] || 5
  
  // Shuffle and return requested count
  const shuffled = [...worldWords].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count)
  
  res.json({
    success: true,
    words: selected,
    difficulty,
    world,
    totalRounds: count,
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'WordQuest API is running! 🌍✨',
    timestamp: new Date().toISOString(),
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🌍 WordQuest Server is running on http://localhost:${PORT}`)
  console.log(`🎮 Ready to serve game data!`)
})

