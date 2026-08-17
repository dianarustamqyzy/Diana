import { useCallback, useEffect, useState } from 'react';
import { ShopItem } from '../data/shopData';
import { PetMeal } from '../context/gameState';

const mealDuration = 10_000;

export function usePetMeal() {
  const [activeMeal, setActiveMeal] = useState<PetMeal | null>(null);

  useEffect(() => {
    if (!activeMeal) return;
    const remainingTime = Math.max(activeMeal.endsAt - Date.now(), 0);
    const timer = window.setTimeout(() => setActiveMeal(null), remainingTime);
    return () => window.clearTimeout(timer);
  }, [activeMeal]);

  const startMeal = useCallback((item: ShopItem, boughtByPet = false) => {
    if (!item.effect) return;
    setActiveMeal({
      emoji: item.emoji,
      itemName: item.name,
      isDrink: item.effect.stat === 'water',
      boughtByPet,
      endsAt: Date.now() + mealDuration,
    });
  }, []);

  return { activeMeal, startMeal };
}
