import { useCallback, useState } from 'react';
import { Link, Redirect } from 'wouter';
import { GameGuide } from '../components/GameGuide';
import { StatBar } from '../components/StatBar';
import { TodayStory } from '../components/TodayStory';
import { WalkingPet } from '../components/WalkingPet';
import { useGame } from '../context/GameContext';
import { missions } from '../data/gameData';
import { usePetBedtime } from '../hooks/usePetBedtime';
import { getNextGiftLevel } from '../lib/levelProgress';
import { playSuccessSound } from '../lib/sounds';
import cottageGarden from '../assets/scenes/cottage-garden.jpg';

export function GamePage() {
  const { playerName, petName, petType, level, completed, care, isToiletNeeded, isBathing, completeMission } = useGame();
  const isBedtime = usePetBedtime();
  const [isGuideOpen, setIsGuideOpen] = useState(() => localStorage.getItem('pet-guide-seen') !== 'yes');
  const nextMission = missions.find((mission) => !completed.includes(mission.id));
  const completedMissions = missions.filter((mission) => completed.includes(mission.id));
  const bonus = completed.length * 3;
  const nextGiftLevel = getNextGiftLevel(level);
  function finishNextMission() {
    if (!nextMission) return;
    completeMission(nextMission.id);
    playSuccessSound();
  }

  const closeGuide = useCallback(() => {
    localStorage.setItem('pet-guide-seen', 'yes');
    setIsGuideOpen(false);
  }, []);

  if (isBedtime || isToiletNeeded || isBathing) {
    return <Redirect to="/pet-home" replace />;
  }

  return (
    <div className="dashboard">
      <section className="pet-stage">
        <div className="greeting">
          <div className="greeting-copy">
            <p>{isBedtime ? 'Добрый вечер' : 'Доброе утро'}, {playerName}!</p>
            <h1>{isBedtime ? `${petName} уже видит сладкие сны` : `${petName} сегодня ${completed.length ? 'сияет' : 'ждёт заботы'} ✨`}</h1>
          </div>
          <Link href="/pet-home" className={`enter-home-button mobile-enter-home-button${isToiletNeeded ? ' needs-attention' : ''}`}>
            <span aria-hidden="true">{isToiletNeeded ? '🚽' : '⌂'}</span> {isToiletNeeded ? 'Сам идёт в туалет' : 'Зайти домой'}
          </Link>
          <div className="greeting-actions">
            <button className="guide-help" type="button" onClick={() => setIsGuideOpen(true)} aria-label="Как играть" title="Как играть">?</button>
            <div className="level-progress">
              <span className="level-badge">Уровень {level}</span>
              <small>🎁 подарок на {nextGiftLevel}-м</small>
            </div>
          </div>
        </div>
        <div className={`pet-scene${isBedtime ? ' pet-scene--night' : ''}`} style={{ backgroundImage: `url(${cottageGarden})` }}>
          <Link href="/pet-home" className={`enter-home-button desktop-enter-home-button${isToiletNeeded ? ' needs-attention' : ''}`}>
            <span aria-hidden="true">{isToiletNeeded ? '🚽' : '⌂'}</span> {isToiletNeeded ? 'Сам идёт в туалет' : 'Зайти домой'}
          </Link>
          <WalkingPet
            type={petType}
            completedCount={completed.length}
            totalMissions={missions.length}
            isBedtime={isBedtime}
          />
        </div>
      </section>

      <aside className="care-panel">
        <div className="section-title"><div><p>КАК ДЕЛА?</p><h2>Забота о {petName}</h2></div><span>{completed.length}/9</span></div>
        <div className="stats-list">
          <StatBar icon="💧" label="Вода" value={Math.min(care.water + bonus, 100)} color="blue" />
          <StatBar icon="☾" label="Сон" value={Math.min(78 + bonus, 100)} color="purple" />
          <StatBar icon="🍎" label="Еда" value={Math.min(care.food + bonus, 100)} color="orange" />
          <StatBar icon="🚽" label="Туалет" value={isToiletNeeded ? 15 : 100} color="green" />
          <StatBar icon="🫧" label="Чистота" value={isBathing ? 75 : 100} color="blue" />
          <StatBar icon="♡" label="Настроение" value={Math.min(86 + bonus, 100)} color="pink" />
        </div>
        {nextMission && (
          <div className="quick-mission">
            <div className={`mission-icon ${nextMission.color}`}>{nextMission.icon}</div>
            <div><small>СЛЕДУЮЩАЯ МИССИЯ</small><strong>{nextMission.title}</strong><p>{nextMission.task}</p></div>
            <button onClick={finishNextMission}>Готово +{nextMission.coins}</button>
          </div>
        )}
        <Link href="/missions" className="text-link">Посмотреть все миссии <span>→</span></Link>
      </aside>
      <TodayStory completedMissions={completedMissions} petName={petName} />
      {isGuideOpen && <GameGuide petName={petName} onClose={closeGuide} />}
    </div>
  );
}
