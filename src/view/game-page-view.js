import AbstractView from './abstract-view';

const createGamePageTemplate = () =>
  `<main class="game">
      <div class="game__container">
        <ul class="game__categories categories">
          <li class="categories__item _active">Разминка</li>
          <li class="categories__item">Воробьиные</li>
          <li class="categories__item">Лесные птицы</li>
          <li class="categories__item">Певчие птицы</li>
          <li class="categories__item">Хищные птицы</li>
          <li class="categories__item">Морские птицы</li>
        </ul>
        <div class="game__question question">
          <div class="question__img-ibg">
            <img src="./assets/img/default-image.jpg" alt="bird" />
          </div>
          <div class="question__content">
            <h3 class="question__answer">******</h3>
            <div class="question__audio-player audio-player">
              <div class="audio-player__controls">
                <button class="audio-player__play">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill-rule="nonzero"
                      d="M255.99 0c70.68 0 134.7 28.66 181.02 74.98C483.33 121.3 512 185.31 512 256c0 70.68-28.67 134.69-74.99 181.01C390.69 483.33 326.67 512 255.99 512S121.3 483.33 74.98 437.01C28.66 390.69 0 326.68 0 256c0-70.67 28.66-134.7 74.98-181.02C121.3 28.66 185.31 0 255.99 0zm77.4 269.81c13.75-8.88 13.7-18.77 0-26.63l-110.27-76.77c-11.19-7.04-22.89-2.9-22.58 11.72l.44 154.47c.96 15.86 10.02 20.21 23.37 12.87l109.04-75.66zm79.35-170.56c-40.1-40.1-95.54-64.92-156.75-64.92-61.21 0-116.63 24.82-156.74 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.22 24.82 116.64 64.92 156.74 40.11 40.11 95.53 64.93 156.74 64.93 61.21 0 116.65-24.82 156.75-64.93 40.11-40.1 64.93-95.52 64.93-156.74 0-61.22-24.82-116.64-64.93-156.75z"
                    />
                  </svg>
                </button>
                <div class="audio-player__time-bar">
                  <input type="range" class="audio-player__time" value="50" min="0" max="100" step="0.01" />
                  <div class="audio-player__time-info">
                    <div class="audio-player__current-time">00:00</div>
                    <input type="range" class="audio-player__volume" value="50" min="0" max="100" step="0.01" />
                    <div class="audio-player__total-time">00:30</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="game__answers answers">
          <ul class="answers__list">
            <li class="answers__item _correct"><span></span> Ворон</li>
            <li class="answers__item _error"><span></span> Журавль</li>
            <li class="answers__item"><span></span> Ласточка</li>
            <li class="answers__item"><span></span> Козодой</li>
            <li class="answers__item"><span></span> Кукушка</li>
            <li class="answers__item"><span></span> Синица</li>
          </ul>

          <div class="answers__description">
            <div class="answers__question question question_with-description">
              <div class="question__img-ibg">
                <img src="./assets/img/default-image.jpg" alt="bird" />
              </div>
              <div class="question__content">
                <h3 class="question__answer">Дятел</h3>
                <h5 class="question__science-name">Dendrocopos major</h5>
                <div class="question__audio-player audio-player">
                  <div class="audio-player__controls">
                    <button class="audio-player__play">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        shape-rendering="geometricPrecision"
                        text-rendering="geometricPrecision"
                        image-rendering="optimizeQuality"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill-rule="nonzero"
                          d="M255.99 0c70.68 0 134.7 28.66 181.02 74.98C483.33 121.3 512 185.31 512 256c0 70.68-28.67 134.69-74.99 181.01C390.69 483.33 326.67 512 255.99 512S121.3 483.33 74.98 437.01C28.66 390.69 0 326.68 0 256c0-70.67 28.66-134.7 74.98-181.02C121.3 28.66 185.31 0 255.99 0zm77.4 269.81c13.75-8.88 13.7-18.77 0-26.63l-110.27-76.77c-11.19-7.04-22.89-2.9-22.58 11.72l.44 154.47c.96 15.86 10.02 20.21 23.37 12.87l109.04-75.66zm79.35-170.56c-40.1-40.1-95.54-64.92-156.75-64.92-61.21 0-116.63 24.82-156.74 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.22 24.82 116.64 64.92 156.74 40.11 40.11 95.53 64.93 156.74 64.93 61.21 0 116.65-24.82 156.75-64.93 40.11-40.1 64.93-95.52 64.93-156.74 0-61.22-24.82-116.64-64.93-156.75z"
                        />
                      </svg>
                    </button>
                    <div class="audio-player__time-bar">
                      <input type="range" class="audio-player__time" value="50" min="0" max="100" step="0.01" />
                      <div class="audio-player__time-info">
                        <div class="audio-player__current-time">00:00</div>
                        <input type="range" class="audio-player__volume" value="50" min="0" max="100" step="0.01" />
                        <div class="audio-player__total-time">00:30</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="question__description">
                Дятел – заметная и шумная птица, часто живет рядом с человеком. С середины января до конца июня можно
                услышать «барабанную дробь» дятлов – трель от вибрации веток под быстрыми ударами клюва птицы. В
                хорошую погоду дробь слышна в радиусе 1,5 км.
              </p>
            </div>
          </div>
        </div>

        <button disabled class="game__next-btn">Next Level</button>
      </div>
    </main>`;

class GamePageView extends AbstractView {
  get template() {
    return createGamePageTemplate();
  }
}

export default GamePageView;
