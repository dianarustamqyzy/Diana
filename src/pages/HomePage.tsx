import { FormEvent, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { PetAvatar } from '../components/PetAvatar';
import { PetPortrait } from '../components/PetPortrait';
import { LanguagePicker } from '../components/LanguagePicker';
import sittingFriends from '../assets/pets/sitting-friends.png';
import { petOptions, PetType } from '../data/gameData';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../lib/translations';

export function HomePage() {
  const [, navigate] = useLocation();
  const { startGame, playerName: savedPlayerName, petName: savedPetName, petType: savedPetType } = useGame();
  const { language } = useLanguage();
  const text = translations[language];
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
      <LanguagePicker />
      <section className="welcome-copy">
        <span className="brand-mark">YC</span>
        <p className="eyebrow">{text.eyebrow}</p>
        <h1>{text.headline} <em>{text.headlineAccent}</em></h1>
        <p>{text.intro}</p>
        <div className="welcome-promise"><span>✦</span> {text.promise}</div>
        <img
          className="sitting-friends"
          src={sittingFriends}
          alt={text.friendsAlt}
        />
      </section>

      <form className="setup-card" onSubmit={submit}>
        <PetAvatar type={petType} mood="happy" size="large" />
        <h2>{text.chooseFriend}</h2>
        <div className="pet-picker">
          {petOptions.map((pet) => (
            <button className={petType === pet.id ? 'pet-choice active' : 'pet-choice'} key={pet.id} type="button" onClick={() => setPetType(pet.id)}>
              <PetPortrait className={`pet-choice-image pet-choice-image--${pet.id}`} image={pet.image} />{text.petNames[pet.id]}
            </button>
          ))}
        </div>
        <div className="name-fields">
          <label>{text.playerNameLabel}<input value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder={text.playerNamePlaceholder} /></label>
          <label>{text.petNameLabel}<input value={petName} onChange={(e) => setPetName(e.target.value)} placeholder={text.petNamePlaceholder} /></label>
        </div>
        <button className="primary-button" type="submit">{text.startButton} <span>→</span></button>
        <Link className="register-link" href="/register">{text.registerLink}</Link>
      </form>
    </main>
  );
}
