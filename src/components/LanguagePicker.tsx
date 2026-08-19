import { ChangeEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { languageOptions, translations } from '../lib/translations';

export function LanguagePicker() {
  const { language, setLanguage } = useLanguage();
  const text = translations[language];

  function changeLanguage(event: ChangeEvent<HTMLSelectElement>) {
    setLanguage(event.target.value as typeof language);
  }

  return (
    <label className="language-picker">
      <span>🌐 {text.languageLabel}</span>
      <select aria-label={text.languageLabel} onChange={changeLanguage} value={language}>
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}
