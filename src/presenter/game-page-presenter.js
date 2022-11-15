import { remove, render, replace } from '../utils/render';
import { RenderPosition } from '../const/const';

import HeaderView from '../view/header-view';
import CategoriesView from '../view/categories-view';
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

class GamePagePresenter {
  #gamePageContainer = null;
  #headerComponent = null;
  #categoriesComponent = null;
  #gamePageComponent = null;
  #footerComponent = null;

  #questionAudioPlayer = null;

  constructor(gamePageContainer) {
    this.#gamePageContainer = gamePageContainer;
  }

  renderPage = () => {
    this.#headerComponent = new HeaderView();
    render(this.#gamePageContainer, this.#headerComponent);
    this.#gamePageComponent = new GamePageView();
    render(this.#gamePageContainer, this.#gamePageComponent);

    this.#renderCategories();

    const src = 'https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC515519-2020.01.01_17.24_01.MP3';
    const duration = 1345;

    this.#questionAudioPlayer = new AudioPlayerView(src, duration);
    render(this.#gamePageComponent.getQuestionContentContainer(), this.#questionAudioPlayer);

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
  };
}

export default GamePagePresenter;
