import { FormEvent, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { PetAvatar } from '../components/PetAvatar';
import { PetPortrait } from '../components/PetPortrait';
import { useGame } from '../context/GameContext';
import { petOptions, PetType } from '../data/gameData';

export function NewPetPage() {
  const [, navigate] = useLocation();
  const { adoptNewPet, petName: grownPetName, petType: grownPetType } = useGame();
  const availablePets = useMemo(
    () => petOptions.filter((pet) => pet.id !== grownPetType),
    [grownPetType],
  );
  const [petType, setPetType] = useState<PetType>(availablePets[0].id);
  const [petName, setPetName] = useState('');

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!petName.trim()) return;
    adoptNewPet(petName.trim(), petType);
    navigate('/game');
  }

  return (
    <main className="welcome-page grown-pet-page">
      <section className="welcome-copy">
        <span className="brand-mark">100</span>
        <p className="eyebrow">БОЛЬШОЕ СОБЫТИЕ</p>
        <h1>{grownPetName} <em>вырос!</em></h1>
        <p>Вы прошли целых 100 уровней вместе. Теперь пора познакомиться с новым маленьким другом и помочь вырасти уже ему.</p>
        <div className="grown-pet-avatar"><PetAvatar type={grownPetType} mood="happy" size="large" /></div>
      </section>

      <form className="setup-card" onSubmit={submit}>
        <PetAvatar type={petType} mood="happy" size="large" />
        <h2>Кто станет твоим новым другом?</h2>
        <div className="pet-picker">
          {availablePets.map((pet) => (
            <button className={petType === pet.id ? 'pet-choice active' : 'pet-choice'} key={pet.id} type="button" onClick={() => setPetType(pet.id)}>
              <PetPortrait className={`pet-choice-image pet-choice-image--${pet.id}`} image={pet.image} />{pet.label}
            </button>
          ))}
        </div>
        <div className="name-fields new-pet-name">
          <label>Имя нового питомца<input value={petName} onChange={(event) => setPetName(event.target.value)} placeholder="Например, Искорка" autoFocus /></label>
        </div>
        <button className="primary-button" type="submit">Начать новую историю <span>→</span></button>
        <p className="new-pet-note">Монетки и сегодняшние достижения останутся с тобой.</p>
      </form>
    </main>
  );
}
