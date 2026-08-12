import { useEffect, useRef, useState } from 'react';
import { PetType, petOptions } from '../data/gameData';
import { getNextPetPhrase, speakPet } from '../lib/petSpeech';
import { PetPortrait } from './PetPortrait';
import { SleepingPet } from './SleepingPet';

const activities = ['walking', 'watching', 'playing', 'drawing', 'eating'] as const;
type PetActivity = typeof activities[number];
type PetMood = 'happy' | 'hopeful' | 'sad' | 'angry';

const SHORT_ACTIVITY_MS = 6_500;
const LONG_ACTIVITY_MS = 30 * 60 * 1_000;

function getNextActivityIndex(currentIndex: number, stoppedActivities: PetActivity[]) {
  let nextIndex = (currentIndex + 1) % activities.length;

  while (stoppedActivities.includes(activities[nextIndex])) {
    nextIndex = (nextIndex + 1) % activities.length;
  }

  return nextIndex;
}

const activityLabels: Record<PetActivity, string> = {
  walking: 'Гуляет по саду',
  watching: 'Смотрит на тебя',
  playing: 'Играет в футбол',
  drawing: 'Рисует картину',
  eating: 'Кушает яблочко',
};

function getMood(completedCount: number, totalMissions: number): PetMood {
  if (completedCount === totalMissions) return 'happy';
  if (completedCount >= Math.ceil(totalMissions / 2)) return 'hopeful';
  if (completedCount > 0) return 'sad';
  return new Date().getHours() >= 18 ? 'angry' : 'sad';
}

export function WalkingPet({ type, completedCount, totalMissions, isBedtime, speechText }: {
  type: PetType;
  completedCount: number;
  totalMissions: number;
  isBedtime: boolean;
  speechText: string;
}) {
  const pet = petOptions.find((item) => item.id === type) ?? petOptions[0];
  const [activityIndex, setActivityIndex] = useState(0);
  const [stoppedActivities, setStoppedActivities] = useState<PetActivity[]>([]);
  const [isTalking, setIsTalking] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState(speechText);
  const wandererRef = useRef<HTMLDivElement>(null);
  const talkingTimerRef = useRef<number>();
  const activity = activities[activityIndex];
  const mood = getMood(completedCount, totalMissions);

  useEffect(() => {
    if (isBedtime) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;
    const duration = activity === 'playing' || activity === 'drawing'
      ? LONG_ACTIVITY_MS
      : SHORT_ACTIVITY_MS;
    const timer = window.setTimeout(() => {
      setActivityIndex((current) => getNextActivityIndex(current, stoppedActivities));
    }, duration);
    return () => window.clearTimeout(timer);
  }, [activity, isBedtime, stoppedActivities]);

  useEffect(() => {
    setCurrentSpeech(speechText);
  }, [speechText]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSpeech((current) => getNextPetPhrase(current, isBedtime));
    }, 10_000);
    return () => window.clearInterval(timer);
  }, [isBedtime]);

  useEffect(() => {
    if (!isBedtime && currentSpeech !== speechText) {
      speakPet(currentSpeech, type);
    }
  }, [currentSpeech, isBedtime, speechText, type]);

  useEffect(() => () => window.clearTimeout(talkingTimerRef.current), []);

  function talk() {
    window.clearTimeout(talkingTimerRef.current);
    setIsTalking(true);
    speakPet(currentSpeech, type);
    talkingTimerRef.current = window.setTimeout(
      () => setIsTalking(false),
      Math.max(1700, currentSpeech.length * 65),
    );
  }

  function stopActivity(activityToStop: PetActivity) {
    const nextStoppedActivities = [...stoppedActivities, activityToStop];
    setStoppedActivities(nextStoppedActivities);
    setActivityIndex((current) => getNextActivityIndex(current, nextStoppedActivities));
  }

  const speechBubble = (
    <button className={`pet-message${isTalking ? ' is-talking' : ''}`} type="button" onClick={talk}>
      <span>{currentSpeech}</span>
      <span className="pet-voice-waves" aria-hidden="true"><i /><i /><i /></span>
    </button>
  );
  const isWalking = activity === 'walking';

  if (isBedtime) {
    return (
      <>
        {speechBubble}
        <div className="activity-label activity-label--sleeping">Спит в пижаме до утра</div>
        <SleepingPet type={type} />
      </>
    );
  }

  return (
    <>
      {speechBubble}
      <div className="activity-controls">
        <div className={`activity-label activity-label--${activity}`}>{activityLabels[activity]}</div>
        {(activity === 'playing' || activity === 'drawing') && (
          <button className="stop-activity-button" type="button" onClick={() => stopActivity(activity)}>
            Стоп
          </button>
        )}
      </div>
      <div ref={wandererRef} className={`pet-wanderer activity-${activity} mood-${mood}`}>
        <button className="walking-pet" type="button" onClick={talk}
          aria-label={`${pet.label}. ${activityLabels[activity]}. Нажми, чтобы питомец заговорил`} title="Нажми, чтобы питомец заговорил">
          {isWalking ? (
            <span className="walking-pet-sprite" style={{ backgroundImage: `url(${pet.walkImage})` }} />
          ) : (
            <PetPortrait className="watching-pet-image" image={pet.walkImage} />
          )}
          {activity === 'eating' && <span className="pet-snack" aria-hidden="true">🍎</span>}
          {activity === 'playing' && <span className="pet-ball" aria-hidden="true">⚽</span>}
          {activity === 'drawing' && (
            <span className="pet-art" aria-hidden="true">
              <span className="pet-canvas">🌈</span>
              <span className="pet-palette">🎨</span>
            </span>
          )}
          <span className="walking-pet-shadow" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
