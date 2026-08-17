import { playPetSound } from './sounds';

const PET_VOICE_PITCH = 1.05;

const awakePhrases = [
  'Давай выберем игру в игровой комнате! 🎮',
  'Хочешь сыграть со мной в «Найди пару»?',
  'Пойдём играть в «Камень, ножницы, бумага»! ✌️',
  'Давай попробуем побить рекорд в одной из игр!',
  'Заглянем в миссии и выберем маленькое задание? ✓',
  'Давай выполним следующую миссию вместе!',
  'Одно небольшое задание — и мы получим монетки!',
  'Сыграем, а потом выполним полезную миссию?',
  'Как у тебя дела?',
  'Мне нравится проводить время с тобой!',
  'Кажется, пора немного размяться!',
  'Ты сегодня отлично справляешься!',
];

const sleepingPhrases = [
  'Спокойной ночи 🌙',
  'Мне снится наше новое приключение.',
  'Я отдыхаю и набираюсь сил.',
  'Увидимся утром!',
];

export function getNextPetPhrase(currentPhrase: string, isBedtime: boolean) {
  const phrases = isBedtime ? sleepingPhrases : awakePhrases;
  const availablePhrases = phrases.filter((phrase) => phrase !== currentPhrase);
  return availablePhrases[Math.floor(Math.random() * availablePhrases.length)] ?? phrases[0];
}

export function speakPet(text: string) {
  if (!('speechSynthesis' in window)) {
    playPetSound();
    return;
  }

  const spokenText = text.replace(/[✨🌙🌟💧⚡🍎👓🐾🥤🌬️🤗]/gu, '');
  const utterance = new SpeechSynthesisUtterance(spokenText);
  const voices = window.speechSynthesis.getVoices();
  utterance.voice = voices.find((voice) => voice.lang.toLowerCase().startsWith('ru')) ?? null;
  utterance.lang = 'ru-RU';
  utterance.rate = 0.92;
  utterance.pitch = PET_VOICE_PITCH;
  utterance.volume = 0.9;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
