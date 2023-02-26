import styles from './mainSlide.module.scss';
import mainTextUrl from '../../../../assets/img/main-text.svg';
import { Header } from '../../../../modules/header';

const {
  mainSlide,
  mainSlideBg,
  mainContainer,
  mainHero,
  mainImg
} = styles;

export const MainSlide = () => {
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

export default MainSlide;
