import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useGame } from '../context/GameContext';

const links = [
  { href: '/game', icon: '⌂', label: 'Питомец' },
  { href: '/chat', icon: '◌', label: 'Чат' },
  { href: '/missions', icon: '✓', label: 'Миссии' },
  { href: '/shop', icon: '◇', label: 'Магазин' },
  { href: '/diary', icon: '♡', label: 'Дневник' },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { coins } = useGame();
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link href="/game" className="mini-brand"><span>YC</span><strong>Your cute Animal!</strong></Link>
        <div className="coin-pill"><span>●</span> {coins}</div>
      </header>
      <main className="page-content">{children}</main>
      <nav className="bottom-nav">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={location === link.href ? 'nav-item active' : 'nav-item'}>
            <span>{link.icon}</span>{link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
