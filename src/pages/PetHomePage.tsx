import { useCallback } from 'react';
import { Link, useLocation } from 'wouter';
import { PetHomeRoom } from '../components/PetHomeRoom';
import { useGame } from '../context/GameContext';
import { usePetBedtime } from '../hooks/usePetBedtime';

export function PetHomePage() {
  const { petName, petType, activeMeal, isToiletNeeded, isBathing, startBath } = useGame();
  const isBedtime = usePetBedtime();
  const [, navigate] = useLocation();
  const openCareShop = useCallback(
    () => navigate('/shop?category=food&from=table'),
    [navigate],
  );
  const openAccessoryShop = useCallback(
    () => navigate('/shop?category=accessories&from=wardrobe'),
    [navigate],
  );

  return (
    <section className="pet-home-page">
      <header className="pet-home-heading">
        <div>
          <p className="eyebrow">ДОМИК ПИТОМЦА</p>
          <h1>{isBedtime ? `${petName} спит дома` : `Добро пожаловать домой, ${petName}!`}</h1>
          <p>{isBedtime ? 'Тс-с… Питомец сладко спит на своей кровати. 🌙' : isToiletNeeded ? `${petName} сам идёт в туалет.` : isBathing ? `${petName} сам пошёл в душ.` : 'Перетаскивай питомца по дому или нажми на мебель.'}</p>
        </div>
        <div className="pet-home-actions">
          {isBedtime
            ? <span className="leave-home-button">🌙 Время сна</span>
            : <Link href="/game" className="leave-home-button">← Выйти во двор</Link>}
        </div>
      </header>
      <PetHomeRoom
        petType={petType}
        petName={petName}
        isBedtime={isBedtime}
        isToiletNeeded={isToiletNeeded}
        isBathing={isBathing}
        activeMeal={activeMeal}
        onStartBath={startBath}
        onOpenCareShop={openCareShop}
        onOpenAccessoryShop={openAccessoryShop}
      />
    </section>
  );
}
