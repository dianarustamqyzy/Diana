import { useState } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { ShopCard } from '../components/ShopCard';
import { useGame } from '../context/GameContext';
import { shopItems, ShopCategory } from '../data/shopData';

type CategoryFilter = 'all' | 'care' | ShopCategory;

const categories: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: '✨ Всё' },
  { id: 'care', label: '🍽️ Еда и напитки' },
  { id: 'clothes', label: '🧢 Одежда' },
  { id: 'toys', label: '🧸 Игрушки' },
  { id: 'food', label: '🍎 Еда' },
  { id: 'drinks', label: '🥛 Напитки' },
  { id: 'accessories', label: '🎒 Аксессуары' },
  { id: 'home', label: '⛺ Уют' },
];

export function ShopPage() {
  const search = useSearch();
  const requestedCategory = new URLSearchParams(search).get('category');
  const fromHome = new URLSearchParams(search).has('from');
  const initialCategory = categories.some((item) => item.id === requestedCategory)
    ? requestedCategory as CategoryFilter
    : 'all';
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [, navigate] = useLocation();
  const { coins, purchased, inventory, wishes, buyItem, giveItem, petName } = useGame();
  const visibleItems = category === 'all'
    ? shopItems
    : category === 'care'
      ? shopItems.filter((item) => item.category === 'food' || item.category === 'drinks')
      : shopItems.filter((item) => item.category === category);

  function giveToPet(item: (typeof shopItems)[number]) {
    giveItem(item);
    navigate('/pet-home');
  }

  return (
    <section className="standard-page">
      <header className="page-heading">
        <div><p className="eyebrow">МИЛЫЕ СОКРОВИЩА</p><h1>Магазин для {petName}</h1><p>Награди питомца за ваши полезные приключения.</p></div>
        <div className="wallet"><span>●</span><div><small>ТВОИ МОНЕТКИ</small><strong>{coins}</strong></div></div>
      </header>
      <div className="shop-showcase">
        <div><span>{fromHome ? '🏠' : '🎁'}</span><p><small>{fromHome ? 'ИЗ ДОМИКА' : 'ВИТРИНА НЕДЕЛИ'}</small><strong>{category === 'care' ? `${petName} сидит за столом и ждёт угощение` : category === 'accessories' ? `${petName} выбирает аксессуар у шкафа` : `Собери новый образ для ${petName}`}</strong></p></div>
        {fromHome ? <Link href="/pet-home">← В комнату</Link> : <span>{shopItems.length} подарков</span>}
      </div>
      <div className="shop-categories" aria-label="Категории магазина">
        {categories.map((item) => (
          <button key={item.id} className={category === item.id ? 'active' : ''} onClick={() => setCategory(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="shop-grid">
        {visibleItems.map((item) => (
          <ShopCard
            key={item.id}
            item={item}
            isOwned={purchased.includes(item.id)}
            canBuy={coins >= item.price}
            quantity={inventory[item.id] ?? 0}
            isWanted={Object.values(wishes).includes(item.id)}
            onBuy={() => buyItem(item)}
            onGive={() => giveToPet(item)}
          />
        ))}
      </div>
      <div className="shop-note"><span>🎁</span><div><strong>Новый подарок каждую неделю!</strong><p>Выполняй миссии, копи монетки и заглядывай снова.</p></div></div>
    </section>
  );
}
