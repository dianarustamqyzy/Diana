import { Mission } from '../data/gameData';

interface TodayStoryProps {
  completedMissions: Mission[];
  petName: string;
}

const storyMoments = [
  { period: 'Утро', icon: '🌞', text: 'вы начали новый день и нашли тропинку в Волшебный сад.' },
  { period: 'День', icon: '💧', text: 'доброе дело открыло прохладный волшебный ручеёк.' },
  { period: 'Вечер', icon: '🌿', text: 'ваша забота помогла вырасти новому дереву.' },
];

export function TodayStory({ completedMissions, petName }: TodayStoryProps) {
  const moments = completedMissions.slice(0, 3).map((mission, index) => ({
    ...storyMoments[index],
    text: `${mission.title} — ${mission.reward.toLowerCase()}.`,
  }));

  if (moments.length === 0) {
    moments.push(storyMoments[0]);
  }

  return (
    <section className="today-story">
      <div className="story-heading">
        <div>
          <p className="eyebrow">СЕГОДНЯШНЯЯ ИСТОРИЯ</p>
          <h2>Новая глава уже началась</h2>
        </div>
        <span>📖</span>
      </div>
      <div className="story-moments">
        {moments.map((moment) => (
          <div className="story-moment" key={`${moment.period}-${moment.text}`}>
            <span>{moment.icon}</span>
            <div><strong>{moment.period}</strong><p>{petName} и ты {moment.text}</p></div>
          </div>
        ))}
      </div>
      <p className="story-ending">
        {completedMissions.length
          ? `Сегодня вы уже спасли ${completedMissions.length} маленьких кусочка мира. 🌎❤️`
          : `Выполни первую миссию вместе с ${petName} — и история продолжится.`}
      </p>
    </section>
  );
}
