import { Link } from 'wouter';
import { SnakeBoard } from '../components/SnakeBoard';
import { SnakeControls } from '../components/SnakeControls';
import { useGame } from '../context/GameContext';
import { useSnakeGame } from '../hooks/useSnakeGame';

export function SnakeGamePage() {
  const { addCoins } = useGame();
  const game = useSnakeGame(addCoins);
  const isStopped = game.status === 'ready' || game.status === 'paused' || game.status === 'over';

  return (
    <section className="snake-page">
      <Link href="/games" className="back-to-games">← Все игры</Link>
      <header className="snake-heading">
        <div><p className="eyebrow">МИНИ-ИГРА</p><h1>Змейка</h1><p>Собирай яблоки. За каждое яблоко получишь 1 монетку!</p></div>
        <div className="snake-score"><span><small>СЧЁТ</small><strong>{game.score}</strong></span><span><small>РЕКОРД</small><strong>{game.bestScore}</strong></span></div>
      </header>
      <div className="snake-game-card">
        <div className="snake-board-wrap">
          <SnakeBoard snake={game.snake} food={game.food} />
          {isStopped && (
            <div className="snake-overlay">
              <span>{game.status === 'over' ? '🌟' : game.status === 'paused' ? '⏸️' : '🐍'}</span>
              <h2>{game.status === 'over' ? 'Хорошая попытка!' : game.status === 'paused' ? 'Пауза' : 'Готова играть?'}</h2>
              <p>{game.status === 'over' ? `Твой счёт: ${game.score}` : 'Не касайся стен и своего хвоста.'}</p>
              <button type="button" onClick={game.status === 'over' ? game.restart : game.togglePause}>{game.status === 'over' ? 'Играть ещё' : 'Начать'}</button>
            </div>
          )}
        </div>
        <aside className="snake-tools">
          <div><p className="eyebrow">УПРАВЛЕНИЕ</p><h2>Покажи ловкость</h2></div>
          <SnakeControls onDirection={game.chooseDirection} />
          <p>На компьютере используй стрелки или клавиши WASD. Пробел ставит игру на паузу.</p>
          <div className="snake-actions">
            <button type="button" onClick={game.togglePause}>{game.status === 'paused' ? 'Продолжить' : 'Пауза'}</button>
            <button type="button" onClick={game.restart}>Заново</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
