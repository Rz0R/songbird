import AbstractView from './abstract-view';
import { createElement, render, replace } from '../utils/render.js';

const createPlaySvgTemplate = () =>
  `<svg
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
  </svg>`;

const createPlaySvgElement = () => createElement(createPlaySvgTemplate());

const createPauseSvgTemplate = () =>
  `<svg
    xmlns="http://www.w3.org/2000/svg"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
    image-rendering="optimizeQuality"
    fill-rule="evenodd"
    clip-rule="evenodd"
    viewBox="0 0 512 511.99"
    >
    <path
      fill-rule="nonzero"
      d="M256 0c70.68 0 134.7 28.66 181.02 74.98C483.34 121.3 512 185.32 512 256s-28.66 134.69-74.98 181.01C390.7 483.33 326.68 511.99 256 511.99s-134.7-28.66-181.02-74.98C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.7 74.98-181.02C121.3 28.66 185.32 0 256 0zm-66.92 168.32h38.04c5.09 0 9.24 4.21 9.24 9.24v156.87c0 5.03-4.19 9.23-9.24 9.23h-38.04c-5.03 0-9.23-4.16-9.23-9.23V177.56c0-5.09 4.15-9.24 9.23-9.24zm95.77 0h38.06c5.08 0 9.23 4.2 9.23 9.24v156.87c0 5.03-4.19 9.23-9.23 9.23h-38.06c-5.04 0-9.23-4.16-9.23-9.23V177.56c0-5.09 4.16-9.24 9.23-9.24zm127.9-69.07C372.64 59.15 317.21 34.33 256 34.33c-61.21 0-116.64 24.82-156.75 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.21 24.82 116.63 64.92 156.74 40.11 40.1 95.54 64.92 156.75 64.92 61.21 0 116.64-24.82 156.75-64.92 40.1-40.11 64.92-95.53 64.92-156.74 0-61.21-24.82-116.64-64.92-156.75z"
    />
  </svg>`;

const createPauseSvgElement = () => createElement(createPauseSvgTemplate());

const createVolumeIconTemplate = () =>
  `<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
		<defs>
			<clipPath>
				<path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path>
				<path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path>
				<path d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z" transform="translate(0, 0)"></path>
			</clipPath>
			<clipPath>
				<path d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z" transform="translate(0, 0)"></path>
			</clipPath>
		</defs>
		<path
			d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z">
		</path>
	</svg>`;

const createVolumeIconElement = () => createElement(createVolumeIconTemplate());

const createVolumeMuteIconTemplate = () =>
  `<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
    <path
			d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z">
		</path>
	</svg>`;

const createVolumeMuteIconElement = () => createElement(createVolumeMuteIconTemplate());

