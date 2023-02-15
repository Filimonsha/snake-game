import { RootState } from '../store';

const selectGameSound = (state: RootState) => (
  state.gameConfigurations.isGameSound
);

export {
  selectGameSound
};
