import * as S from './entrance.module.scss';
import logoUrl from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/const/route';

type EntranceLayoutProps = {
  children: React.ReactNode,
}

const EntranceLayout = (props: EntranceLayoutProps) => {
  return (
    <div className={S.entrancePage}>
      <header className={S.entranceHeader}>
        <Link to={MAIN_ROUTE} title='На главную страницу'>
          <img src={logoUrl} alt="Логотип Snake Game" height='80' width='200' />
        </Link>
      </header>
      <main className={S.entranceMain}>
        <div className={S.formContainer}>
          { props.children }
        </div>
      </main>
    </div>
  )
}

export default EntranceLayout;