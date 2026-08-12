import { FormEvent, useState } from 'react';
import { useGame } from '../context/GameContext';

const moods = ['😊', '🤩', '😌', '😴', '😔'];

export function DiaryPage() {
  const { petName } = useGame();
  const [mood, setMood] = useState('😊');
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('Сегодня я начал новое полезное приключение!');

  function save(event: FormEvent) {
    event.preventDefault();
    if (!note.trim()) return;
    setSavedNote(note.trim());
    setNote('');
  }

  return (
    <section className="standard-page diary-page">
      <header className="page-heading">
        <div><p className="eyebrow">ТВОЯ ИСТОРИЯ</p><h1>Дневник приключений</h1><p>{petName} любит узнавать, как прошёл твой день.</p></div>
        <div className="streak"><span>🔥</span><div><strong>7 дней</strong><small>ПОДРЯД</small></div></div>
      </header>
      <div className="diary-layout">
        <form className="diary-form" onSubmit={save}>
          <h2>Как ты сегодня?</h2>
          <div className="mood-picker">{moods.map((item) => <button className={mood === item ? 'active' : ''} type="button" key={item} onClick={() => setMood(item)}>{item}</button>)}</div>
          <label>Что интересного случилось?<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Расскажи о своём дне, победах или мечтах..." /></label>
          <button className="primary-button" type="submit">Сохранить воспоминание</button>
        </form>
        <aside className="growth-card">
          <span className="growth-icon">↗</span><p className="eyebrow">ТВОЙ ПРОГРЕСС</p><h2>Ты спишь на <em>2 часа дольше!</em></h2>
          <div className="week-chart"><span style={{ height: '34%' }} /><span style={{ height: '45%' }} /><span style={{ height: '52%' }} /><span style={{ height: '63%' }} /><span style={{ height: '72%' }} /><span style={{ height: '84%' }} /><span className="today" style={{ height: '96%' }} /></div>
          <p>Неделю назад было 6 часов, а теперь — почти 8. {petName} вырос благодаря тебе!</p>
        </aside>
      </div>
      <article className="memory-card"><span>{mood}</span><div><small>СЕГОДНЯ</small><p>{savedNote}</p></div><span className="memory-heart">♥</span></article>
    </section>
  );
}
