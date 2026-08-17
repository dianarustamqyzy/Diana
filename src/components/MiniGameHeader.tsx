import { Link } from 'wouter';

interface MiniGameHeaderProps {
  title: string;
  description: string;
  score: number;
  scoreLabel?: string;
}

export function MiniGameHeader({ title, description, score, scoreLabel = 'СЧЁТ' }: MiniGameHeaderProps) {
  return (
    <>
      <Link href="/games" className="back-to-games">← Все игры</Link>
      <header className="mini-game-heading">
        <div><p className="eyebrow">МИНИ-ИГРА</p><h1>{title}</h1><p>{description}</p></div>
        <div className="mini-game-score"><small>{scoreLabel}</small><strong>{score}</strong></div>
      </header>
    </>
  );
}
