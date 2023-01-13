import styles from './mainSlide.module.scss';
import logoUrl from '../../../../assets/img/logo.svg';
import mainTextUrl from '../../../../assets/img/main-text.svg';
import { Link } from 'react-router-dom';
import { SIGN_IN_ROUTE } from '../../../../utils/const/route';

const {
  mainSlide,
  mainSlideBg,
  mainContainer,
  mainLink,
  mainHeader,
  mainHero,
  mainImg
} = styles;

export const MainSlide = () => {
  return (
    <div className={mainSlide}>
      <div className={mainSlideBg}>
        <div className={mainContainer}>
          <header className={mainHeader}>
            <img
              src={logoUrl}
              alt="Логотип Snake Game" 
              height='80' 
              width='200' 
            />
            <Link 
              to={SIGN_IN_ROUTE}
              className={mainLink}
            >
              Log in
            </Link>
          </header>
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

export default MainSlide;
