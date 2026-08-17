import { PetType } from '../data/gameData';

const profileKey = 'pet-game-profile';
const dailyProgressKey = 'pet-game-daily-progress';
const diaryKey = 'pet-game-diary';
const lifetimeProgressKey = 'pet-game-lifetime-progress';

export interface SavedProfile {
  playerName: string;
  petName: string;
  petType: PetType;
}

export interface DailyProgress {
  date: string;
  completed: string[];
  food: number;
  water: number;
  foodWishId?: string | null;
  waterWishId?: string | null;
  careWishStage?: 'food' | 'water' | 'waiting';
  nextCareWishAt?: number | null;
}

export interface DailyDiary {
  date: string;
  mood: string;
  note: string;
}

export interface LifetimeProgress {
  completedMissions: number;
  coins: number;
}

export function getTodayKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readJson(key: string): unknown {
  const value = localStorage.getItem(key);
  if (!value) return null;
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

export function loadProfile(): SavedProfile | null {
  const value = readJson(profileKey);
  if (!value || typeof value !== 'object') return null;
  const profile = value as Partial<SavedProfile>;
  if (typeof profile.playerName !== 'string' || typeof profile.petName !== 'string' || typeof profile.petType !== 'string') return null;
  return profile as SavedProfile;
}

export function saveProfile(profile: SavedProfile): void {
  localStorage.setItem(profileKey, JSON.stringify(profile));
}

export function loadDailyProgress(): DailyProgress {
  const value = readJson(dailyProgressKey);
  const today = getTodayKey();
  if (!value || typeof value !== 'object') return { date: today, completed: [], food: 54, water: 62 };
  const progress = value as Partial<DailyProgress>;
  if (progress.date !== today || !Array.isArray(progress.completed)) return { date: today, completed: [], food: 54, water: 62 };
  return {
    date: today,
    completed: progress.completed.filter((id): id is string => typeof id === 'string'),
    food: typeof progress.food === 'number' ? progress.food : 54,
    water: typeof progress.water === 'number' ? progress.water : 62,
    foodWishId: typeof progress.foodWishId === 'string' || progress.foodWishId === null ? progress.foodWishId : undefined,
    waterWishId: typeof progress.waterWishId === 'string' || progress.waterWishId === null ? progress.waterWishId : undefined,
    careWishStage: progress.careWishStage === 'food' || progress.careWishStage === 'water' || progress.careWishStage === 'waiting'
      ? progress.careWishStage
      : undefined,
    nextCareWishAt: typeof progress.nextCareWishAt === 'number' || progress.nextCareWishAt === null
      ? progress.nextCareWishAt
      : undefined,
  };
}

export function saveDailyProgress(progress: Omit<DailyProgress, 'date'>): void {
  localStorage.setItem(dailyProgressKey, JSON.stringify({ date: getTodayKey(), ...progress }));
}

export function loadLifetimeProgress(fallbackCompleted = 0): LifetimeProgress {
  const value = readJson(lifetimeProgressKey);
  if (!value || typeof value !== 'object') return { completedMissions: fallbackCompleted, coins: 120 };
  const progress = value as Partial<LifetimeProgress>;
  return {
    completedMissions: typeof progress.completedMissions === 'number' ? Math.max(0, progress.completedMissions) : fallbackCompleted,
    coins: typeof progress.coins === 'number' ? Math.max(0, progress.coins) : 120,
  };
}

export function saveLifetimeProgress(progress: LifetimeProgress): void {
  localStorage.setItem(lifetimeProgressKey, JSON.stringify(progress));
}

export function loadDailyDiary(): DailyDiary | null {
  const value = readJson(diaryKey);
  if (!value || typeof value !== 'object') return null;
  const diary = value as Partial<DailyDiary>;
  if (diary.date !== getTodayKey() || typeof diary.mood !== 'string' || typeof diary.note !== 'string') return null;
  return diary as DailyDiary;
}

export function saveDailyDiary(mood: string, note: string): void {
  localStorage.setItem(diaryKey, JSON.stringify({ date: getTodayKey(), mood, note }));
}
