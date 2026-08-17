import { FormEvent, useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../components/ChatMessage';
import { PetPortrait } from '../components/PetPortrait';
import { useGame } from '../context/GameContext';
import { petOptions } from '../data/gameData';
import { askPet, ChatMessageData } from '../lib/petChat';

const quickMessages = ['Как у тебя дела?', 'Давай поиграем!', 'Расскажи секрет 🤫'];

function makeMessage(role: ChatMessageData['role'], text: string): ChatMessageData {
  return { id: crypto.randomUUID(), role, text };
}

export function ChatPage() {
  const { petName, petType, playerName } = useGame();
  const pet = petOptions.find((option) => option.id === petType) ?? petOptions[0];
  const storageKey = `pet-chat-${petType}-${petName}`;
  const [messages, setMessages] = useState<ChatMessageData[]>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try { return JSON.parse(saved) as ChatMessageData[]; } catch { /* Начинаем новый чат. */ }
    }
    return [makeMessage('pet', `Привет, ${playerName}! Я так рад, что у нас теперь есть свой чат. Как ты?` )];
  });
  const [text, setText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, storageKey]);

  async function sendMessage(messageText: string) {
    const cleanText = messageText.trim();
    if (!cleanText || isReplying) return;
    const nextMessages = [...messages, makeMessage('user', cleanText)];
    setMessages(nextMessages);
    setText('');
    setError('');
    setIsReplying(true);

    try {
      const reply = await askPet(nextMessages, petName, petType, playerName);
      setMessages((current) => [...current, makeMessage('pet', reply)]);
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
        {messages.map((message) => <ChatMessage key={message.id} message={message} petImage={pet.image} petName={petName} />)}
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
