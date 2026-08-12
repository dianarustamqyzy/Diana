import { useState } from 'react';
import { ShopCard } from '../components/ShopCard';
import { useGame } from '../context/GameContext';
import { shopItems, ShopCategory } from '../data/gameData';

type CategoryFilter = 'all' | ShopCategory;

const categories: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: '✨ Всё' },
  { id: 'clothes', label: '🧢 Одежда' },
  { id: 'toys', label: '🧸 Игрушки' },
  { id: 'food', label: '🍎 Еда' },
  { id: 'drinks', label: '🥛 Напитки' },
  { id: 'home', label: '⛺ Уют' },
];

export function ShopPage() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [reaction, setReaction] = useState<{ emoji: string; name: string; verb: string } | null>(null);
  const { coins, purchased, inventory, buyItem, giveItem, petName } = useGame();
  const visibleItems = category === 'all'
    ? shopItems
    : shopItems.filter((item) => item.category === category);

  function giveToPet(item: (typeof shopItems)[number]) {
    giveItem(item);
    const verb = item.effect?.stat === 'water' ? 'выпил' : 'съел';
    setReaction({ emoji: item.emoji, name: item.name, verb });
  }

  return (
    <section className="standard-page">
      <header className="page-heading">
        <div><p className="eyebrow">МИЛЫЕ СОКРОВИЩА</p><h1>Магазин для {petName}</h1><p>Награди питомца за ваши полезные приключения.</p></div>
        <div className="wallet"><span>●</span><div><small>ТВОИ МОНЕТКИ</small><strong>{coins}</strong></div></div>
      </header>
      <div className="shop-showcase">
        <div><span>🎁</span><p><small>ВИТРИНА НЕДЕЛИ</small><strong>Собери новый образ для {petName}</strong></p></div>
        <span>{shopItems.length} подарков</span>
      </div>
      {reaction && (
        <div className="feeding-reaction" role="status">
          <span className="feeding-emoji">{reaction.emoji}</span>
          <div><strong>{petName} с удовольствием всё {reaction.verb}!</strong><p>{reaction.name} помог восстановить силы. Вкусно! 💚</p></div>
        </div>
      )}
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
            onBuy={() => buyItem(item)}
            onGive={() => giveToPet(item)}
          />
        ))}
      </div>
      <div className="shop-note"><span>🎁</span><div><strong>Новый подарок каждую неделю!</strong><p>Выполняй миссии, копи монетки и заглядывай снова.</p></div></div>
    </section>
  );
}
