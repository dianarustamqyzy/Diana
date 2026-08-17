import { ShopItem } from '../data/shopData';

interface ShopCardProps {
  item: ShopItem;
  isOwned: boolean;
  canBuy: boolean;
  quantity: number;
  isWanted: boolean;
  onBuy: () => void;
  onGive: () => void;
}

export function ShopCard({ item, isOwned, canBuy, quantity, isWanted, onBuy, onGive }: ShopCardProps) {
  const isConsumable = Boolean(item.effect);

  return (
    <article className={`shop-card${isOwned ? ' owned' : ''}${isWanted ? ' wanted' : ''}`}>
      <div className={`item-picture ${item.color}`}>
        {isOwned && <span className="owned-label">В коллекции ✓</span>}
        {isConsumable && <span className="item-quantity">Есть: {quantity}</span>}
        {isWanted && <span className="wanted-label">Хочу! ♥</span>}
        <span className="item-emoji">{item.emoji}</span>
      </div>
      <div className="item-info">
        <small>{item.bonus}</small>
        <h2>{item.name}</h2>
      </div>
      <div className="shop-card-actions">
        <button disabled={isOwned || !canBuy} onClick={onBuy}>
          {isOwned ? 'Куплено ✓' : `Купить · ${item.price}`}
        </button>
        {isConsumable && <button className="give-button" disabled={quantity === 0} onClick={onGive}>Дать питомцу</button>}
      </div>
    </article>
  );
}
