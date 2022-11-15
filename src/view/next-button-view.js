import AbstractView from './abstract-view';

const createNextButtonTemplate = (isDisbled) =>
  `<button disabled=${isDisbled} class="game__next-btn">Next Level</button>`;

class NextButtonView extends AbstractView {
  #isDisabled;

  constructor(isDisbled = true) {
    super();
    this.#isDisabled = isDisbled;
  }

  get template() {
    return createNextButtonTemplate(this.#isDisabled);
  }

  setButtonClickHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.addEventListener('click', this.#buttonClickHandler);
  };

  #buttonClickHandler = () => {
    this._callback.buttonClick();
  };

  enableButton = () => {
    this.element.disabled = false;
  };

  disableButton = () => {
    this.element.disabled = true;
  };
}

export default NextButtonView;
