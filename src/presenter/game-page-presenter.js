import { remove, render, replace } from '../utils/render';
import { RenderPosition } from '../const/const';
import { DEFAULT_ANSWER, DEFAULT_IMG, ANSWER } from '../const/game';

import HeaderView from '../view/header-view';
import GamePageView from '../view/game-page-view';
import CategoriesView from '../view/categories-view';
import QuestionView from '../view/question-view';
import AnswersContainerView from '../view/answers-container-view';
import AnswersListView from '../view/answers-list-view';
import AnswerDescriptionView from '../view/answer-description-view';
import AnswerInstructionView from '../view/answer-instruction-view';
import NextButtonView from '../view/next-button-view';
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

const answers = [
  { name: 'Ворон', answer: ANSWER.NO_ANSWER },
  { name: 'Дятел', answer: ANSWER.CORRECT },
  { name: 'Ласточка', answer: ANSWER.INCORRECT },
  { name: 'Козодой', answer: ANSWER.NO_ANSWER },
  { name: 'Кукушка', answer: ANSWER.NO_ANSWER },
  { name: 'Синица', answer: ANSWER.NO_ANSWER },
];

const answerDescription = {
  name: 'Дятел',
  species: 'Dendrocopos major',
  description:
    'Дятел – заметная и шумная птица, часто живет рядом с человеком. С середины января до конца июня можно услышать «барабанную дробь» дятлов – трель от вибрации веток под быстрыми ударами клюва птицы. В хорошую погоду дробь слышна в радиусе 1,5 км.',
  imgSrc: 'https://live.staticflickr.com/65535/49339376578_e933426455.jpg',
  audio: {
    src: 'https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC518928-AB-017%20dzi%C4%99cio%C5%82%20du%C5%BCy%20agresja%20%282%29.mp3',
    duration: 18,
  },
};

const insructionMessages = ['Послушайте плеер.', 'Выберите птицу из списка.'];

class GamePagePresenter {
  #gamePageContainer = null;
  #gamePageComponent = null;
  #headerComponent = null;
  #categoriesComponent = null;
  #questionComponent = null;
  #questionAudioPlayer = null;
  #answersContainerComponent = null;
  #answersListComponent = null;
  #answerDescriptionComponent = null;
  #answerInstructionComponent = null;
  #answerDescriptionAudioPlayer = null;
  #nextButtonComponent = null;
  #footerComponent = null;

  #isWin = true;

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
    this.#renderAnswersContainerComponent();
    this.#renderAnswerListComponent();
    // this.#renderAnswerDescriptionComponent();
    this.#renderAnswerInstructionComponent();
    this.#renderNexButton();

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
      render(this.#gamePageComponent.getGameContainer(), this.#questionComponent);
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

  #renderAnswersContainerComponent = () => {
    this.#answersContainerComponent = new AnswersContainerView();
    render(this.#gamePageComponent.getGameContainer(), this.#answersContainerComponent);
  };

  #destroyAnswersContainerComponent = () => {
    remove(this.#answersContainerComponent);
    this.#answersContainerComponent = null;
  };

  #renderAnswerListComponent = () => {
    const prevAnswerListComponent = this.#answersListComponent;
    this.#answersListComponent = new AnswersListView(answers);

    if (!prevAnswerListComponent) {
      render(this.#answersContainerComponent, this.#answersListComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#answersListComponent, prevAnswerListComponent);
    remove(prevAnswerListComponent);
  };

  #destroyAnswerListComponent = () => {
    remove(this.#answersListComponent);
    this.#answersListComponent = null;
  };

  #renderAnswerDescriptionComponent = () => {
    const prevAnswerDescriptionComponent = this.#answerDescriptionComponent;
    this.#answerDescriptionComponent = new AnswerDescriptionView(answerDescription);

    const prevAnswerDescriptionAudioPlayer = this.#answerDescriptionAudioPlayer;
    this.#answerDescriptionAudioPlayer = new AudioPlayerView(answerDescription.audio);

    if (!prevAnswerDescriptionComponent) {
      render(this.#answersContainerComponent, this.#answerDescriptionComponent);
      render(this.#answerDescriptionComponent.getAnswerContentComponent(), this.#answerDescriptionAudioPlayer);
      return;
    }

    replace(this.#answerDescriptionComponent, prevAnswerDescriptionComponent);
    remove(prevAnswerDescriptionComponent);

    replace(this.#answerDescriptionAudioPlayer, prevAnswerDescriptionAudioPlayer);
    remove(prevAnswerDescriptionAudioPlayer);
  };

  #destroyAnswerDescriptionComponen = () => {
    remove(this.#answerDescriptionAudioPlayer);
    remove(this.#answerDescriptionComponent);
    this.#answerDescriptionAudioPlayer = null;
    this.#answerDescriptionComponent = null;
  };

  #renderAnswerInstructionComponent = () => {
    this.#answerInstructionComponent = new AnswerInstructionView(insructionMessages);
    render(this.#answersContainerComponent, this.#answerInstructionComponent);
  };

  #destroyAnswerInstructionComponent = () => {
    remove(this.#answerInstructionComponent);
    this.#answerInstructionComponent = null;
  };

  #renderNexButton = () => {
    this.#nextButtonComponent = new NextButtonView(true);
    this.#nextButtonComponent.setButtonClickHandler(() => console.log('next btn'));
    render(this.#gamePageComponent.getGameContainer(), this.#nextButtonComponent);
  };

  #destroyNextButtonComponet = () => {
    remove(this.#nextButtonComponent);
    this.#nextButtonComponent = null;
  };
}

export default GamePagePresenter;
