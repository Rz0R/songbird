import { remove, render } from '../utils/render';

import HeaderView from '../view/header-view';
import GalleryPageView from '../view/gallery-page-view';
import AnswerDescriptionView from '../view/answer-description-view';
import AudioPlayerView from '../view/audio-player-view';
import FooterView from '../view/footer-view';

class GalleryPagePresenter {
  #galleryPageContainer = null;
  #headerComponent = null;
  #galleryPageComponent = null;
  #galleryDescripionComponents = [];
  #footerComponent = null;

  #questionModel = null;
  #goToHomePageHandler = null;

  constructor({ root, questionModel, goToHomePageHandler }) {
    this.#galleryPageContainer = root;
    this.#goToHomePageHandler = goToHomePageHandler;
    this.#questionModel = questionModel;
  }

  renderPage = () => {
    this.#renderHeaderComponent();
    this.#renderGalleryPageComponent();

    this.#renderDesriptionComponents();

    this.#renderFooterComponent();
  };

  destroyPage = () => {
    this.#destroyHeaderComponent();
    this.#destroyGalleryPageComponent();
    this.#destroyFooterComponent();
  };

  #renderHeaderComponent = () => {
    this.#headerComponent = new HeaderView();
    this.#headerComponent.setLogoButtonClickHandler(this.#goToHomePageHandler);
    render(this.#galleryPageContainer, this.#headerComponent);
  };

  #destroyHeaderComponent = () => {
    remove(this.#headerComponent);
    this.#headerComponent = null;
  };

  #renderGalleryPageComponent = () => {
    this.#galleryPageComponent = new GalleryPageView();
    render(this.#galleryPageContainer, this.#galleryPageComponent);
  };

  #destroyGalleryPageComponent = () => {
    this.#destroyDescriptionComponents();

    remove(this.#galleryPageComponent);
    this.#galleryPageComponent = null;
  };

  #renderDesriptionComponents = () => {
    this.#galleryDescripionComponents = this.#questionModel.getAllDescripons().map((description) => {
      return {
        descriptionComponent: new AnswerDescriptionView(description),
        audioPlayerComponent: new AudioPlayerView(description.audio),
      };
    });

    for (const component of this.#galleryDescripionComponents) {
      const { descriptionComponent, audioPlayerComponent } = component;
      render(this.#galleryPageComponent.getGalleryPageContainer(), descriptionComponent);
      render(descriptionComponent.getAnswerContentComponent(), audioPlayerComponent);
    }
  };

  #destroyDescriptionComponents = () => {
    for (const component of this.#galleryDescripionComponents) {
      const { descriptionComponent, audioPlayerComponent } = component;
      render(audioPlayerComponent);
      remove(descriptionComponent);
    }

    this.#galleryDescripionComponents = [];
  };

  #renderFooterComponent = () => {
    this.#footerComponent = new FooterView();
    render(this.#galleryPageContainer, this.#footerComponent);
  };

  #destroyFooterComponent = () => {
    remove(this.#footerComponent);
    this.#footerComponent = null;
  };
}

export default GalleryPagePresenter;
