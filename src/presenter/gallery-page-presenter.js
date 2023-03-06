import { remove, render } from '../utils/render';
import { ACTIVE_PAGE } from '../const/const';

import HeaderView from '../view/header-view';
import HeaderMenuView from '../view/header-menu-view';
import GalleryPageView from '../view/gallery-page-view';
import AnswerDescriptionView from '../view/answer-description-view';
import AudioPlayerView from '../view/audio-player-view';
import FooterView from '../view/footer-view';

class GalleryPagePresenter {
  #galleryPageContainer = null;
  #headerComponent = null;
  #headerMenuComponent = null;
  #galleryPageComponent = null;
  #galleryDescriptionComponents = [];
  #footerComponent = null;

  #questionModel = null;
  #languageModel = null;

  #goToHomePageHandler = null;
  #newGameHandler = null;

  constructor({ root, questionModel, languageModel, goToHomePageHandler, newGameHandler }) {
    this.#galleryPageContainer = root;
    this.#goToHomePageHandler = goToHomePageHandler;
    this.#newGameHandler = newGameHandler;
    this.#questionModel = questionModel;
    this.#languageModel = languageModel;
  }

  renderPage = () => {
    this.#renderHeaderComponent();
    this.#renderHeaderMenuComponent();
    this.#renderGalleryPageComponent();

    this.#renderDescriptionComponents();

    this.#renderFooterComponent();
  };

  destroyPage = () => {
    this.#destroyHeaderMenuComponent();
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

  #renderHeaderMenuComponent = () => {
    this.#headerMenuComponent = new HeaderMenuView(this.#languageModel.lang, ACTIVE_PAGE.GALLERY);
    this.#headerMenuComponent.setGameButtonHandler(this.#newGameHandler);
    this.#headerMenuComponent.setHomeButtonHandler(this.#goToHomePageHandler);
    render(this.#headerComponent.getHeaderContainer(), this.#headerMenuComponent);
  };

  #destroyHeaderMenuComponent = () => {
    remove(this.#headerMenuComponent);
    this.#headerMenuComponent = null;
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

  #renderDescriptionComponents = () => {
    this.#galleryDescriptionComponents = this.#questionModel.getAllDescriptions().map((description) => {
      return {
        descriptionComponent: new AnswerDescriptionView(description),
        audioPlayerComponent: new AudioPlayerView(description.audio),
      };
    });

    for (const component of this.#galleryDescriptionComponents) {
      const { descriptionComponent, audioPlayerComponent } = component;
      render(this.#galleryPageComponent.getGalleryPageContainer(), descriptionComponent);
      render(descriptionComponent.getAnswerContentComponent(), audioPlayerComponent);
      audioPlayerComponent.setPlayButtonClickHandler(this.#stopAllAudioPlayersHandler);
    }
  };

  #stopAllAudioPlayersHandler = () => {
    for (const component of this.#galleryDescriptionComponents) {
      const { audioPlayerComponent } = component;
      audioPlayerComponent.stopAudio();
    }
  };

  #destroyDescriptionComponents = () => {
    for (const component of this.#galleryDescriptionComponents) {
      const { descriptionComponent, audioPlayerComponent } = component;
      render(audioPlayerComponent);
      remove(descriptionComponent);
    }

    this.#galleryDescriptionComponents = [];
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
