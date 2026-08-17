export type ShopCategory = 'clothes' | 'toys' | 'food' | 'drinks' | 'accessories' | 'home';

export interface ConsumableEffect {
  stat: 'food' | 'water';
  amount: number;
}

export interface ShopItem {
  id: string;
  emoji: string;
  name: string;
  price: number;
  bonus: string;
  color: string;
  category: ShopCategory;
  effect?: ConsumableEffect;
}

export const shopItems: ShopItem[] = [
  { id: 'hat', emoji: '🧢', name: 'Шапочка героя', price: 80, bonus: '+10 настроения', color: 'peach', category: 'clothes' },
  { id: 'glasses', emoji: '👓', name: 'Умные очки', price: 120, bonus: '+15 энергии', color: 'blue', category: 'clothes' },
  { id: 'scarf', emoji: '🧣', name: 'Тёплый шарфик', price: 95, bonus: '+12 уюта', color: 'rose', category: 'clothes' },
  { id: 'crown', emoji: '👑', name: 'Корона дружбы', price: 210, bonus: '+25 настроения', color: 'yellow', category: 'clothes' },

  { id: 'ball', emoji: '⚽', name: 'Весёлый мяч', price: 150, bonus: '+20 настроения', color: 'green', category: 'toys' },
  { id: 'kite', emoji: '🪁', name: 'Воздушный змей', price: 135, bonus: '+18 энергии', color: 'sky', category: 'toys' },
  { id: 'teddy', emoji: '🧸', name: 'Мишка-друг', price: 175, bonus: '+22 счастья', color: 'peach', category: 'toys' },

  { id: 'apple', emoji: '🍎', name: 'Хрустящее яблоко', price: 25, bonus: '+10 сытости', color: 'green', category: 'food', effect: { stat: 'food', amount: 10 } },
  { id: 'carrot', emoji: '🥕', name: 'Сладкая морковка', price: 20, bonus: '+8 сытости', color: 'orange', category: 'food', effect: { stat: 'food', amount: 8 } },
  { id: 'sandwich', emoji: '🥪', name: 'Полезный сэндвич', price: 45, bonus: '+18 сытости', color: 'yellow', category: 'food', effect: { stat: 'food', amount: 18 } },
  { id: 'cupcake', emoji: '🧁', name: 'Праздничный кекс', price: 35, bonus: '+12 сытости', color: 'rose', category: 'food', effect: { stat: 'food', amount: 12 } },
  { id: 'banana', emoji: '🍌', name: 'Солнечный банан', price: 22, bonus: '+9 сытости', color: 'yellow', category: 'food', effect: { stat: 'food', amount: 9 } },
  { id: 'strawberry', emoji: '🍓', name: 'Спелая клубника', price: 28, bonus: '+10 сытости', color: 'rose', category: 'food', effect: { stat: 'food', amount: 10 } },
  { id: 'rice', emoji: '🍙', name: 'Рисовый шарик', price: 38, bonus: '+15 сытости', color: 'sky', category: 'food', effect: { stat: 'food', amount: 15 } },
  { id: 'soup', emoji: '🍲', name: 'Тёплый супчик', price: 50, bonus: '+22 сытости', color: 'orange', category: 'food', effect: { stat: 'food', amount: 22 } },
  { id: 'salad', emoji: '🥗', name: 'Витаминный салат', price: 42, bonus: '+17 сытости', color: 'green', category: 'food', effect: { stat: 'food', amount: 17 } },

  { id: 'water-bottle', emoji: '💧', name: 'Свежая водичка', price: 15, bonus: '+10 воды', color: 'blue', category: 'drinks', effect: { stat: 'water', amount: 10 } },
  { id: 'smoothie', emoji: '🧃', name: 'Ягодный смузи', price: 40, bonus: '+15 воды', color: 'purple', category: 'drinks', effect: { stat: 'water', amount: 15 } },
  { id: 'milk', emoji: '🥛', name: 'Тёплое молоко', price: 30, bonus: '+12 воды', color: 'sky', category: 'drinks', effect: { stat: 'water', amount: 12 } },
  { id: 'orange-juice', emoji: '🍊', name: 'Апельсиновый сок', price: 35, bonus: '+14 воды', color: 'orange', category: 'drinks', effect: { stat: 'water', amount: 14 } },
  { id: 'cocoa', emoji: '☕', name: 'Уютное какао', price: 45, bonus: '+17 воды', color: 'peach', category: 'drinks', effect: { stat: 'water', amount: 17 } },
  { id: 'coconut-water', emoji: '🥥', name: 'Кокосовая вода', price: 50, bonus: '+20 воды', color: 'green', category: 'drinks', effect: { stat: 'water', amount: 20 } },
  { id: 'herbal-tea', emoji: '🫖', name: 'Травяной чай', price: 32, bonus: '+13 воды', color: 'yellow', category: 'drinks', effect: { stat: 'water', amount: 13 } },

  { id: 'backpack', emoji: '🎒', name: 'Рюкзачок исследователя', price: 160, bonus: '+20 смелости', color: 'green', category: 'accessories' },
  { id: 'bow', emoji: '🎀', name: 'Праздничный бантик', price: 75, bonus: '+10 настроения', color: 'rose', category: 'accessories' },
  { id: 'medal', emoji: '🏅', name: 'Медаль за старание', price: 140, bonus: '+18 гордости', color: 'yellow', category: 'accessories' },
  { id: 'umbrella', emoji: '☔', name: 'Зонтик для прогулок', price: 125, bonus: '+15 уюта', color: 'blue', category: 'accessories' },
  { id: 'camera', emoji: '📷', name: 'Камера приключений', price: 230, bonus: '+28 впечатлений', color: 'purple', category: 'accessories' },
  { id: 'flower', emoji: '🌼', name: 'Ромашка за ушко', price: 65, bonus: '+9 настроения', color: 'peach', category: 'accessories' },
  { id: 'star-pin', emoji: '🌟', name: 'Звёздный значок', price: 110, bonus: '+14 уверенности', color: 'sky', category: 'accessories' },

  { id: 'home', emoji: '⛺', name: 'Домик-мечта', price: 250, bonus: '+30 уюта', color: 'purple', category: 'home' },
  { id: 'bed', emoji: '🛏️', name: 'Облачная кроватка', price: 320, bonus: '+35 сил', color: 'sky', category: 'home' },
];
