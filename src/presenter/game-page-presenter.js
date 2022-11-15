import { remove, render, replace } from '../utils/render';
import { RenderPosition } from '../const/const';
import { DEFAULT_ANSWER, DEFAULT_IMG } from '../const/game';

import HeaderView from '../view/header-view';
import CategoriesView from '../view/categories-view';
import QuestionView from '../view/question-view';
import GamePageView from '../view/game-page-view';
import FooterView from '../view/footer-view';
import AudioPlayerView from '../view/audio-player-view';

const categories = [
  { name: 'Разминка', isAcive: false },
  { name: 'Воробьиные', isAcive: false },
  { name: 'Лесные птицы', isAcive: false },
  { name: 'Певчие птицы', isAcive: false },
  { name: 'Хищные птицы', isAcive: true },
  { name: 'Морские птицы', isAcive: false },
];

const question = {
  imgSrc: 'https://live.staticflickr.com/65535/49339376578_e933426455.jpg',
  answer: 'Дятел',
  audio: {
    src: 'https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC518928-AB-017%20dzi%C4%99cio%C5%82%20du%C5%BCy%20agresja%20%282%29.mp3',
    duration: 18,
  },
};

class GamePagePresenter {
  #gamePageContainer = null;
  #headerComponent = null;
  #categoriesComponent = null;
  #questionComponent = null;
  #gamePageComponent = null;
  #footerComponent = null;

  #questionAudioPlayer = null;

  #isWin = false;

  constructor(gamePageContainer) {
    this.#gamePageContainer = gamePageContainer;
  }

  renderPage = () => {
    this.#headerComponent = new HeaderView();
    render(this.#gamePageContainer, this.#headerComponent);
    this.#gamePageComponent = new GamePageView();
    render(this.#gamePageContainer, this.#gamePageComponent);

    this.#renderCategories();
    this.#renderQuestion();

    this.#footerComponent = new FooterView();
    render(this.#gamePageContainer, this.#footerComponent);
  };

  #renderCategories = () => {
    const prevCategoriesComponent = this.#categoriesComponent;
    this.#categoriesComponent = new CategoriesView(categories);

    if (!prevCategoriesComponent) {
      render(this.#gamePageComponent.getGameContainer(), this.#categoriesComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#categoriesComponent, prevCategoriesComponent);
    remove(prevCategoriesComponent);
  };

  #destroyCategoriesComponent = () => {
    remove(this.#categoriesComponent);
    this.#categoriesComponent = null;
  };

  #renderQuestion = () => {
    const questionData = {
      imgSrc: this.#isWin ? question.imgSrc : DEFAULT_IMG,
      answer: this.#isWin ? question.answer : DEFAULT_ANSWER,
    };

    const prevQuestionComponent = this.#questionComponent;
    this.#questionComponent = new QuestionView(questionData);

    this.#questionAudioPlayer = new AudioPlayerView(question.audio);
    render(this.#questionComponent.getQuestionContentContainer(), this.#questionAudioPlayer);

    if (!prevQuestionComponent) {
      render(this.#gamePageComponent.getGameContainer(), this.#questionComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#questionComponent, prevQuestionComponent);
    remove(prevQuestionComponent);
  };

  #destroyQuestionComponent = () => {
    remove(this.#questionAudioPlayer);
    remove(this.#questionComponent);
    this.#questionAudioPlayer = null;
    this.#questionComponent = null;
  };
}

export default GamePagePresenter;
