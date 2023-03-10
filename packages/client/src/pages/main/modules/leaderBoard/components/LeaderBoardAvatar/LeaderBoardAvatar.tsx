import React from 'react'
import styles from './leaderBoardAvatar.module.scss'
import { AVATAR_PLACEHOLDER } from './constants'

const LeaderBoardAvatar: React.FC<{ avatar: string }> = ({ avatar }): JSX.Element => {
  return(
    <img className={styles.table_img} src={avatar || AVATAR_PLACEHOLDER} />
  )
}

export default LeaderBoardAvatar
