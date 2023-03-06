import { birdsData, categories } from '../const/birds-data';
import { LANGUAGE } from '../const/const';
import { ANSWER } from '../const/game';
import { getRandomInt, updateItem } from '../utils/common';

class QuestionModel {
  #winEvtListeners = new Set();
  #penaltyEvtListeners = new Set();

  #language = LANGUAGE.EN;
  #round = 0;
  #isWin = false;
  #userAnswers = null;
  #currentQuestion = null;

  #score = 0;
  #maxRoundPoints = 5;
  #penaltyPoints = 0;

  constructor(lang = LANGUAGE.EN) {
    this.#language = lang;
  }

  getCategories = () => {
    return categories[this.#language].map((category, ind) => {
      return { name: category, isActive: ind === this.#round };
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

  setLanguage = (lang) => {
    this.#language = lang;
  };

  getQuestion = () => {
    if (this.#currentQuestion === null) {
      const questionInd = getRandomInt(0, birdsData[this.#round].length - 1);
      const question = birdsData[this.#round][questionInd];
      this.#currentQuestion = {
        id: question.id,
        name: question.name[this.#language],
        imgSrc: question.image,
        audio: question.audio,
      };
    }

    return this.#currentQuestion;
  };

  getUserAnswers = () => {
    if (this.#userAnswers === null) {
      this.#userAnswers = birdsData[this.#round].map(({ id, name }) => {
        return { id, name: name[this.#language], answer: ANSWER.NO_ANSWER };
      });
    }

    return this.#userAnswers;
  };

  updateUserAnswers = (id) => {
    if (this.#isWin) return this.#userAnswers;

    let userAnswer = this.#userAnswers.find((answer) => answer.id === +id);

    if (userAnswer.answer === ANSWER.INCORRECT) {
      return this.#userAnswers;
    }

    userAnswer = { ...userAnswer, answer: id === this.getQuestion().id ? ANSWER.CORRECT : ANSWER.INCORRECT };
    this.#userAnswers = updateItem(this.#userAnswers, userAnswer);

    if (userAnswer.answer === ANSWER.CORRECT) this.setRoundWin();
    if (userAnswer.answer === ANSWER.INCORRECT) this.setPenalty();

    return this.#userAnswers;
  };

  getAnswerDescription = (id) => {
    const item = birdsData[this.#round][id - 1];

    return {
      name: item.name[this.#language],
      species: item.species,
      description: item.description[this.#language],
      imgSrc: item.image,
      audio: item.audio,
    };
  };

  getAllDescriptions = () => {
    const flatBirdData = birdsData.flat();

    return flatBirdData.map((item) => {
      return {
        name: item.name[this.#language],
        species: item.species,
        description: item.description[this.#language],
        imgSrc: item.image,
        audio: item.audio,
      };
    });
  };

  nextRound = () => {
    this.#round++;
    this.#isWin = false;
    this.#userAnswers = null;
    this.#currentQuestion = null;
    this.#penaltyPoints = 0;
  };

  newGame = () => {
    this.#round = 0;
    this.#score = 0;
    this.#isWin = false;
    this.#userAnswers = null;
    this.#currentQuestion = null;
    this.#penaltyPoints = 0;
  };

  isGameOver = () => {
    return this.#round + 1 >= birdsData.length;
  };

  addRoundWinEvtListener = (callback) => {
    this.#winEvtListeners.add(callback);
  };

  removeRoundWinEvtListener = (callback) => {
    this.#winEvtListeners.delete(callback);
  };

  addPenaltyEvtListener = (callback) => {
    this.#penaltyEvtListeners.add(callback);
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
