import AbstractView from './abstract-view';
import { ANSWER } from '../const/game';

const createAnswerItemTempate = (name, className = '') =>
  `<li class="answers__item${className}"><span></span> ${name}</li>`;

const createAnswersListTemplate = (answers) => {
  const answerItems = answers
    .map(({ name, answer }) => {
      if (answer === ANSWER.CORRECT) {
        return createAnswerItemTempate(name, ' _correct');
      } else if (answer === ANSWER.INCORRECT) {
        return createAnswerItemTempate(name, ' _error');
      }
      return createAnswerItemTempate(name);
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
