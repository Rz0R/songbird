import AbstractView from './abstract-view';

const createHomePageTemplate = () =>
  `<main class="home">
    <div class="home__container"></div>
  </main>`;

class HomePageView extends AbstractView {
  get template() {
    return createHomePageTemplate();
  }

  getHomePageContainer = () => {
    return this.element.querySelector('.home__container');
  };
}

export default HomePageView;
