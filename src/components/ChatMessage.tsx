import { ChatMessageData } from '../lib/petChat';

interface ChatMessageProps {
  message: ChatMessageData;
  petImage: string;
  petName: string;
}

export function ChatMessage({ message, petImage, petName }: ChatMessageProps) {
  const isPet = message.role === 'pet';

  return (
    <article className={`chat-message chat-message--${message.role}`}>
      {isPet && <img src={petImage} alt="" className="chat-avatar" />}
      <div>
        <small>{isPet ? petName : 'Ты'}</small>
        <p>{message.text}</p>
      </div>
    </article>
  );
}
