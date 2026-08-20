import { CSSProperties, useEffect, useRef, useState } from 'react';
import roomImage from '../assets/scenes/pet-home-room.jpg';
import mobileRoomImage from '../assets/scenes/pet-home-room-mobile-v2.jpg';
import { petOptions, PetType } from '../data/gameData';
import { PetMeal } from '../context/gameState';
import { useDraggablePet } from '../hooks/useDraggablePet';
import { PetPortrait } from './PetPortrait';
import { SleepingPetPose } from './SleepingPetPose';

type HomePlace = 'center' | 'bath' | 'toilet' | 'table' | 'bed' | 'wardrobe';
const homePlaces: { id: HomePlace; icon: string; title: string }[] = [
  { id: 'bath', icon: '🚿', title: 'Ванная' },
  { id: 'toilet', icon: '🚽', title: 'Туалет' },
  { id: 'bed', icon: '🛏️', title: 'Кровать' },
  { id: 'wardrobe', icon: '👕', title: 'Шкаф' },
];

interface PetHomeRoomProps {
  petType: PetType;
  petName: string;
  isBedtime: boolean;
  isToiletNeeded: boolean;
  isBathing: boolean;
  activeMeal: PetMeal | null;
  careWishText: string | null;
  onStartBath: () => void;
  onOpenAccessoryShop: () => void;
}

export function PetHomeRoom({
  petType, petName, isBedtime, isToiletNeeded, isBathing, activeMeal,
  careWishText, onStartBath, onOpenAccessoryShop,
}: PetHomeRoomProps) {
  const pet = petOptions.find((option) => option.id === petType) ?? petOptions[0];
  const [activePlace, setActivePlace] = useState<HomePlace>(isBedtime ? 'bed' : 'center');
  const isUsingToilet = isToiletNeeded;
  const roomRef = useRef<HTMLDivElement>(null);
  const petRef = useRef<HTMLDivElement>(null);
  const bedRef = useRef<HTMLButtonElement>(null);
  const shouldSleep = isBedtime && !isToiletNeeded && !activeMeal;
  const { isDragging, position, hasPosition, positionStyle, resetPosition, dragHandlers } = useDraggablePet(
    roomRef,
    petRef,
    isBathing || isUsingToilet || Boolean(activeMeal),
  );

  useEffect(() => {
    if (activeMeal) {
      resetPosition();
      setActivePlace('table');
      return;
    }
    if (!isToiletNeeded) return;
    resetPosition();
    setActivePlace('toilet');
  }, [activeMeal, isToiletNeeded, resetPosition]);

  useEffect(() => {
    if (!isBathing) return;
    resetPosition();
    setActivePlace('bath');
  }, [isBathing, resetPosition]);

  useEffect(() => {
    if (!shouldSleep) return;
    resetPosition();
    setActivePlace('bed');
  }, [resetPosition, shouldSleep]);

  useEffect(() => {
    if (activePlace !== 'bed' || !position || !bedRef.current || !petRef.current) return;

    const bedBounds = bedRef.current.getBoundingClientRect();
    const petBounds = petRef.current.getBoundingClientRect();
    const petCenterX = petBounds.left + petBounds.width / 2;
    const petCenterY = petBounds.top + petBounds.height / 2;
    const isInsideBed = petCenterX >= bedBounds.left
      && petCenterX <= bedBounds.right
      && petCenterY >= bedBounds.top
      && petCenterY <= bedBounds.bottom;

    if (!isInsideBed) setActivePlace('center');
  }, [activePlace, position]);

  function choosePlace(place: HomePlace) {
    if (shouldSleep || activeMeal || isBathing || isUsingToilet) return;
    resetPosition();
    setActivePlace(place);
    if (place === 'wardrobe') window.setTimeout(onOpenAccessoryShop, 650);
    if (place === 'bath') onStartBath();
  }

  return (
    <div
      ref={roomRef}
      className="pet-home-room"
      style={{
        '--room-image': `url(${roomImage})`,
        '--mobile-room-image': `url(${mobileRoomImage})`,
      } as CSSProperties}
    >
      <div className="home-places">
        {homePlaces.map((place) => (
          <button
            key={place.id}
            ref={place.id === 'bed' ? bedRef : undefined}
            className={`home-place home-place--${place.id}${activePlace === place.id ? ' active' : ''}${place.id === 'toilet' && isToiletNeeded ? ' needs-attention' : ''}`}
            type="button"
            disabled={shouldSleep || Boolean(activeMeal) || isBathing || isUsingToilet}
            onClick={() => choosePlace(place.id)}
            aria-pressed={activePlace === place.id}
            aria-label={`Отвести питомца: ${place.title}`}
          >
            <strong><span aria-hidden="true">{place.icon}</span>{place.title}</strong>
          </button>
        ))}
      </div>
      <div
        ref={petRef}
        className={`home-pet home-pet--${activePlace}${hasPosition ? ' is-positioned' : ''}${isBathing ? ' is-bathing' : ''}${activeMeal ? ' is-eating' : ''}${isDragging ? ' is-dragging' : ''}`}
        style={positionStyle}
        role="button"
        aria-label={`Перетащить ${petName} по комнате`}
        {...dragHandlers}
      >
        {activePlace === 'bed' ? (
          <SleepingPetPose image={pet.image} type={petType} className="home-sleeping-pose" />
        ) : (
          <PetPortrait className="home-pet-image" image={pet.image} />
        )}
        {activePlace === 'bed' && <span className="home-sleep-cloud" aria-hidden="true">Z z z</span>}
        {careWishText && !shouldSleep && !isUsingToilet && !isBathing && !activeMeal && (
          <span className="home-pet-wish" role="status">{careWishText}</span>
        )}
        <span className="home-pet-shadow" aria-hidden="true" />
      </div>
      {(isUsingToilet || isBathing) && (
        <>
          {isUsingToilet && (
            <div
              className="home-toilet-foreground"
              aria-hidden="true"
            />
          )}
          <div className="bathroom-door" aria-label={isBathing ? 'Дверь в душ закрыта' : 'Дверь в туалет закрыта'}>
            <span className="bathroom-door-sign" aria-hidden="true">
              {isBathing ? 'Душ: 10 секунд 🫧' : 'Туалет: 10 секунд 🚽'}
            </span>
            <span className="bathroom-door-handle" aria-hidden="true" />
          </div>
        </>
      )}
      {activePlace === 'table' && (
        <div
          className="home-table-foreground"
          aria-hidden="true"
        />
      )}
      {activeMeal && (
        <span className="home-table-meal" aria-label={activeMeal.itemName}>
          {activeMeal.emoji}
        </span>
      )}
    </div>
  );
}
