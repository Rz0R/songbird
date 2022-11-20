import AbstractView from './abstract-view';
import { LANGUAGE } from '../const/const';
import { TRANSLATION } from '../const/translation';

const createInstructionMessageTemplate = (message) => `<p>${message}</p>`;

const createAnswerInstructionTemplate = (lang) => {
  const intsructionItems = TRANSLATION.INSTRUCTION[lang]
    .map((message) => createInstructionMessageTemplate(message))
    .join('');
  return `<div class="answers__instructions">${intsructionItems}</div>`;
};

class AnswerInstructionView extends AbstractView {
  #lang;

  constructor(lang = LANGUAGE.EN) {
    super();
    this.#lang = lang;
  }

  get template() {
    return createAnswerInstructionTemplate(this.#lang);
  }
}

export default AnswerInstructionView;
