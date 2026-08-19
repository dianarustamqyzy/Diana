import { FormEvent, useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { loadDailyDiary, saveDailyDiary } from '../lib/dailyStorage';

const moods = ['😊', '🤩', '😌', '😴', '😔'];

export function DiaryPage() {
  const { petName, today } = useGame();
  const savedDiary = loadDailyDiary();
  const [mood, setMood] = useState(savedDiary?.mood ?? '😊');
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState(savedDiary?.note ?? 'Сегодня ещё нет записи. Расскажи, как прошёл твой день!');

  useEffect(() => {
    const currentDiary = loadDailyDiary();
    setMood(currentDiary?.mood ?? '😊');
    setNote('');
    setSavedNote(currentDiary?.note ?? 'Сегодня ещё нет записи. Расскажи, как прошёл твой день!');
  }, [today]);

  function save(event: FormEvent) {
    event.preventDefault();
    if (!note.trim()) return;
    const savedText = note.trim();
    saveDailyDiary(mood, savedText);
    setSavedNote(savedText);
    setNote('');
  }

  return (
    <section className="standard-page diary-page">
      <header className="page-heading">
        <div><p className="eyebrow">ТВОЯ ИСТОРИЯ</p><h1>Дневник приключений</h1><p>{petName} любит узнавать, как прошёл твой день.</p></div>
        <div className="streak"><span>🔥</span><div><strong>7&nbsp;дней</strong><small>ПОДРЯД</small></div></div>
      </header>
      <form className="diary-form" onSubmit={save}>
        <h2>Как ты сегодня?</h2>
        <div className="mood-picker">{moods.map((item) => <button className={mood === item ? 'active' : ''} type="button" key={item} onClick={() => setMood(item)}>{item}</button>)}</div>
        <label>Что интересного случилось?<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Расскажи о своём дне, победах или мечтах..." /></label>
        <button className="primary-button" type="submit">Сохранить воспоминание</button>
      </form>
      <article className="diary-memory-card"><span>{mood}</span><div><small>СЕГОДНЯ</small><p>{savedNote}</p></div><span className="memory-heart">♥</span></article>
    </section>
  );
}
