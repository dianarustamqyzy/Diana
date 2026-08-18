import { useCallback, useEffect, useState } from 'react';

const completedToiletVisitKey = 'pet-game-completed-toilet-visit';
const toiletVisitHours = [8, 14, 19] as const;

function getVisitId(date: Date, hour: number): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}-${String(hour).padStart(2, '0')}`;
}

function getDueVisitId(now: Date): string | null {
  const dueHours = toiletVisitHours.filter((hour) => now.getHours() >= hour);
  const dueHour = dueHours[dueHours.length - 1];
  return dueHour === undefined ? null : getVisitId(now, dueHour);
}

export function usePetToilet() {
  const [now, setNow] = useState(() => new Date());
  const [completedVisitId, setCompletedVisitId] = useState(
    () => localStorage.getItem(completedToiletVisitKey),
  );
  const dueVisitId = getDueVisitId(now);
  const isToiletNeeded = dueVisitId !== null && dueVisitId !== completedVisitId;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const finishToiletVisit = useCallback(() => {
    if (!dueVisitId) return;
    localStorage.setItem(completedToiletVisitKey, dueVisitId);
    setCompletedVisitId(dueVisitId);
  }, [dueVisitId]);

  useEffect(() => {
    if (!isToiletNeeded) return;
    const timer = window.setTimeout(finishToiletVisit, 10_000);
    return () => window.clearTimeout(timer);
  }, [finishToiletVisit, isToiletNeeded]);

  return { isToiletNeeded };
}
