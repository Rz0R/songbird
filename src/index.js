import GamePagePresenter from './presenter/game-page-presenter';
import HomePagePresenter from './presenter/home-page-presenter';

const root = document.querySelector('#root');

// const gamePage = new GamePagePresenter(root);
// gamePage.renderGamePage();

const homePage = new HomePagePresenter(root);
homePage.renderHomePage();
