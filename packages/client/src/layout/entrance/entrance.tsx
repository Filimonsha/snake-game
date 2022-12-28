import styles from './entrance.module.scss';
import logoUrl from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/const/route';

const {
  entrance,
  entrance__header,
  entrance__main,
  entrance__container
} = styles;

type EntranceLayoutProps = {
  children: React.ReactNode,
}

const EntranceLayout = (props: EntranceLayoutProps) => {
  return (
    <div className={entrance}>
      <header className={entrance__header}>
        <Link to={MAIN_ROUTE} title='На главную страницу'>
          <img 
            src={logoUrl} 
            alt="Логотип Snake Game" 
            height='80' 
            width='200' 
          />
        </Link>
      </header>
      <main className={entrance__main}>
        <div className={entrance__container}>
          { props.children }
        </div>
      </main>
    </div>
  )
}

export default EntranceLayout;
