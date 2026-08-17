import { FormEvent, useState } from 'react';
import { MiniGameHeader } from '../components/MiniGameHeader';
import { useGame } from '../context/GameContext';
import { createMathQuestion } from '../lib/quickMath';

export function QuickMathPage() {
  const { addCoins } = useGame();
  const [question, setQuestion] = useState(createMathQuestion);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Введи ответ и нажми «Проверить»');

  function checkAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answer.trim() === '') return;
    if (Number(answer) === question.answer) {
      setScore((current) => current + 1);
      addCoins(1);
      setMessage('Верно! Ты получила монетку ✨');
    } else setMessage(`Почти! Правильный ответ: ${question.answer}`);
    setQuestion(createMathQuestion());
    setAnswer('');
  }

  return (
    <section className="mini-game-page">
      <MiniGameHeader title="Быстрый счёт" description="Решай примеры. Каждый правильный ответ приносит 1 монетку!" score={score} />
      <div className="mini-game-card math-layout">
        <form className="math-game" onSubmit={checkAnswer}>
          <span className="math-question">{question.text} = ?</span>
          <label htmlFor="math-answer">Твой ответ</label>
          <input id="math-answer" inputMode="numeric" type="number" value={answer} onChange={(event) => setAnswer(event.target.value)} autoFocus />
          <button type="submit">Проверить</button>
        </form>
        <aside className="mini-game-info"><span>➕</span><h2>{message}</h2><p>Здесь только сложение и вычитание чисел до 20. Можно считать в уме или на пальцах.</p></aside>
      </div>
    </section>
  );
}
