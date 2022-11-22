import AbstractView from './abstract-view';

const createTopPanelTemplate = () => `<div class="game__top"></div>`;

class TopPanelView extends AbstractView {
  get template() {
    return createTopPanelTemplate();
  }
}

export default TopPanelView;
