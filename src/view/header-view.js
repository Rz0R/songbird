import AbstractView from './abstract-view';

const createHeaderTemplate = () =>
  `<header class="header">
    <div class="header__container">
      <a href="#" class="header__logo logo"></a>
    </div>
  </header>`;

class HeaderView extends AbstractView {
  get template() {
    return createHeaderTemplate();
  }

  getHeaderContainer = () => {
    return this.element.querySelector('.header__container');
  };
}

export default HeaderView;
