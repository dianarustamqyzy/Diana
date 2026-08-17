import { shopItems } from '../data/shopData';

export type CareStat = 'food' | 'water';
export type CareWishes = Record<CareStat, string | null>;
export type CareWishStage = CareStat | 'waiting';

export interface CareWishRoutine {
  stage: CareWishStage;
  wishes: CareWishes;
  nextWishAt: number | null;
}

export const careWishDelayMs = 60 * 60 * 1000;

function chooseItem(stat: CareStat): string {
  const choices = shopItems.filter((item) => item.effect?.stat === stat);
  return choices[Math.floor(Math.random() * choices.length)].id;
}

function isWishForStat(itemId: string | null | undefined, stat: CareStat): itemId is string {
  return Boolean(itemId && shopItems.some((item) => item.id === itemId && item.effect?.stat === stat));
}

function request(stat: CareStat): CareWishRoutine {
  return {
    stage: stat,
    wishes: { food: stat === 'food' ? chooseItem('food') : null, water: stat === 'water' ? chooseItem('water') : null },
    nextWishAt: null,
  };
}

export function createCareWishRoutine(
  savedWishes?: Partial<CareWishes>,
  savedStage?: CareWishStage,
  savedNextWishAt?: number | null,
  now = Date.now(),
): CareWishRoutine {
  if (savedStage === 'waiting' && typeof savedNextWishAt === 'number' && savedNextWishAt > now) {
    return { stage: 'waiting', wishes: { food: null, water: null }, nextWishAt: savedNextWishAt };
  }
  if (savedStage === 'water' && isWishForStat(savedWishes?.water, 'water')) {
    return { stage: 'water', wishes: { food: null, water: savedWishes.water }, nextWishAt: null };
  }
  if (savedStage === 'food' && isWishForStat(savedWishes?.food, 'food')) {
    return { stage: 'food', wishes: { food: savedWishes.food, water: null }, nextWishAt: null };
  }
  if (isWishForStat(savedWishes?.water, 'water')) return request('water');
  return request('food');
}

export function refreshCareWishRoutine(routine: CareWishRoutine, now = Date.now()): CareWishRoutine {
  if (routine.stage !== 'waiting' || routine.nextWishAt === null || routine.nextWishAt > now) return routine;
  return request('food');
}

export function completeCareWish(
  routine: CareWishRoutine,
  stat: CareStat,
  itemId: string,
  now = Date.now(),
): CareWishRoutine {
  if (routine.stage !== stat || routine.wishes[stat] !== itemId) return routine;
  if (stat === 'food') return request('water');
  return { stage: 'waiting', wishes: { food: null, water: null }, nextWishAt: now + careWishDelayMs };
}
