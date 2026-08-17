import { useCallback, useEffect, useState } from 'react';

const toiletTimerKey = 'pet-game-next-toilet-at';
const MIN_BREAK_MS = 3 * 60_000;
const EXTRA_BREAK_MS = 2 * 60_000;

function loadNextToiletAt(): number {
  const savedTime = Number(localStorage.getItem(toiletTimerKey));
  return Number.isFinite(savedTime) && savedTime > 0 ? savedTime : 0;
}

function createNextToiletTime(): number {
  return Date.now() + MIN_BREAK_MS + Math.random() * EXTRA_BREAK_MS;
}

export function usePetToilet() {
  const [nextToiletAt, setNextToiletAt] = useState(loadNextToiletAt);
  const [now, setNow] = useState(Date.now);
  const isToiletNeeded = nextToiletAt === 0 || now >= nextToiletAt;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const helpPetUseToilet = useCallback(() => {
    if (!isToiletNeeded) return;
    const nextTime = createNextToiletTime();
    localStorage.setItem(toiletTimerKey, String(nextTime));
    setNextToiletAt(nextTime);
    setNow(Date.now());
  }, [isToiletNeeded]);

  useEffect(() => {
    if (!isToiletNeeded) return;
    const timer = window.setTimeout(helpPetUseToilet, 10_000);
    return () => window.clearTimeout(timer);
  }, [helpPetUseToilet, isToiletNeeded]);

  return { isToiletNeeded };
}
