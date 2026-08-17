export const MISSIONS_PER_LEVEL = 3;
export const GIFT_LEVEL_STEP = 10;
export const LEVEL_GIFT_COINS = 200;

export function getLevel(completedCount: number): number {
  return Math.floor(completedCount / MISSIONS_PER_LEVEL) + 1;
}

export function isGiftLevel(level: number): boolean {
  return level > 0 && level % GIFT_LEVEL_STEP === 0;
}

export function getNextGiftLevel(level: number): number {
  return Math.ceil((level + 1) / GIFT_LEVEL_STEP) * GIFT_LEVEL_STEP;
}
