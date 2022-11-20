import { remove, render } from '../utils/render';

import HomePageView from '../view/home-page-view';
import HeaderView from '../view/header-view';
import HomeMenuView from '../view/home-menu-view';
import FooterView from '../view/footer-view';

class HomePagePresenter {
  #homePageContainer = null;
  #headerComponent = null;
  #homePageComponent = null;
  #homeMenuComponent = null;
  #footerComponent = null;

  #newGameHandler = null;
  #goToGalleryPageHandler = null;

  constructor({ root, newGameHandler, goToGalleryPageHandler }) {
    this.#homePageContainer = root;
    this.#newGameHandler = newGameHandler;
    this.#goToGalleryPageHandler = goToGalleryPageHandler;
  }

  renderPage = () => {
    this.#renderHeaderComponent();
    this.#renderHomePageComponent();
    this.#renderHomeMenuComponent();
    this.#renderFooterComponent();
  };

  destroyPage = () => {
    this.#destroyHeaderComponent();
    this.#destroyHomePageComponent();
    this.#destroyFooterComponent();
  };

  #renderHeaderComponent = () => {
    this.#headerComponent = new HeaderView();
    render(this.#homePageContainer, this.#headerComponent);
  };

  #destroyHeaderComponent = () => {
    remove(this.#headerComponent);
    this.#headerComponent = null;
  };

  #renderHomePageComponent = () => {
    this.#homePageComponent = new HomePageView();
    render(this.#homePageContainer, this.#homePageComponent);
  };

  #destroyHomePageComponent = () => {
    this.#destroyHomeMenuComponent();

    remove(this.#homePageComponent);
    this.#homePageComponent = null;
  };

  #renderHomeMenuComponent = () => {
    this.#homeMenuComponent = new HomeMenuView();
    this.#homeMenuComponent.setNewGameButtonHandler(this.#newGameHandler);
    this.#homeMenuComponent.setGalleryButtonHandler(this.#goToGalleryPageHandler);
    // this.#homeMenuComponent.setLangButtonClickHandler(this.destroyHomePage);
    render(this.#homePageComponent.getHomePageContainer(), this.#homeMenuComponent);
  };

  #destroyHomeMenuComponent = () => {
    remove(this.#homeMenuComponent);
    this.#homeMenuComponent = null;
  };

  #renderFooterComponent = () => {
    this.#footerComponent = new FooterView();
    render(this.#homePageContainer, this.#footerComponent);
  };

  #destroyFooterComponent = () => {
    remove(this.#footerComponent);
    this.#footerComponent = null;
  };
}

export default HomePagePresenter;
