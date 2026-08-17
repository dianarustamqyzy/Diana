import { SNAKE_BOARD_SIZE, SnakePoint } from '../lib/snakeGame';

interface SnakeBoardProps {
  snake: SnakePoint[];
  food: SnakePoint;
}

export function SnakeBoard({ snake, food }: SnakeBoardProps) {
  const cells = Array.from({ length: SNAKE_BOARD_SIZE ** 2 });
  return (
    <div className="snake-board" aria-label="Игровое поле змейки">
      {cells.map((_, index) => {
        const x = index % SNAKE_BOARD_SIZE;
        const y = Math.floor(index / SNAKE_BOARD_SIZE);
        const snakeIndex = snake.findIndex((part) => part.x === x && part.y === y);
        const isFood = food.x === x && food.y === y;
        const className = isFood ? 'snake-cell food' : snakeIndex === 0 ? 'snake-cell head' : snakeIndex > 0 ? 'snake-cell body' : 'snake-cell';
        return <span className={className} key={index}>{isFood ? '🍎' : ''}</span>;
      })}
    </div>
  );
}
