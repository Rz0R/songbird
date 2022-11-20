import { SAVE_LANG_KEY } from '../const/const';
import { LANGUAGE } from '../const/const';

export const saveLanguage = (langauge) => {
  localStorage.setItem(SAVE_LANG_KEY, langauge);
};

export const loadSavedLanguage = () => {
  if (localStorage.getItem(SAVE_LANG_KEY) !== null) {
    return localStorage.getItem(SAVE_LANG_KEY);
  }

  saveLanguage(LANGUAGE.EN);
  return LANGUAGE.EN;
};
