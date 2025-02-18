# Tic-Tac-Toe Game

A simple Tic-Tac-Toe game built with React that allows two players to play against each other. The game state, including player names and board history, is stored in local storage for persistence.

## Features
- Two-player gameplay
- Dynamic player name updates
- Automatic winner detection based on predefined winning combinations
- Game state persistence using local storage
- Restart functionality

## Technologies Used
- React (useState for state management)
- Local Storage for storing player names and game state
- JavaScript, HTML, and CSS

## Installation
s
1. Clone the repository:
   ```sh
   git clone https://github.com/Vignesh2103/REACT-TIC-TAC-TOE.git
   ```
2. Navigate to the project directory:
   ```sh
   cd tic-tac-toe
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## How to Play
1. Enter player names (or use the default ones: Player 1 and Player 2).
2. Click on a board square to make a move.
3. The game automatically detects the winner or a draw.
4. Click the **Restart** button to start a new game.

## Project Structure
```
/tic-tac-toe
│-- /src
│   │-- /components
│   │   │-- GameBoard.jsx
│   │   │-- Player.jsx
│   │   │-- Log.jsx
│   │   │-- GameOver.jsx
│   │-- App.jsx
│   │-- index.jsx
     -- index.css
│-- public
│-- package.json
│-- README.md
```

## Local Storage Implementation
- **Player names** are stored using:
  ```js
  localStorage.setItem("players", JSON.stringify({ X: "Player 1", O: "Player 2" }));
  ```
- **Game state** is stored and retrieved on each turn.

## Future Enhancements
- Add an AI opponent for single-player mode.
- Improve UI with animations and sound effects.
- Implement a scoreboard to track multiple games.

## License
This project is open-source and free to use under the MIT License.

---
Enjoy playing Tic-Tac-Toe! 🎉

