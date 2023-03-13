import React from 'react'
import styles from './topPlayerCard.module.scss'
import Card from 'react-bootstrap/Card'
import { IData } from '../../LeaderBoard'

const TopPlayerCard: React.FC<IData> = ({ id, avatar, user, score }) => {
  
  return (
    <Card className={styles.card} key={id}>
      <Card.Img 
        className={styles.cardImg} 
        src={avatar}
        crossOrigin='anonymous'/>
      <Card.Body>
        <Card.Title>{user}</Card.Title>
        <Card.Text>{score}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TopPlayerCard
