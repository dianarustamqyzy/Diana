import { Dispatch, SetStateAction, useEffect } from 'react';
import { CareStats, PetMeal } from '../context/gameState';
import { ShopItem, shopItems } from '../data/shopData';
import { CareWishRoutine, CareWishes, completeCareWish } from '../lib/petWishes';

type AutonomousCareOptions = {
  wishes: CareWishes;
  activeMeal: PetMeal | null;
  isBusy: boolean;
  coins: number;
  inventory: Record<string, number>;
  setCoins: Dispatch<SetStateAction<number>>;
  setInventory: Dispatch<SetStateAction<Record<string, number>>>;
  setCare: Dispatch<SetStateAction<CareStats>>;
  setCareRoutine: Dispatch<SetStateAction<CareWishRoutine>>;
  startMeal: (item: ShopItem, boughtByPet?: boolean) => void;
};

export function useAutonomousCare(options: AutonomousCareOptions) {
  const {
    wishes, activeMeal, isBusy, coins, inventory,
    setCoins, setInventory, setCare, setCareRoutine, startMeal,
  } = options;

  useEffect(() => {
    const wantedItemId = wishes.food ?? wishes.water;
    if (!wantedItemId || activeMeal || isBusy) return;
    const item = shopItems.find((shopItem) => shopItem.id === wantedItemId);
    const hasItem = Boolean(item && (inventory[item.id] ?? 0) > 0);
    if (!item?.effect || (!hasItem && coins < item.price)) return;
    const effect = item.effect;

    const timer = window.setTimeout(() => {
      if (hasItem) {
        setInventory((current) => ({ ...current, [item.id]: current[item.id] - 1 }));
      } else {
        setCoins(coins - item.price);
      }
      setCare((current) => ({
        ...current,
        [effect.stat]: Math.min(current[effect.stat] + effect.amount, 100),
      }));
      setCareRoutine((current) => completeCareWish(current, effect.stat, item.id));
      startMeal(item, true);
    }, 2_500);

    return () => window.clearTimeout(timer);
  }, [activeMeal, coins, inventory, isBusy, setCare, setCareRoutine, setCoins, setInventory, startMeal, wishes.food, wishes.water]);
}
