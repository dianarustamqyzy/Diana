import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { missions, PetType } from '../data/gameData';
import { ShopItem } from '../data/shopData';
import { getTodayKey, loadDailyProgress, loadLifetimeProgress, loadProfile, saveDailyProgress, saveLifetimeProgress, saveProfile } from '../lib/dailyStorage';
import { getLevel, isGiftLevel, LEVEL_GIFT_COINS } from '../lib/levelProgress';
import { completeCareWish, createCareWishRoutine, refreshCareWishRoutine } from '../lib/petWishes';
import { CareStats, GameState } from './gameState';
import { usePetToilet } from '../hooks/usePetToilet';
import { usePetMeal } from '../hooks/usePetMeal';
import { usePetHygiene } from '../hooks/usePetHygiene';
import { useAutonomousCare } from '../hooks/useAutonomousCare';

const GameContext = createContext<GameState | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const savedProfile = useMemo(loadProfile, []);
  const initialDaily = useMemo(loadDailyProgress, []);
  const initialLifetime = useMemo(() => loadLifetimeProgress(initialDaily.completed.length), [initialDaily.completed.length]);
  const [today, setToday] = useState(getTodayKey);
  const [playerName, setPlayerName] = useState(savedProfile?.playerName ?? 'Аня');
  const [petName, setPetName] = useState(savedProfile?.petName ?? 'Рыжик');
  const [petType, setPetType] = useState<PetType>(savedProfile?.petType ?? 'cat');
  const [coins, setCoins] = useState(initialLifetime.coins);
  const [completed, setCompleted] = useState<string[]>(initialDaily.completed);
  const completedRef = useRef(initialDaily.completed);
  const [totalCompleted, setTotalCompleted] = useState(initialLifetime.completedMissions);
  const totalCompletedRef = useRef(initialLifetime.completedMissions);
  const [purchased, setPurchased] = useState<string[]>([]);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [pendingLevelGift, setPendingLevelGift] = useState<number | null>(null);
  const [care, setCare] = useState<CareStats>({ food: initialDaily.food, water: initialDaily.water });
  const [careRoutine, setCareRoutine] = useState(() => createCareWishRoutine(
    { food: initialDaily.foodWishId, water: initialDaily.waterWishId },
    initialDaily.careWishStage,
    initialDaily.nextCareWishAt,
  ));
  const wishes = careRoutine.wishes;
  const level = getLevel(totalCompleted);
  const { isToiletNeeded } = usePetToilet();
  const { activeMeal, startMeal } = usePetMeal();
  const { isBathing, startBath } = usePetHygiene(isToiletNeeded || Boolean(activeMeal));

  useAutonomousCare({ wishes, activeMeal, isBusy: isToiletNeeded || isBathing, coins, inventory,
    setCoins, setInventory, setCare, setCareRoutine, startMeal });

  useEffect(() => {
    saveDailyProgress({
      completed,
      ...care,
      foodWishId: wishes.food,
      waterWishId: wishes.water,
      careWishStage: careRoutine.stage,
      nextCareWishAt: careRoutine.nextWishAt,
    });
  }, [completed, care, careRoutine, wishes]);

  useEffect(() => {
    saveLifetimeProgress({ completedMissions: totalCompleted, coins });
  }, [coins, totalCompleted]);

  useEffect(() => {
    const refreshWishes = () => setCareRoutine((current) => refreshCareWishRoutine(current));
    const waitTime = careRoutine.nextWishAt === null
      ? null
      : Math.max(careRoutine.nextWishAt - Date.now(), 0);
    const timer = waitTime === null ? null : window.setTimeout(refreshWishes, waitTime);
    window.addEventListener('focus', refreshWishes);
    return () => {
      if (timer !== null) window.clearTimeout(timer);
      window.removeEventListener('focus', refreshWishes);
    };
  }, [careRoutine.nextWishAt]);

  useEffect(() => {
    const resetForNewDay = () => {
      const currentDate = getTodayKey();
      if (currentDate === today) return;
      setToday(currentDate);
      const freshProgress = loadDailyProgress();
      completedRef.current = freshProgress.completed;
      setCompleted(freshProgress.completed);
      const freshCare = { food: freshProgress.food, water: freshProgress.water };
      setCare(freshCare);
      setCareRoutine(createCareWishRoutine({
        food: freshProgress.foodWishId,
        water: freshProgress.waterWishId,
      }, freshProgress.careWishStage, freshProgress.nextCareWishAt));
    };
    const timer = window.setInterval(resetForNewDay, 60_000);
    window.addEventListener('focus', resetForNewDay);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', resetForNewDay);
    };
  }, [today]);

  function startGame(player: string, pet: string, type: PetType) {
    setPlayerName(player);
    setPetName(pet);
    setPetType(type);
    saveProfile({ playerName: player, petName: pet, petType: type });
  }

  function addCoins(amount: number) {
    setCoins((current) => current + amount);
  }

  function completeMission(id: string) {
    if (completedRef.current.includes(id)) return;
    const mission = missions.find((item) => item.id === id);
    const previousLevel = getLevel(totalCompletedRef.current);
    const newLevel = getLevel(totalCompletedRef.current + 1);
    const levelGift = newLevel > previousLevel && isGiftLevel(newLevel);
    completedRef.current = [...completedRef.current, id];
    totalCompletedRef.current += 1;
    setCompleted(completedRef.current);
    setTotalCompleted(totalCompletedRef.current);
    setCoins((current) => current + (mission?.coins ?? 0) + (levelGift ? LEVEL_GIFT_COINS : 0));
    if (levelGift) setPendingLevelGift(newLevel);
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
    setCareRoutine((current) => completeCareWish(current, effect.stat, item.id));
    startMeal(item);
  }

  const value = useMemo(() => ({
    today, playerName, petName, petType, level, coins, completed, purchased, inventory, care, wishes, activeMeal, isToiletNeeded, isBathing,
    pendingLevelGift, startGame, addCoins, completeMission, dismissLevelGift: () => setPendingLevelGift(null), buyItem, giveItem,
    startBath,
  }), [today, playerName, petName, petType, level, coins, completed, purchased, inventory, care, wishes, activeMeal, isToiletNeeded, isBathing, pendingLevelGift, startBath]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used inside GameProvider');
  return context;
}
