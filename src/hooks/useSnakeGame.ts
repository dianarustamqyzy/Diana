import { useCallback, useEffect, useRef, useState } from 'react';
import { createSnakeRound, moveSnake, oppositeDirections, SnakeDirection } from '../lib/snakeGame';

const BEST_SCORE_KEY = 'snake-best-score';

export function useSnakeGame(onReward: (amount: number) => void) {
  const [round, setRound] = useState(createSnakeRound);
  const [status, setStatus] = useState<'ready' | 'playing' | 'paused' | 'over'>('ready');
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem(BEST_SCORE_KEY)) || 0);
  const direction = useRef<SnakeDirection>('right');
  const queuedDirection = useRef<SnakeDirection>('right');
  const rewardedScore = useRef(0);

  const chooseDirection = useCallback((next: SnakeDirection) => {
    if (oppositeDirections[direction.current] !== next) queuedDirection.current = next;
    setStatus((current) => current === 'ready' ? 'playing' : current);
  }, []);

  const restart = useCallback(() => {
    direction.current = 'right';
    queuedDirection.current = 'right';
    rewardedScore.current = 0;
    setRound(createSnakeRound());
    setStatus('playing');
  }, []);

  const togglePause = useCallback(() => {
    setStatus((current) => current === 'playing' ? 'paused' : current === 'paused' || current === 'ready' ? 'playing' : current);
  }, []);

  useEffect(() => {
    if (status !== 'playing') return;
    const delay = Math.max(85, 175 - round.score * 4);
    const timer = window.setInterval(() => {
      direction.current = queuedDirection.current;
      setRound((current) => {
        const next = moveSnake(current, direction.current);
        if (!next) {
          setStatus('over');
          return current;
        }
        return next;
      });
    }, delay);
    return () => window.clearInterval(timer);
  }, [round.score, status]);

  useEffect(() => {
    const earnedCoins = round.score;
    const rewardedCoins = rewardedScore.current;
    if (earnedCoins <= rewardedCoins) return;
    rewardedScore.current = round.score;
    onReward(earnedCoins - rewardedCoins);
  }, [onReward, round.score]);

  useEffect(() => {
    if (round.score <= bestScore) return;
    setBestScore(round.score);
    localStorage.setItem(BEST_SCORE_KEY, String(round.score));
  }, [bestScore, round.score]);

  useEffect(() => {
    const directions: Record<string, SnakeDirection> = {
      ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down',
      ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right',
    };
    const handleKey = (event: KeyboardEvent) => {
      const next = directions[event.key];
      if (next) {
        event.preventDefault();
        chooseDirection(next);
      }
      if (event.code === 'Space') {
        event.preventDefault();
        togglePause();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [chooseDirection, status, togglePause]);

  return { ...round, status, bestScore, chooseDirection, restart, togglePause };
}
