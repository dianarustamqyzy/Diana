import { PetType, petOptions } from '../data/gameData';
import { PetPortrait } from './PetPortrait';

export function SleepingPet({ type }: { type: PetType }) {
  const pet = petOptions.find((item) => item.id === type) ?? petOptions[0];

  return (
    <div className="sleeping-pet" aria-label={`${pet.label} спит в пижаме`}>
      <div className="sleep-cloud" aria-hidden="true">Z z z</div>
      <div className="pet-bed">
        <span className="bed-headboard" aria-hidden="true" />
        <div className="sleeping-pet-wrap">
          <PetPortrait className="sleeping-pet-image" image={pet.walkImage} />
          <span className="pajama-cap" aria-hidden="true"><i /></span>
          <span className="pajama-collar" aria-hidden="true">★　•　★</span>
        </div>
        <span className="pajama-blanket" aria-hidden="true">☾　·　★　·　☾</span>
        <span className="bed-frame" aria-hidden="true" />
      </div>
    </div>
  );
}
