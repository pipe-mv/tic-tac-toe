export type Player = "X" | "O";

export type SquareValue = Player | null;

export type Squares = SquareValue[];

export type WinningLine = readonly [number, number, number];

export interface HistoryEntry {
  squares: Squares;
}
