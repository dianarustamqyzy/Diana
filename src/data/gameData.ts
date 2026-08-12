import bunnyImage from '../assets/pets/bunny.png';
import catImage from '../assets/pets/cat.png';
import dogImage from '../assets/pets/dog.png';
import dragonImage from '../assets/pets/dragon.png';
import foxImage from '../assets/pets/fox.png';
import hamsterImage from '../assets/pets/hamster.png';
import hedgehogImage from '../assets/pets/hedgehog.png';
import bunnyWalk from '../assets/pets/walk/bunny-walk.png';
import catWalk from '../assets/pets/walk/cat-walk.png';
import dogWalk from '../assets/pets/walk/dog-walk.png';
import dragonWalk from '../assets/pets/walk/dragon-walk.png';
import foxWalk from '../assets/pets/walk/fox-walk.png';
import hamsterWalk from '../assets/pets/walk/hamster-walk.png';
import hedgehogWalk from '../assets/pets/walk/hedgehog-walk.png';

export type PetType = 'dragon' | 'fox' | 'cat' | 'dog' | 'bunny' | 'hedgehog' | 'hamster';

export interface Mission {
  id: string;
  icon: string;
  title: string;
  task: string;
  reward: string;
  coins: number;
  color: string;
}

export type ShopCategory = 'clothes' | 'toys' | 'food' | 'drinks' | 'home';

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

export const petOptions: { id: PetType; label: string; image: string; walkImage: string }[] = [
  { id: 'dragon', label: 'Дракончик', image: dragonImage, walkImage: dragonWalk },
  { id: 'fox', label: 'Лисёнок', image: foxImage, walkImage: foxWalk },
  { id: 'cat', label: 'Котёнок', image: catImage, walkImage: catWalk },
  { id: 'dog', label: 'Щенок', image: dogImage, walkImage: dogWalk },
  { id: 'bunny', label: 'Зайчик', image: bunnyImage, walkImage: bunnyWalk },
  { id: 'hedgehog', label: 'Ёжик', image: hedgehogImage, walkImage: hedgehogWalk },
  { id: 'hamster', label: 'Хомячок', image: hamsterImage, walkImage: hamsterWalk },
];

export const missions: Mission[] = [
  { id: 'water', icon: '💧', title: 'Вода-Волшебство', task: 'Выпей 6 стаканов воды', reward: 'Питомец снова сияет', coins: 30, color: 'blue' },
  { id: 'exercise', icon: '⚡', title: 'Зарядка-Энергия', task: '5 минут зарядки утром', reward: '+100 энергии', coins: 40, color: 'orange' },
  { id: 'sleep', icon: '☾', title: 'Сон-Щит', task: 'Ляг спать до 22:30', reward: 'Кристалл здоровья', coins: 50, color: 'purple' },
  { id: 'food', icon: '🍎', title: 'Овощная Сила', task: 'Съешь фрукт или овощ', reward: 'Питомец растёт', coins: 25, color: 'green' },
  { id: 'eyes', icon: '👓', title: 'Глаза-Лазеры', task: 'Посмотри в окно 20 секунд', reward: 'Модные очки', coins: 20, color: 'pink' },
  { id: 'steps', icon: '🐾', title: 'Шаги-Флеша', task: 'Пройди 8000 шагов', reward: '+100 скорости', coins: 45, color: 'orange' },
  { id: 'sugar', icon: '🥤', title: 'Без Сахара', task: 'День без чипсов и газировки', reward: 'Щит от болезней', coins: 40, color: 'blue' },
  { id: 'breathe', icon: '🌬️', title: 'Дыхание Дракона', task: 'Сделай 3 глубоких вдоха', reward: 'Спокойствие', coins: 20, color: 'purple' },
  { id: 'hugs', icon: '🤗', title: 'Обнимашки', task: 'Обними близкого человека', reward: 'Сияние счастья', coins: 30, color: 'pink' },
];

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
  { id: 'water-bottle', emoji: '💧', name: 'Свежая водичка', price: 15, bonus: '+10 воды', color: 'blue', category: 'drinks', effect: { stat: 'water', amount: 10 } },
  { id: 'smoothie', emoji: '🧃', name: 'Ягодный смузи', price: 40, bonus: '+15 воды', color: 'purple', category: 'drinks', effect: { stat: 'water', amount: 15 } },
  { id: 'milk', emoji: '🥛', name: 'Тёплое молоко', price: 30, bonus: '+12 воды', color: 'sky', category: 'drinks', effect: { stat: 'water', amount: 12 } },
  { id: 'home', emoji: '⛺', name: 'Домик-мечта', price: 250, bonus: '+30 уюта', color: 'purple', category: 'home' },
  { id: 'bed', emoji: '🛏️', name: 'Облачная кроватка', price: 320, bonus: '+35 сил', color: 'sky', category: 'home' },
];
