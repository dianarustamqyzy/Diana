import { useCallback, useState } from 'react';
import { Link } from 'wouter';
import { GameGuide } from '../components/GameGuide';
import { StatBar } from '../components/StatBar';
import { TodayStory } from '../components/TodayStory';
import { WalkingPet } from '../components/WalkingPet';
import { useGame } from '../context/GameContext';
import { missions } from '../data/gameData';
import { usePetBedtime } from '../hooks/usePetBedtime';
import { playSuccessSound } from '../lib/sounds';
import cottageGarden from '../assets/scenes/cottage-garden.jpg';

export function GamePage() {
  const { playerName, petName, petType, completed, care, completeMission } = useGame();
  const isBedtime = usePetBedtime();
  const [isGuideOpen, setIsGuideOpen] = useState(() => localStorage.getItem('pet-guide-seen') !== 'yes');
  const nextMission = missions.find((mission) => !completed.includes(mission.id));
  const completedMissions = missions.filter((mission) => completed.includes(mission.id));
  const bonus = completed.length * 3;
  const level = Math.floor(completed.length / 3) + 1;
  const petMessage = isBedtime
    ? 'Тс-с… Я надел пижаму и лёг спать 🌙'
    : nextMission
      ? `${playerName}, ${nextMission.task.toLowerCase()}! ${nextMission.icon}`
      : 'Ура! Все миссии выполнены! 🌟';

  function finishNextMission() {
    if (!nextMission) return;
    completeMission(nextMission.id);
    playSuccessSound();
  }

  const closeGuide = useCallback(() => {
    localStorage.setItem('pet-guide-seen', 'yes');
    setIsGuideOpen(false);
  }, []);

  return (
    <div className="dashboard">
      <section className="pet-stage">
        <div className="greeting">
          <div>
            <p>{isBedtime ? 'Добрый вечер' : 'Доброе утро'}, {playerName}!</p>
            <h1>{isBedtime ? `${petName} уже видит сладкие сны` : `${petName} сегодня ${completed.length ? 'сияет' : 'ждёт заботы'} ✨`}</h1>
          </div>
          <div className="greeting-actions">
            <button className="guide-help" type="button" onClick={() => setIsGuideOpen(true)} aria-label="Как играть" title="Как играть">?</button>
            <span className="level-badge">Уровень {level}</span>
          </div>
        </div>
        <div className={`pet-scene${isBedtime ? ' pet-scene--night' : ''}`} style={{ backgroundImage: `url(${cottageGarden})` }}>
          <WalkingPet
            type={petType}
            completedCount={completed.length}
            totalMissions={missions.length}
            isBedtime={isBedtime}
            speechText={petMessage}
          />
        </div>
      </section>

      <aside className="care-panel">
        <div className="section-title"><div><p>КАК ДЕЛА?</p><h2>Забота о {petName}</h2></div><span>{completed.length}/9</span></div>
        <div className="stats-list">
          <StatBar icon="💧" label="Вода" value={Math.min(care.water + bonus, 100)} color="blue" />
          <StatBar icon="☾" label="Сон" value={Math.min(78 + bonus, 100)} color="purple" />
          <StatBar icon="🍎" label="Еда" value={Math.min(care.food + bonus, 100)} color="orange" />
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
