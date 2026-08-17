export type Board = Array<Array<string | null>>;

export interface BlockPiece {
  id: string;
  cells: Array<[number, number]>;
  color: string;
}

export const BOARD_SIZE = 8;

const SHAPES: Array<Array<[number, number]>> = [
  [[0, 0]],
  [[0, 0], [0, 1]],
  [[0, 0], [1, 0]],
  [[0, 0], [0, 1], [0, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 0], [0, 1], [1, 0], [1, 1]],
  [[0, 0], [1, 0], [1, 1]],
  [[0, 1], [1, 0], [1, 1]],
  [[0, 0], [0, 1], [1, 1]],
  [[0, 0], [1, 0], [1, 1], [2, 1]],
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  [[0, 0], [1, 0], [2, 0], [3, 0]],
];

const COLORS = ['coral', 'green', 'blue', 'gold', 'purple'];

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, () => Array<string | null>(BOARD_SIZE).fill(null));
}

export function createPieces(): BlockPiece[] {
  return Array.from({ length: 3 }, (_, index) => ({
    id: `${Date.now()}-${index}-${Math.random()}`,
    cells: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

export function canPlace(board: Board, piece: BlockPiece, row: number, column: number) {
  return piece.cells.every(([rowOffset, columnOffset]) => {
    const targetRow = row + rowOffset;
    const targetColumn = column + columnOffset;
    return targetRow < BOARD_SIZE && targetColumn < BOARD_SIZE && !board[targetRow][targetColumn];
  });
}

export function placePiece(board: Board, piece: BlockPiece, row: number, column: number) {
  const placed = board.map((line) => [...line]);
  piece.cells.forEach(([rowOffset, columnOffset]) => {
    placed[row + rowOffset][column + columnOffset] = piece.color;
  });

  const fullRows = placed.flatMap((line, index) => line.every(Boolean) ? [index] : []);
  const fullColumns = Array.from({ length: BOARD_SIZE }, (_, index) => index)
    .filter((columnIndex) => placed.every((line) => line[columnIndex]));

  fullRows.forEach((rowIndex) => placed[rowIndex].fill(null));
  fullColumns.forEach((columnIndex) => placed.forEach((line) => { line[columnIndex] = null; }));

  return { board: placed, clearedLines: fullRows.length + fullColumns.length };
}

export function hasAnyMove(board: Board, pieces: BlockPiece[]) {
  return pieces.some((piece) => board.some((line, row) =>
    line.some((_, column) => canPlace(board, piece, row, column)),
  ));
}
