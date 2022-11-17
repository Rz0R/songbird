import AbstractObservable from './abstract-observable';

import { birdsData, categories } from '../const/birds-data';
import { LANGUAGE } from '../const/const';
import { ANSWER } from '../const/game';
import { getRandomInt, updateItem } from '../utils/common';

class QuestionModel {
  #winEvtListeners = new Set();
  #penaltyEvtListeners = new Set();

  #langauge = LANGUAGE.RU;
  #round = 0;
  #isWin = false;
  #userAnswers = null;
  #currentQuestion = null;

  #score = 0;
  #maxRoundPoints = 5;
  #penaltyPoints = 0;

  getCategories = () => {
    return categories[this.#langauge].map((category, ind) => {
      return { name: category, isAcive: ind === this.#round };
    });
  };

  get isWin() {
    return this.#isWin;
  }

  get score() {
    return this.#score;
  }

  setActiveCategory = (ind) => {
    this.#round = +ind;
  };

  getQuestion = () => {
    if (this.#currentQuestion === null) {
      const questionInd = getRandomInt(0, birdsData[this.#round].length - 1);
      const question = birdsData[this.#round][questionInd];
      this.#currentQuestion = {
        id: question.id,
        name: question.name[this.#langauge],
        imgSrc: question.image,
        audio: question.audio,
      };
    }

    return this.#currentQuestion;
  };

  getUserAnswers = () => {
    if (this.#userAnswers === null) {
      this.#userAnswers = birdsData[this.#round].map(({ id, name }) => {
        return { id, name: name[this.#langauge], answer: ANSWER.NO_ANSWER };
      });
    }

    return this.#userAnswers;
  };

  updateUserAnswers = (id) => {
    if (this.#isWin) return this.#userAnswers;

    let userAnswer = this.#userAnswers.find((answer) => answer.id === +id);
    userAnswer = { ...userAnswer, answer: id === this.getQuestion().id ? ANSWER.CORRECT : ANSWER.INCORRECT };
    this.#userAnswers = updateItem(this.#userAnswers, userAnswer);

    if (userAnswer.answer === ANSWER.CORRECT) this.setRoundWin();
    if (userAnswer.answer === ANSWER.INCORRECT) this.setPenalty();

    return this.#userAnswers;
  };

  getAnswerDescription = (id) => {
    const item = birdsData[this.#round][id - 1];

    return {
      name: item.name[this.#langauge],
      species: item.species,
      description: item.description[this.#langauge],
      imgSrc: item.image,
      audio: item.audio,
    };
  };

  addRoundWinEvtListener = (callback) => {
    this.#winEvtListeners.add(callback);
  };

  removeRoundWinEvtListener = (callback) => {
    this.#winEvtListeners.delete(callback);
  };

  addPenaltyEvtListener = (callback) => {
    this.#winEvtListeners.add(callback);
  };

  removePenaltyEvtListener = (callback) => {
    this.#penaltyEvtListeners.delete(callback);
  };

  setRoundWin = () => {
    this.#isWin = true;
    this.#score = this.#score + this.#maxRoundPoints - this.#penaltyPoints;
    this.#winEvtListeners.forEach((callback) => callback());
  };

  setPenalty = () => {
    this.#penaltyPoints++;
    this.#penaltyEvtListeners.forEach((callback) => callback());
  };
}

export default QuestionModel;
