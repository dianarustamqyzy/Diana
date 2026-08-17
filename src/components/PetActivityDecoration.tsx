export type PetActivity =
  | 'walking'
  | 'watching'
  | 'playing'
  | 'drawing'
  | 'eating'
  | 'reading'
  | 'watering'
  | 'listening'
  | 'stretching'
  | 'butterfly';

export const petActivities: PetActivity[] = [
  'walking', 'watching', 'reading', 'playing', 'watering',
  'drawing', 'listening', 'eating', 'stretching', 'butterfly',
];

export const petActivityLabels: Record<PetActivity, string> = {
  walking: 'Гуляет по саду',
  watching: 'Сидит и смотрит на тебя',
  playing: 'Играет в футбол',
  drawing: 'Рисует картину',
  eating: 'Кушает яблочко',
  reading: 'Читает книжку',
  watering: 'Поливает цветы',
  listening: 'Слушает музыку',
  stretching: 'Делает зарядку',
  butterfly: 'Играет с бабочкой',
};

export function PetActivityDecoration({ activity }: { activity: PetActivity }) {
  if (activity === 'eating') return <span className="pet-snack" aria-hidden="true">🍎</span>;
  if (activity === 'playing') return <span className="pet-ball" aria-hidden="true">⚽</span>;
  if (activity === 'reading') return <span className="pet-book" aria-hidden="true">📖</span>;
  if (activity === 'watering') {
    return <span className="pet-watering" aria-hidden="true"><i>🪴</i><b>💧</b></span>;
  }
  if (activity === 'listening') return <span className="pet-music" aria-hidden="true">♫ ♪</span>;
  if (activity === 'butterfly') return <span className="pet-butterfly" aria-hidden="true">🦋</span>;
  return null;
}
