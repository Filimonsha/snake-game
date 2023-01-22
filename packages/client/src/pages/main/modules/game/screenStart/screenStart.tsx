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
          <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24'>
            <path
              d='M13.82 22h-3.64a1 1 0 0 1-.977-.786l-.407-1.884a8.002 8.002 0 0 1-1.535-.887l-1.837.585a1 1 0 0 1-1.17-.453L2.43 15.424a1.006 1.006 0 0 1 .193-1.239l1.425-1.3a8.1 8.1 0 0 1 0-1.772L2.623 9.816a1.006 1.006 0 0 1-.193-1.24l1.82-3.153a1 1 0 0 1 1.17-.453l1.837.585c.244-.18.498-.348.76-.5c.253-.142.513-.271.779-.386l.408-1.882A1 1 0 0 1 10.18 2h3.64a1 1 0 0 1 .976.787l.412 1.883a8.192 8.192 0 0 1 1.535.887l1.838-.585a1 1 0 0 1 1.169.453l1.82 3.153c.232.407.152.922-.193 1.239l-1.425 1.3a8.1 8.1 0 0 1 0 1.772l1.425 1.3c.345.318.425.832.193 1.239l-1.82 3.153a1 1 0 0 1-1.17.453l-1.837-.585a7.98 7.98 0 0 1-1.534.886l-.413 1.879a1 1 0 0 1-.976.786ZM11.996 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8Z' />
          </svg>
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
