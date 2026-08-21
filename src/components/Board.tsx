import { Component } from 'react';
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

class Board extends Component<BoardProps> {
  renderSquare = (index: number) => (
    <Square
      value={this.props.squares[index]}
      onClick={() => this.props.onClick(index)}
    />
  );

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
