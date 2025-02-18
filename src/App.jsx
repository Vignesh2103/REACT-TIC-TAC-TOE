import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const INITIAL_GAME = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


// save in localstorage
const INITIAL_GAME_PLAYER = {
  X: "player 1",
  O: "player 2",
};


const getStoredPlayers = () => {
  const storedPlayers = localStorage.getItem("players");
  return storedPlayers ? JSON.parse(storedPlayers) : INITIAL_GAME_PLAYER;
};



const derivedActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
};

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};



function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const [players, setPlayers] = useState(getStoredPlayers);

  const [winner, setWinner] = useState(null);

  //GET ACTIVE PLAYER
  const activePlayer = derivedActivePlayer(gameTurns);

  //GET GAME BOARD
  const gameBoard = deriveGameBoard(gameTurns);

  //GET WINNER

  if (!winner) {
    for (const combination of WINNING_COMBINATIONS) {
      const firstSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

      if (
        firstSymbol &&
        firstSymbol === secondSymbol &&
        firstSymbol === thirdSymbol
      ) {
        setWinner(players[firstSymbol]);
        break;
      }
    }
  }

  const hasDraw = gameTurns.length == 9 && !winner;
  const handleBoardClick = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
    setWinner(null);
  };

  // const handlePlayerNameChange = (symbol, newName) => {
  //   setPlayers((prevPlayers) => {
  //     return {
  //       ...prevPlayers,
  //       [symbol]: newName,
  //     };
  //   });
  // };

  const handlePlayerNameChange = (symbol, newName) => {
    const updatedPlayers = {
      ...players,
      [symbol]: newName,
    };
    localStorage.setItem("players", JSON.stringify(updatedPlayers)); // Update localStorage
    setPlayers(updatedPlayers); // Update state
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} restart={handleRestart} />
        )}
        <GameBoard onSelectBoard={handleBoardClick} board={gameBoard} />
      </div>
      <Log turns={gameTurns} players={players} />
    </main>
  );
}

export default App;
