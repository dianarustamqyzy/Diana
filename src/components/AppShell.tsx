import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useGame } from '../context/GameContext';

const links = [
  { href: '/game', icon: '⌂', label: 'Питомец' },
  { href: '/chat', icon: '◌', label: 'Чат' },
  { href: '/games', icon: '▦', label: 'Игры' },
  { href: '/missions', icon: '✓', label: 'Миссии' },
  { href: '/shop', icon: '◇', label: 'Магазин' },
  { href: '/diary', icon: '♡', label: 'Дневник' },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { coins, petName, completed } = useGame();
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-brand-group">
          <Link href="/game" className={`mini-brand${location === '/pet-home' ? ' mobile-hidden-at-home' : ''}`}><span>YC</span><strong>Your cute Animal!</strong></Link>
          {location === '/pet-home' && (
            <p className="mobile-home-welcome">Добро пожаловать домой, {petName}!</p>
          )}
          {location === '/game' && (
            <p className="mobile-pet-status">
              {petName} сегодня {completed.length ? 'сияет' : 'ждёт заботы'} ✨
            </p>
          )}
        </div>
        <div className="coin-pill"><span>●</span> {coins}</div>
      </header>
      <main className={`page-content${location === '/shop' ? ' shop-content' : ''}`}>{children}</main>
      <nav className="bottom-nav">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={location === link.href || (link.href === '/games' && ['/snake', '/block-game'].includes(location)) ? 'nav-item active' : 'nav-item'}>
            <span>{link.icon}</span>{link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
