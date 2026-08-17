import { PetType } from '../data/gameData';
import { ShopItem } from '../data/shopData';
import { CareWishes } from '../lib/petWishes';

export interface CareStats {
  food: number;
  water: number;
}

export interface PetMeal {
  emoji: string;
  itemName: string;
  isDrink: boolean;
  boughtByPet: boolean;
  endsAt: number;
}

export interface GameState {
  today: string;
  playerName: string;
  petName: string;
  petType: PetType;
  level: number;
  coins: number;
  completed: string[];
  purchased: string[];
  inventory: Record<string, number>;
  care: CareStats;
  wishes: CareWishes;
  activeMeal: PetMeal | null;
  isToiletNeeded: boolean;
  isBathing: boolean;
  pendingLevelGift: number | null;
  startGame: (player: string, pet: string, type: PetType) => void;
  addCoins: (amount: number) => void;
  completeMission: (id: string) => void;
  dismissLevelGift: () => void;
  buyItem: (item: ShopItem) => void;
  giveItem: (item: ShopItem) => void;
  startBath: () => void;
}
