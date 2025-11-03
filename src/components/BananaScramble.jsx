import React, { useEffect, useState } from 'react'

const BananaScramble = ({ difficulty = 'easy', world = 'jungle', onBackToHub, onGoHome }) => {
  // Game configuration based on difficulty
  const gameConfig = {
    easy: { words: 4, timeBonus: 120 },
    medium: { words: 6, timeBonus: 180 },
    hard: { words: 8, timeBonus: 240 },
  }

  const config = gameConfig[difficulty] || gameConfig.easy

  // Word lists for different worlds
  // Word lists organized by difficulty and world
  const worldWordsByDifficulty = {
    easy: {
      jungle: [
        // Animals
        { word: 'cat', hint: 'I am a furry pet that meows!', emoji: '🐱' },
        { word: 'dog', hint: 'I am a friendly pet that barks!', emoji: '🐶' },
        { word: 'bat', hint: 'I fly at night and sleep upside down!', emoji: '🦇' },
        { word: 'fox', hint: 'I am orange and very clever!', emoji: '🦊' },
        { word: 'bee', hint: 'I make honey and buzz around flowers!', emoji: '🐝' },
        { word: 'ant', hint: 'I am tiny and work in groups!', emoji: '🐜' },
        { word: 'owl', hint: 'I am a wise bird that hoots at night!', emoji: '🦉' },
        { word: 'bear', hint: 'I am big and furry with sharp claws!', emoji: '🐻' },
        { word: 'duck', hint: 'I swim in water and say quack!', emoji: '🦆' },
        { word: 'deer', hint: 'I have antlers and run very fast!', emoji: '🦌' },
        // Birds
        { word: 'bird', hint: 'I fly and sing beautiful songs!', emoji: '🐦' },
        { word: 'crow', hint: 'I am black and say caw caw!', emoji: '🐦‍⬛' },
        { word: 'eagle', hint: 'I am a big bird with sharp talons!', emoji: '🦅' },
        { word: 'robin', hint: 'I have a red chest and sing sweetly!', emoji: '🐦' },
        // Trees and Plants
        { word: 'tree', hint: 'I am tall with green leaves!', emoji: '🌳' },
        { word: 'leaf', hint: 'I am green and fall from trees!', emoji: '🍃' },
        { word: 'oak', hint: 'I am a strong tree with acorns!', emoji: '🌳' },
        { word: 'pine', hint: 'I have needles and stay green all year!', emoji: '🌲' },
        { word: 'palm', hint: 'I am a tropical tree with coconuts!', emoji: '🌴' },
        { word: 'fern', hint: 'I am a green plant with fronds!', emoji: '🌿' },
        { word: 'moss', hint: 'I am soft and green on rocks!', emoji: '🟢' },
        { word: 'vine', hint: 'I climb and wrap around trees!', emoji: '🌿' },
        // Nature
        { word: 'rock', hint: 'I am hard and gray!', emoji: '🪨' },
        { word: 'hill', hint: 'I am a small mountain!', emoji: '⛰️' },
        { word: 'nest', hint: 'Birds build me to lay eggs!', emoji: '🪺' },
        { word: 'cave', hint: 'I am a dark hole in the mountain!', emoji: '🕳️' },
        { word: 'lake', hint: 'I am a big body of water!', emoji: '🌊' },
        { word: 'river', hint: 'I flow from mountains to the sea!', emoji: '🌊' },
      ],
      space: [
        { word: 'moon', hint: 'I shine bright in the night sky!', emoji: '🌙' },
        { word: 'star', hint: 'I twinkle way up high!', emoji: '⭐' },
        { word: 'sun', hint: 'I give light to everyone!', emoji: '☀️' },
        { word: 'earth', hint: 'I am the planet we live on!', emoji: '🌍' },
        { word: 'rock', hint: 'I float in outer space!', emoji: '🪨' },
        { word: 'ship', hint: 'I travel through space!', emoji: '🚢' },
        { word: 'flag', hint: 'I was on the moon!', emoji: '🚩' },
        { word: 'suit', hint: 'People wear me in space!', emoji: '👔' },
        { word: 'mask', hint: 'I help you breathe in space!', emoji: '😷' },
        { word: 'mars', hint: 'I am the red planet!', emoji: '🪐' },
        { word: 'jupiter', hint: 'I am the biggest planet!', emoji: '🪐' },
        { word: 'neptune', hint: 'I am a blue planet far away!', emoji: '🪐' },
      ],
      food: [
        // Fruits
        { word: 'apple', hint: 'I am red or green and crunchy!', emoji: '🍎' },
        { word: 'banana', hint: 'I am yellow and curved!', emoji: '🍌' },
        { word: 'orange', hint: 'I am round and orange!', emoji: '🍊' },
        { word: 'grape', hint: 'I grow in bunches and are purple or green!', emoji: '🍇' },
        { word: 'berry', hint: 'I am small and sweet!', emoji: '🫐' },
        // Basic Foods
        { word: 'bread', hint: 'I am made from flour and yummy!', emoji: '🍞' },
        { word: 'milk', hint: 'I am white and come from cows!', emoji: '🥛' },
        { word: 'egg', hint: 'I am round and come from chickens!', emoji: '🥚' },
        { word: 'rice', hint: 'I am small white grains!', emoji: '🍚' },
        { word: 'corn', hint: 'I am yellow on a cob!', emoji: '🌽' },
        { word: 'meat', hint: 'I come from animals and taste good!', emoji: '🥩' },
        { word: 'fish', hint: 'I live in water and you can eat me!', emoji: '🐟' },
        { word: 'cheese', hint: 'I am made from milk and delicious!', emoji: '🧀' },
        { word: 'butter', hint: 'I am yellow and spread on bread!', emoji: '🧈' },
      ],
    },
    medium: {
      jungle: [
        // Medium Animals
        { word: 'monkey', hint: 'I swing from tree to tree and love bananas!', emoji: '🐵' },
        { word: 'tiger', hint: 'I have stripes and roar loudly!', emoji: '🐯' },
        { word: 'lion', hint: 'I am the king of the jungle with a golden mane!', emoji: '🦁' },
        { word: 'snake', hint: 'I slither through the jungle grass!', emoji: '🐍' },
        { word: 'zebra', hint: 'I have black and white stripes!', emoji: '🦓' },
        { word: 'leopard', hint: 'I have spots and am very fast!', emoji: '🐆' },
        { word: 'giraffe', hint: 'I am tall with a long neck!', emoji: '🦒' },
        { word: 'panda', hint: 'I am black and white and love bamboo!', emoji: '🐼' },
        { word: 'koala', hint: 'I am fuzzy and love eucalyptus leaves!', emoji: '🐨' },
        { word: 'rabbit', hint: 'I have long ears and hop very fast!', emoji: '🐰' },
        { word: 'squirrel', hint: 'I am small and collect nuts!', emoji: '🐿️' },
        { word: 'raccoon', hint: 'I have a mask and am very clever!', emoji: '🦝' },
        { word: 'wolf', hint: 'I howl at the moon and live in packs!', emoji: '🐺' },
        { word: 'otter', hint: 'I swim and play in the water!', emoji: '🦦' },
        { word: 'hedgehog', hint: 'I am small and covered in spines!', emoji: '🦔' },
        // Medium Birds
        { word: 'parrot', hint: 'I am colorful and can talk!', emoji: '🦜' },
        { word: 'toucan', hint: 'I am a colorful bird with a big beak!', emoji: '🦜' },
        { word: 'hawk', hint: 'I am a bird of prey with sharp eyes!', emoji: '🦅' },
        { word: 'woodpecker', hint: 'I peck on trees to find insects!', emoji: '🐦' },
        { word: 'penguin', hint: 'I cannot fly but I swim very well!', emoji: '🐧' },
        { word: 'flamingo', hint: 'I am pink and stand on one leg!', emoji: '🦩' },
        { word: 'peacock', hint: 'I have beautiful colorful feathers!', emoji: '🦚' },
        { word: 'sparrow', hint: 'I am a small brown bird that chirps!', emoji: '🐦' },
        // Medium Plants & Nature
        { word: 'bamboo', hint: 'I am a fast-growing plant pandas love!', emoji: '🎋' },
        { word: 'jungle', hint: 'I am a dense tropical forest!', emoji: '🌳' },
        { word: 'forest', hint: 'I am a big area full of trees!', emoji: '🌲' },
        { word: 'waterfall', hint: 'I am water falling from high rocks!', emoji: '🌊' },
        { word: 'valley', hint: 'I am a low area between mountains!', emoji: '🏔️' },
        { word: 'canyon', hint: 'I am a deep valley with steep sides!', emoji: '⛰️' },
        { word: 'mountain', hint: 'I am very tall and reach the clouds!', emoji: '⛰️' },
      ],
      space: [
        { word: 'rocket', hint: 'I fly through space and reach the stars!', emoji: '🚀' },
        { word: 'planet', hint: 'I orbit around a star and have moons!', emoji: '🪐' },
        { word: 'comet', hint: 'I have a bright tail and zoom through space!', emoji: '☄️' },
        { word: 'meteor', hint: 'I am a shooting star that streaks across the sky!', emoji: '⭐' },
        { word: 'galaxy', hint: 'I am a huge collection of stars in space!', emoji: '🌌' },
        { word: 'satellite', hint: 'I orbit Earth and help with communication!', emoji: '🛰️' },
        { word: 'telescope', hint: 'Scientists use me to see far into space!', emoji: '🔭' },
        { word: 'astronaut', hint: 'I explore space and wear a special suit!', emoji: '👨‍🚀' },
      ],
      food: [
        { word: 'pizza', hint: 'I am round, cheesy, and delicious!', emoji: '🍕' },
        { word: 'burger', hint: 'I have a bun, patty, and lots of toppings!', emoji: '🍔' },
        { word: 'cookie', hint: 'I am sweet, round, and often have chocolate chips!', emoji: '🍪' },
        { word: 'cupcake', hint: 'I am a small cake with frosting on top!', emoji: '🧁' },
        { word: 'donut', hint: 'I am a sweet ring-shaped treat with a hole!', emoji: '🍩' },
        { word: 'sandwich', hint: 'I have bread and yummy fillings inside!', emoji: '🥪' },
        { word: 'icecream', hint: 'I am cold, sweet, and come in many flavors!', emoji: '🍦' },
        { word: 'pancake', hint: 'I am a flat breakfast food you stack up!', emoji: '🥞' },
      ],
    },
    hard: {
      jungle: [
        // Large Animals
        { word: 'elephant', hint: 'I have a long trunk and big ears!', emoji: '🐘' },
        { word: 'rhinoceros', hint: 'I am large and gray with a horn!', emoji: '🦏' },
        { word: 'hippopotamus', hint: 'I am huge and love water!', emoji: '🦛' },
        { word: 'chimpanzee', hint: 'I am a smart ape like humans!', emoji: '🦧' },
        { word: 'gorilla', hint: 'I am a big strong ape with black fur!', emoji: '🦍' },
        { word: 'orangutan', hint: 'I am a red-haired ape that swings!', emoji: '🦧' },
        // Reptiles
        { word: 'crocodile', hint: 'I am a large reptile with sharp teeth!', emoji: '🐊' },
        { word: 'alligator', hint: 'I am like a crocodile but live in swamps!', emoji: '🐊' },
        { word: 'chameleon', hint: 'I can change my colors to hide!', emoji: '🦎' },
        { word: 'iguana', hint: 'I am a big green lizard!', emoji: '🦎' },
        { word: 'python', hint: 'I am a huge snake that can squeeze!', emoji: '🐍' },
        { word: 'anaconda', hint: 'I am the biggest snake in the jungle!', emoji: '🐍' },
        { word: 'cobra', hint: 'I am a dangerous snake that can spread my hood!', emoji: '🐍' },
        { word: 'komodo', hint: 'I am a giant lizard and very dangerous!', emoji: '🦎' },
        // Insects & Small Creatures
        { word: 'tarantula', hint: 'I am a big hairy spider!', emoji: '🕷️' },
        { word: 'scorpion', hint: 'I have a stinger on my tail!', emoji: '🦂' },
        { word: 'butterfly', hint: 'I have colorful wings and fly!', emoji: '🦋' },
        { word: 'dragonfly', hint: 'I have transparent wings and fly fast!', emoji: '🦋' },
        { word: 'caterpillar', hint: 'I turn into a butterfly one day!', emoji: '🐛' },
        { word: 'beetle', hint: 'I am an insect with a hard shell!', emoji: '🪲' },
        // Birds
        { word: 'hummingbird', hint: 'I am tiny and fly very fast!', emoji: '🐦' },
        { word: 'albatross', hint: 'I am a large sea bird that glides!', emoji: '🪽' },
        { word: 'pelican', hint: 'I have a big beak to catch fish!', emoji: '🦢' },
        { word: 'vulture', hint: 'I am a bird that eats dead animals!', emoji: '🦅' },
        { word: 'stork', hint: 'I have long legs and deliver babies!', emoji: '🦩' },
        // Plants & Nature
        { word: 'ecosystem', hint: 'I am where all living things work together!', emoji: '🌍' },
        { word: 'rainforest', hint: 'I am a dense forest with lots of rain!', emoji: '🌳' },
        { word: 'tropical', hint: 'I am a warm climate near the equator!', emoji: '🌴' },
        { word: 'mangrove', hint: 'I am a tree that grows in water!', emoji: '🌊' },
        { word: 'habitat', hint: 'I am where animals live naturally!', emoji: '🏡' },
      ],
      space: [
        { word: 'constellation', hint: 'I am a pattern of stars in the sky!', emoji: '⭐' },
        { word: 'astronomer', hint: 'I study space and stars!', emoji: '👨‍🔬' },
        { word: 'spacecraft', hint: 'I am a vehicle that travels in space!', emoji: '🛸' },
        { word: 'asteroid', hint: 'I am a rocky object in space!', emoji: '☄️' },
        { word: 'observatory', hint: 'Scientists study space in me!', emoji: '🏛️' },
        { word: 'telescope', hint: 'Scientists use me to see far into space!', emoji: '🔭' },
        { word: 'solar system', hint: 'I am the sun and all planets together!', emoji: '🌍' },
        { word: 'space station', hint: 'People live in me while in space!', emoji: '🛰️' },
      ],
      food: [
        { word: 'gastronomy', hint: 'I am the art of cooking amazing food!', emoji: '🍽️' },
        { word: 'ingredient', hint: 'I am something you use when cooking!', emoji: '🧄' },
        { word: 'restaurant', hint: 'People eat delicious food at my place!', emoji: '🍽️' },
        { word: 'gourmet', hint: 'I am high-quality fancy food!', emoji: '👨‍🍳' },
        { word: 'cuisine', hint: 'I am a style of cooking from a place!', emoji: '🍜' },
        { word: 'appetizer', hint: 'You eat me before the main meal!', emoji: '🥗' },
        { word: 'beverage', hint: 'I am a drink like juice or soda!', emoji: '🥤' },
        { word: 'nutrition', hint: 'I am about healthy food and eating right!', emoji: '🥗' },
      ],
    },
  }

  // Get words based on difficulty and world
  const difficultyWords = worldWordsByDifficulty[difficulty] || worldWordsByDifficulty.easy
  const worldWords = difficultyWords[world] || difficultyWords.jungle

  // World themes
  const worldThemes = {
    jungle: {
      title: '🌴 Banana Scramble 🍌',
      subtitle: 'The monkeys are hungry! Unscramble the words to win bananas for them! 🐵',
      reward: 'bananas',
      rewardEmoji: '🍌',
      backgroundGradient: 'from-green-800 via-emerald-600 to-green-400',
      floatingItems: ['🍌', '🍌', '🍌'],
      characterEmoji: '🐵',
      celebrationText: 'Yay! Banana time! 🍌',
    },
    space: {
      title: '🚀 Cosmic Scramble ⭐',
      subtitle: 'The rockets need power! Unscramble space words to fuel them! 🚀',
      reward: 'stars',
      rewardEmoji: '⭐',
      backgroundGradient: 'from-blue-950 via-indigo-900 to-purple-950',
      floatingItems: ['⭐', '🌟', '✨'],
      characterEmoji: '👨‍🚀',
      celebrationText: 'Yay! Rocket powered! 🚀',
    },
    food: {
      title: '🍰 Dessert Scramble 🍩',
      subtitle: 'The chefs need ingredients! Unscramble food words to bake treats! 👨‍🍳',
      reward: 'treats',
      rewardEmoji: '🍰',
      backgroundGradient: 'from-orange-300 via-red-300 to-pink-300',
      floatingItems: ['🍰', '🧁', '🍪'],
      characterEmoji: '👨‍🍳',
      celebrationText: 'Yay! Treat time! 🍰',
    },
  }

  const theme = worldThemes[world] || worldThemes.jungle

  // Scramble a word (randomize letter order)
  const scrambleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('').toUpperCase()
  }

  // Initialize game
  const initializeGame = () => {
    const wordList = worldWords
    const selectedWords = [...wordList]
      .sort(() => Math.random() - 0.5)
      .slice(0, config.words)
      .map((wordObj) => ({
        ...wordObj,
        scrambled: scrambleWord(wordObj.word),
        solved: false,
        usedHint: false,
      }))

    setBananasEarned(0)
    setGameComplete(false)
    setIsPaused(false)
    setTimeElapsed(0)
    setStarsEarned(0)
    setShowVictory(false)
    setWordShake(false)
    setMonkeyCelebration(false)
    setSelectedLetters([])
    setCurrentWordIndex(0)
    
    // Set words and initialize first word
    setWords(selectedWords)
    if (selectedWords.length > 0) {
      const scrambled = selectedWords[0].scrambled
      setAvailableLetters(scrambled.split(''))
    }
  }

  // Game state
  const [words, setWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [selectedLetters, setSelectedLetters] = useState([])
  const [availableLetters, setAvailableLetters] = useState([])
  const [bananasEarned, setBananasEarned] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [starsEarned, setStarsEarned] = useState(0)
  const [showVictory, setShowVictory] = useState(false)
  const [wordShake, setWordShake] = useState(false)
  const [monkeyCelebration, setMonkeyCelebration] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [draggedLetter, setDraggedLetter] = useState(null)

  // Initialize on mount or when world/difficulty changes
  useEffect(() => {
    initializeGame()
  }, [difficulty, world])

  // Timer
  useEffect(() => {
    if (isPaused || gameComplete) return

    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaused, gameComplete])

  // Get current word
  const currentWord = words[currentWordIndex]

  // Handle letter selection (tap or drag)
  const handleLetterClick = (letter, index, fromAvailable = true) => {
    if (isPaused || gameComplete || !currentWord || currentWord.solved) return

    if (fromAvailable) {
      // Move from available to selected
      setAvailableLetters((prev) => prev.filter((_, i) => i !== index))
      setSelectedLetters((prev) => [...prev, letter])
    } else {
      // Move back from selected to available
      setSelectedLetters((prev) => prev.filter((_, i) => i !== index))
      setAvailableLetters((prev) => [...prev, letter])
    }
  }

  // Handle drag and drop
  const handleDragStart = (e, letter, index, fromAvailable = true) => {
    if (isPaused || gameComplete || !currentWord || currentWord.solved) return
    setDraggedLetter({ letter, index, fromAvailable })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetType, targetIndex = null) => {
    e.preventDefault()
    if (!draggedLetter) return

    const { letter, index, fromAvailable } = draggedLetter

    if (targetType === 'selected' && fromAvailable) {
      // Drop into selected area
      setAvailableLetters((prev) => prev.filter((_, i) => i !== index))
      setSelectedLetters((prev) => [...prev, letter])
    } else if (targetType === 'available' && !fromAvailable) {
      // Drop back to available
      setSelectedLetters((prev) => prev.filter((_, i) => i !== index))
      setAvailableLetters((prev) => [...prev, letter])
    } else if (targetType === 'slot' && !fromAvailable && targetIndex !== null) {
      // Reorder in selected letters
      const newSelected = [...selectedLetters]
      const removed = newSelected.splice(index, 1)[0]
      newSelected.splice(targetIndex, 0, removed)
      setSelectedLetters(newSelected)
    }

    setDraggedLetter(null)
  }

  // Check if word is correct
  const checkWord = () => {
    if (!currentWord || currentWord.solved) return

    const userAnswer = selectedLetters.join('').toLowerCase()
    const correctAnswer = currentWord.word.toLowerCase()

    if (userAnswer === correctAnswer) {
      // Correct! 🎉
      setWords((prev) =>
        prev.map((w, i) =>
          i === currentWordIndex ? { ...w, solved: true } : w
        )
      )
      setBananasEarned((prev) => prev + 1)
      setMonkeyCelebration(true)
      
      // Move to next word or complete game
      setTimeout(() => {
        setWords((prevWords) => {
          const newWords = [...prevWords]
          const nextIndex = currentWordIndex + 1
          
          if (nextIndex < newWords.length) {
            const nextWord = newWords[nextIndex]
            setCurrentWordIndex(nextIndex)
            setSelectedLetters([])
            setAvailableLetters(nextWord.scrambled.split(''))
            setMonkeyCelebration(false)
            setShowHint(false)
          } else {
            // Game complete!
            calculateStars(newWords.length)
            setGameComplete(true)
            setShowVictory(true)
          }
          
          return newWords
        })
      }, 1500)
    } else {
      // Wrong! Shake animation
      setWordShake(true)
      setTimeout(() => setWordShake(false), 500)
    }
  }

  // Calculate stars based on time and performance
  const calculateStars = (totalWords) => {
    // For easy difficulty, no time pressure - just focus on accuracy
    let stars = 1

    if (difficulty === 'easy') {
      // Easy: Simple star calculation without time pressure
      if (totalWords === config.words) stars = 5
      else if (totalWords >= config.words * 0.75) stars = 4
      else if (totalWords >= config.words * 0.5) stars = 3
      else if (totalWords >= config.words * 0.25) stars = 2
    } else {
      // Medium/Hard: Time-based bonus still applies
      const timeBonus = config.timeBonus - timeElapsed
      if (totalWords === config.words && timeBonus > config.timeBonus * 0.5) stars = 5
      else if (totalWords === config.words && timeBonus > config.timeBonus * 0.3) stars = 4
      else if (totalWords === config.words) stars = 3
      else if (totalWords >= config.words * 0.7) stars = 2
    }

    setStarsEarned(stars)
  }

  // Show hint
  const handleHint = () => {
    if (!currentWord || currentWord.solved || currentWord.usedHint) return
    setShowHint(true)
    setWords((prev) =>
      prev.map((w, i) =>
        i === currentWordIndex ? { ...w, usedHint: true } : w
      )
    )
  }

  // Reset current word
  const resetCurrentWord = () => {
    if (!currentWord) return
    setSelectedLetters([])
    setAvailableLetters(currentWord.scrambled.split(''))
    setShowHint(false)
  }

  const handlePlayAgain = () => {
    initializeGame()
    setShowVictory(false)
  }

  const solvedCount = words.filter((w) => w.solved).length

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center px-4 py-8">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.backgroundGradient}`}></div>

        {/* Floating items based on world */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`float-${i}`}
            className="absolute text-3xl opacity-20 animate-float-banana pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
            }}
          >
            {theme.floatingItems[Math.floor(Math.random() * theme.floatingItems.length)]}
          </div>
        ))}

        {/* Characters in background */}
        <div className="absolute top-1/4 left-1/8 text-6xl md:text-8xl opacity-30 animate-monkey-swing pointer-events-none">
          {theme.characterEmoji}
        </div>
        <div className="absolute bottom-1/4 right-1/8 text-6xl md:text-8xl opacity-30 animate-monkey-swing pointer-events-none" style={{ animationDelay: '2s' }}>
          {theme.characterEmoji}
        </div>
      </div>

      {/* Victory Rain Celebration */}
      {showVictory && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(100)].map((_, i) => (
            <div
              key={`rain-${i}`}
              className="absolute text-3xl animate-banana-rain"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {theme.rewardEmoji}
            </div>
          ))}
        </div>
      )}

      {/* Victory Screen */}
      {showVictory && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`relative bg-gradient-to-br ${
            world === 'jungle' ? 'from-yellow-400 via-orange-400 to-green-500' :
            world === 'space' ? 'from-cyan-400 via-blue-500 to-purple-500' :
            'from-orange-400 via-red-500 to-pink-500'
          } rounded-3xl p-8 md:p-12 max-w-2xl w-full mx-4 shadow-2xl border-4 border-white animate-victory-pop`}>
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl font-playful">
                🎉 GREAT JOB! 🎉
              </h2>
              <p className="text-2xl md:text-3xl text-white font-bold mb-6 drop-shadow-lg font-playful">
                {world === 'jungle' ? 'You fed all the monkeys with bananas! 🐒🍌' :
                 world === 'space' ? 'You powered up all the rockets! 🚀⭐' :
                 'You baked all the sweet treats! 👨‍🍳🍰'}
              </p>
              <p className="text-xl md:text-2xl text-white font-bold mb-4 drop-shadow-lg font-playful">
                {solvedCount + 1} words unscrambled correctly!
              </p>
              <div className="text-4xl md:text-6xl mb-4">
                {'⭐'.repeat(starsEarned)}
              </div>
              <p className="text-xl md:text-2xl text-white font-bold mb-8 drop-shadow-lg font-playful">
                {starsEarned} stars earned! 🌴
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
            <h3 className="text-4xl font-black text-green-600 mb-4 font-playful">GAME PAUSED</h3>
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
            <span className={`bg-gradient-to-r ${
              world === 'jungle' ? 'from-yellow-400 via-orange-400 to-green-400' :
              world === 'space' ? 'from-cyan-400 via-blue-500 to-purple-500' :
              'from-orange-400 via-red-500 to-pink-500'
            } bg-clip-text text-transparent`}>
              {theme.title}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-white text-lg md:text-xl font-bold drop-shadow-lg font-playful">
              Words Solved: {solvedCount}/{config.words} {theme.rewardEmoji}
            </span>
          </div>
          <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg font-playful mb-4">
            {theme.subtitle}
          </p>
        </div>

        {/* Character Celebration */}
        {monkeyCelebration && (
          <div className="text-center mb-6 animate-bounce">
            <div className="text-6xl md:text-8xl">{theme.characterEmoji}</div>
            <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg font-playful mt-2">
              {theme.celebrationText}
            </p>
          </div>
        )}

        {/* Word Box */}
        {currentWord && (
          <div className="mb-8">
            <div
              className={`bg-white/25 backdrop-blur-lg border-4 border-white/40 rounded-3xl p-6 md:p-8 mb-6 transition-all duration-300 ${
                wordShake ? 'animate-shake' : ''
              } ${currentWord.solved ? 'bg-green-500/50 border-green-400' : ''}`}
            >
              {/* Blanks for selected letters */}
              <div className="flex justify-center items-center gap-3 md:gap-4 mb-4 flex-wrap">
                {Array.from({ length: currentWord.word.length }).map((_, i) => (
                  <div
                    key={`slot-${i}`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'slot', i)}
                    className="w-12 h-16 md:w-16 md:h-20 border-3 border-white/60 rounded-xl bg-white/30 flex items-center justify-center text-3xl md:text-4xl font-black text-white drop-shadow-lg font-playful"
                  >
                    {selectedLetters[i] || '_'}
                  </div>
                ))}
              </div>

              {/* Scrambled word display */}
              <div className="text-center">
                <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg font-playful mb-2">
                  Scrambled: {currentWord.scrambled} {currentWord.emoji}
                </p>
                {showHint && (
                  <div className="mt-4 p-4 bg-yellow-400/30 rounded-xl border-2 border-yellow-400">
                    <p className="text-white text-base md:text-lg font-bold drop-shadow-lg font-playful">
                      🐵 Hint: "{currentWord.hint}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Available Letters */}
        <div className="mb-8">
          <h3 className="text-white text-xl md:text-2xl font-bold text-center mb-4 drop-shadow-lg font-playful">
            Available Letters:
          </h3>
          <div className="flex justify-center flex-wrap gap-3 md:gap-4">
            {availableLetters.map((letter, index) => (
              <div
                key={`available-${index}`}
                draggable={!currentWord?.solved && !isPaused}
                onDragStart={(e) => handleDragStart(e, letter, index, true)}
                onClick={() => handleLetterClick(letter, index, true)}
                className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 rounded-xl border-3 border-white flex items-center justify-center text-2xl md:text-3xl font-black text-white cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl font-playful drop-shadow-lg"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Earned */}
        <div className="text-center mb-6">
          <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg font-playful">
            {theme.rewardEmoji} {theme.reward.charAt(0).toUpperCase() + theme.reward.slice(1)} Earned: {theme.rewardEmoji.repeat(bananasEarned)}
          </p>
        </div>

        {/* Game Controls */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <button
            onClick={checkWord}
            disabled={!currentWord || selectedLetters.length !== currentWord.word.length || currentWord.solved}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xl md:text-2xl rounded-full hover:scale-110 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-playful"
          >
            ✓ Check Word
          </button>
          <button
            onClick={resetCurrentWord}
            disabled={!currentWord || currentWord.solved}
            className="px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-full hover:scale-110 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-playful"
          >
            🔄 Reset
          </button>
          <button
            onClick={handleHint}
            disabled={!currentWord || currentWord.solved || currentWord.usedHint}
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
        @keyframes float-banana {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(15deg); }
          66% { transform: translateY(-50px) translateX(-10px) rotate(-10deg); }
        }
        .animate-float-banana {
          animation: float-banana 10s ease-in-out infinite;
        }

        @keyframes monkey-swing {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-30px) translateX(40px) rotate(20deg); }
          50% { transform: translateY(-50px) translateX(80px) rotate(-15deg); }
          75% { transform: translateY(-30px) translateX(60px) rotate(10deg); }
        }
        .animate-monkey-swing {
          animation: monkey-swing 6s ease-in-out infinite;
        }

        @keyframes banana-rain {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-banana-rain {
          animation: banana-rain 3s ease-out forwards;
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
          10% { transform: translateX(-10px) rotate(-2deg); }
          20% { transform: translateX(10px) rotate(2deg); }
          30% { transform: translateX(-10px) rotate(-2deg); }
          40% { transform: translateX(10px) rotate(2deg); }
          50% { transform: translateX(-5px) rotate(-1deg); }
          60% { transform: translateX(5px) rotate(1deg); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default BananaScramble

