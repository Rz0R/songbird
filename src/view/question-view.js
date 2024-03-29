import AbstractView from './abstract-view';

const createQuestionTemplate = (imgSrc, answer) =>
  `<div class="game__question question">
    <div class="question__img-ibg">
      <img src="${imgSrc}" alt="bird" />
    </div>
    <div class="question__content">
      <div class="question__top">
        <h3 class="question__answer">${answer}</h3>
      </div>
    </div>
  </div>`;

class QuestionView extends AbstractView {
  #imgSrc = null;
  #answer = null;

  constructor({ imgSrc, answer }) {
    super();
    this.#imgSrc = imgSrc;
    this.#answer = answer;
  }

  get template() {
    return createQuestionTemplate(this.#imgSrc, this.#answer);
  }

  getQuestionContentContainer = () => {
    return this.element.querySelector('.question__content');
  };

  getQuestionTopContainer = () => {
    return this.element.querySelector('.question__top');
  };
}

export default QuestionView;
