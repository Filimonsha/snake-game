import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import logoUrl from '../../assets/img/logo.svg';
import { ProfileSettings } from '../profileSettings';
import { DEFAULT_USER_DATA } from '../../pages/main/modules/profile/constants';
import { UserFullInfo } from '../../types/auth';
import { useEffect, useState } from 'react';
import { useGetUserInfoQuery } from '../../store/api/yadnex/auth/authApi';
import {
  SIGN_IN_ROUTE,
  MAIN_ROUTE,
  FORUM_ROUTE,
  LEADERBOARD_ROUTE,
  GAME_ROUTE
} from '../../const/route';


const Header = () => {
  const [user, setUser] = useState<UserFullInfo>(DEFAULT_USER_DATA);
  const [isProfileShown, setIsProfileShown] = useState<boolean>(false);
  const { data, isSuccess } = useGetUserInfoQuery()
  
  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data])
  
  const showProfile = () => {
    setIsProfileShown(true);
  }
  
  const hideProfile = () => {
    setIsProfileShown(false);
  }
  
  const profile = (
    <div className={styles.profile}>
      <ProfileSettings userName={user.first_name}/>
    </div> 
  );
  
  const avatar = (
    <div className={styles.headerAvatar}>
      <img
        src={user.avatar || DEFAULT_USER_DATA.avatar}
        alt='avatar'
        className={styles.headerAvatarImg}>
      </img>
    </div>
  );
  
  const loginLink = (
    <Link to={SIGN_IN_ROUTE} className={styles.link}>
      Log in
    </Link> 
  );
  
  return (
    <header className={styles.header}>
      <Link
        to={MAIN_ROUTE}
        title='To main page'
      >
        <img
          src={logoUrl}
          alt='Snake Game logo'
          height='80'
          width='200'
        />
      </Link>
      <nav className={styles.navigation}>
        <Link className={styles.navLink} to={GAME_ROUTE}>
          Play
        </Link>
        <Link className={styles.navLink} to={LEADERBOARD_ROUTE}>
          Leaderboard
        </Link>
        <Link className={styles.navLink} to={FORUM_ROUTE}>
          Forum
        </Link>
      </nav>
      <div 
        className={styles.profileContainer}
        onMouseEnter={showProfile}
        onMouseLeave={hideProfile}
      >
        { isProfileShown && isSuccess ? profile : null }
        { isSuccess ? avatar : loginLink }
      </div>
    </header>
  )
}

export default Header;
