import { useState } from 'react';
import { MiniGameHeader } from '../components/MiniGameHeader';
import { SudokuBoard } from '../components/SudokuBoard';
import { SudokuControls } from '../components/SudokuControls';
import { useGame } from '../context/GameContext';
import { createSudokuGame } from '../lib/sudoku';

export function SudokuPage() {
  const { addCoins } = useGame();
  const [game, setGame] = useState(createSudokuGame);
  const [values, setValues] = useState(game.puzzle);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const filled = values.filter(Boolean).length;

  function enterNumber(value: number) {
    if (selected === null || finished) return;
    const next = values.map((cell, index) => index === selected ? value : cell);
    setValues(next);
    if (next.every((cell, index) => cell === game.solution[index])) {
      setFinished(true);
      addCoins(5);
    }
  }

  function erase() {
    if (selected === null || finished) return;
    setValues((current) => current.map((value, index) => index === selected ? 0 : value));
  }

  function startNewGame() {
    const next = createSudokuGame();
    setGame(next);
    setValues(next.puzzle);
    setSelected(null);
    setFinished(false);
  }

  return (
    <section className="mini-game-page">
      <MiniGameHeader title="Судоку" description="В каждой строке, столбце и квадрате цифры не должны повторяться." score={filled} scoreLabel="ЗАПОЛНЕНО" />
      <div className="sudoku-game-card">
        <SudokuBoard values={values} puzzle={game.puzzle} solution={game.solution} selected={selected} onSelect={setSelected} />
        <aside className="sudoku-tools">
          <div className="mini-game-info"><span>{finished ? '🏆' : '🔢'}</span><h2>{finished ? 'Судоку решено!' : selected === null ? 'Выбери пустую клетку' : 'Теперь выбери цифру'}</h2><p>{finished ? 'Ты получила 5 монеток!' : 'Если цифра неверная, она станет красной — её можно стереть и попробовать снова.'}</p></div>
          <SudokuControls disabled={selected === null || finished} onNumber={enterNumber} onErase={erase} />
          <button className="sudoku-new" type="button" onClick={startNewGame}>Новая игра</button>
        </aside>
      </div>
    </section>
  );
}
