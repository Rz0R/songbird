import AbstractView from './abstract-view';
import { TRANSLATION } from '../const/translation';
import { ACTIVE_PAGE } from '../const/const';

const createHeaderMenuTemplate = (lang, activePage) => {
  return `<div class="header__menu menu">
    <button type="button" class="menu__icon icon-menu"><span></span></button>
    <nav class="menu__body">
      <ul class="menu__list">
        <li 
          class="menu__item${activePage === ACTIVE_PAGE.HOME ? ' menu__item_active' : ''}"
          data-item="${ACTIVE_PAGE.HOME}"
        >
          ${TRANSLATION.HOME[lang]}
        </li>
        <li 
          class="menu__item${activePage === ACTIVE_PAGE.GAME ? ' menu__item_active' : ''}"
          data-item="${ACTIVE_PAGE.GAME}"
        >
          ${TRANSLATION.NEW_GAME[lang]}
        </li>
        <li 
          class="menu__item${activePage === ACTIVE_PAGE.GALLERY ? ' menu__item_active' : ''}"
          data-item="${ACTIVE_PAGE.GALLERY}"
        >
          ${TRANSLATION.GALLERY[lang]}
        </li>
      </ul>
    </nav>
  </div>`;
};

class HeaderMenuView extends AbstractView {
  #lang;
  #activePage;

  constructor(lang, activePage) {
    super();
    this.#lang = lang;
    this.#activePage = activePage;
    this.#menuInit();
  }

  get template() {
    return createHeaderMenuTemplate(this.#lang, this.#activePage);
  }

  #menuInit = () => {
    this.element.addEventListener('click', this.#menuHandler);
  };

  #menuHandler = (evt) => {
    if (evt.target.closest('.icon-menu')) {
      document.documentElement.classList.toggle('menu-open');
      this.#bodyLockToggle();
    } else if (evt.target.closest('[data-item]') && evt.target.closest('[data-item]').dataset.item === this.#activePage) {
      this.#closeMenu();
    } else if (evt.target.closest('[data-item]') && evt.target.closest('[data-item]').dataset.item === ACTIVE_PAGE.HOME) {
      this._callback.homeButtonClick && this._callback.homeButtonClick();
    } else if (evt.target.closest('[data-item]') && evt.target.closest('[data-item]').dataset.item === ACTIVE_PAGE.GAME) {
      this._callback.gameButtonClick && this._callback.gameButtonClick();
    } else if (evt.target.closest('[data-item]') && evt.target.closest('[data-item]').dataset.item === ACTIVE_PAGE.GALLERY) {
      this._callback.galleryButtonClick && this._callback.galleryButtonClick();
    }
  };

  #bodyLockToggle = () => {
    document.documentElement.classList.toggle('lock');
  };

  #closeMenu = () => {
    if (document.documentElement.classList.contains('menu-open')) {
      document.documentElement.classList.remove('menu-open', 'lock');
    }
  };

  setHomeButtonHandler = (callback) => {
    this.#closeMenu();
    this._callback.homeButtonClick = callback;
  };

  setGameButtonHandler = (callback) => {
    this.#closeMenu();
    this._callback.gameButtonClick = callback;
  };

  setGalleryButtonHandler = (callback) => {
    this.#closeMenu();
    this._callback.galleryButtonClick = callback;
  };
}

export default HeaderMenuView;
