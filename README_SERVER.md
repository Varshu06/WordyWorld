# 🎮 WordQuest - Server Documentation

Hey there! 👋 So you want to play the Word Matching Puzzle game? Awesome! Let me tell you how to get everything running like a well-oiled jungle swing! 🦍🌿

## 🚀 Quick Start Guide

### 1. Install Dependencies
First things first - we need to grab all the cool tools! Think of it like gathering ingredients for a delicious coding cake! 🍰

```bash
npm install
```

This will install:
- React (for building the game UI)
- Tailwind CSS (for making everything look amazing)
- Express (the backend server)
- And other helpful friends!

### 2. Start the Frontend (The Game)
The frontend is what you SEE and PLAY with - all the pretty colors, animations, and fun interactions!

```bash
npm run dev
```

This starts the React app! You'll see it running at `http://localhost:5173` (or another port if that's busy - Vite will tell you!)

### 3. Start the Backend Server (The Helper)
The backend is like a helpful assistant that can store your progress and provide game data!

```bash
npm run server
```

This starts the Express server at `http://localhost:3001`

**Pro Tip:** Open TWO terminal windows - one for the frontend, one for the backend! It's like having two hands - much easier! 🙌

## 🎯 How to Play the Game

1. **Navigate to Jungle World Hub** - Click through the homepage, pick your difficulty, and choose Jungle World!

2. **Click "Word Match"** - Find the game card with the 🧩 icon and click "Play Game"!

3. **Match the Pairs!** 
   - See the animal pictures on the left? Those are your jungle friends! 🦁🐵🦜
   - See the words on the right? Match them up!
   - You can DRAG words to pictures (on desktop) or TAP both to match (on mobile/tablet)

4. **Use Hints!** - Stuck? Click the 💡 Hint button and it'll glow the next pair to match!

5. **Win Stars!** - The faster you finish, the more stars you earn! ⭐⭐⭐⭐⭐

## 🛠️ What the Backend Does

The Express server (server.js) is like a super-smart helper that:
- 📚 Provides game word lists
- 💾 Saves your progress (stars, words learned, achievements)
- 🎯 Tracks which worlds you've completed
- 🏆 Manages your achievements

You can test it by visiting:
- `http://localhost:3001/api/health` - Check if server is running
- `http://localhost:3001/api/game-words?world=jungle&difficulty=easy` - Get game words

## 📱 Features

✨ **What Makes This Game Super Cool:**
- Drag-and-drop matching (like moving puzzle pieces!)
- Tap-to-match for mobile devices
- Hint system that guides you
- Pause button (take a snack break!)
- Victory screen with confetti! 🎉
- Star rewards based on speed
- Beautiful jungle theme with animations
- Responsive design (works on phone, tablet, AND computer!)

## 🎨 Visual Magic

The game has:
- 🌴 Animated jungle background (leaves floating, animals moving!)
- ✨ Glassmorphism cards (fancy see-through effect!)
- 🌟 Star animations when you match
- 🎉 Confetti celebration when you win!
- 💫 Smooth transitions and hover effects

## 🐛 Troubleshooting

**Game won't start?**
- Make sure both frontend AND backend are running!
- Check that you installed all dependencies with `npm install`

**Can't match pairs?**
- Try clicking/tapping both cards (one picture, one word)
- Make sure you're clicking on the actual cards, not empty space
- On desktop, you can also drag words onto pictures!

**Backend not working?**
- Check that port 3001 isn't being used by another app
- Make sure Express is installed: `npm install express cors`

## 🎓 Next Steps

Want to add more features? The code is organized and ready for:
- More worlds (Space, Food Town!)
- More game types (Flash Cards, Word Trail!)
- Achievement system
- Sound effects (if you want!)

Have fun playing WordQuest! Remember - every word you learn makes you smarter! 🧠✨

---

*Made with 💚 for kids who love learning!*

