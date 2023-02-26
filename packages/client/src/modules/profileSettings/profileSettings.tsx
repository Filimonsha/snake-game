import React from 'react';
import { Link } from 'react-router-dom';
import { PROFILE_ROUTE } from '../../const/route';
import { ThemeToggler } from '../../components/themeToggler';
import styles from './profileSettings.module.scss';

const ProfileSettings: React.FC<{ userName: string}> = ({ userName }) => {
  
  return ( 
    <div className={styles.profile}>
      <p className={styles.profileUserName}>{ userName }</p>
      <Link
        to={PROFILE_ROUTE}
        className={styles.profileUserLink}
      >
        My profile
      </Link>
      <ThemeToggler />
      <button className={styles.profileLogout}>
        Logout
      </button>
    </div>
  )
}

export default ProfileSettings;
