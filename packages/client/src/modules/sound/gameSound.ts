import { TOrientation } from '../../pages/main/modules/game/snake/snake';
import { selectGameSoundState } from '../../store/selectors/selectors';
import { store } from '../../store/store';

class GameSound {
  private soundFolder = 'snakeGame/sounds/';

  private getAudio(fileName: string, extention = 'mp3') {
    const isGameSound = selectGameSoundState(store.getState());

    if (!isGameSound) {
      return;
    }

    return new Audio(`${this.soundFolder}${fileName}.${extention}`);
  }

  playSnakeTurn(currentOrinetation: TOrientation, moveTo: TOrientation) {
    const audio = this.getAudio(moveTo);
    currentOrinetation !== moveTo && audio?.play();
  }

  playSnakeEat() {
    const audio = this.getAudio('eat');
    audio?.play();
  }

  playSnakeDie() {
    const audio = this.getAudio('die');
    audio?.play();
  }
}

const gameSound = new GameSound();

export { gameSound };
