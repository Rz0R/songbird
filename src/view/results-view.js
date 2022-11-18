import AbstractView from './abstract-view';
import { MAX_SCORE } from '../const/game';

const createCongratsImgTemplate = () => `<div class="game-over__image-ibg">
    <img src="/assets/img/congrats.jpg" alt="congratulation" />
  </div>`;

const createResultTemplate = (score) => {
  const isWin = score >= MAX_SCORE;

  return `<div class="game__over game-over">
    <h1 class="game-over__congratulation">Поздравляем!</h1>
    <p class="game-over__message">Вы прошли викторину и набрали ${score} из 30 возможных баллов</p>
    <button class="game-over__button" ${isWin ? 'hidden' : ''}>Попробовать еще раз!</button>
    ${isWin ? createCongratsImgTemplate() : ''} 
  </div>`;
};

class ResultsView extends AbstractView {
  #score = 0;

  constructor(score) {
    super();
    this.#score = score;
  }

  get template() {
    return createResultTemplate(this.#score);
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
