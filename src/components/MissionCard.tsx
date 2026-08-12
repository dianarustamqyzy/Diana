import { Mission } from '../data/gameData';
import { playSuccessSound } from '../lib/sounds';

interface MissionCardProps {
  mission: Mission;
  done: boolean;
  onComplete: () => void;
}

export function MissionCard({ mission, done, onComplete }: MissionCardProps) {
  function complete() {
    onComplete();
    playSuccessSound();
  }

  return (
    <article className={done ? 'mission-card completed' : 'mission-card'}>
      <span className={`mission-icon ${mission.color}`}>{done ? '✓' : mission.icon}</span>
      <div className="mission-copy">
        <h3>{mission.title}</h3>
        <p>{mission.task}</p>
        <small>{mission.reward}</small>
      </div>
      <div className="mission-action">
        <span className="reward">● {mission.coins}</span>
        <button onClick={complete} disabled={done}>{done ? 'Готово!' : 'Выполнить'}</button>
      </div>
    </article>
  );
}
