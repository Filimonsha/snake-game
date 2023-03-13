import React, { useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { GameSnake } from './snake'
import gameStyles from './game.module.scss'
import { ScreenStart } from './screenStart'
import { FullscreenView } from '../../../../components/fullscreenView'
import { useAddUserToLeaderboardMutation, useGetUserLeaderboardQuery } from '../../../../store/api/yadnex/leader/leaderApi'

const Game: React.FC = () => {
  const blockCanvasGame = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState<number>(0)
  const [scoreMax, setScoreMax] = useState<number>(0)
  const [game, setGame] = useState<GameSnake | null>(null)
  const [gameStartVisible, setGameStartVisible] = useState<boolean>(true)
  const leaderBoardMutation = useAddUserToLeaderboardMutation();
  const {data: leaderBoardResponse} = useGetUserLeaderboardQuery();

  useEffect(() => {
    if (blockCanvasGame.current) setGame(new GameSnake(blockCanvasGame.current))
  }, [])

  useEffect(() => {
    setScoreMax(leaderBoardResponse ? leaderBoardResponse.score : 0)
  }, [leaderBoardResponse])

  useEffect(() => {
    game?.eventScore((score) => {
      setScore(score)
    })

    game?.eventStop(() => {
      setGameStartVisible(true)
      leaderBoardMutation[0]({score})
      if (score > scoreMax) setScoreMax(score)
    })

    game?.settings({
      food: 'random',
      speed: 150
    })
  }, [game, score, scoreMax])

  const startGame = () => {
    game?.start()
    setGameStartVisible(false)
  }

  return (
    <FullscreenView>
      <Container className={gameStyles.snakeGameWrap}>
        <div className={gameStyles.snakeGame}>
          <div className={gameStyles.snakeGameHeader}>
            {!gameStartVisible &&
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
                  <div className={gameStyles.scoreCounterCount}>{scoreMax}</div>
                </div>
              </div>
            }
          </div>
          <div className={gameStyles.snakeGamePlay}>
            {gameStartVisible &&
              <div className={gameStyles.screenPlay}>
                <ScreenStart fnStart={startGame} score={score} scoreMax={scoreMax} />
              </div>
            }
            <div ref={blockCanvasGame} className={gameStyles.snakeGameCanvas}></div>
          </div>
        </div>
      </Container>
    </FullscreenView>
  )
}

export default Game