const createAudioPlayerTemplate = (isPlay = false, src, duration) => {
  return `<div class="question__audio-player audio-player">
      <audio src="${src}"></audio>
      <div class="audio-player__controls">
        <button class="audio-player__play">${isPlay ? createPauseSvgTemplate() : createPlaySvgTemplate()}</button>
        <div class="audio-player__time-bar">
          <input type="range" class="audio-player__time" value="50" min="0" max="100" step="0.01" />
          <div class="audio-player__time-info">
            <div class="audio-player__volume-wrapper">
              <button class="audio-player__volume-button-ibg">${createVolumeIconTemplate()}</button>
              <input type="range" class="audio-player__volume-bar" value="50" min="0" max="100" step="0.01" />
            </div>
            <div class="audio-player__time-info-wrapper">
              <span class="audio-player__current-time">00:00</span>
              /
              <span class="audio-player__total-time">${formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
};

const formatTime = (number) => {
  const minutes = Math.floor((number / 60) % 60)
    .toString()
    .padStart(2, 0);

  const seconds = Math.floor(number % 60)
    .toString()
    .padStart(2, 0);

  return `${minutes}:${seconds}`;
};

const setBarStyle = (prbar) => {
  const value = prbar.value;
  prbar.style.background = `linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) ${value}%, rgb(115, 115, 115) ${value}%, rgb(115, 115, 115) ${value}%)`;
};

class AudioPlayerView extends AbstractView {
  #isPlay = false;
  #playButtonElement = null;
  #volumeButtonElement = null;
  #timeBarElement = null;
  #volumeBarElement = null;

  #playSvgElement = null;
  #pauseSvgElement = null;

  #volumeIconSvgElement = null;
  #volumeMuteIconSvgElement = null;

  #audioElement = null;
  #audioSrc = null;
  #audioDuration = null;
  #currentTimeElement = null;

  constructor({ src, duration }) {
    super();

    this.#audioSrc = src;
    this.#audioDuration = duration;

    this.#playSvgElement = createPlaySvgElement();
    this.#pauseSvgElement = createPauseSvgElement();
    this.#volumeIconSvgElement = createVolumeIconElement();
    this.#volumeMuteIconSvgElement = createVolumeMuteIconElement();
    this.#playButtonElement = this.element.querySelector('.audio-player__play');
    this.#volumeButtonElement = this.element.querySelector('.audio-player__volume-button-ibg');
    this.#timeBarElement = this.element.querySelector('.audio-player__time');
    this.#volumeBarElement = this.element.querySelector('.audio-player__volume-bar');
    this.#audioElement = this.element.querySelector('audio');
    this.#currentTimeElement = this.element.querySelector('.audio-player__current-time');

    this.#playButtonClick();
    this.#volumeBarClick();
    this.#inputTimeBar();
    this.#inputVolumeBar();
    this.#updateAudioTime();
    this.#endAudioTime();
  }

  get template() {
    return createAudioPlayerTemplate(this.#isPlay, this.#audioSrc, this.#audioDuration);
  }

  stopAudio = () => {
    this.#audioElement.pause();
    this.#isPlay = false;
    this.#togglePlayButtonIcon();
  };

  playAudio = () => {
    this.#audioElement.play();
    this.#isPlay = true;
    this.#togglePlayButtonIcon();
  };

  setPlayButtonClickHandler = (callback) => {
    this._callback.playButtonClick = callback;
  };

  #togglePlayButtonIcon = () => {
    const svg = this.#isPlay ? this.#pauseSvgElement : this.#playSvgElement;
    replace(svg, this.#playButtonElement.firstElementChild);
  };

  #playButtonClick = () => {
    this.#playButtonElement.addEventListener('click', () => {
      if (this.#isPlay) {
        this.stopAudio();
      } else {
        if (this._callback.playButtonClick) {
          this._callback.playButtonClick();
        }
        this.playAudio();
      }
    });
  };

  #inputTimeBar = () => {
    this.#timeBarElement.addEventListener('input', () => {
      this.#audioElement.currentTime = (this.#timeBarElement.value / 100) * this.#audioDuration;
      setBarStyle(this.#timeBarElement);
      this.#currentTimeElement.innerText = formatTime(this.#audioElement.currentTime);
    });
  };

  #inputVolumeBar = () => {
    this.#audioElement.volume = this.#volumeBarElement.value / 100;
    this.#volumeBarElement.addEventListener('input', () => {
      if (+this.#volumeBarElement.value === 0 && !this.#audioElement.muted) {
        this.#audioElement.muted = true;
        replace(this.#volumeMuteIconSvgElement, this.#volumeButtonElement.firstElementChild);
      } else if (this.#audioElement.muted) {
        this.#audioElement.muted = false;
        replace(this.#volumeIconSvgElement, this.#volumeButtonElement.firstElementChild);
      }
      setBarStyle(this.#volumeBarElement);
      this.#audioElement.volume = this.#volumeBarElement.value / 100;
    });
  };

  #updateAudioTime = () => {
    this.#updateAudioTimeHandler();
    this.#audioElement.addEventListener('timeupdate', this.#updateAudioTimeHandler);
  };

  #updateAudioTimeHandler = () => {
    const audioProgBarValue = (this.#audioElement.currentTime / this.#audioElement.duration) * 100;
    if (!Number.isNaN(audioProgBarValue)) {
      this.#timeBarElement.value = audioProgBarValue;
    } else {
      this.#timeBarElement.value = 0;
    }

    this.#currentTimeElement.innerText = formatTime(this.#audioElement.currentTime);
    setBarStyle(this.#timeBarElement);
  };

  #endAudioTime = () => {
    this.#audioElement.addEventListener('ended', () => {
      this.#isPlay = false;
      this.#togglePlayButtonIcon();
    });
  };

  #volumeBarClick = () => {
    this.#volumeButtonElement.addEventListener('click', this.#toggleMute);
  };

  #muteVolume = () => {
    this.#audioElement.muted = true;
    this.#volumeBarElement.value = 0;
    setBarStyle(this.#volumeBarElement);
    replace(this.#volumeMuteIconSvgElement, this.#volumeButtonElement.firstElementChild);
  };

  #unmuteVolume = () => {
    this.#audioElement.muted = false;
    if (this.#audioElement.volume === 0) this.#audioElement.volume = 0.5;
    this.#volumeBarElement.value = this.#audioElement.volume * 100;
    setBarStyle(this.#volumeBarElement);
    replace(this.#volumeIconSvgElement, this.#volumeButtonElement.firstElementChild);
  };

  #toggleMute = () => {
    if (this.#audioElement.muted) {
      this.#unmuteVolume();
    } else {
      this.#muteVolume();
    }
  };
}

export default AudioPlayerView;
