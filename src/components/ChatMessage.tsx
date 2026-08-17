import { ChatMessageData } from '../lib/petChat';
import { PetPortrait } from './PetPortrait';

interface ChatMessageProps {
  message: ChatMessageData;
  petImage: string;
  petName: string;
}

export function ChatMessage({ message, petImage, petName }: ChatMessageProps) {
  const isPet = message.role === 'pet';

  return (
    <article className={`chat-message chat-message--${message.role}`}>
      {isPet && <PetPortrait image={petImage} className="chat-avatar" />}
      <div>
        <small>{isPet ? petName : 'Ты'}</small>
        <p>{message.text}</p>
      </div>
    </article>
  );
}
