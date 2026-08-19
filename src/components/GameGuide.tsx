import { useEffect } from 'react';

interface GameGuideProps {
  petName: string;
  onClose: () => void;
}

const guideSteps = [
  { icon: '✓', title: 'Выполняй миссии', text: 'Пей воду, двигайся, хорошо ешь и высыпайся. Нажимай «Готово», когда справишься.' },
  { icon: '♡', title: 'Заботься о питомце', text: 'Каждая полезная привычка наполняет шкалы воды, сна, еды и настроения.' },
  { icon: '●', title: 'Получай монетки', text: 'За выполненные миссии ты получаешь монетки. На них можно выбирать подарки в магазине.' },
  { icon: '✦', title: 'Расти вместе', text: 'Каждые 3 выполненные миссии поднимают уровень питомца. На 10-м, 20-м, 30-м и каждом следующем десятом уровне ждёт подарок.' },
];

export function GameGuide({ petName, onClose }: GameGuideProps) {
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <div className="guide-overlay" role="presentation">
      <section className="game-guide" role="dialog" aria-modal="true" aria-labelledby="guide-title">
        <button className="guide-close" type="button" onClick={onClose} aria-label="Закрыть подсказку">×</button>
        <p className="eyebrow">КАК ИГРАТЬ</p>
        <h2 id="guide-title">Помоги {petName} вырасти счастливым!</h2>
        <p className="guide-intro">Вы заботитесь друг о друге: ты укрепляешь полезные привычки, а питомец становится бодрее.</p>
        <div className="guide-steps">
          {guideSteps.map((step, index) => (
            <article className="guide-step" key={step.title}>
              <span>{step.icon}</span>
              <div><small>ШАГ {index + 1}</small><h3>{step.title}</h3><p>{step.text}</p></div>
            </article>
          ))}
        </div>
        <button className="primary-button guide-start" type="button" onClick={onClose} autoFocus>
          Всё понятно, начинаем! <span>→</span>
        </button>
      </section>
    </div>
  );
}
