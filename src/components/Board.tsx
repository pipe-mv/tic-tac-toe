import type { SquareValue, Squares } from '../gameTypes';

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
}

const Board = ({ squares, onClick }: BoardProps) => {
  const renderSquare = (index: number) => (
    <Square
      value={squares[index]}
      onClick={() => onClick(index)}
    />
  );

  return (
    <div>
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
    </div>
  );
};

export default Board;
