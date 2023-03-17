import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MAIN_ROUTE, PROFILE_ROUTE } from '../../const/route'
import { ThemeToggler } from '../../components/themeToggler'
import styles from './profileSettings.module.scss'
import { useLogoutMutation } from '../../store/api/yadnex/auth/authApi'

const ProfileSettings: React.FC<{ userName: string}> = ({ userName }) => {
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate(MAIN_ROUTE)
    navigate(0)
  }
  
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
      <button className={styles.profileLogout} onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default ProfileSettings
