import React, { useState } from 'react'
import screenStartStyles from './screenStart.module.scss'

interface IScreenStart {
  fnStart: () => void
  score: number
  scoreMax: number
}

const ScreenStart: React.FC<IScreenStart> = ({ fnStart, score, scoreMax }) => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false)

  const settingBtnToggle = () => {
    setSettingsVisible((visible) => !visible)
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
              настройки
            </div>
          }

        </div>

        <div className={screenStartStyles.footer}>
          <button type='button' onClick={fnStart} className={screenStartStyles.buttonStart}>Играть</button>
        </div>

      </div>
    </div>
  )
}

export default ScreenStart
