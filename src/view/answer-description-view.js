import AbstractView from './abstract-view';

const createAnswerDescription = ({ name, species, imgSrc, description }) => `<div class="answers__description">
    <div class="answers__question question question_with-description">
      <div class="question__img-ibg">
        <img src="${imgSrc}" alt="${name}" />
      </div>
      <div class="question__content">
        <h3 class="question__answer">${name}</h3>
        <h5 class="question__science-name">${species}</h5>
      </div>
      <p class="question__description">${description}</p>
    </div>
  </div>`;

class AnswerDescriptionView extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createAnswerDescription(this.#data);
  }

  getAnswerContentComponent = () => {
    return this.element.querySelector('.question__content');
  };
}

export default AnswerDescriptionView;
