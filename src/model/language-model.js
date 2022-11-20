import AbstractObservable from './abstract-observable';
import { LANGUAGE } from '../const/const';

class LanguageModel extends AbstractObservable {
  #lang = LANGUAGE.EN;

  constructor(lang) {
    super();
    this.#lang = lang;
  }

  get lang() {
    return this.#lang;
  }

  toggleLang = () => {
    if (this.#lang === LANGUAGE.RU) {
      this.#lang = LANGUAGE.EN;
    } else {
      this.#lang = LANGUAGE.RU;
    }

    this._notify(this.#lang);
  };
}

export default LanguageModel;
