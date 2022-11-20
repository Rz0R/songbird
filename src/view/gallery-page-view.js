import AbstractView from './abstract-view';

const createGalleryPageTemplate = () =>
  `<main class="gallery">
    <div class="gallery__container"></div>
  </main>`;

class GalleryPageView extends AbstractView {
  get template() {
    return createGalleryPageTemplate();
  }

  getGalleryPageContainer = () => {
    return this.element.querySelector('.gallery__container');
  };
}

export default GalleryPageView;
