import AbstractView from './abstract-view';

const createGamePageTemplate = () =>
  `<main class="game">
      <div class="game__container"></div>
  </main>`;

class GamePageView extends AbstractView {
  get template() {
    return createGamePageTemplate();
  }

  getGameContainer = () => {
    return this.element.querySelector('.game__container');
  };
}

export default GamePageView;
