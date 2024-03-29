import { remove, render, replace } from '../utils/render';
import { RenderPosition, ACTIVE_PAGE } from '../const/const';
import { DEFAULT_ANSWER, DEFAULT_IMG } from '../const/game';

import HeaderView from '../view/header-view';
import HeaderMenuView from '../view/header-menu-view';
import GameScoreView from '../view/game-score-view';
import GamePageView from '../view/game-page-view';
import TopPanelView from '../view/top-panel-view';
import CategoriesView from '../view/categories-view';
import QuestionView from '../view/question-view';
import AnswersContainerView from '../view/answers-container-view';
import AnswersListView from '../view/answers-list-view';
import AnswerDescriptionView from '../view/answer-description-view';
import AnswerInstructionView from '../view/answer-instruction-view';
import NextButtonView from '../view/next-button-view';
import FooterView from '../view/footer-view';
import AudioPlayerView from '../view/audio-player-view';
import ResultsView from '../view/results-view';
import SoundView from '../view/sound-view';

class GamePagePresenter {
  #questionModel = null;
  #languageModel = null;

  #gamePageContainer = null;
  #headerComponent = null;
  #headerMenuComponent = null;
  #gameScoreComponent = null;
  #gamePageComponent = null;
  #topPanelComponent = null;
  #categoriesComponent = null;
  #questionComponent = null;
  #questionAudioPlayer = null;
  #answersContainerComponent = null;
  #answersListComponent = null;
  #answerDescriptionComponent = null;
  #answerInstructionComponent = null;
  #answerDescriptionAudioPlayer = null;
  #nextButtonComponent = null;
  #resultsComponent = null;
  #footerComponent = null;
  #soundComponent = null;

  #currentAnswerId = null;

  #goToHomePageHandler = null;
  #goToGalleryPageHandler = null;

  constructor({ root, questionModel, languageModel, goToHomePageHandler, goToGalleryPageHandler }) {
    this.#gamePageContainer = root;
    this.#goToHomePageHandler = goToHomePageHandler;
    this.#goToGalleryPageHandler = goToGalleryPageHandler;

    this.#questionModel = questionModel;
    this.#languageModel = languageModel;
    this.#questionModel.addRoundWinEvtListener(this.#roundWinHandler);
    this.#questionModel.addPenaltyEvtListener(this.#errorAnswerHandler);
  }

  renderPage = () => {
    this.#renderHeaderComponent();
    this.#renderHeaderMenuComponent();

    this.#renderGamePageComponent();
    this.#renderTopPanelComponent();
    this.#renderCategories();
    this.#renderGameScoreComponent();
    this.#renderQuestion();
    this.#renderAnswersContainerComponent();
    this.#renderAnswerListComponent();
    this.#renderAnswerInstructionComponent();
    this.#renderNexButton();

    this.#renderFooterComponent();

    this.#renderSoundComponent();
  };

  destroyPage = () => {
    this.#destroyHeaderMenuComponent();
    this.#destroyHeaderComponent();

    this.#destroyCategoriesComponent();
    this.#destroyGameScoreComponent();
    this.#destroyTopPanelComponent();
    this.#destroyQuestionComponent();
    this.#destroyAnswerListComponent();
    this.#destroyAnswerInstructionComponent();
    this.#destroyAnswerDescriptionComponent();
    this.#destroyAnswersContainerComponent();
    this.#destroyNextButtonComponent();

    this.#destroyGamePageComponent();

    this.#destroyFooterComponent();
    this.#destroySoundComponent();

    this.#currentAnswerId = null;
    this.#questionModel.newGame();
  };

  renderResultsPage = () => {
    this.#destroyCategoriesComponent();
    this.#destroyGameScoreComponent();
    this.#destroyTopPanelComponent();
    this.#destroyQuestionComponent();
    this.#destroyAnswerListComponent();
    this.#destroyAnswerInstructionComponent();
    this.#destroyAnswerDescriptionComponent();
    this.#destroyAnswersContainerComponent();
    this.#destroyNextButtonComponent();

    this.#renderResultsComponent();
  };

