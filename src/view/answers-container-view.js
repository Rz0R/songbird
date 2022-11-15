import AbstractView from './abstract-view';

const createAnswersContainerView = () => `<div class="game__answers answers">`;

class AnswersContainerView extends AbstractView {
  get template() {
    return createAnswersContainerView();
  }
}

export default AnswersContainerView;
