import AbstractView from './abstract-view';
import { LANGUAGE } from '../const/const';
import { TRANSLATION } from '../const/translation';
import { replace, createElement } from '../utils/render';

const createRULangSvgTemplate = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ru" viewBox="0 0 640 480">
    <g fill-rule="evenodd" stroke-width="1pt">
      <path fill="#fff" d="M0 0h640v480H0z" />
      <path fill="#0039a6" d="M0 160h640v320H0z" />
      <path fill="#d52b1e" d="M0 320h640v160H0z" />
    </g>
  </svg>`;

const createENLangSvgTemplate = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 640 480">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
  </svg>`;

const createHomeMenuTemplate = (lang = LANGUAGE.EN) => {
  let svgEl = lang === LANGUAGE.RU ? createRULangSvgTemplate() : createENLangSvgTemplate();
  return `<ul class="home__menu menu-home">
      <li class="menu-home__item menu-home__item_new-game">
        <a href="#" class="menu-home__link">${TRANSLATION.NEW_GAME[lang]}</a>
      </li>
      <li class="menu-home__item menu-home__item_gallery">
        <a href="#" class="menu-home__link">${TRANSLATION.GALLERY[lang]}</a>
      </li>
      <li class="menu-home__item">
        <button class="menu-home__lang lang">
          <span class="lang__img-ibg">${svgEl}</span>
          <span class="lang__text">${lang === LANGUAGE.RU ? 'RU' : 'EN'}</span>
        </button>
      </li>
    </ul>`;
};

class HomeMenuView extends AbstractView {
  #lang = LANGUAGE.RU;

  constructor(lang) {
    super();
    this.#lang = lang;
  }

  get template() {
    return createHomeMenuTemplate(this.#lang);
  }

  #toggleLanguageButton = () => {
    this.#lang = this.#lang === LANGUAGE.RU ? LANGUAGE.EN : LANGUAGE.RU;
    const currentSvgEl = this.element.querySelector('.lang__img-ibg').firstChild;
    const svg =
      this.#lang === LANGUAGE.RU ? createElement(createRULangSvgTemplate) : createElement(createENLangSvgTemplate);
    replace(svg, currentSvgEl);
    this.element.querySelector('.lang__text').innerText = this.#lang === LANGUAGE.RU ? 'RU' : 'EN';
  };

  setNewGameButtonHandler = (callback) => {
    this._callback.newGameButtonClick = callback;
    this.element.querySelector('.menu-home__item_new-game').addEventListener('click', this.#newGameButtonHandler);
  };

  #newGameButtonHandler = (evt) => {
    evt.preventDefault();
    this._callback.newGameButtonClick();
  };

  setGalleryButtonHandler = (callback) => {
    this._callback.galleryButtonClick = callback;
    this.element.querySelector('.menu-home__item_gallery').addEventListener('click', this.#galleryButtonHandler);
  };

  #galleryButtonHandler = (evt) => {
    evt.preventDefault();
    this._callback.galleryButtonClick();
  };

  setLangButtonClickHandler = (callback) => {
    this._callback.langButtonClick = callback;
    this.element.querySelector('.menu-home__lang').addEventListener('click', this.#langButtonClickHandler);
  };

  #langButtonClickHandler = () => {
    this.#toggleLanguageButton();
    this._callback.langButtonClick();
  };
}

export default HomeMenuView;
