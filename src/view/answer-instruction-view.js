import AbstractView from './abstract-view';

const createInstructionMessageTemplate = (message) => `<p>${message}</p>`;

const createAnswerInstructionTemplate = (messages) => {
  const intsructionItems = messages.map((message) => createInstructionMessageTemplate(message)).join('');
  return `<div class="answers__instructions">${intsructionItems}</div>`;
};

class AnswerInstructionView extends AbstractView {
  #messages = null;

  constructor(messages) {
    super();
    this.#messages = messages;
  }

  get template() {
    return createAnswerInstructionTemplate(this.#messages);
  }
}

export default AnswerInstructionView;
