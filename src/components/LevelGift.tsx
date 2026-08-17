import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { LEVEL_GIFT_COINS } from '../lib/levelProgress';

export function LevelGift() {
  const { pendingLevelGift, dismissLevelGift } = useGame();

  useEffect(() => {
    if (pendingLevelGift === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismissLevelGift();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [dismissLevelGift, pendingLevelGift]);

  if (pendingLevelGift === null) return null;

  return (
    <div className="level-gift-backdrop" role="presentation">
      <section className="level-gift" role="dialog" aria-modal="true" aria-labelledby="level-gift-title">
        <div className="level-gift-sparkles" aria-hidden="true">✦ ✨ ✦</div>
        <span className="level-gift-box" aria-hidden="true">🎁</span>
        <p>ЮБИЛЕЙНЫЙ УРОВЕНЬ</p>
        <h2 id="level-gift-title">Уровень {pendingLevelGift}!</h2>
        <strong>+{LEVEL_GIFT_COINS} монет</strong>
        <span>Подарок уже в твоём кошельке 🎉</span>
        <button type="button" onClick={dismissLevelGift} autoFocus>Забрать подарок</button>
      </section>
    </div>
  );
}
