import { RootState } from '../store';

const selectGameSoundState = (state: RootState) => (
  state.gameConfigurations.isGameSound
);

export {
  selectGameSoundState
};
