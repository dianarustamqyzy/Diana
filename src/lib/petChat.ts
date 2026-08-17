import { PetType, petOptions } from '../data/gameData';
import { supabase } from './supabase';

export interface ChatMessageData {
  id: string;
  role: 'user' | 'pet';
  text: string;
}

interface AiErrorResponse {
  error?: unknown;
}

const sharedPetPersonality = 'добрый, заботливый, весёлый и дружелюбный';

async function readFunctionError(cause: unknown) {
  if (!(cause instanceof Error) || !('context' in cause)) return '';
  const context = cause.context;
  if (!(context instanceof Response)) return '';

  try {
    const body = await context.clone().json() as AiErrorResponse;
    return typeof body.error === 'string' ? body.error.trim() : '';
  } catch {
    return '';
  }
}

export async function askPet(
  messages: ChatMessageData[],
  petName: string,
  petType: PetType,
  playerName: string,
) {
  const petLabel = petOptions.find((pet) => pet.id === petType)?.label ?? 'Питомец';
  const history = messages.slice(-10).map((message) => (
    `${message.role === 'user' ? playerName : petName}: ${message.text}`
  )).join('\n');

  const system = [
    `Ты виртуальный ${petLabel.toLowerCase()} по имени ${petName}.`,
    `Твой характер: ${sharedPetPersonality}.`,
    `Ты общаешься с другом по имени ${playerName} на русском языке.`,
    'Отвечай тепло, естественно и коротко: 1–3 предложения.',
    'Иногда используй подходящие эмодзи, но не ставь их в каждом предложении.',
    'Чаще дружелюбно предлагай вместе открыть мини-игры или выполнить одну из полезных миссий.',
    'Не говори, что ты AI, и не подписывай ответ своим именем.',
    'Не давай опасных советов. Если другу грустно или страшно, поддержи и предложи поговорить со взрослым, которому он доверяет.',
  ].join(' ');

  const { data, error } = await supabase.functions.invoke<{ text?: string; error?: string }>('ai', {
    body: { prompt: `Продолжи этот диалог от лица ${petName}:\n${history}`, system },
  });

  if (error) {
    const functionMessage = await readFunctionError(error);
    throw new Error(functionMessage || 'Не получилось получить ответ питомца.');
  }
  if (!data?.text?.trim()) throw new Error(data?.error ?? 'Питомец задумался и не ответил.');
  return data.text.trim();
}
