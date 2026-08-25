import type { SquareValue, Squares, WinningLine } from '../gameTypes';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
}

const Square = ({ value, onClick }: SquareProps) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

interface BoardProps {
  squares: Squares;
  onClick: (index: number) => void;
  winningLine: WinningLine | null;
}

const Board = ({ squares, onClick, winningLine }: BoardProps) => {
  const renderSquare = (index: number) => (
    <Square
      value={squares[index]}
      onClick={() => onClick(index)}
    />
  );

  const winningLineCoordinates = winningLine
    ? {
        x1: (winningLine[0] % 3) + 0.5,
        y1: Math.floor(winningLine[0] / 3) + 0.5,
        x2: (winningLine[2] % 3) + 0.5,
        y2: Math.floor(winningLine[2] / 3) + 0.5,
      }
    : null;

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {winningLineCoordinates && (
        <svg
          aria-hidden="true"
          className="winning-line"
          viewBox="0 0 3 3"
        >
          <line {...winningLineCoordinates} />
        </svg>
      )}
    </div>
  );
};

export default Board;
