import AbstractView from './abstract-view';
import { ANSWER } from '../const/game';

const createAnswerItemTemplate = (id, name, className = '') => `<li class="answers__item${className}" data-id="${id}"><span></span> ${name}</li>`;

const createAnswersListTemplate = (answers) => {
  const answerItems = answers
    .map(({ name, answer, id }) => {
      if (answer === ANSWER.CORRECT) {
        return createAnswerItemTemplate(id, name, ' _correct');
      } else if (answer === ANSWER.INCORRECT) {
        return createAnswerItemTemplate(id, name, ' _error', id);
      }
      return createAnswerItemTemplate(id, name);
    })
    .join('');

  return `<ul class="answers__list">${answerItems}</ul>`;
};

class AnswersListView extends AbstractView {
  #answers = [];

  constructor(answers) {
    super();
    this.#answers = answers;
  }

  get template() {
    return createAnswersListTemplate(this.#answers);
  }
}

export default AnswersListView;
