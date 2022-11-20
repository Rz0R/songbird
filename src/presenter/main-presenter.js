import HomePagePresenter from './home-page-presenter';
import GamePagePresenter from './game-page-presenter';
import GalleryPagePresenter from './gallery-page-presenter';

import QuestionModel from '../model/question-model';

class MainPresenter {
  #root = null;

  #questionModel = null;

  #gamePagePresenter = null;
  #homePagePresenter = null;
  #galleryPagePresenter = null;

  #currentPage = null;

  constructor(root) {
    this.#root = root;

    this.#questionModel = new QuestionModel();
  }

  init = () => {
    this.#homePagePresenter = new HomePagePresenter({
      root: this.#root,
      newGameHandler: this.#newGameHandler,
      goToGalleryPageHandler: this.#goToGalleryPageHandler,
    });
    this.#gamePagePresenter = new GamePagePresenter({
      root: this.#root,
      questionModel: this.#questionModel,
      goToHomePageHandler: this.#goToHomePageHandler,
    });
    this.#galleryPagePresenter = new GalleryPagePresenter({
      root: this.#root,
      goToHomePageHandler: this.#goToHomePageHandler,
      questionModel: this.#questionModel,
    });

    this.render();
  };

  render = () => {
    this.#currentPage = this.#galleryPagePresenter;
    // this.#currentPage = this.#gamePagePresenter;
    // this.#currentPage = this.#homePagePresenter;
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
}

export default MainPresenter;
