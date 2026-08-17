import { Link } from 'wouter';

const games = [
  { href: '/snake', icon: '🐍', title: 'Змейка', text: 'Собирай яблоки, расти и не врезайся в стены.', color: 'green' },
  { href: '/block-game', icon: '▦', title: 'Уютные блоки', text: 'Собирай полные ряды и столбцы из фигур.', color: 'coral' },
  { href: '/memory', icon: '🧠', title: 'Найди пару', text: 'Запоминай карточки и находи одинаковые картинки.', color: 'lavender' },
  { href: '/rps', icon: '✌️', title: 'Камень, ножницы, бумага', text: 'Выбирай жест и попробуй обыграть питомца.', color: 'sunny' },
  { href: '/quick-math', icon: '➕', title: 'Быстрый счёт', text: 'Решай короткие примеры и собирай монетки.', color: 'blue' },
  { href: '/sudoku', icon: '🔢', title: 'Судоку', text: 'Заполни поле цифрами от 1 до 9 без повторов.', color: 'mint' },
];

export function GamesPage() {
  return (
    <section className="games-page standard-page">
      <header className="page-heading">
        <div><p className="eyebrow">ИГРОВАЯ КОМНАТА</p><h1>Выбери игру</h1><p>Играй, ставь рекорды и получай монетки для питомца.</p></div>
        <span className="games-heading-icon" aria-hidden="true">🎮</span>
      </header>
      <div className="games-grid">
        {games.map((game) => (
          <Link href={game.href} className={`game-card ${game.color}`} key={game.href}>
            <span className="game-card-icon">{game.icon}</span>
            <div><small>МИНИ-ИГРА</small><h2>{game.title}</h2><p>{game.text}</p></div>
            <strong>Играть <span>→</span></strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
