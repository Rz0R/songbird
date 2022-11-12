import GamePagePresenter from './presenter/game-page-presenter';

const root = document.querySelector('#root');

const gamePage = new GamePagePresenter(root);
gamePage.renderPage();
