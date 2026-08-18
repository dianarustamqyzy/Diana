import { useCallback, useEffect, useState } from 'react';

const completedBathKey = 'pet-game-completed-bath';
const LUNCH_BATH_HOUR = 14;
const BATH_DURATION_MS = 10_000;

function getBathId(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function usePetHygiene(isBusy: boolean) {
  const [isBathing, setIsBathing] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [completedBathId, setCompletedBathId] = useState(
    () => localStorage.getItem(completedBathKey),
  );
  const todayBathId = getBathId(now);
  const isBathDue = now.getHours() >= LUNCH_BATH_HOUR && completedBathId !== todayBathId;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const startBath = useCallback(() => {
    if (isBusy || isBathing || !isBathDue) return;
    setIsBathing(true);
  }, [isBathDue, isBathing, isBusy]);

  useEffect(() => {
    if (isBusy || isBathing || !isBathDue) return;
    startBath();
  }, [isBathDue, isBathing, isBusy, startBath]);

  useEffect(() => {
    if (!isBathing) return;
    const timer = window.setTimeout(() => {
      localStorage.setItem(completedBathKey, todayBathId);
      setCompletedBathId(todayBathId);
      setIsBathing(false);
    }, BATH_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [isBathing, todayBathId]);

  return { isBathing, startBath };
}
