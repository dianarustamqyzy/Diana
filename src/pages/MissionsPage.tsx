import { FormEvent, useEffect, useState } from 'react';
import { MissionCard } from '../components/MissionCard';
import { useGame } from '../context/GameContext';
import { Mission, missions } from '../data/gameData';
import { createCustomMissions, loadCustomMissions } from '../lib/customMissions';

export function MissionsPage() {
  const { completed, completeMission, playerName, today } = useGame();
  const [customMissions, setCustomMissions] = useState<Mission[]>([]);
  const [customTitle, setCustomTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setCustomMissions([]);
    setMessage('');
    loadCustomMissions()
      .then(setCustomMissions)
      .catch(() => setMessage('Не получилось загрузить твои миссии. Попробуй обновить страницу.'));
  }, [today]);

  async function addMission(event: FormEvent) {
    event.preventDefault();
    const tasks = customTitle.split('\n').map((task) => task.trim()).filter(Boolean);
    if (!tasks.length || isSaving) return;
    if (tasks.some((task) => task.length > 200)) {
      setMessage('Каждая миссия должна быть не длиннее 200 символов.');
      return;
    }

    setIsSaving(true);
    setMessage('');
    try {
      const newMissions = await createCustomMissions(tasks);
      setCustomMissions((current) => [...current, ...newMissions]);
      setCustomTitle('');
      setMessage(tasks.length === 1 ? 'Миссия сохранена!' : `Сохранено миссий: ${tasks.length}`);
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
        <div><span>＋</span><div><strong>Создай свои миссии</strong><p>Каждую миссию пиши с новой строки</p></div></div>
        <textarea rows={3} value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} placeholder={'Почитать 20 минут\nСделать зарядку\nПолить цветы'} />
        <button type="submit" disabled={isSaving}>{isSaving ? 'Сохраняю…' : 'Добавить'}</button>
      </form>
      {message && <p className="mission-message" role="status">{message}</p>}
    </section>
  );
}
