import { remove, render, replace } from '../utils/render';

import HeaderView from '../view/header-view';
import GamePageView from '../view/game-page-view';
import FooterView from '../view/footer-view';

class GamePagePresenter {
  #gamePageContainer = null;
  #headerComponent = null;
  #gamePageComponent = null;
  #footerComponent = null;

  constructor(gamePageContainer) {
    this.#gamePageContainer = gamePageContainer;
  }

  renderPage = () => {
    this.#headerComponent = new HeaderView();
    render(this.#gamePageContainer, this.#headerComponent);
    this.#gamePageComponent = new GamePageView();
    render(this.#gamePageContainer, this.#gamePageComponent);
    this.#footerComponent = new FooterView();
    render(this.#gamePageContainer, this.#footerComponent);
  };
}

export default GamePagePresenter;
