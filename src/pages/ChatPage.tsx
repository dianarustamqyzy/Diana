import { FormEvent, useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../components/ChatMessage';
import { PetPortrait } from '../components/PetPortrait';
import { useGame } from '../context/GameContext';
import { petOptions } from '../data/gameData';
import { getTodayKey } from '../lib/dailyStorage';
import { askPet, ChatMessageData } from '../lib/petChat';
import { loadDailyChat, saveDailyChat } from '../lib/petChatStorage';

const quickMessages = ['Как у тебя дела?', 'Давай поиграем!', 'Расскажи секрет 🤫'];

function makeMessage(role: ChatMessageData['role'], text: string): ChatMessageData {
  return { id: crypto.randomUUID(), role, text };
}

function makeGreeting(playerName: string): ChatMessageData[] {
  return [makeMessage('pet', `Привет, ${playerName}! Я так рад, что у нас теперь есть свой чат. Как ты?`)];
}

interface ChatSession {
  date: string;
  messages: ChatMessageData[];
}

export function ChatPage() {
  const { petName, petType, playerName } = useGame();
  const pet = petOptions.find((option) => option.id === petType) ?? petOptions[0];
  const storageKey = `pet-chat-${petType}-${petName}`;
  const [session, setSession] = useState<ChatSession>(() => ({
    date: getTodayKey(),
    messages: loadDailyChat(storageKey) ?? makeGreeting(playerName),
  }));
  const [text, setText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    saveDailyChat(storageKey, session.messages, session.date);
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session, storageKey]);

  useEffect(() => {
    const checkForNewDay = () => {
      const today = getTodayKey();
      setSession((current) => current.date === today
        ? current
        : { date: today, messages: makeGreeting(playerName) });
    };
    const timer = window.setInterval(checkForNewDay, 30_000);
    window.addEventListener('focus', checkForNewDay);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', checkForNewDay);
    };
  }, [playerName]);

  async function sendMessage(messageText: string) {
    const cleanText = messageText.trim();
    if (!cleanText || isReplying) return;
    const requestDate = session.date;
    const nextMessages = [...session.messages, makeMessage('user', cleanText)];
    setSession((current) => ({ ...current, messages: nextMessages }));
    setText('');
    setError('');
    setIsReplying(true);

    try {
      const reply = await askPet(nextMessages, petName, petType, playerName);
      setSession((current) => current.date === requestDate
        ? { ...current, messages: [...current.messages, makeMessage('pet', reply)] }
        : current);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Что-то пошло не так.');
    } finally {
      setIsReplying(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(text);
  }

  return (
    <section className="chat-page">
      <header className="chat-heading">
        <PetPortrait image={pet.image} className="chat-heading-avatar" />
        <div><small>ЛИЧНЫЙ ЧАТ</small><h1>{petName}</h1><p><span /> рядом с тобой</p></div>
      </header>

      <div className="chat-window" aria-live="polite">
        {session.messages.map((message) => <ChatMessage key={message.id} message={message} petImage={pet.image} petName={petName} />)}
        {isReplying && <div className="typing"><i /><i /><i /><span>{petName} печатает…</span></div>}
        <div ref={bottomRef} />
      </div>

      {error && <p className="chat-error">{error} Попробуй отправить сообщение ещё раз.</p>}
      <div className="quick-messages">
        {quickMessages.map((message) => <button key={message} type="button" onClick={() => void sendMessage(message)} disabled={isReplying}>{message}</button>)}
      </div>
      <form className="chat-form" onSubmit={submit}>
        <input value={text} onChange={(event) => setText(event.target.value)} maxLength={500} placeholder={`Напиши ${petName}…`} aria-label={`Сообщение для ${petName}`} />
        <button type="submit" disabled={!text.trim() || isReplying} aria-label="Отправить сообщение">➜</button>
      </form>
    </section>
  );
}
