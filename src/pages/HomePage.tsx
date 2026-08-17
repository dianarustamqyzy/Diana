import { FormEvent, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { PetAvatar } from '../components/PetAvatar';
import { PetPortrait } from '../components/PetPortrait';
import sittingFriends from '../assets/pets/sitting-friends.png';
import { petOptions, PetType } from '../data/gameData';
import { useGame } from '../context/GameContext';

export function HomePage() {
  const [, navigate] = useLocation();
  const { startGame, playerName: savedPlayerName, petName: savedPetName, petType: savedPetType } = useGame();
  const [petType, setPetType] = useState<PetType>(savedPetType);
  const [petName, setPetName] = useState(savedPetName);
  const [playerName, setPlayerName] = useState(savedPlayerName);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!playerName.trim() || !petName.trim()) return;
    startGame(playerName.trim(), petName.trim(), petType);
    navigate('/game');
  }

  return (
    <main className="welcome-page">
      <section className="welcome-copy">
        <span className="brand-mark">YC</span>
        <p className="eyebrow">YOUR CUTE ANIMAL!</p>
        <h1>Полезные привычки становятся <em>милым приключением</em></h1>
        <p>Заботься о себе — и твой маленький друг будет расти, радоваться и открывать новые чудеса.</p>
        <div className="welcome-promise"><span>✦</span> Забота о себе — это настоящая суперсила</div>
        <img
          className="sitting-friends"
          src={sittingFriends}
          alt="Дракончик, лисёнок, котёнок, щенок, зайчик, ёжик и хомячок сидят вместе"
        />
      </section>

      <form className="setup-card" onSubmit={submit}>
        <PetAvatar type={petType} mood="happy" size="large" />
        <h2>Кто станет твоим другом?</h2>
        <div className="pet-picker">
          {petOptions.map((pet) => (
            <button className={petType === pet.id ? 'pet-choice active' : 'pet-choice'} key={pet.id} type="button" onClick={() => setPetType(pet.id)}>
              <PetPortrait className={`pet-choice-image pet-choice-image--${pet.id}`} image={pet.image} />{pet.label}
            </button>
          ))}
        </div>
        <div className="name-fields">
          <label>Как зовут тебя?<input value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Например, Аня" /></label>
          <label>Имя питомца<input value={petName} onChange={(e) => setPetName(e.target.value)} placeholder="Например, Искорка" /></label>
        </div>
        <button className="primary-button" type="submit">Начать приключение <span>→</span></button>
        <Link className="register-link" href="/register">Нет аккаунта? Зарегистрироваться</Link>
      </form>
    </main>
  );
}
