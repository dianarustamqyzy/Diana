import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { getNextGiftLevel, LEVEL_GIFT_COINS, MAX_PET_LEVEL } from '../lib/levelProgress';

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

  const nextGiftLevel = getNextGiftLevel(pendingLevelGift);

  return (
    <div className="level-gift-backdrop" role="presentation">
      <section className="level-gift" role="dialog" aria-modal="true" aria-labelledby="level-gift-title">
        <div className="level-gift-sparkles" aria-hidden="true">✦ ✨ ✦</div>
        <span className="level-gift-box" aria-hidden="true">🎁</span>
        <p>ЮБИЛЕЙНЫЙ УРОВЕНЬ</p>
        <h2 id="level-gift-title">Уровень {pendingLevelGift}!</h2>
        <strong>+{LEVEL_GIFT_COINS} монет</strong>
        <span>{pendingLevelGift === MAX_PET_LEVEL
          ? 'Подарок уже в твоём кошельке 🎉 А питомец теперь совсем взрослый!'
          : `Подарок уже в твоём кошельке 🎉 Следующий — на ${nextGiftLevel}-м уровне.`}</span>
        <button type="button" onClick={dismissLevelGift} autoFocus>Забрать подарок</button>
      </section>
    </div>
  );
}
