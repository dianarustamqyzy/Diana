import { useEffect, useState } from 'react';
import { PetType, petOptions } from '../data/gameData';
import { PetPortrait } from './PetPortrait';
import { PetDrawing } from './PetDrawing';
import {
  PetActivity,
  PetActivityDecoration,
  petActivities,
  petActivityLabels,
} from './PetActivityDecoration';
import { SleepingPet } from './SleepingPet';

type PetMood = 'happy' | 'hopeful' | 'sad' | 'angry';

const MIN_ACTIVITY_MS = 2 * 60_000;
const MAX_ACTIVITY_MS = 3 * 60_000;

function getActivityDuration() {
  return MIN_ACTIVITY_MS + Math.random() * (MAX_ACTIVITY_MS - MIN_ACTIVITY_MS);
}

function getNextActivityIndex(currentIndex: number, stoppedActivities: PetActivity[]) {
  let nextIndex = (currentIndex + 1) % petActivities.length;

  while (stoppedActivities.includes(petActivities[nextIndex])) {
    nextIndex = (nextIndex + 1) % petActivities.length;
  }

  return nextIndex;
}

function getMood(completedCount: number, totalMissions: number): PetMood {
  if (completedCount === totalMissions) return 'happy';
  if (completedCount >= Math.ceil(totalMissions / 2)) return 'hopeful';
  if (completedCount > 0) return 'sad';
  return new Date().getHours() >= 18 ? 'angry' : 'sad';
}

export function WalkingPet({ type, completedCount, totalMissions, isBedtime }: {
  type: PetType;
  completedCount: number;
  totalMissions: number;
  isBedtime: boolean;
}) {
  const pet = petOptions.find((item) => item.id === type) ?? petOptions[0];
  const [activityIndex, setActivityIndex] = useState(0);
  const [stoppedActivities, setStoppedActivities] = useState<PetActivity[]>([]);
  const activity = petActivities[activityIndex];
  const mood = getMood(completedCount, totalMissions);

  useEffect(() => {
    if (isBedtime) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;
    const timer = window.setTimeout(() => {
      setActivityIndex((current) => getNextActivityIndex(current, stoppedActivities));
    }, getActivityDuration());
    return () => window.clearTimeout(timer);
  }, [activity, isBedtime, stoppedActivities]);

  function stopActivity(activityToStop: PetActivity) {
    const nextStoppedActivities = [...stoppedActivities, activityToStop];
    setStoppedActivities(nextStoppedActivities);
    setActivityIndex((current) => getNextActivityIndex(current, nextStoppedActivities));
  }

  const isMoving = activity === 'walking' || activity === 'playing' || activity === 'butterfly';

  if (isBedtime) {
    return (
      <>
        <div className="activity-label activity-label--sleeping">Спит в пижаме до утра</div>
        <SleepingPet type={type} />
      </>
    );
  }

  return (
    <>
      <div className="activity-controls">
        <div className={`activity-label activity-label--${activity}`}>{petActivityLabels[activity]}</div>
        {(activity === 'playing' || activity === 'drawing') && (
          <button className="stop-activity-button" type="button" onClick={() => stopActivity(activity)}>
            Стоп
          </button>
        )}
      </div>
      <div className={`pet-wanderer activity-${activity} mood-${mood}`}>
        <div className="walking-pet" role="img" aria-label={`${pet.label}. ${petActivityLabels[activity]}`}>
          <PetPortrait
            className={`watching-pet-image${isMoving ? ' moving-pet-image' : ''}`}
            image={pet.image}
          />
          <PetActivityDecoration activity={activity} />
          {activity === 'drawing' && <PetDrawing />}
          <span className="walking-pet-shadow" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
