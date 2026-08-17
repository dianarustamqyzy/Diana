import { BlockPiece } from '../lib/blockPuzzle';

interface BlockPieceTrayProps {
  pieces: BlockPiece[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function PiecePreview({ piece }: { piece: BlockPiece }) {
  const rows = Math.max(...piece.cells.map(([row]) => row)) + 1;
  const columns = Math.max(...piece.cells.map(([, column]) => column)) + 1;
  const occupied = new Set(piece.cells.map(([row, column]) => `${row}-${column}`));

  return (
    <span className="piece-preview" style={{ gridTemplateColumns: `repeat(${columns}, 18px)` }}>
      {Array.from({ length: rows * columns }, (_, index) => {
        const key = `${Math.floor(index / columns)}-${index % columns}`;
        return <i key={key} className={occupied.has(key) ? `block-${piece.color}` : 'empty'} />;
      })}
    </span>
  );
}

export function BlockPieceTray({ pieces, selectedId, onSelect }: BlockPieceTrayProps) {
  return (
    <div className="piece-tray" aria-label="Доступные фигуры">
      {pieces.map((piece) => (
        <button
          key={piece.id}
          className={`piece-button${selectedId === piece.id ? ' selected' : ''}`}
          type="button"
          onClick={() => onSelect(piece.id)}
          aria-pressed={selectedId === piece.id}
        >
          <PiecePreview piece={piece} />
        </button>
      ))}
    </div>
  );
}
