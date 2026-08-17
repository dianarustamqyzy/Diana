import { SnakeDirection } from '../lib/snakeGame';

export function SnakeControls({ onDirection }: { onDirection: (direction: SnakeDirection) => void }) {
  return (
    <div className="snake-controls" aria-label="Управление змейкой">
      <button type="button" onClick={() => onDirection('up')} aria-label="Вверх">↑</button>
      <button type="button" onClick={() => onDirection('left')} aria-label="Влево">←</button>
      <button type="button" onClick={() => onDirection('down')} aria-label="Вниз">↓</button>
      <button type="button" onClick={() => onDirection('right')} aria-label="Вправо">→</button>
    </div>
  );
}
