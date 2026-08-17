import { PetType, petOptions } from '../data/gameData';
import { PetPortrait } from './PetPortrait';

interface PetAvatarProps {
  type: PetType;
  mood?: 'happy' | 'sleepy';
  size?: 'normal' | 'large';
}

export function PetAvatar({ type, mood = 'happy', size = 'normal' }: PetAvatarProps) {
  const pet = petOptions.find((item) => item.id === type) ?? petOptions[0];

  return (
    <div
      className={`pet-avatar pet-avatar--${size}`}
      role="img"
      aria-label={`${pet.label} ${mood === 'happy' ? 'радуется' : 'зевает'}`}
    >
      <span className="spark spark-one">✦</span>
      <span className="spark spark-two">✧</span>
      <PetPortrait className={`pet-image pet-image--${type}`} image={pet.image} />
      <span className="pet-shadow" />
    </div>
  );
}
