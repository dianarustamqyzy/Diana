import { BOARD_SIZE, Board } from '../lib/blockPuzzle';

interface BlockBoardProps {
  board: Board;
  canPlaceAt: (row: number, column: number) => boolean;
  onPlace: (row: number, column: number) => void;
}

export function BlockBoard({ board, canPlaceAt, onPlace }: BlockBoardProps) {
  return (
    <div className="block-board" role="grid" aria-label="Игровое поле 8 на 8">
      {board.flatMap((line, row) => line.map((color, column) => {
        const available = canPlaceAt(row, column);
        return (
          <button
            className={`block-cell${color ? ` filled block-${color}` : ''}${available ? ' available' : ''}`}
            key={`${row}-${column}`}
            type="button"
            onClick={() => onPlace(row, column)}
            aria-label={`Строка ${row + 1}, столбец ${column + 1}`}
            disabled={Boolean(color)}
            role="gridcell"
          />
        );
      }))}
      <span className="board-size" aria-hidden="true">{BOARD_SIZE} × {BOARD_SIZE}</span>
    </div>
  );
}
