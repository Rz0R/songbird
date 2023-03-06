import { SAVE_LANG_KEY } from '../const/const';
import { LANGUAGE } from '../const/const';

export const saveLanguage = (language) => {
  localStorage.setItem(SAVE_LANG_KEY, language);
};

export const loadSavedLanguage = () => {
  if (localStorage.getItem(SAVE_LANG_KEY) !== null) {
    return localStorage.getItem(SAVE_LANG_KEY);
  }

  saveLanguage(LANGUAGE.RU);
  return LANGUAGE.RU;
};