  #answerClickHandler = (id) => {
    if (this.#currentAnswerId === id) return;

    this.#currentAnswerId = id;

    this.#questionModel.updateUserAnswers(id);
    this.#renderAnswerListComponent();

    if (this.#answerInstructionComponent) this.#destroyAnswerInstructionComponent();
    if (this.#questionModel.isWin) this.#renderQuestion();

    this.#renderAnswerDescriptionComponent(id);
  };

  #tryAgainHandler = () => {
    this.#destroyResultsComponent();
    this.destroyPage();

    this.#questionModel.newGame();

    this.renderPage();
  };

  #roundWinHandler = () => {
    this.#questionAudioPlayer.stopAudio();
    this.#renderGameScoreComponent();
    this.#soundComponent.playRightAnswerSound();
    this.#nextButtonComponent.enableButton();
  };

  #errorAnswerHandler = () => {
    this.#soundComponent.playWrongAnswerSound();
  };

  #newRound = () => {
    if (this.#questionModel.isGameOver()) {
      this.renderResultsPage();
      this.#soundComponent.playVictorySound();
      return;
    }

    this.#currentAnswerId = null;

    this.#questionModel.nextRound();
    this.#renderCategories();
    this.#questionAudioPlayer = null;
    this.#renderQuestion();
    this.#renderAnswerListComponent();

    this.#destroyAnswerDescriptionComponent();
    this.#renderAnswerInstructionComponent();

    this.#nextButtonComponent.disableButton();
  };

  #renderHeaderComponent = () => {
    this.#headerComponent = new HeaderView();
    this.#headerComponent.setLogoButtonClickHandler(this.#goToHomePageHandler);
    render(this.#gamePageContainer, this.#headerComponent);
  };

  #destroyHeaderComponent = () => {
    remove(this.#headerComponent);
    this.#headerComponent = null;
  };

  #renderHeaderMenuComponent = () => {
    this.#headerMenuComponent = new HeaderMenuView(this.#languageModel.lang, ACTIVE_PAGE.GAME);
    this.#headerMenuComponent.setHomeButtonHandler(this.#goToHomePageHandler);
    this.#headerMenuComponent.setGalleryButtonHandler(this.#goToGalleryPageHandler);
    render(this.#headerComponent.getHeaderContainer(), this.#headerMenuComponent);
  };

  #destroyHeaderMenuComponent = () => {
    remove(this.#headerMenuComponent);
    this.#headerMenuComponent = null;
  };

  #renderGamePageComponent = () => {
    this.#gamePageComponent = new GamePageView();
    render(this.#gamePageContainer, this.#gamePageComponent);
  };

  #destroyGamePageComponent = () => {
    remove(this.#gamePageComponent);
    this.#gamePageComponent = null;
  };

  #renderTopPanelComponent = () => {
    this.#topPanelComponent = new TopPanelView();
    render(this.#gamePageComponent.getGameContainer(), this.#topPanelComponent);
  };

  #destroyTopPanelComponent = () => {
    remove(this.#topPanelComponent);
    this.#topPanelComponent = null;
  };

  #renderCategories = () => {
    const prevCategoriesComponent = this.#categoriesComponent;
    this.#categoriesComponent = new CategoriesView(this.#questionModel.getCategories());

    if (!prevCategoriesComponent) {
      render(this.#topPanelComponent, this.#categoriesComponent, RenderPosition.AFTERBEGIN);
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
    const question = this.#questionModel.getQuestion();
    const isWin = this.#questionModel.isWin;

    const questionData = {
      imgSrc: isWin ? question.imgSrc : DEFAULT_IMG,
      answer: isWin ? question.name : DEFAULT_ANSWER,
    };

    const prevQuestionComponent = this.#questionComponent;
    this.#questionComponent = new QuestionView(questionData);

    if (!this.#questionAudioPlayer) {
      this.#questionAudioPlayer = new AudioPlayerView(question.audio);
    }

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
    this.#destroyGameScoreComponent();
  };

  #renderGameScoreComponent = () => {
    const prevGameScoreComponent = this.#gameScoreComponent;
    this.#gameScoreComponent = new GameScoreView(this.#questionModel.score, this.#languageModel.lang);

    if (!prevGameScoreComponent) {
      render(this.#topPanelComponent, this.#gameScoreComponent);
      return;
    }

    replace(this.#gameScoreComponent, prevGameScoreComponent);
    remove(prevGameScoreComponent);
  };

  #destroyGameScoreComponent = () => {
    remove(this.#gameScoreComponent);
    this.#gameScoreComponent = null;
  };

  #renderAnswersContainerComponent = () => {
    this.#answersContainerComponent = new AnswersContainerView();
    this.#answersContainerComponent.setAnswerClickHandler(this.#answerClickHandler);
    render(this.#gamePageComponent.getGameContainer(), this.#answersContainerComponent);
  };

  #destroyAnswersContainerComponent = () => {
    remove(this.#answersContainerComponent);
    this.#answersContainerComponent = null;
  };

  #renderAnswerListComponent = () => {
    const prevAnswerListComponent = this.#answersListComponent;
    this.#answersListComponent = new AnswersListView(this.#questionModel.getUserAnswers());

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

  #renderAnswerDescriptionComponent = (id) => {
    const description = this.#questionModel.getAnswerDescription(id);
    const prevAnswerDescriptionComponent = this.#answerDescriptionComponent;
    this.#answerDescriptionComponent = new AnswerDescriptionView(description);

    this.#answerDescriptionAudioPlayer = new AudioPlayerView(description.audio);

    if (!prevAnswerDescriptionComponent) {
      render(this.#answersContainerComponent, this.#answerDescriptionComponent);
      render(this.#answerDescriptionComponent.getAnswerContentComponent(), this.#answerDescriptionAudioPlayer);
      return;
    }

    replace(this.#answerDescriptionComponent, prevAnswerDescriptionComponent);
    render(this.#answerDescriptionComponent.getAnswerContentComponent(), this.#answerDescriptionAudioPlayer);
    remove(prevAnswerDescriptionComponent);
  };

  #destroyAnswerDescriptionComponent = () => {
    remove(this.#answerDescriptionAudioPlayer);
    remove(this.#answerDescriptionComponent);
    this.#answerDescriptionAudioPlayer = null;
    this.#answerDescriptionComponent = null;
  };

  #renderAnswerInstructionComponent = () => {
    this.#answerInstructionComponent = new AnswerInstructionView(this.#languageModel.lang);
    render(this.#answersContainerComponent, this.#answerInstructionComponent);
  };

  #destroyAnswerInstructionComponent = () => {
    remove(this.#answerInstructionComponent);
    this.#answerInstructionComponent = null;
  };

  #renderNexButton = () => {
    this.#nextButtonComponent = new NextButtonView(this.#questionModel.isWin, this.#languageModel.lang);
    this.#nextButtonComponent.setButtonClickHandler(this.#newRound);
    render(this.#gamePageComponent.getGameContainer(), this.#nextButtonComponent);
  };

  #destroyNextButtonComponent = () => {
    remove(this.#nextButtonComponent);
    this.#nextButtonComponent = null;
  };

  #renderFooterComponent = () => {
    this.#footerComponent = new FooterView();
    render(this.#gamePageContainer, this.#footerComponent);
  };

  #destroyFooterComponent = () => {
    remove(this.#footerComponent);
    this.#footerComponent = null;
  };

  #renderResultsComponent = () => {
    this.#resultsComponent = new ResultsView(this.#questionModel.score, this.#languageModel.lang);
    this.#resultsComponent.setButtonClickHandler(this.#tryAgainHandler);
    render(this.#gamePageComponent.getGameContainer(), this.#resultsComponent);
  };

  #destroyResultsComponent = () => {
    remove(this.#resultsComponent);
    this.#resultsComponent = null;
  };

  #renderSoundComponent = () => {
    this.#soundComponent = new SoundView();
    render(this.#gamePageContainer, this.#soundComponent);
  };

  #destroySoundComponent = () => {
    remove(this.#soundComponent);
    this.#soundComponent = null;
  };
}

export default GamePagePresenter;
