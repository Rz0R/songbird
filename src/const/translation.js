import { LANGUAGE } from './const';
import { MAX_SCORE } from './game';

export const TRANSLATION = {
  HOME: {
    [LANGUAGE.RU]: 'Главная',
    [LANGUAGE.EN]: 'Home',
  },
  NEW_GAME: {
    [LANGUAGE.RU]: 'Игра',
    [LANGUAGE.EN]: 'Game',
  },
  GALLERY: {
    [LANGUAGE.RU]: 'Галерея',
    [LANGUAGE.EN]: 'Gallery',
  },
  INSTRUCTION: {
    [LANGUAGE.RU]: ['Послушайте плеер.', 'Выберите птицу из списка.'],
    [LANGUAGE.EN]: ['Listen to the player.', 'Select a bird from the list.'],
  },
  NEXT_LEVEL: {
    [LANGUAGE.RU]: 'Следующий уровень',
    [LANGUAGE.EN]: 'Next Level',
  },
  SCORE: {
    [LANGUAGE.RU]: 'Счет',
    [LANGUAGE.EN]: 'Score',
  },
  CONGRATULATIONS: {
    [LANGUAGE.RU]: 'Поздравляем!',
    [LANGUAGE.EN]: 'Congratulations!',
  },
  CONGRATULATORY_MESSAGE: {
    [LANGUAGE.RU]: `Вы прошли викторину и набрали {SCORE} из ${MAX_SCORE} возможных баллов.`,
    [LANGUAGE.EN]: `You passed the quiz and scored {SCORE} out of ${MAX_SCORE} possible points.`,
  },
  TRY_AGAIN: {
    [LANGUAGE.RU]: 'Попробовать еще раз!',
    [LANGUAGE.EN]: 'Try again!',
  },
};
