import { PetType } from '../data/gameData';
import { PetPortrait } from './PetPortrait';

interface SleepingPetPoseProps {
  image: string;
  type: PetType;
  className?: string;
}

export function SleepingPetPose({ image, type, className = '' }: SleepingPetPoseProps) {
  return (
    <div className={`sleeping-pose sleeping-pose--${type} ${className}`.trim()} aria-hidden="true">
      <PetPortrait className="sleeping-pose-image" image={image} />
      <span className="sleeping-eyes">
        <i />
        <i />
      </span>
    </div>
  );
}
