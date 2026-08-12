import { PetType, petOptions } from '../data/gameData';
import { supabase } from './supabase';

export interface ChatMessageData {
  id: string;
  role: 'user' | 'pet';
  text: string;
}

const petPersonalities: Record<PetType, string> = {
  dragon: 'смелый, добрый и немного волшебный',
  fox: 'любознательный, находчивый и весёлый',
  cat: 'ласковый, уютный и игривый',
  dog: 'верный, энергичный и очень дружелюбный',
  bunny: 'нежный, заботливый и любящий природу',
  hedgehog: 'спокойный, мудрый и немного застенчивый',
  hamster: 'забавный, бодрый и любящий вкусняшки',
};

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
    `Твой характер: ${petPersonalities[petType]}.`,
    `Ты общаешься с другом по имени ${playerName} на русском языке.`,
    'Отвечай тепло, естественно и коротко: 1–3 предложения.',
    'Иногда используй подходящие эмодзи, но не ставь их в каждом предложении.',
    'Не говори, что ты AI, и не подписывай ответ своим именем.',
    'Не давай опасных советов. Если другу грустно или страшно, поддержи и предложи поговорить со взрослым, которому он доверяет.',
  ].join(' ');

  const { data, error } = await supabase.functions.invoke<{ text?: string; error?: string }>('ai', {
    body: { prompt: `Продолжи этот диалог от лица ${petName}:\n${history}`, system },
  });

  if (error) throw new Error('Не получилось получить ответ питомца.');
  if (!data?.text?.trim()) throw new Error(data?.error ?? 'Питомец задумался и не ответил.');
  return data.text.trim();
}
