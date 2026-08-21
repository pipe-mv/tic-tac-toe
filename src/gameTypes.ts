export type Player = "X" | "O";

export type SquareValue = Player | null;

export type Squares = SquareValue[];

export interface HistoryEntry {
  squares: Squares;
}
