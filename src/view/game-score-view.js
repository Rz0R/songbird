import AbstractView from './abstract-view';
import { LANGUAGE } from '../const/const';
import { TRANSLATION } from '../const/translation';

const createGameScoreTemplate = (score, lang) =>
  `<h5 class="header__score score">${TRANSLATION.SCORE[lang]}: <span class="score__value">${score}</span></h5>`;

class GameScoreView extends AbstractView {
  #score = 0;
  #lang;

  constructor(score, lang = LANGUAGE.EN) {
    super();
    this.#score = score;
    this.#lang = lang;
  }

  get template() {
    return createGameScoreTemplate(this.#score, this.#lang);
  }
}

export default GameScoreView;
