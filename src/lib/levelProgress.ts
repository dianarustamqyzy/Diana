export const MISSIONS_PER_LEVEL = 3;
export const GIFT_LEVEL_STEP = 10;
export const LEVEL_GIFT_COINS = 200;
export const MAX_PET_LEVEL = 100;

export function getLevel(completedCount: number): number {
  return Math.min(Math.floor(completedCount / MISSIONS_PER_LEVEL) + 1, MAX_PET_LEVEL);
}

export function hasPetGrown(level: number): boolean {
  return level >= MAX_PET_LEVEL;
}

export function isGiftLevel(level: number): boolean {
  return level > 0 && level % GIFT_LEVEL_STEP === 0;
}

export function getNextGiftLevel(level: number): number {
  return Math.ceil((level + 1) / GIFT_LEVEL_STEP) * GIFT_LEVEL_STEP;
}
