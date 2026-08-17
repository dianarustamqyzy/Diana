import bunnyImage from '../assets/pets/bunny.png';
import catImage from '../assets/pets/cat.png';
import dogImage from '../assets/pets/dog.png';
import dragonImage from '../assets/pets/dragon.png';
import foxImage from '../assets/pets/fox.png';
import hamsterImage from '../assets/pets/hamster.png';
import hedgehogImage from '../assets/pets/hedgehog.png';

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

export const petOptions: { id: PetType; label: string; image: string }[] = [
  { id: 'dragon', label: 'Дракончик', image: dragonImage },
  { id: 'fox', label: 'Лисёнок', image: foxImage },
  { id: 'cat', label: 'Котёнок', image: catImage },
  { id: 'dog', label: 'Щенок', image: dogImage },
  { id: 'bunny', label: 'Зайчик', image: bunnyImage },
  { id: 'hedgehog', label: 'Ёжик', image: hedgehogImage },
  { id: 'hamster', label: 'Хомячок', image: hamsterImage },
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
