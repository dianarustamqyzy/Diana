import { useState } from 'react';
import { MiniGameHeader } from '../components/MiniGameHeader';
import { useGame } from '../context/GameContext';

const choices = [
  { id: 0, emoji: '🪨', name: 'Камень' },
  { id: 1, emoji: '✂️', name: 'Ножницы' },
  { id: 2, emoji: '📄', name: 'Бумага' },
];

export function RpsGamePage() {
  const { addCoins } = useGame();
  const [wins, setWins] = useState(0);
  const [petChoice, setPetChoice] = useState<number | null>(null);
  const [message, setMessage] = useState('Выбери свой жест');

  function play(player: number) {
    const pet = Math.floor(Math.random() * choices.length);
    setPetChoice(pet);
    if (player === pet) return setMessage('Ничья! Попробуй ещё раз');
    const won = (player === 0 && pet === 1) || (player === 1 && pet === 2) || (player === 2 && pet === 0);
    if (won) {
      setWins((current) => current + 1);
      addCoins(1);
      setMessage('Ты победила и получила монетку!');
    } else setMessage('Питомец победил. Реванш?');
  }

  return (
    <section className="mini-game-page">
      <MiniGameHeader title="Камень, ножницы, бумага" description="Обыгрывай питомца. Каждая победа приносит 1 монетку!" score={wins} scoreLabel="ПОБЕДЫ" />
      <div className="mini-game-card rps-layout">
        <div className="rps-choices">
          {choices.map((choice) => <button type="button" key={choice.id} onClick={() => play(choice.id)}><span>{choice.emoji}</span><strong>{choice.name}</strong></button>)}
        </div>
        <aside className="mini-game-info"><span>{petChoice === null ? '🐾' : choices[petChoice].emoji}</span><small>ВЫБОР ПИТОМЦА</small><h2>{message}</h2><p>Камень побеждает ножницы, ножницы — бумагу, а бумага — камень.</p></aside>
      </div>
    </section>
  );
}
