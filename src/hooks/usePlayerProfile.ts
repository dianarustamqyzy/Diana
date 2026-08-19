import { useMemo, useState } from 'react';
import { PetType } from '../data/gameData';
import { loadProfile, saveProfile } from '../lib/dailyStorage';

export function usePlayerProfile(onAdopt: () => void) {
  const savedProfile = useMemo(loadProfile, []);
  const [playerName, setPlayerName] = useState(savedProfile?.playerName ?? 'Аня');
  const [petName, setPetName] = useState(savedProfile?.petName ?? 'Рыжик');
  const [petType, setPetType] = useState<PetType>(savedProfile?.petType ?? 'cat');

  function startGame(player: string, pet: string, type: PetType) {
    setPlayerName(player);
    setPetName(pet);
    setPetType(type);
    saveProfile({ playerName: player, petName: pet, petType: type });
  }

  function adoptNewPet(pet: string, type: PetType) {
    setPetName(pet);
    setPetType(type);
    onAdopt();
    saveProfile({ playerName, petName: pet, petType: type });
  }

  return { playerName, petName, petType, startGame, adoptNewPet };
}
