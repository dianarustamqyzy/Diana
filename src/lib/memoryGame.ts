export interface MemoryCard {
  id: number;
  emoji: string;
}

const pictures = ['🐱', '🐶', '🐰', '🦊', '🐹', '🐲'];

export function createMemoryCards(): MemoryCard[] {
  return [...pictures, ...pictures]
    .map((emoji, id) => ({ id, emoji }))
    .sort(() => Math.random() - 0.5);
}
