import { remove, render, replace } from '../utils/render';

import HeaderView from '../view/header-view';
import GamePageView from '../view/game-page-view';
import FooterView from '../view/footer-view';
import AudioPlayerView from '../view/audio-player-view';

class GamePagePresenter {
  #gamePageContainer = null;
  #headerComponent = null;
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

    const src = 'https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC515519-2020.01.01_17.24_01.MP3';
    const duration = 1345;

    this.#questionAudioPlayer = new AudioPlayerView(src, duration);
    render(this.#gamePageComponent.getQuestionContentContainer(), this.#questionAudioPlayer);

    this.#footerComponent = new FooterView();
    render(this.#gamePageContainer, this.#footerComponent);
  };
}

export default GamePagePresenter;
