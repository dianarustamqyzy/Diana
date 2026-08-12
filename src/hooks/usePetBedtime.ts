import { useEffect, useState } from 'react';

const BEDTIME_MINUTES = 21 * 60;
const WAKE_UP_MINUTES = 7 * 60 + 30;

function isBedtimeNow() {
  const now = new Date();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  return minutesNow >= BEDTIME_MINUTES || minutesNow < WAKE_UP_MINUTES;
}

export function usePetBedtime() {
  const [isBedtime, setIsBedtime] = useState(isBedtimeNow);

  useEffect(() => {
    const updateBedtime = () => setIsBedtime(isBedtimeNow());
    const timer = window.setInterval(updateBedtime, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return isBedtime;
}
