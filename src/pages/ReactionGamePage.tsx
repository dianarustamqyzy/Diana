import { useEffect, useRef, useState } from 'react';
import { MiniGameHeader } from '../components/MiniGameHeader';
import { useGame } from '../context/GameContext';

type ReactionState = 'idle' | 'waiting' | 'ready' | 'result' | 'early';

export function ReactionGamePage() {
  const { addCoins } = useGame();
  const [state, setState] = useState<ReactionState>('idle');
  const [reaction, setReaction] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const readyAt = useRef(0);

  useEffect(() => {
    if (state !== 'waiting') return;
    const delay = 1200 + Math.random() * 2200;
    const timer = window.setTimeout(() => {
      readyAt.current = performance.now();
      setState('ready');
    }, delay);
    return () => window.clearTimeout(timer);
  }, [state]);

  function handleClick() {
    if (state === 'idle' || state === 'result' || state === 'early') {
      setReaction(null);
      setState('waiting');
      return;
    }
    if (state === 'waiting') return setState('early');
    const time = Math.round(performance.now() - readyAt.current);
    setReaction(time);
    setBest((current) => current === null ? time : Math.min(current, time));
    setState('result');
    addCoins(1);
  }

  const text = state === 'waiting' ? 'Жди зелёный сигнал…' : state === 'ready' ? 'ЖМИ!' : state === 'early'
    ? 'Слишком рано!' : state === 'result' ? `${reaction} мс — отлично!` : 'Проверь свою скорость';
  const hint = state === 'idle' ? 'Нажми, чтобы начать' : state === 'result' || state === 'early'
    ? 'Нажми для новой попытки' : state === 'waiting' ? 'Не нажимай пока' : 'Сейчас!';

  return (
    <section className="mini-game-page">
      <MiniGameHeader title="Быстрая лапка" description="Дождись зелёного сигнала и нажми на поле!" score={best ?? 0} scoreLabel="РЕКОРД, МС" />
      <button type="button" className={`reaction-zone ${state}`} onClick={handleClick}>
        <span>{state === 'ready' ? '⚡' : state === 'early' ? '🙈' : '🐾'}</span><strong>{text}</strong><small>{hint}</small>
      </button>
      <p className="reaction-reward">Каждая завершённая попытка приносит 1 монетку.</p>
    </section>
  );
}
