import React, { useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { GameSnake } from './snake'
import styles from './game.module.scss'

const Game: React.FC = () => {
  const blockCanvasGame = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    if(blockCanvasGame){
      const game = new GameSnake(blockCanvasGame.current as HTMLDivElement)
      game.score.setFnUpdateScore(setScore)
    }
  }, [])

  return (
    <Container className={`d-flex justify-content-center flex-column pt-5`}>
      <div className={styles.snakeGame}>
        <div className={styles.snakeGame__header}>
          <div className={styles.score}>
            <div className={styles.score__counter}>
              <div className={styles.score__icon}>
                <img src='snake-game/coin.svg' alt='' />
              </div>
              <div className={styles.score__counter_count}>{score}</div>
            </div>
            <div className={styles.score__counter}>
              <div className={styles.score__icon}>
                <img src='snake-game/cup.svg' alt='' />
              </div>
              <div className={styles.score__counter_count}>9999</div>
            </div>
          </div>
        </div>
        <div ref={blockCanvasGame} className={styles.snakeGame__canvas}></div>
      </div>
    </Container>
  )
}

export default Game
