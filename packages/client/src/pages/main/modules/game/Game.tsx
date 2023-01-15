import React, { useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { GameSnake } from './snake'
import gameStyles from './game.module.scss'

const Game: React.FC = () => {
  const blockCanvasGame = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    if(blockCanvasGame.current){
      const game = new GameSnake(blockCanvasGame.current as HTMLDivElement)
      game.score.setFnUpdateScore(setScore)
    }
  }, [])

  return (
    <Container className={gameStyles.snakeGameWrap}>
      <div className={gameStyles.snakeGame}>
        <div className={gameStyles.snakeGameHeader}>
          <div className={gameStyles.score}>
            <div className={gameStyles.scoreCounter}>
              <div className={gameStyles.scoreIcon}>
                <img src='snakeGame/coin.svg' alt='coin' />
              </div>
              <div className={gameStyles.scoreCounterCount}>{score}</div>
            </div>
            <div className={gameStyles.scoreCounter}>
              <div className={gameStyles.scoreIcon}>
                <img src='snakeGame/cup.svg' alt='cup' />
              </div>
              <div className={gameStyles.scoreCounterCount}>9999</div>
            </div>
          </div>
        </div>
        <div ref={blockCanvasGame} className={gameStyles.snakeGameCanvas}></div>
      </div>
    </Container>
  )
}

export default Game
