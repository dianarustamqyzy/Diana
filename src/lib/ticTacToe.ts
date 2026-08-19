export type TicTacToeCell = 'X' | 'O' | null;
export type TicTacToeResult = 'X' | 'O' | 'draw' | null;

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function getTicTacToeResult(board: TicTacToeCell[]): TicTacToeResult {
  for (const [first, second, third] of winningLines) {
    if (board[first] && board[first] === board[second] && board[first] === board[third]) {
      return board[first];
    }
  }
  return board.every(Boolean) ? 'draw' : null;
}

export function choosePetMove(board: TicTacToeCell[]) {
  const emptyCells = board
    .map((cell, index) => cell === null ? index : -1)
    .filter((index) => index >= 0);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}
