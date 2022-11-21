import HomePagePresenter from './home-page-presenter';
import GamePagePresenter from './game-page-presenter';
import GalleryPagePresenter from './gallery-page-presenter';

import QuestionModel from '../model/question-model';
import LanguageModel from '../model/language-model';

import { loadSavedLanguage, saveLanguage } from '../utils/save';

class MainPresenter {
  #root = null;

  #questionModel = null;
  #languageModel = null;

  #gamePagePresenter = null;
  #homePagePresenter = null;
  #galleryPagePresenter = null;

  #currentPage = null;

  constructor(root) {
    this.#root = root;

    const lang = this.#loadSavedLanguage();
    this.#questionModel = new QuestionModel(lang);
    this.#languageModel = new LanguageModel(lang);
    this.#languageModel.addObserver(this.#saveLanguage);
  }

  init = () => {
    this.#homePagePresenter = new HomePagePresenter({
      root: this.#root,
      newGameHandler: this.#newGameHandler,
      goToGalleryPageHandler: this.#goToGalleryPageHandler,
      toggleLangHandler: this.#toggleLangHandler,
      languageModel: this.#languageModel,
    });
    this.#gamePagePresenter = new GamePagePresenter({
      root: this.#root,
      questionModel: this.#questionModel,
      languageModel: this.#languageModel,
      goToHomePageHandler: this.#goToHomePageHandler,
      goToGalleryPageHandler: this.#goToGalleryPageHandler,
    });
    this.#galleryPagePresenter = new GalleryPagePresenter({
      root: this.#root,
      goToHomePageHandler: this.#goToHomePageHandler,
      newGameHandler: this.#newGameHandler,
      questionModel: this.#questionModel,
      languageModel: this.#languageModel,
    });

    this.render();
  };

  render = () => {
    // this.#currentPage = this.#galleryPagePresenter;
    // this.#currentPage = this.#gamePagePresenter;
    this.#currentPage = this.#homePagePresenter;
    this.#currentPage.renderPage();
  };

  #newGameHandler = () => {
    this.#currentPage.destroyPage();
    this.#currentPage = this.#gamePagePresenter;
    this.#currentPage.renderPage();
  };

  #goToHomePageHandler = () => {
    this.#currentPage.destroyPage();
    this.#currentPage = this.#homePagePresenter;
    this.#currentPage.renderPage();
  };

  #goToGalleryPageHandler = () => {
    this.#currentPage.destroyPage();
    this.#currentPage = this.#galleryPagePresenter;
    this.#currentPage.renderPage();
  };

  #toggleLangHandler = () => {
    this.#languageModel.toggleLang();
    this.#currentPage.destroyPage();
    this.#currentPage.renderPage();
    this.#questionModel.setLangauge(this.#languageModel.lang);
  };

  #loadSavedLanguage = () => {
    return loadSavedLanguage();
  };

  #saveLanguage = (lang) => {
    saveLanguage(lang);
  };
}

export default MainPresenter;
