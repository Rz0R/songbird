import AbstractView from './abstract-view';
import { MAX_SCORE } from '../const/game';
import { LANGUAGE } from '../const/const';
import { TRANSLATION } from '../const/translation';

const createCongratsImgTemplate = () =>
  `<div class="game-over__image-ibg">
    <img src="/assets/img/congrats.jpg" alt="congratulation" />
  </div>`;

const createResultTemplate = (score, lang) => {
  const isWin = score >= MAX_SCORE;

  return `<div class="game__over game-over">
    <h1 class="game-over__congratulation">${TRANSLATION.CONGRATULATIONS[lang]}</h1>
    <p class="game-over__message">${TRANSLATION.CONGRATULATORY_MESSAGE[lang].replace('{SCORE}', score)}</p>
    <button class="game-over__button" ${isWin ? 'hidden' : ''}>${TRANSLATION.TRY_AGAIN[lang]}</button>
    ${isWin ? createCongratsImgTemplate() : ''} 
  </div>`;
};

class ResultsView extends AbstractView {
  #score = 0;
  #lang;

  constructor(score, lang = LANGUAGE.EN) {
    super();
    this.#score = score;
    this.#lang = lang;
  }

  get template() {
    return createResultTemplate(this.#score, this.#lang);
  }

  setButtonClickHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.querySelector('.game-over__button').addEventListener('click', this.#buttonClickHandler);
  };

  #buttonClickHandler = () => {
    this._callback.buttonClick();
  };
}

export default ResultsView;
