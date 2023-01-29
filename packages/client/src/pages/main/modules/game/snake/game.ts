import Food from './food'
import CanvasBackground from './canvasBackground'
import CanvasGame from './canvasGame'
import Score from './score'
import Snake from './snake'
import Config, { IUpdateConfig } from './config'
import GameEvents from './gameEvents'

class Game {
  private canvasBackground: CanvasBackground
  private canvasGame: CanvasGame
  public score: Score
  public config: typeof Config
  private events: typeof GameEvents
  private readonly food: Food
  private readonly snake: Snake
  private loopGame: null | ReturnType<typeof setInterval>

  constructor(blockGame: HTMLDivElement) {
    this.canvasGame = new CanvasGame(blockGame)
    this.canvasBackground = new CanvasBackground(blockGame)
    this.score = new Score()
    this.food = new Food(this.canvasGame.context)
    this.snake = new Snake(this.canvasGame.context, this.score, this.food, this)
    this.events = GameEvents
    this.config = Config
    this.loopGame = null

    // отрисовка игрового поля
    this.canvasBackground.draw()
  }

  start() {
    this.reset()
    this.canvasBackground.draw()
    // рандомная позиция еды
    this.food.random(this.snake.snakeListPosition)
    // отрисовка еды
    this.food.draw()

    this.loopGame = setInterval(() => this.update(), this.config.speed)
  }

  stop() {
    this.clearLoopGame()
    this.events.launchEvent('stopGame')
  }

  settings(conf: IUpdateConfig) {
    this.config.speed = conf.speed ?? this.config.speed
    this.config.bgSelected = conf.bg ?? this.config.bgSelected
    this.config.foodSelected = conf.food ?? this.config.foodSelected
  }

  // event который срабатывает при изменении score
  eventScore(event: (score: number) => void) {
    this.events.setEvent('scoreUpdate', () => event(this.score.score))
  }

  // event который срабатывает при окончании игры
  eventStop(event: () => void) {
    this.events.setEvent('stopGame', event)
  }

  private update() {
    this.snake.draw()
    this.food.draw()
  }

  private clearLoopGame() {
    if (this.loopGame) clearInterval(this.loopGame)
  }

  private reset() {
    this.clearLoopGame()
    this.canvasGame.clear()
    this.score.scoreReset()
    this.snake.reset()
  }
}

export default Game
