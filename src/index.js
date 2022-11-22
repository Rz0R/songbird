import MainPresenter from './presenter/main-presenter';
import { displaySelfChecking } from './self-checking';

const root = document.querySelector('#root');

const app = new MainPresenter(root);
app.init();

displaySelfChecking();
