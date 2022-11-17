import AbstractView from './abstract-view.js';

const createSoundViewTemplate = () =>
  `<div>
		<audio data-right-answer src="/assets/audio/right-answer.mp3"></audio>
		<audio data-wrong-answer src="/assets/audio/wrong-answer.mp3"></audio>
    <audio data-victory src="/assets/audio/victory.mp3"></audio>
	</div>`;

class SoundView extends AbstractView {
  #wrongAnswerSound = null;
  #rightAnswerSound = null;
  #victorySound = null;

  constructor() {
    super();
    this.#wrongAnswerSound = this.element.querySelector('audio[data-wrong-answer]');
    this.#wrongAnswerSound.volume = 0.5;
    this.#rightAnswerSound = this.element.querySelector('audio[data-right-answer]');
    this.#rightAnswerSound.volume = 0.5;
    this.#victorySound = this.element.querySelector('audio[data-victory]');
    this.#victorySound.volume = 0.5;
  }

  get template() {
    return createSoundViewTemplate();
  }

  playWrongAnswerSound = () => {
    this.#wrongAnswerSound.currentTime = 0;
    this.#wrongAnswerSound.play();
  };

  playRightAnswerSound = () => {
    this.#rightAnswerSound.currentTime = 0;
    this.#rightAnswerSound.play();
  };

  playVictorySound = () => {
    this.#victorySound.currentTime = 0;
    this.#victorySound.play();
  };
}

export default SoundView;
