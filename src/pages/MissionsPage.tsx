import { FormEvent, useEffect, useState } from 'react';
import { MissionCard } from '../components/MissionCard';
import { useGame } from '../context/GameContext';
import { Mission, missions } from '../data/gameData';
import { createCustomMission, loadCustomMissions } from '../lib/customMissions';

export function MissionsPage() {
  const { completed, completeMission, playerName } = useGame();
  const [customMissions, setCustomMissions] = useState<Mission[]>([]);
  const [customTitle, setCustomTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCustomMissions()
      .then(setCustomMissions)
      .catch(() => setMessage('Не получилось загрузить твои миссии. Попробуй обновить страницу.'));
  }, []);

  async function addMission(event: FormEvent) {
    event.preventDefault();
    const task = customTitle.trim();
    if (!task || isSaving) return;

    setIsSaving(true);
    setMessage('');
    try {
      const mission = await createCustomMission(task);
      setCustomMissions((current) => [...current, mission]);
      setCustomTitle('');
      setMessage('Миссия сохранена!');
    } catch {
      setMessage('Не получилось сохранить миссию. Попробуй ещё раз.');
    } finally {
      setIsSaving(false);
    }
  }

  const allMissions = [...missions, ...customMissions];
  return (
    <section className="standard-page">
      <header className="page-heading">
        <div><p className="eyebrow">ТВОЙ ПЛАН НА СЕГОДНЯ</p><h1>Миссии, {playerName}</h1><p>Маленькие дела превращаются в большую заботу о себе.</p></div>
        <div className="progress-circle"><strong>{completed.length}</strong><span>из {allMissions.length}</span></div>
      </header>
      <div className="mission-grid">
        {allMissions.map((mission) => <MissionCard key={mission.id} mission={mission} done={completed.includes(mission.id)} onComplete={() => completeMission(mission.id)} />)}
      </div>
      <form className="custom-mission" onSubmit={addMission}>
        <div><span>＋</span><div><strong>Создай свою миссию</strong><p>Например: почитать 20 минут</p></div></div>
        <input maxLength={200} value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} placeholder="Что хочешь сделать?" />
        <button type="submit" disabled={isSaving}>{isSaving ? 'Сохраняю…' : 'Добавить'}</button>
      </form>
      {message && <p className="mission-message" role="status">{message}</p>}
    </section>
  );
}
