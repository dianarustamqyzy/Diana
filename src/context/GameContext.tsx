import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { missions, PetType, ShopItem } from '../data/gameData';

interface CareStats {
  food: number;
  water: number;
}

interface GameState {
  playerName: string;
  petName: string;
  petType: PetType;
  coins: number;
  completed: string[];
  purchased: string[];
  inventory: Record<string, number>;
  care: CareStats;
  startGame: (player: string, pet: string, type: PetType) => void;
  completeMission: (id: string) => void;
  buyItem: (item: ShopItem) => void;
  giveItem: (item: ShopItem) => void;
}

const GameContext = createContext<GameState | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [playerName, setPlayerName] = useState('Аня');
  const [petName, setPetName] = useState('Рыжик');
  const [petType, setPetType] = useState<PetType>('cat');
  const [coins, setCoins] = useState(120);
  const [completed, setCompleted] = useState<string[]>([]);
  const [purchased, setPurchased] = useState<string[]>([]);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [care, setCare] = useState<CareStats>({ food: 54, water: 62 });

  function startGame(player: string, pet: string, type: PetType) {
    setPlayerName(player);
    setPetName(pet);
    setPetType(type);
  }

  function completeMission(id: string) {
    if (completed.includes(id)) return;
    const mission = missions.find((item) => item.id === id);
    setCompleted((current) => [...current, id]);
    setCoins((current) => current + (mission?.coins ?? 0));
  }

  function buyItem(item: ShopItem) {
    if (coins < item.price) return;
    if (!item.effect && purchased.includes(item.id)) return;
    setCoins((current) => current - item.price);
    if (item.effect) {
      setInventory((current) => ({ ...current, [item.id]: (current[item.id] ?? 0) + 1 }));
    } else {
      setPurchased((current) => [...current, item.id]);
    }
  }

  function giveItem(item: ShopItem) {
    if (!item.effect || !inventory[item.id]) return;
    const effect = item.effect;
    setInventory((current) => ({ ...current, [item.id]: current[item.id] - 1 }));
    setCare((current) => ({
      ...current,
      [effect.stat]: Math.min(current[effect.stat] + effect.amount, 100),
    }));
  }

  const value = useMemo(() => ({
    playerName, petName, petType, coins, completed, purchased, inventory, care,
    startGame, completeMission, buyItem, giveItem,
  }), [playerName, petName, petType, coins, completed, purchased, inventory, care]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used inside GameProvider');
  return context;
}
