import { Header } from '../../../../modules/header';
import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import styles from './mainSlide.module.scss'
import mainTextUrl from '../../../../assets/img/main-text.svg'
import { GAME_ROUTE } from '../../../../const/route'
import { useOauthMutation } from '../../../../store/api/yadnex/auth/Oauth'

const {
  mainSlide,
  mainSlideBg,
  mainContainer,
  mainHero,
  mainImg
} = styles;

const MainSlide = () => {
  const [searchParams] = useSearchParams()
  const [signInWithOauth] = useOauthMutation()
  const navigate = useNavigate()

  useEffect(() => {
    const code = searchParams.get(`code`)
    if (!code) return
    signInWithOauth(code)
    return navigate(GAME_ROUTE)
  }, [])

  return (
    <div className={mainSlide}>
      <div className={mainSlideBg}>
        <div className={mainContainer}>
          <Header />
          <main className={mainHero}>
            <h1 className='visually-hidden'>Snake Game</h1>
            <img
              className={mainImg}
              src={mainTextUrl}
              alt='Become the snake master'
              height='300'
              width='550'
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainSlide
