import AbstractView from './abstract-view';

const createCategoryItem = (name, isActive = false) => `<li class="categories__item${isActive ? ' _active' : ''}">${name}</li>`;

const createCategoriesTemplate = (categories) => {
  const categoryItems = categories.map(({ name, isActive }) => createCategoryItem(name, isActive)).join('');

  return `<ul class="game__categories categories">${categoryItems}</ul>`;
};

class CategoriesView extends AbstractView {
  #categories = null;

  constructor(categories) {
    super();
    this.#categories = categories;
  }

  get template() {
    return createCategoriesTemplate(this.#categories);
  }
}

export default CategoriesView;
