import AbstractView from './abstract-view';

const createHeaderTemplate = () =>
  `<header class="header">
    <div class="header__container">
      <div class="header__logo logo"></div>
    </div>
  </header>`;

class HeaderView extends AbstractView {
  get template() {
    return createHeaderTemplate();
  }

  getHeaderContainer = () => {
    return this.element.querySelector('.header__container');
  };

  setLogoButtonClickHandler = (callback) => {
    this._callback.logoButtonClick = callback;
    this.element.querySelector('.header__logo').addEventListener('click', this.#logoButtonClickHandler);
  };

  #logoButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.logoButtonClick();
  };
}

export default HeaderView;
