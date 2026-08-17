import { useEffect, useState } from 'react';
import { MiniGameHeader } from '../components/MiniGameHeader';
import { useGame } from '../context/GameContext';
import { createMemoryCards } from '../lib/memoryGame';

export function MemoryGamePage() {
  const { addCoins } = useGame();
  const [cards, setCards] = useState(createMemoryCards);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (open.length !== 2) return;
    const [first, second] = open;
    if (cards[first].emoji === cards[second].emoji) {
      setMatched((current) => [...current, first, second]);
      addCoins(1);
      setOpen([]);
      return;
    }
    const timer = window.setTimeout(() => setOpen([]), 700);
    return () => window.clearTimeout(timer);
  }, [open, cards, addCoins]);

  function turnCard(index: number) {
    if (open.length === 2 || open.includes(index) || matched.includes(index)) return;
    setOpen((current) => [...current, index]);
    if (open.length === 1) setMoves((current) => current + 1);
  }

  function restart() {
    setCards(createMemoryCards());
    setOpen([]);
    setMatched([]);
    setMoves(0);
  }

  const finished = matched.length === cards.length;
  return (
    <section className="mini-game-page">
      <MiniGameHeader title="Найди пару" description="Открой все пары. За каждую найденную пару — 1 монетка!" score={moves} scoreLabel="ХОДЫ" />
      <div className="mini-game-card memory-layout">
        <div className="memory-board">
          {cards.map((card, index) => {
            const visible = open.includes(index) || matched.includes(index);
            return <button className={`memory-card ${visible ? 'visible' : ''}`} type="button" key={card.id} onClick={() => turnCard(index)} aria-label={visible ? card.emoji : 'Закрытая карточка'}>{visible ? card.emoji : '✦'}</button>;
          })}
        </div>
        <aside className="mini-game-info"><span>{finished ? '🏆' : '🧠'}</span><h2>{finished ? 'Все пары найдены!' : 'Тренируй память'}</h2><p>{finished ? `Ты справилась за ${moves} ходов.` : 'Открывай по две карточки и запоминай, где спрятаны картинки.'}</p><button type="button" onClick={restart}>{finished ? 'Играть ещё' : 'Начать заново'}</button></aside>
      </div>
    </section>
  );
}
