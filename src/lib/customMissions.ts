import { Mission } from '../data/gameData';
import { supabase } from './supabase';

interface CustomMissionRow {
  id: string;
  task: string;
}

let userReady: Promise<void> | null = null;

function toMission(row: CustomMissionRow): Mission {
  return {
    id: row.id,
    icon: '⭐',
    title: 'Моя миссия',
    task: row.task,
    reward: 'Особенная награда',
    coins: 25,
    color: 'green',
  };
}

function ensureUser(): Promise<void> {
  userReady ??= (async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData.session) return;

    const { error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
  })();
  return userReady;
}

export async function loadCustomMissions(): Promise<Mission[]> {
  await ensureUser();
  const { data, error } = await supabase
    .from('custom_missions')
    .select('id, task')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data as CustomMissionRow[]).map(toMission);
}

export async function createCustomMission(task: string): Promise<Mission> {
  await ensureUser();
  const { data, error } = await supabase
    .from('custom_missions')
    .insert({ task })
    .select('id, task')
    .single();

  if (error) throw error;
  return toMission(data as CustomMissionRow);
}
