import React, { useState } from 'react'
import screenStartStyles from './screenStart.module.scss'
import { useTypedSelector } from '../../../../../store/hooks/typedSelector'
import { useTypedDispatch } from '../../../../../store/hooks/typedDispatch'
import { gameConfigurationActions } from '../../../../../store/slice/gameConfigurationSlice';

interface IScreenStart {
  fnStart: () => void
  score: number
  scoreMax: number
}

const { toggleGameSound } = gameConfigurationActions;

const ScreenStart: React.FC<IScreenStart> = ({ fnStart, score, scoreMax }) => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false)
  
  const isGameSound = useTypedSelector(state => state.gameConfigurations.isGameSound);
  const dispatch = useTypedDispatch();

  const settingBtnToggle = () => {
    setSettingsVisible((visible) => !visible)
  }
  
  const toggleSound = () => {
    dispatch(toggleGameSound());
  }

  return (
    <div className={screenStartStyles.screenStart}>
      <div className={screenStartStyles.settings}>
        <button type='button' onClick={settingBtnToggle} className={screenStartStyles.settingsBtn}>
          <img src='snakeGame/settings.svg' alt='settings' />
        </button>
      </div>
      <div className={screenStartStyles.body}>

        <div className={screenStartStyles.content}>

          {!settingsVisible ?
            <div className={screenStartStyles.contentScore}>
              <div className={screenStartStyles.scoreCounter}>
                <div className={screenStartStyles.scoreIcon}>
                  <img src='snakeGame/coin.svg' alt='coin' />
                </div>
                <div className={screenStartStyles.scoreCounterCount}>{score}</div>
              </div>
              <div className={screenStartStyles.scoreCounter}>
                <div className={screenStartStyles.scoreIcon}>
                  <img src='snakeGame/cup.svg' alt='cup' />
                </div>
                <div className={screenStartStyles.scoreCounterCount}>{scoreMax}</div>
              </div>
            </div>
            :
            <div className={screenStartStyles.contentChoice}>
              <b>Settings</b>
              <div className={screenStartStyles.contentItem}>
                <span>
                  Game sound
                </span>
                <button
                  className={screenStartStyles.contentButton}
                  type='button'
                  onClick={toggleSound}
                >
                  {isGameSound ? 'On' : 'Off'}
                </button>
              </div>
            </div>
          }

        </div>

        <div className={screenStartStyles.footer}>
          <button
            type='button'
            onClick={fnStart}
            className={screenStartStyles.buttonStart}
          >
            Play
          </button>
        </div>

      </div>
    </div>
  )
}

export default ScreenStart
