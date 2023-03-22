import React from 'react'
import styles from './leaderBoardAvatar.module.scss'


const LeaderBoardAvatar: React.FC<{ avatar: string }> = ({ avatar }): JSX.Element => {
  return(
    <img className={styles.table_img}
      src={avatar}
      crossOrigin='anonymous'
    />
  )
}

export default LeaderBoardAvatar
