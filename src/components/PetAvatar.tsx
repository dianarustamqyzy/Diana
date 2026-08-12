import { useState } from 'react';
import { PetType, petOptions } from '../data/gameData';
import { speakPet } from '../lib/petSpeech';
import { PetPortrait } from './PetPortrait';

interface PetAvatarProps {
  type: PetType;
  mood?: 'happy' | 'sleepy';
  size?: 'normal' | 'large';
}

export function PetAvatar({ type, mood = 'happy', size = 'normal' }: PetAvatarProps) {
  const pet = petOptions.find((item) => item.id === type) ?? petOptions[0];
  const [isReacting, setIsReacting] = useState(false);

  function greet() {
    setIsReacting(false);
    window.requestAnimationFrame(() => setIsReacting(true));
    speakPet('Привет! Давай дружить и заботиться друг о друге!', type);
  }

  return (
    <button
      className={`pet-avatar pet-avatar--${size}${isReacting ? ' is-reacting' : ''}`}
      type="button"
      onClick={greet}
      onAnimationEnd={() => setIsReacting(false)}
      aria-label={`${pet.label} ${mood === 'happy' ? 'радуется' : 'зевает'}. Нажми, чтобы поздороваться`}
      title="Нажми на питомца"
    >
      <span className="spark spark-one">✦</span>
      <span className="spark spark-two">✧</span>
      <PetPortrait className="pet-image" image={pet.image} />
      <span className="pet-shadow" />
      <span className="pet-sound-hint" aria-hidden="true">♪</span>
    </button>
  );
}
