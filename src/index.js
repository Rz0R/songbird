import MainPresenter from './presenter/main-presenter';

const root = document.querySelector('#root');

const app = new MainPresenter(root);
app.init();
