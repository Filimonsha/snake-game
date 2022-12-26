import Badge from 'react-bootstrap/Badge';
import * as S from './entrance.module.scss';

type EntranceLayoutProps = {
  children: React.ReactNode,
}

const EntranceLayout = (props: EntranceLayoutProps) => {
  return (
    <div className={S.entrancePage}>
      <header className={S.entranceHeader}>
        <h1><Badge>Snake Game</Badge></h1>
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