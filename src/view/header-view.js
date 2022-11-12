import AbstractView from './abstract-view';

const createHeaderTemplate = () =>
  `<header class="header">
    <div class="header__container">
      <a href="#" class="header__logo logo"></a>
      <h5 class="header__score score">Score: <span class="score__value">0</span></h5>
    </div>
  </header>`;

class HeaderView extends AbstractView {
  get template() {
    return createHeaderTemplate();
  }
}

export default HeaderView;
