import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { defaultLanguage, isLanguage, Language, translations } from '../lib/translations';

const STORAGE_KEY = 'your-cute-animal-language';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getSavedLanguage(): Language {
  const savedLanguage = localStorage.getItem(STORAGE_KEY);
  if (isLanguage(savedLanguage)) return savedLanguage;

  const browserLanguage = navigator.language.split('-')[0];
  return isLanguage(browserLanguage) ? browserLanguage : defaultLanguage;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getSavedLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.title = translations[language].pageTitle;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
