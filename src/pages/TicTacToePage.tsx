import { useEffect, useRef, useState } from 'react';
import { MiniGameHeader } from '../components/MiniGameHeader';
import { useGame } from '../context/GameContext';
import { choosePetMove, getTicTacToeResult, TicTacToeCell } from '../lib/ticTacToe';

const emptyBoard = (): TicTacToeCell[] => Array<TicTacToeCell>(9).fill(null);

export function TicTacToePage() {
  const { addCoins } = useGame();
  const [board, setBoard] = useState(emptyBoard);
  const [petTurn, setPetTurn] = useState(false);
  const [wins, setWins] = useState(0);
  const rewarded = useRef(false);
  const result = getTicTacToeResult(board);

  useEffect(() => {
    if (!petTurn || result) return;
    const timer = window.setTimeout(() => {
      setBoard((current) => {
        const move = choosePetMove(current);
        if (move === undefined) return current;
        const next = [...current];
        next[move] = 'O';
        return next;
      });
      setPetTurn(false);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [petTurn, result]);

  useEffect(() => {
    if (result !== 'X' || rewarded.current) return;
    rewarded.current = true;
    setWins((current) => current + 1);
    addCoins(2);
  }, [result, addCoins]);

  function play(index: number) {
    if (board[index] || petTurn || result) return;
    const next = [...board];
    next[index] = 'X';
    setBoard(next);
    if (!getTicTacToeResult(next)) setPetTurn(true);
  }

  function restart() {
    setBoard(emptyBoard());
    setPetTurn(false);
    rewarded.current = false;
  }

  const message = result === 'X' ? 'Ты победила! +2 монетки' : result === 'O'
    ? 'Питомец победил. Реванш?' : result === 'draw' ? 'Ничья!' : petTurn
      ? 'Питомец думает…' : 'Твой ход — поставь крестик';

  return (
    <section className="mini-game-page">
      <MiniGameHeader title="Крестики-нолики" description="Собери три крестика в ряд и получи 2 монетки!" score={wins} scoreLabel="ПОБЕДЫ" />
      <div className="mini-game-card">
        <div className="tic-board">
          {board.map((cell, index) => <button type="button" key={index} onClick={() => play(index)} disabled={Boolean(cell) || petTurn || Boolean(result)} aria-label={`Клетка ${index + 1}`}>{cell === 'X' ? '✕' : cell === 'O' ? '○' : ''}</button>)}
        </div>
        <aside className="mini-game-info"><span>{result === 'X' ? '🏆' : '🐾'}</span><h2>{message}</h2><p>Ты играешь крестиками, а питомец — ноликами.</p><button type="button" onClick={restart}>Новая игра</button></aside>
      </div>
    </section>
  );
}
