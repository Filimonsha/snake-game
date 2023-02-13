import { TOrientation } from '../../pages/main/modules/game/snake/snake';
import { store } from '../../store/store';

class GameSound {
  private soundFolder = '/src/assets/sounds/';
  
  private getAudio(fileName: string, extention = 'mp3') {
    const { gameConfigurations: { isGameSound } } = store.getState();
    
    if (!isGameSound) {
      return;
    }
    
    return new Audio(`${this.soundFolder}${fileName}.${extention}`);
  }
  
  private play(audio: HTMLAudioElement | undefined) {
    if (audio) {
      audio.play();
    }
  }
  
  playSnakeTurn(currentOrinetation: TOrientation, moveTo: TOrientation) {
    const audio = this.getAudio(moveTo);
    currentOrinetation !== moveTo && this.play(audio);
  }
  
  playSnakeEat() {
    const audio = this.getAudio('eat');
    this.play(audio);
  }
  
  playSnakeDie() {
    const audio = this.getAudio('die');
    this.play(audio);
  }
}

const gameSound = new GameSound();

export { gameSound };
