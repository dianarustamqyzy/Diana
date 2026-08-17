export interface MathQuestion {
  text: string;
  answer: number;
}

export function createMathQuestion(): MathQuestion {
  const first = Math.floor(Math.random() * 10) + 1;
  const second = Math.floor(Math.random() * 10) + 1;
  const subtract = Math.random() > 0.5;
  const high = Math.max(first, second);
  const low = Math.min(first, second);
  return subtract
    ? { text: `${high} − ${low}`, answer: high - low }
    : { text: `${first} + ${second}`, answer: first + second };
}
