import { getTodayKey } from './dailyStorage';
import { ChatMessageData } from './petChat';

interface DailyChat {
  date: string;
  messages: ChatMessageData[];
}

function isChatMessage(value: unknown): value is ChatMessageData {
  if (!value || typeof value !== 'object') return false;
  const message = value as Partial<ChatMessageData>;
  return typeof message.id === 'string'
    && (message.role === 'user' || message.role === 'pet')
    && typeof message.text === 'string';
}

export function loadDailyChat(key: string): ChatMessageData[] | null {
  const saved = localStorage.getItem(key);
  if (!saved) return null;

  try {
    const chat = JSON.parse(saved) as Partial<DailyChat>;
    if (chat.date !== getTodayKey() || !Array.isArray(chat.messages)) return null;
    return chat.messages.filter(isChatMessage);
  } catch {
    return null;
  }
}

export function saveDailyChat(key: string, messages: ChatMessageData[], date: string): void {
  localStorage.setItem(key, JSON.stringify({ date, messages } satisfies DailyChat));
}
