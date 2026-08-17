export const SNAKE_BOARD_SIZE = 14;

export type SnakeDirection = 'up' | 'down' | 'left' | 'right';

export interface SnakePoint {
  x: number;
  y: number;
}

export interface SnakeRound {
  snake: SnakePoint[];
  food: SnakePoint;
  score: number;
}

const steps: Record<SnakeDirection, SnakePoint> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const oppositeDirections: Record<SnakeDirection, SnakeDirection> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

function samePoint(first: SnakePoint, second: SnakePoint) {
  return first.x === second.x && first.y === second.y;
}

export function createFood(snake: SnakePoint[]): SnakePoint {
  const freeCells: SnakePoint[] = [];
  for (let y = 0; y < SNAKE_BOARD_SIZE; y += 1) {
    for (let x = 0; x < SNAKE_BOARD_SIZE; x += 1) {
      const point = { x, y };
      if (!snake.some((part) => samePoint(part, point))) freeCells.push(point);
    }
  }
  return freeCells[Math.floor(Math.random() * freeCells.length)] ?? { x: 0, y: 0 };
}

export function createSnakeRound(): SnakeRound {
  const snake = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }];
  return { snake, food: createFood(snake), score: 0 };
}

export function moveSnake(round: SnakeRound, direction: SnakeDirection): SnakeRound | null {
  const head = round.snake[0];
  const step = steps[direction];
  const nextHead = { x: head.x + step.x, y: head.y + step.y };
  const ateFood = samePoint(nextHead, round.food);
  const bodyToCheck = ateFood ? round.snake : round.snake.slice(0, -1);
  const hitWall = nextHead.x < 0 || nextHead.y < 0 || nextHead.x >= SNAKE_BOARD_SIZE || nextHead.y >= SNAKE_BOARD_SIZE;
  if (hitWall || bodyToCheck.some((part) => samePoint(part, nextHead))) return null;

  const snake = [nextHead, ...round.snake];
  if (!ateFood) snake.pop();
  return {
    snake,
    food: ateFood ? createFood(snake) : round.food,
    score: round.score + (ateFood ? 1 : 0),
  };
}
