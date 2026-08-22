import { useState } from "react";
import Board from "./Board";
import type { HistoryEntry, Player, Squares } from "../gameTypes";
import "./Game.css";

interface GameState {
  history: HistoryEntry[];
  stepNumber: number;
  xIsNext: boolean;
}

const Game = () => {
  const [gameState, setGameState] = useState<GameState>({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });

  const handleClick = (i: number) => {
    const history = gameState.history.slice(0, gameState.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = gameState.xIsNext ? "X" : "O";
    setGameState({
      history: history.concat([
        {
          squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !gameState.xIsNext,
    });
  };

  const jumpTo = (step: number) => {
    setGameState({
      ...gameState,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  const history = gameState.history;
  const current = history[gameState.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? "Move #" + move : "Game start";
    return (
      <li key={move}>
        <a className="move" href="#" onClick={() => jumpTo(move)}>
          {desc}
        </a>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (gameState.xIsNext ? "X" : "O");
  }

  return (
    <div>
      <h1 className="title">Let's play a game!</h1>

      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={handleClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
};

// Calculation for the blocks

function calculateWinner(squares: Squares): Player | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
