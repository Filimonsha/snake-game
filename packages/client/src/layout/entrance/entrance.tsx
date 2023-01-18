import React from 'react';
import styles from './entrance.module.scss';
import logoUrl from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/const/route';

const {
  entrance,
  entranceHeader,
  entranceMain,
  entranceContainer
} = styles;

const EntranceLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={entrance}>
      <header className={entranceHeader}>
        <Link to={MAIN_ROUTE} title='На главную страницу'>
          <img 
            src={logoUrl}
            alt="Логотип Snake Game" 
            height='80' 
            width='200' 
          />
        </Link>
      </header>
      <main className={entranceMain}>
        <div className={entranceContainer}>
          { children }
        </div>
      </main>
    </div>
  )
}

export default EntranceLayout;
