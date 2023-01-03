import React from 'react'
import styles from './leaderBoardAvatar.module.scss'
import { IDataRow } from '../../LeaderBoard'
import { AVATAR_PLACEHOLDER } from '../../../../../../utils/const/const'

const LeaderBoardAvatar: React.FC<IDataRow> = (props: IDataRow) => {
  return(
    <img className={styles.table_img} src={props.avatar || AVATAR_PLACEHOLDER} />
  )
}

export default LeaderBoardAvatar
