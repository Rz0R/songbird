import AbstractView from './abstract-view';

const createGameScoreTemplate = (score) =>
  `<h5 class="header__score score">Score: <span class="score__value">${score}</span></h5>`;

class GameScoreView extends AbstractView {
  #score = 0;
  constructor(score) {
    super();
    this.#score = score;
  }

  get template() {
    return createGameScoreTemplate(this.#score);
  }
}

export default GameScoreView;
