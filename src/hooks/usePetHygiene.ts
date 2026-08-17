import { useCallback, useEffect, useState } from 'react';

const nextBathKey = 'pet-game-next-bath-at';
const FIRST_BATH_DELAY_MS = 45_000;
const MIN_BATH_BREAK_MS = 4 * 60_000;
const EXTRA_BATH_BREAK_MS = 2 * 60_000;
const BATH_DURATION_MS = 10_000;

function createNextBathTime() {
  return Date.now() + MIN_BATH_BREAK_MS + Math.random() * EXTRA_BATH_BREAK_MS;
}

function loadNextBathAt() {
  const savedTime = Number(localStorage.getItem(nextBathKey));
  if (Number.isFinite(savedTime) && savedTime > 0) return savedTime;
  return Date.now() + FIRST_BATH_DELAY_MS;
}

export function usePetHygiene(isBusy: boolean) {
  const [nextBathAt, setNextBathAt] = useState(loadNextBathAt);
  const [isBathing, setIsBathing] = useState(false);
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    localStorage.setItem(nextBathKey, String(nextBathAt));
  }, [nextBathAt]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const startBath = useCallback(() => setIsBathing(true), []);

  useEffect(() => {
    if (isBusy || isBathing || now < nextBathAt) return;
    startBath();
  }, [isBathing, isBusy, nextBathAt, now, startBath]);

  useEffect(() => {
    if (!isBathing) return;
    const timer = window.setTimeout(() => {
      setIsBathing(false);
      setNextBathAt(createNextBathTime());
      setNow(Date.now());
    }, BATH_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [isBathing]);

  return { isBathing, startBath };
}
