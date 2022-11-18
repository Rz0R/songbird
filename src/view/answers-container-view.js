import AbstractView from './abstract-view';

const createAnswersContainerView = () => `<div class="game__answers answers">`;

class AnswersContainerView extends AbstractView {
  get template() {
    return createAnswersContainerView();
  }

  setAnswerClickHandler = (callback) => {
    this._callback.answerClick = callback;
    this.element.addEventListener('click', this.#answerClickHandler);
  };

  #answerClickHandler = (evt) => {
    if (!evt.target.closest('.answers__item')) return;
    const id = Number(evt.target.closest('.answers__item').dataset.id);
    console.log(id);
    this._callback.answerClick(id);
  };
}

export default AnswersContainerView;
