import React, { useEffect, useRef, useState } from 'react'

const SoundSafari = ({ difficulty = 'easy', world = 'jungle', onBackToHub, onGoHome }) => {
  // Game configuration based on difficulty
  const gameConfig = {
    easy: { rounds: 5, options: 4, timeBonus: 120 },
    medium: { rounds: 7, options: 6, timeBonus: 180 },
    hard: { rounds: 10, options: 6, timeBonus: 240 },
  }

  const config = gameConfig[difficulty] || gameConfig.easy

  // Speech synthesis for audio playback
  const synthRef = useRef(null)
  const utteranceRef = useRef(null)

  // World themes
  const worldThemes = {
    jungle: {
      title: '🐦 Sound Safari 🌿',
      subtitle: 'Listen carefully and guess the jungle animal!',
      backgroundGradient: 'from-green-800 via-emerald-600 to-green-400',
      floatingItems: ['🍃', '🌿', '🌾', '🦋'],
      characterEmoji: '🐵',
      questionType: 'animal',
    },
    space: {
      title: '🔊 Cosmic Sounds ⭐',
      subtitle: 'Listen carefully and guess the space object!',
      backgroundGradient: 'from-blue-950 via-indigo-900 to-purple-950',
      floatingItems: ['⭐', '🌟', '✨', '☄️'],
      characterEmoji: '👨‍🚀',
      questionType: 'space object',
    },
    food: {
      title: '🍳 Food Sounds 🍰',
      subtitle: 'Listen carefully and guess the food!',
      backgroundGradient: 'from-orange-300 via-red-300 to-pink-300',
      floatingItems: ['🍕', '🍰', '🧁', '🎂'],
      characterEmoji: '👨‍🍳',
      questionType: 'food',
    },
  }

  const theme = worldThemes[world] || worldThemes.jungle

  // Game state
  const [words, setWords] = useState([])
  const [currentRound, setCurrentRound] = useState(0)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [options, setOptions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackCorrect, setFeedbackCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [replayUsed, setReplayUsed] = useState(false)
  const [starsEarned, setStarsEarned] = useState(0)
  const [showVictory, setShowVictory] = useState(false)
  const [animalAnimation, setAnimalAnimation] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [soundWave, setSoundWave] = useState(false)

  // Initialize Web Speech API
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  // Fallback word lists organized by difficulty and world
  const fallbackWordsByDifficulty = {
    easy: {
      jungle: [
        // Animals
        { word: 'cat', emoji: '🐱', soundText: 'MEOW!', hint: 'I am a furry pet that meows!', description: 'A friendly meow sound!' },
        { word: 'dog', emoji: '🐶', soundText: 'WOOF!', hint: 'I am a friendly pet that barks!', description: 'A happy bark sound!' },
        { word: 'bat', emoji: '🦇', soundText: 'SQUEAK!', hint: 'I fly at night and sleep upside down!', description: 'A high-pitched squeak!' },
        { word: 'fox', emoji: '🦊', soundText: 'YELP!', hint: 'I am orange and very clever!', description: 'A quick yelping sound!' },
        { word: 'bee', emoji: '🐝', soundText: 'BUZZ!', hint: 'I make honey and buzz around flowers!', description: 'A buzzing sound!' },
        { word: 'ant', emoji: '🐜', soundText: 'TAP!', hint: 'I am tiny and work in groups!', description: 'Tiny tapping sounds!' },
        { word: 'owl', emoji: '🦉', soundText: 'HOOT!', hint: 'I am a wise bird that hoots at night!', description: 'A hooting sound!' },
        { word: 'bear', emoji: '🐻', soundText: 'GROWL!', hint: 'I am big and furry with sharp claws!', description: 'A deep growl!' },
        { word: 'duck', emoji: '🦆', soundText: 'QUACK!', hint: 'I swim in water and say quack!', description: 'A quacking sound!' },
        { word: 'deer', emoji: '🦌', soundText: 'BLEAT!', hint: 'I have antlers and run very fast!', description: 'A bleating sound!' },
        // Birds
        { word: 'bird', emoji: '🐦', soundText: 'CHIRP!', hint: 'I fly and sing beautiful songs!', description: 'A cheerful chirp from the trees!' },
        { word: 'crow', emoji: '🐦‍⬛', soundText: 'CAW!', hint: 'I am black and say caw caw!', description: 'A loud caw sound!' },
        { word: 'eagle', emoji: '🦅', soundText: 'SCREECH!', hint: 'I am a big bird with sharp talons!', description: 'A sharp screech!' },
        { word: 'robin', emoji: '🐦', soundText: 'TWEET!', hint: 'I have a red chest and sing sweetly!', description: 'A sweet tweet!' },
        // Trees and Nature
        { word: 'tree', emoji: '🌳', soundText: 'SWAY!', hint: 'I am tall with green leaves!', description: 'Leaves rustling in the wind!' },
        { word: 'wind', emoji: '💨', soundText: 'WHOOSH!', hint: 'I blow through the trees!', description: 'Wind whooshing sound!' },
      ],
      space: [
        { word: 'moon', emoji: '🌙', soundText: 'GLOW!', hint: 'I shine bright in the night sky!', description: 'A magical moon glow!' },
        { word: 'star', emoji: '⭐', soundText: 'TWINKLE!', hint: 'I twinkle way up high!', description: 'A magical twinkling sound!' },
        { word: 'sun', emoji: '☀️', soundText: 'SHINE!', hint: 'I give light to everyone!', description: 'Bright sunny sounds!' },
        { word: 'earth', emoji: '🌍', soundText: 'SPIN!', hint: 'I am the planet we live on!', description: 'Earth spinning sounds!' },
        { word: 'mars', emoji: '🪐', soundText: 'RED!', hint: 'I am the red planet!', description: 'Mars sounds!' },
        { word: 'rocket', emoji: '🚀', soundText: 'ZOOM!', hint: 'I travel through space!', description: 'A spaceship zooming by!' },
      ],
      food: [
        { word: 'apple', emoji: '🍎', soundText: 'CRUNCH!', hint: "I am red or green and crunchy!", description: 'A crisp apple crunch!' },
        { word: 'bread', emoji: '🍞', soundText: 'TEAR!', hint: 'I am made from flour and yummy!', description: 'Tearing bread sounds!' },
        { word: 'milk', emoji: '🥛', soundText: 'POUR!', hint: 'I am white and come from cows!', description: 'Milk pouring sounds!' },
        { word: 'egg', emoji: '🥚', soundText: 'CRACK!', hint: 'I am round and come from chickens!', description: 'An egg cracking sound!' },
      ],
    },
    medium: {
      jungle: [
        // Medium Animals
        { word: 'lion', emoji: '🦁', soundText: 'ROARRR!', hint: "It's the king of the jungle!", description: 'A mighty roar that shakes the trees!' },
        { word: 'tiger', emoji: '🐯', soundText: 'GROWL!', hint: 'It has stripes and is fierce!', description: 'A deep, powerful growl!' },
        { word: 'monkey', emoji: '🐵', soundText: 'OOH OOH!', hint: 'It swings from tree to tree!', description: 'Playful chattering sounds!' },
        { word: 'snake', emoji: '🐍', soundText: 'HISSSS!', hint: 'It slithers through the grass!', description: 'A slithering hiss in the leaves!' },
        { word: 'frog', emoji: '🐸', soundText: 'RIBBIT!', hint: 'It jumps and lives near water!', description: 'A croaky ribbit sound!' },
        { word: 'zebra', emoji: '🦓', soundText: 'NEIGH!', hint: 'It has black and white stripes!', description: 'A zebra neighing sound!' },
        { word: 'panda', emoji: '🐼', soundText: 'BLEAT!', hint: 'I am black and white and love bamboo!', description: 'A gentle bleat!' },
        { word: 'koala', emoji: '🐨', soundText: 'GRUNT!', hint: 'I am fuzzy and love eucalyptus leaves!', description: 'A soft grunt!' },
        { word: 'rabbit', emoji: '🐰', soundText: 'THUMP!', hint: 'I have long ears and hop very fast!', description: 'A thumping sound!' },
        { word: 'wolf', emoji: '🐺', soundText: 'HOWL!', hint: 'I howl at the moon and live in packs!', description: 'A long howl!' },
        { word: 'otter', emoji: '🦦', soundText: 'CHIRP!', hint: 'I swim and play in the water!', description: 'A playful chirp!' },
        // Medium Birds
        { word: 'parrot', emoji: '🦜', soundText: 'SQUAWK!', hint: 'It can talk and is colorful!', description: 'A colorful squawk!' },
        { word: 'toucan', emoji: '🦜', soundText: 'CROAK!', hint: 'I am a colorful bird with a big beak!', description: 'A croaking sound!' },
        { word: 'hawk', emoji: '🦅', soundText: 'SCREECH!', hint: 'I am a bird of prey with sharp eyes!', description: 'A sharp screech!' },
        { word: 'woodpecker', emoji: '🐦', soundText: 'TAP TAP!', hint: 'I peck on trees to find insects!', description: 'Tapping sounds!' },
        { word: 'peacock', emoji: '🦚', soundText: 'CALL!', hint: 'I have beautiful colorful feathers!', description: 'A loud call!' },
      ],
      space: [
        { word: 'rocket', emoji: '🚀', soundText: 'WHOOSH!', hint: 'It flies to the stars!', description: 'A powerful rocket engine sound!' },
        { word: 'planet', emoji: '🪐', soundText: 'ORBIT!', hint: 'It circles around a star!', description: 'A mysterious cosmic hum!' },
        { word: 'comet', emoji: '☄️', soundText: 'SWOOSH!', hint: 'It has a bright tail!', description: 'A comet zipping through space!' },
        { word: 'meteor', emoji: '⭐', soundText: 'ZIP!', hint: 'A shooting star!', description: 'A meteor streaking by!' },
        { word: 'satellite', emoji: '🛰️', soundText: 'BEEP!', hint: 'It orbits Earth!', description: 'A satellite beeping signal!' },
        { word: 'astronaut', emoji: '👨‍🚀', soundText: 'HELLO!', hint: 'A person who explores space!', description: 'An astronaut greeting from space!' },
        { word: 'alien', emoji: '👽', soundText: 'BEEP BOOP!', hint: 'I come from another planet!', description: 'Mysterious alien sounds!' },
        { word: 'nebula', emoji: '🌌', soundText: 'HUMM!', hint: 'I am a colorful cloud of gas!', description: 'Nebula humming sounds!' },
      ],
      food: [
        { word: 'pizza', emoji: '🍕', soundText: 'SIZZLE!', hint: "It's round and cheesy!", description: 'A pizza sizzling in the oven!' },
        { word: 'cookie', emoji: '🍪', soundText: 'CRUNCH!', hint: "It's sweet with chocolate chips!", description: 'A satisfying cookie crunch!' },
        { word: 'burger', emoji: '🍔', soundText: 'YUMMY!', hint: 'It has a bun and patty!', description: 'A delicious burger sound!' },
        { word: 'cupcake', emoji: '🧁', soundText: 'POP!', hint: "It's a small cake with frosting!", description: 'A fun cupcake pop!' },
        { word: 'donut', emoji: '🍩', soundText: 'MUNCH!', hint: "It's a sweet ring-shaped treat!", description: 'A yummy donut munch!' },
        { word: 'icecream', emoji: '🍦', soundText: 'SLURP!', hint: "It's cold and sweet!", description: 'A refreshing ice cream slurp!' },
      ],
    },
    hard: {
      jungle: [
        // Large Animals
        { word: 'elephant', emoji: '🐘', soundText: 'TRUMPET!', hint: "It's huge with a long trunk!", description: 'A loud trumpet call!' },
        { word: 'rhinoceros', emoji: '🦏', soundText: 'GRUNT!', hint: 'It is large and gray with a horn!', description: 'A deep rhino grunt!' },
        { word: 'hippopotamus', emoji: '🦛', soundText: 'GRUNT!', hint: 'It is huge and loves water!', description: 'A hippo grunting loudly!' },
        { word: 'chimpanzee', emoji: '🦧', soundText: 'HOOT!', hint: 'It is a smart ape like humans!', description: 'Chimp hooting sounds!' },
        { word: 'gorilla', emoji: '🦍', soundText: 'BEAT CHEST!', hint: 'I am a big strong ape with black fur!', description: 'Chest beating sounds!' },
        { word: 'orangutan', emoji: '🦧', soundText: 'HOOT!', hint: 'I am a red-haired ape that swings!', description: 'Long hooting sounds!' },
        // Reptiles
        { word: 'crocodile', emoji: '🐊', soundText: 'ROAR!', hint: 'It is a large reptile with sharp teeth!', description: 'A crocodile roar!' },
        { word: 'alligator', emoji: '🐊', soundText: 'BELLOW!', hint: 'I am like a crocodile but live in swamps!', description: 'A deep bellow!' },
        { word: 'chameleon', emoji: '🦎', soundText: 'HISS!', hint: 'It can change colors to hide!', description: 'A chameleon hissing sound!' },
        { word: 'python', emoji: '🐍', soundText: 'HISS!', hint: 'I am a huge snake that can squeeze!', description: 'A long hiss!' },
        { word: 'anaconda', emoji: '🐍', soundText: 'HISS!', hint: 'I am the biggest snake in the jungle!', description: 'A powerful hiss!' },
        { word: 'cobra', emoji: '🐍', soundText: 'HISS!', hint: 'I am a dangerous snake that can spread my hood!', description: 'A threatening hiss!' },
        // Insects
        { word: 'tarantula', emoji: '🕷️', soundText: 'HISS!', hint: 'I am a big hairy spider!', description: 'A spider hissing sound!' },
        { word: 'scorpion', emoji: '🦂', soundText: 'CLICK!', hint: 'I have a stinger on my tail!', description: 'Clicking sounds!' },
        // Birds
        { word: 'hummingbird', emoji: '🐦', soundText: 'BUZZ!', hint: 'I am tiny and fly very fast!', description: 'A buzzing wing sound!' },
        { word: 'albatross', emoji: '🪽', soundText: 'SQUEAK!', hint: 'I am a large sea bird that glides!', description: 'A squeaking sound!' },
        { word: 'vulture', emoji: '🦅', soundText: 'HISS!', hint: 'I am a bird that eats dead animals!', description: 'A hissing sound!' },
      ],
      space: [
        { word: 'constellation', emoji: '⭐', soundText: 'SPARKLE!', hint: 'It is a pattern of stars in the sky!', description: 'Sparkling constellation sounds!' },
        { word: 'astronomer', emoji: '👨‍🔬', soundText: 'HELLO!', hint: 'I study space and stars!', description: 'An astronomer speaking!' },
        { word: 'spacecraft', emoji: '🛸', soundText: 'WHOOSH!', hint: 'It is a vehicle that travels in space!', description: 'A spacecraft engine sound!' },
        { word: 'asteroid', emoji: '☄️', soundText: 'ZIP!', hint: 'It is a rocky object in space!', description: 'An asteroid zipping by!' },
        { word: 'observatory', emoji: '🏛️', soundText: 'BEEP!', hint: 'Scientists study space in me!', description: 'Observatory equipment sounds!' },
        { word: 'milky way', emoji: '🌌', soundText: 'SWOOSH!', hint: 'I am our galaxy with billions of stars!', description: 'Galaxy swirling sounds!' },
        { word: 'black hole', emoji: '⚫', soundText: 'SWOOP!', hint: 'I am so dense that light cannot escape!', description: 'Black hole sounds!' },
        { word: 'supernova', emoji: '💥', soundText: 'BOOM!', hint: 'I am an exploding star!', description: 'Supernova explosion sounds!' },
      ],
      food: [
        { word: 'gastronomy', emoji: '🍽️', soundText: 'CHEF!', hint: 'I am the art of cooking amazing food!', description: 'A chef cooking sounds!' },
        { word: 'ingredient', emoji: '🧄', soundText: 'CHOP!', hint: 'I am something you use when cooking!', description: 'Chopping ingredient sounds!' },
        { word: 'restaurant', emoji: '🍽️', soundText: 'DING!', hint: 'People eat delicious food at my place!', description: 'Restaurant bell sounds!' },
        { word: 'gourmet', emoji: '👨‍🍳', soundText: 'YUMMY!', hint: 'I am high-quality fancy food!', description: 'Gourmet food sounds!' },
      ],
    },
  }

  // Get fallback words based on difficulty and world
  const difficultyFallbacks = fallbackWordsByDifficulty[difficulty] || fallbackWordsByDifficulty.easy
  const fallbackWords = difficultyFallbacks[world] || difficultyFallbacks.jungle

  // Fetch words from backend API
  useEffect(() => {
    const fetchWords = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:3001/api/sound-safari?world=${world}&difficulty=${difficulty}`)
        const data = await response.json()
        if (data.success && data.words) {
          setWords(data.words)
          resetGameState()
        } else {
          // Fallback to local words
          const wordList = fallbackWords[world] || fallbackWords.jungle
          const shuffled = [...wordList].sort(() => Math.random() - 0.5)
          const selectedWords = shuffled.slice(0, config.rounds)
          setWords(selectedWords)
          resetGameState()
        }
      } catch (error) {
        console.error('Error fetching words:', error)
        // Fallback to local words if API fails
        const wordList = fallbackWords[world] || fallbackWords.jungle
        const shuffled = [...wordList].sort(() => Math.random() - 0.5)
        const selectedWords = shuffled.slice(0, config.rounds)
        setWords(selectedWords)
        resetGameState()
      } finally {
        setIsLoading(false)
      }
    }
    fetchWords()
  }, [difficulty, world])

  const resetGameState = () => {
    setCurrentRound(0)
    setScore(0)
    setCorrectAnswers(0)
    setGameComplete(false)
    setIsPaused(false)
    setTimeElapsed(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setFeedbackCorrect(false)
    setShowHint(false)
    setReplayUsed(false)
    setStarsEarned(0)
    setShowVictory(false)
    setAnimalAnimation(false)
  }

  // Timer
  useEffect(() => {
    if (isPaused || gameComplete || showFeedback || isLoading) return

    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaused, gameComplete, showFeedback, isLoading])

  // Play sound using Web Speech API
  const playSound = (text) => {
    if (synthRef.current) {
      synthRef.current.cancel() // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8 // Slower rate for kids
      utterance.pitch = 1.2 // Slightly higher pitch
      utterance.volume = 0.9
      
      utterance.onstart = () => {
        setIsPlaying(true)
        setSoundWave(true)
      }
      
      utterance.onend = () => {
        setIsPlaying(false)
        setSoundWave(false)
      }
      
      utterance.onerror = () => {
        setIsPlaying(false)
        setSoundWave(false)
      }
      
      utteranceRef.current = utterance
      synthRef.current.speak(utterance)
    }
  }

  // Auto-play sound when round starts
  useEffect(() => {
    if (words.length === 0 || gameComplete || isPaused || isLoading) return
    const currentWord = words[currentRound]
    if (currentWord && !showFeedback) {
      // Auto-play the sound text when round starts (e.g., "ROARR!", "HISSS!")
      setTimeout(() => {
        playSound(currentWord.soundText)
      }, 500)
    }
  }, [currentRound, words, gameComplete, isPaused])

  // Generate options for current round
  useEffect(() => {
    if (words.length === 0 || gameComplete || isPaused || isLoading) return

    const currentWord = words[currentRound]
    if (!currentWord) return

    // Use all available words from current world as pool
    const wordPool = words.length >= config.options 
      ? words 
      : (fallbackWords[world] || fallbackWords.jungle)

    // Ensure no duplicate words - use Set to track used words
    const usedWords = new Set([currentWord.word])
    const wrongOptions = []
    
    // Filter and shuffle, then pick unique ones
    const shuffledPool = wordPool
      .filter((w) => w.word !== currentWord.word)
      .sort(() => Math.random() - 0.5)
    
    // Select unique wrong options
    for (const wordObj of shuffledPool) {
      if (!usedWords.has(wordObj.word) && wrongOptions.length < config.options - 1) {
        wrongOptions.push(wordObj)
        usedWords.add(wordObj.word)
      }
    }
    
    // Fill remaining slots if needed
    if (wrongOptions.length < config.options - 1) {
      const fallbackPool = fallbackWords[world] || fallbackWords.jungle
      for (const wordObj of fallbackPool) {
        if (!usedWords.has(wordObj.word) && wrongOptions.length < config.options - 1) {
          wrongOptions.push(wordObj)
          usedWords.add(wordObj.word)
        }
      }
    }

    const allOptions = [
      { ...currentWord, isCorrect: true },
      ...wrongOptions.map((w) => ({ ...w, isCorrect: false })),
    ].sort(() => Math.random() - 0.5)
    
    // Final verification - ensure all options have unique words
    const finalOptions = []
    const finalUsedWords = new Set()
    for (const option of allOptions) {
      if (!finalUsedWords.has(option.word)) {
        finalOptions.push(option)
        finalUsedWords.add(option.word)
      }
    }
    
    // If we lost the correct answer, add it back
    if (!finalOptions.find(o => o.isCorrect)) {
      finalOptions[0] = { ...currentWord, isCorrect: true }
    }

    setOptions(finalOptions)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setReplayUsed(false)
    setShowHint(false)
    setAnimalAnimation(false)
  }, [currentRound, words, difficulty, world, gameComplete, isPaused, isLoading])

  // Handle answer selection
  const handleAnswerSelect = (option) => {
    if (showFeedback || gameComplete || isPaused) return

    setSelectedAnswer(option)
    setFeedbackCorrect(option.isCorrect)
    setShowFeedback(true)
    setAnimalAnimation(true)

    // Stop any playing audio
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsPlaying(false)
      setSoundWave(false)
    }

    if (option.isCorrect) {
      // Correct answer! 🎉
      // For easy difficulty, give fixed score. For others, bonus based on time
      const timeBonus = difficulty === 'easy' ? 0 : Math.max(0, config.timeBonus - timeElapsed)
      const roundScore = 10 + Math.floor(timeBonus / 10)
      setScore((prev) => prev + roundScore)
      setCorrectAnswers((prev) => prev + 1)
      // Play success sound
      playSound('Great job! Correct!')
    } else {
      // Wrong answer 😅
      playSound('Oops! Try again!')
    }

      setTimeout(() => {
        nextRound()
    }, 2500)
  }

  const nextRound = () => {
    setShowFeedback(false)
    setAnimalAnimation(false)
    setTimeElapsed(0)

    if (currentRound + 1 < words.length) {
      setCurrentRound((prev) => prev + 1)
    } else {
      // Game complete!
      calculateStars()
      setGameComplete(true)
      setShowVictory(true)
      // Save learned words
      const learned = words.map(w => w.word)
      const saved = localStorage.getItem(`learnedWords_${world}`)
      const existing = saved ? JSON.parse(saved) : []
      const updated = Array.from(new Set([...existing, ...learned]))
      localStorage.setItem(`learnedWords_${world}`, JSON.stringify(updated))
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }

  const calculateStars = () => {
    const accuracy = correctAnswers / config.rounds
    let stars = 1

    // For easy difficulty, no time pressure - just focus on accuracy
    if (difficulty === 'easy') {
      if (accuracy >= 0.8) stars = 5
      else if (accuracy >= 0.6) stars = 4
      else if (accuracy >= 0.4) stars = 3
      else if (accuracy >= 0.2) stars = 2
    } else {
      // Medium/Hard: Time-based bonus still applies
    if (accuracy >= 0.9 && timeElapsed < config.timeBonus * 0.7) stars = 5
    else if (accuracy >= 0.8) stars = 4
    else if (accuracy >= 0.6) stars = 3
    else if (accuracy >= 0.4) stars = 2
    }

    setStarsEarned(stars)
  }

  const handleReplay = () => {
    if (replayUsed || showFeedback || gameComplete || !words[currentRound]) return
    
    setReplayUsed(true)
    const currentWord = words[currentRound]
    if (currentWord) {
      playSound(currentWord.soundText)
    }
  }

  const handleHint = () => {
    if (words.length === 0 || showFeedback || gameComplete || !words[currentRound]) return
    setShowHint(true)
  }

  const handlePlayAgain = () => {
    resetGameState()
    setShowVictory(false)
    // Re-fetch words to start fresh
    const wordList = fallbackWords[world] || fallbackWords.jungle
    const shuffled = [...wordList].sort(() => Math.random() - 0.5)
    const selectedWords = shuffled.slice(0, config.rounds)
    setWords(selectedWords)
  }

  const currentWord = words[currentRound]

  // Progress percentage
  const progress = words.length > 0 ? ((currentRound + (showFeedback ? 1 : 0)) / config.rounds) * 100 : 0

  // Loading screen
  if (isLoading) {
    return (
      <div className={`min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center bg-gradient-to-b ${theme.backgroundGradient}`}>
        <div className="text-center">
          <div className="text-6xl md:text-8xl mb-4 animate-bounce">
            {theme.characterEmoji}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-2xl font-playful">
            Loading Sound Safari...
          </h2>
          <div className="flex gap-2 justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.backgroundGradient}`}></div>

        {/* Floating items based on world */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`float-${i}`}
            className="absolute text-2xl opacity-20 animate-float-sound pointer-events-none"
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
      {showVictory && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute text-3xl animate-confetti-sound"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
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
                🎉 SOUND SAFARI RESULTS 🎉
              </h2>
              <p className="text-2xl md:text-3xl text-white font-bold mb-6 drop-shadow-lg font-playful">
                You guessed {correctAnswers} out of {config.rounds} correctly!
              </p>
              <div className="text-4xl md:text-6xl mb-4">
                {'⭐'.repeat(starsEarned)}
              </div>
              <p className="text-xl md:text-2xl text-white font-bold mb-4 drop-shadow-lg font-playful">
                {starsEarned === 5
                  ? 'Perfect Listener! 🌟'
                  : starsEarned === 4
                  ? 'Great Listener! ✨'
                  : starsEarned === 3
                  ? 'Good Listener! 🎵'
                  : starsEarned === 2
                  ? 'Keep Practicing! 👂'
                  : 'Nice Try! 🎧'}
              </p>
              <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg font-playful">
                {theme.characterEmoji} "You have amazing ears!" {world === 'jungle' ? '🐘' : world === 'space' ? '👨‍🚀' : '👨‍🍳'}
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
      <div className="relative z-10 w-full max-w-5xl">
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
              <span className="text-2xl md:text-3xl">🌟</span>
              <span className="text-white text-lg md:text-xl font-bold drop-shadow-lg">
                Score: {score}
              </span>
            </div>
            <div className="text-white text-lg md:text-xl font-bold drop-shadow-lg">
              Round: {currentRound + 1}/{config.rounds}
            </div>
          </div>
          <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg font-playful mb-4">
            {theme.subtitle}
          </p>
        </div>

        {/* Sound Display with Wave Animation */}
        {currentWord && (
          <div className="text-center mb-6">
            <div className="bg-white/25 backdrop-blur-lg border-4 border-white/40 rounded-3xl p-6 md:p-8 mb-4 relative overflow-hidden">
              {/* Sound Wave Animation */}
              {soundWave && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={`wave-${i}`}
                        className="w-1 bg-yellow-300 rounded-full animate-sound-wave"
                        style={{
                          height: '40px',
                          animationDelay: `${i * 0.1}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                  <div className={`text-6xl md:text-8xl ${soundWave ? 'animate-pulse' : ''}`}>
                  {currentWord.emoji}
                  </div>
                <div>
                  <p className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg font-playful mb-2">
                    🔊 {currentWord.soundText}
                  </p>
                  <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg font-playful">
                    {currentWord.description}
                  </p>
                </div>
              </div>
              <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg font-playful mb-4">
                  Which {theme.questionType} makes this sound? 👂
              </p>
              {showHint && (
                  <div className="mt-4 p-4 bg-yellow-400/30 rounded-xl border-2 border-yellow-400 animate-fade-in">
                  <p className="text-white text-base md:text-lg font-bold drop-shadow-lg font-playful">
                    💡 {theme.characterEmoji} Hint: "{currentWord.hint}" 👑
                  </p>
                </div>
              )}
              </div>
            </div>
          </div>
        )}

        {/* Animal Animation */}
        {animalAnimation && currentWord && (
          <div className="text-center mb-4">
            <div
              className={`text-8xl md:text-9xl ${
                feedbackCorrect ? 'animate-bounce-dance' : 'animate-shake-funny'
              }`}
            >
              {feedbackCorrect ? currentWord.emoji : '🙈'}
            </div>
            <p
              className={`text-3xl md:text-4xl font-black mt-4 drop-shadow-2xl font-playful ${
                feedbackCorrect ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {feedbackCorrect ? '🎉 YAY! Correct! 🎉' : '😅 Oops! Try again! 😅'}
            </p>
          </div>
        )}

        {/* Answer Options */}
        {!showFeedback && !gameComplete && options.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {options.map((option, index) => (
              <button
                key={`option-${index}`}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback || gameComplete || isPaused}
                className={`relative bg-white/25 backdrop-blur-lg border-4 border-white/40 rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedAnswer?.word === option.word ? 'ring-4 ring-yellow-400 shadow-2xl' : ''
                }`}
              >
                <div className="text-center">
                  <div className="text-5xl md:text-6xl mb-2">{option.emoji}</div>
                  <div className="text-white text-xl md:text-2xl font-black drop-shadow-lg font-playful uppercase">
                    {option.word}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

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
            onClick={handleReplay}
            disabled={replayUsed || showFeedback || gameComplete || !currentWord}
            className="px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-full hover:scale-110 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-playful flex items-center gap-2"
          >
            <span>🔁</span>
            <span>Replay Sound</span>
          </button>
          <button
            onClick={handleHint}
            disabled={showHint || showFeedback || gameComplete || !currentWord}
            className="px-6 py-3 bg-yellow-500 text-white font-bold text-lg rounded-full hover:scale-110 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-playful flex items-center gap-2"
          >
            <span>💡</span>
            <span>Hint</span>
          </button>
          <button
            onClick={() => {
              setIsPaused(!isPaused)
              if (synthRef.current && !isPaused) {
                synthRef.current.cancel()
                setIsPlaying(false)
                setSoundWave(false)
              }
            }}
            className="px-6 py-3 bg-purple-500 text-white font-bold text-lg rounded-full hover:scale-110 transition-all duration-300 shadow-xl font-playful flex items-center gap-2"
          >
            <span>{isPaused ? '▶' : '⏸'}</span>
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
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
        @keyframes float-sound {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(10deg); }
          66% { transform: translateY(-50px) translateX(-10px) rotate(-5deg); }
        }
        .animate-float-sound {
          animation: float-sound 8s ease-in-out infinite;
        }

        @keyframes confetti-sound {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti-sound {
          animation: confetti-sound 3s ease-out forwards;
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

        @keyframes bounce-dance {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          10% {
            transform: translateY(-20px) rotate(-10deg) scale(1.1);
          }
          20% {
            transform: translateY(-30px) rotate(10deg) scale(1.2);
          }
          30% {
            transform: translateY(-20px) rotate(-10deg) scale(1.1);
          }
          40% {
            transform: translateY(-10px) rotate(10deg) scale(1);
          }
          50% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          60% {
            transform: translateY(-15px) rotate(-5deg) scale(1.05);
          }
          70% {
            transform: translateY(-25px) rotate(5deg) scale(1.1);
          }
          80% {
            transform: translateY(-15px) rotate(-5deg) scale(1.05);
          }
          90% {
            transform: translateY(-5px) rotate(5deg) scale(1);
          }
        }
        .animate-bounce-dance {
          animation: bounce-dance 1.5s ease-in-out;
        }

        @keyframes shake-funny {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          10% { transform: translateX(-10px) rotate(-10deg); }
          20% { transform: translateX(10px) rotate(10deg); }
          30% { transform: translateX(-10px) rotate(-10deg); }
          40% { transform: translateX(10px) rotate(10deg); }
          50% { transform: translateX(-5px) rotate(-5deg); }
          60% { transform: translateX(5px) rotate(5deg); }
        }
        .animate-shake-funny {
          animation: shake-funny 0.8s ease-in-out;
        }

        @keyframes sound-wave {
          0%, 100% {
            transform: scaleY(0.3);
            opacity: 0.7;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        .animate-sound-wave {
          animation: sound-wave 0.5s ease-in-out infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default SoundSafari
