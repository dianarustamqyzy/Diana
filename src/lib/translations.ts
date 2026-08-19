import { PetType } from '../data/gameData';

export type Language = 'ru' | 'en' | 'kk' | 'es' | 'tr';

export const defaultLanguage: Language = 'ru';

export const languageOptions: { code: Language; label: string }[] = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
  { code: 'kk', label: 'Қазақша' },
  { code: 'es', label: 'Español' },
  { code: 'tr', label: 'Türkçe' },
];

interface WelcomeTranslation {
  pageTitle: string;
  languageLabel: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  promise: string;
  friendsAlt: string;
  chooseFriend: string;
  playerNameLabel: string;
  playerNamePlaceholder: string;
  petNameLabel: string;
  petNamePlaceholder: string;
  startButton: string;
  registerLink: string;
  petNames: Record<PetType, string>;
}

export const translations: Record<Language, WelcomeTranslation> = {
  ru: {
    pageTitle: 'Твой милый питомец', languageLabel: 'Язык', eyebrow: 'ТВОЙ МИЛЫЙ ПИТОМЕЦ!',
    headline: 'Полезные привычки становятся', headlineAccent: 'милым приключением',
    intro: 'Заботься о себе — и твой маленький друг будет расти, радоваться и открывать новые чудеса.',
    promise: 'Забота о себе — это настоящая суперсила', friendsAlt: 'Семь милых питомцев сидят вместе',
    chooseFriend: 'Кто станет твоим другом?', playerNameLabel: 'Как зовут тебя?',
    playerNamePlaceholder: 'Например, Аня', petNameLabel: 'Имя питомца', petNamePlaceholder: 'Например, Искорка',
    startButton: 'Начать приключение', registerLink: 'Нет аккаунта? Зарегистрироваться',
    petNames: { dragon: 'Дракончик', fox: 'Лисёнок', cat: 'Котёнок', dog: 'Щенок', bunny: 'Зайчик', hedgehog: 'Ёжик', hamster: 'Хомячок' },
  },
  en: {
    pageTitle: 'Your Cute Animal', languageLabel: 'Language', eyebrow: 'YOUR CUTE ANIMAL!',
    headline: 'Healthy habits become', headlineAccent: 'a cute adventure',
    intro: 'Take care of yourself — and your little friend will grow, smile, and discover new wonders.',
    promise: 'Taking care of yourself is a real superpower', friendsAlt: 'Seven cute pets sitting together',
    chooseFriend: 'Who will be your friend?', playerNameLabel: 'What is your name?',
    playerNamePlaceholder: 'For example, Mia', petNameLabel: "Pet's name", petNamePlaceholder: 'For example, Spark',
    startButton: 'Start the adventure', registerLink: "No account? Sign up",
    petNames: { dragon: 'Dragon', fox: 'Fox', cat: 'Kitten', dog: 'Puppy', bunny: 'Bunny', hedgehog: 'Hedgehog', hamster: 'Hamster' },
  },
  kk: {
    pageTitle: 'Сенің сүйкімді жануарың', languageLabel: 'Тіл', eyebrow: 'СЕНІҢ СҮЙКІМДІ ЖАНУАРЫҢ!',
    headline: 'Пайдалы әдеттер', headlineAccent: 'сүйкімді оқиғаға айналады',
    intro: 'Өзіңе қамқор бол — сонда кішкентай досың өсіп, қуанып, жаңа ғажайыптарды ашады.',
    promise: 'Өзіңе қамқорлық жасау — нағыз суперқабілет', friendsAlt: 'Жеті сүйкімді үй жануары бірге отыр',
    chooseFriend: 'Кім сенің досың болады?', playerNameLabel: 'Сенің атың кім?',
    playerNamePlaceholder: 'Мысалы, Аяулым', petNameLabel: 'Үй жануарының аты', petNamePlaceholder: 'Мысалы, Ұшқын',
    startButton: 'Оқиғаны бастау', registerLink: 'Аккаунтың жоқ па? Тіркелу',
    petNames: { dragon: 'Айдаһар', fox: 'Түлкі', cat: 'Марғау', dog: 'Күшік', bunny: 'Көжек', hedgehog: 'Кірпі', hamster: 'Атжалман' },
  },
  es: {
    pageTitle: 'Tu mascota adorable', languageLabel: 'Idioma', eyebrow: '¡TU MASCOTA ADORABLE!',
    headline: 'Los hábitos saludables se convierten en', headlineAccent: 'una aventura adorable',
    intro: 'Cuídate y tu pequeño amigo crecerá, sonreirá y descubrirá nuevas maravillas.',
    promise: 'Cuidarte es un verdadero superpoder', friendsAlt: 'Siete mascotas adorables sentadas juntas',
    chooseFriend: '¿Quién será tu amigo?', playerNameLabel: '¿Cómo te llamas?',
    playerNamePlaceholder: 'Por ejemplo, Ana', petNameLabel: 'Nombre de la mascota', petNamePlaceholder: 'Por ejemplo, Chispa',
    startButton: 'Empezar la aventura', registerLink: '¿No tienes cuenta? Regístrate',
    petNames: { dragon: 'Dragón', fox: 'Zorro', cat: 'Gatito', dog: 'Cachorro', bunny: 'Conejito', hedgehog: 'Erizo', hamster: 'Hámster' },
  },
  tr: {
    pageTitle: 'Sevimli Hayvanın', languageLabel: 'Dil', eyebrow: 'SEVİMLİ HAYVANIN!',
    headline: 'Sağlıklı alışkanlıklar', headlineAccent: 'sevimli bir maceraya dönüşür',
    intro: 'Kendine iyi bak — küçük dostun büyüsün, sevinsin ve yeni harikalar keşfetsin.',
    promise: 'Kendine iyi bakmak gerçek bir süper güçtür', friendsAlt: 'Yedi sevimli evcil hayvan birlikte oturuyor',
    chooseFriend: 'Arkadaşın kim olacak?', playerNameLabel: 'Adın ne?',
    playerNamePlaceholder: 'Örneğin, Ela', petNameLabel: 'Evcil hayvanın adı', petNamePlaceholder: 'Örneğin, Kıvılcım',
    startButton: 'Maceraya başla', registerLink: 'Hesabın yok mu? Kayıt ol',
    petNames: { dragon: 'Ejderha', fox: 'Tilki', cat: 'Yavru kedi', dog: 'Yavru köpek', bunny: 'Tavşan', hedgehog: 'Kirpi', hamster: 'Hamster' },
  },
};

export function isLanguage(value: string | null): value is Language {
  return languageOptions.some((option) => option.code === value);
}
