import { useEffect, useState } from 'react';
import {
  BlockPiece,
  canPlace,
  createEmptyBoard,
  createPieces,
  hasAnyMove,
  placePiece,
} from '../lib/blockPuzzle';

interface PuzzleState {
  board: ReturnType<typeof createEmptyBoard>;
  pieces: BlockPiece[];
  selectedId: string;
  score: number;
  isOver: boolean;
}

function createGame(): PuzzleState {
  const pieces = createPieces();
  return { board: createEmptyBoard(), pieces, selectedId: pieces[0].id, score: 0, isOver: false };
}

export function useBlockPuzzle(onClearLines: (count: number) => void) {
  const [game, setGame] = useState<PuzzleState>(createGame);
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem('block-puzzle-best')) || 0);
  const selectedPiece = game.pieces.find((piece) => piece.id === game.selectedId) ?? null;

  useEffect(() => {
    if (game.score <= bestScore) return;
    setBestScore(game.score);
    localStorage.setItem('block-puzzle-best', String(game.score));
  }, [bestScore, game.score]);

  function selectPiece(id: string) {
    setGame((current) => ({ ...current, selectedId: id }));
  }

  function placeAt(row: number, column: number) {
    const piece = game.pieces.find((item) => item.id === game.selectedId);
    if (!piece || !canPlace(game.board, piece, row, column)) return;

    const result = placePiece(game.board, piece, row, column);
    const unusedPieces = game.pieces.filter((item) => item.id !== piece.id);
    const nextPieces = unusedPieces.length ? unusedPieces : createPieces();
    const nextSelected = nextPieces.find((item) => hasAnyMove(result.board, [item])) ?? nextPieces[0];
    const gained = piece.cells.length + result.clearedLines * 10;

    setGame({
      board: result.board,
      pieces: nextPieces,
      selectedId: nextSelected.id,
      score: game.score + gained,
      isOver: !hasAnyMove(result.board, nextPieces),
    });

    if (result.clearedLines > 0) onClearLines(result.clearedLines);
  }

  return {
    ...game,
    bestScore,
    selectedPiece,
    canPlaceAt: (row: number, column: number) => Boolean(selectedPiece && canPlace(game.board, selectedPiece, row, column)),
    selectPiece,
    placeAt,
    restart: () => setGame(createGame()),
  };
}
