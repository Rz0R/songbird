import HomePagePresenter from './home-page-presenter';
import GamePagePresenter from './game-page-presenter';

class MainPresenter {
  #root = null;

  #gamePagePresenter = null;
  #homePagePresenter = null;

  #currentPage = null;

  constructor(root) {
    this.#root = root;
  }

  init = () => {
    this.#homePagePresenter = new HomePagePresenter({ root: this.#root, newGameHandler: this.#newGameHandler });
    this.#gamePagePresenter = new GamePagePresenter({
      root: this.#root,
      goToHomePageHandler: this.#goToHomePageHandler,
    });

    this.render();
  };

  render = () => {
    this.#currentPage = this.#homePagePresenter;
    this.#homePagePresenter.renderPage();
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
}

export default MainPresenter;
