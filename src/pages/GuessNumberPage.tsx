import { FormEvent, useState } from 'react';
import { MiniGameHeader } from '../components/MiniGameHeader';
import { useGame } from '../context/GameContext';

const createTarget = () => Math.floor(Math.random() * 20) + 1;

export function GuessNumberPage() {
  const { addCoins } = useGame();
  const [target, setTarget] = useState(createTarget);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [wins, setWins] = useState(0);
  const [message, setMessage] = useState('Я загадал число от 1 до 20');
  const [finished, setFinished] = useState(false);

  function checkGuess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const number = Number(guess);
    if (!Number.isInteger(number) || number < 1 || number > 20 || finished) return;
    setAttempts((current) => current + 1);
    setGuess('');
    if (number < target) return setMessage('Моё число больше ↑');
    if (number > target) return setMessage('Моё число меньше ↓');
    setMessage(`Верно! Это число ${target}. +2 монетки`);
    setFinished(true);
    setWins((current) => current + 1);
    addCoins(2);
  }

  function restart() {
    setTarget(createTarget());
    setGuess('');
    setAttempts(0);
    setMessage('Я загадал новое число от 1 до 20');
    setFinished(false);
  }

  return (
    <section className="mini-game-page">
      <MiniGameHeader title="Угадай число" description="Следуй подсказкам и найди секретное число." score={wins} scoreLabel="ПОБЕДЫ" />
      <div className="mini-game-card">
        <form className="guess-game" onSubmit={checkGuess}>
          <span>🔮</span><label htmlFor="number-guess">Введи число</label>
          <input id="number-guess" type="number" min="1" max="20" inputMode="numeric" value={guess} onChange={(event) => setGuess(event.target.value)} disabled={finished} autoFocus />
          <button type="submit" disabled={finished}>Проверить</button>
        </form>
        <aside className="mini-game-info"><span>{finished ? '🎉' : '💭'}</span><h2>{message}</h2><p>Попыток в этом раунде: {attempts}</p>{finished && <button type="button" onClick={restart}>Загадать ещё</button>}</aside>
      </div>
    </section>
  );
}
