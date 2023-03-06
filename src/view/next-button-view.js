import AbstractView from './abstract-view';
import { LANGUAGE } from '../const/const';
import { TRANSLATION } from '../const/translation';

const createNextButtonTemplate = (isDisabled, lang) => `<button disabled=${isDisabled} class="game__next-btn">${TRANSLATION.NEXT_LEVEL[lang]}</button>`;

class NextButtonView extends AbstractView {
  #isDisabled;
  #lang;

  constructor(isDisabled = true, lang = LANGUAGE.EN) {
    super();
    this.#isDisabled = isDisabled;
    this.#lang = lang;
  }

  get template() {
    return createNextButtonTemplate(this.#isDisabled, this.#lang);
  }

  setButtonClickHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.addEventListener('click', this.#buttonClickHandler);
  };

  #buttonClickHandler = () => {
    this._callback.buttonClick();
  };

  enableButton = () => {
    this.element.disabled = false;
  };

  disableButton = () => {
    this.element.disabled = true;
  };
}

export default NextButtonView;
