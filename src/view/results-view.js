import AbstractView from './abstract-view';

const createCongratsImgTemplate = () => `<div class="game-over__image-ibg">
    <img src="/assets/img/congrats.jpg" alt="congratulation" />
  </div>`;

const createResultTemplate = (score) => {
  const isWin = score >= 30;

  return `<div class="game__over game-over">
    <h1 class="game-over__congratulation">Поздравляем!</h1>
    <p class="game-over__message">Вы прошли викторину и набрали ${score} из 30 возможных баллов</p>
    <button class="game-over__button" hidden=${isWin}>Попробовать еще раз!</button>
    ${isWin ? createCongratsImgTemplate() : ''} 
  </div>`;
};

class ResultsView extends AbstractView {
  #score = 0;

  constructor() {
    super();
    this.#score = this.#score;
  }

  get template() {
    return createResultTemplate();
  }

  setButtonClickHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.addEventListener('click', this.#buttonClickHandler);
  };

  #buttonClickHandler = () => {
    this._callback.buttonClick();
  };
}

export default ResultsView;
