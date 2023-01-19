import Food from './food'
import CanvasBackground from './canvasBackground'
import CanvasGame from './canvasGame'
import Score from './score'
import Snake from './snake'
import Config from './config'

class Game {
  private canvasBackground: CanvasBackground
  private canvasGame: CanvasGame
  private readonly food: Food
  public score: Score
  private readonly snake: Snake
  private config: typeof Config

  constructor(blockGame: HTMLDivElement) {
    this.canvasGame = new CanvasGame(blockGame)
    this.canvasBackground = new CanvasBackground(blockGame)
    this.snake = new Snake(this.canvasGame.context)
    this.food = new Food(this.canvasGame.context)
    this.score = new Score(this.snake, this.food)
    this.config = Config

    this.start()
    setInterval(() => this.update(), this.config.speed)
  }

  update(){
    this.score.check()
    this.food.draw()
    this.snake.draw()
  }

  start() {
    // отрисовка игрового поля
    this.canvasBackground.draw()
    // рандомная позиция еды
    this.food.random()
    // отрисовка еды
    this.food.draw()
    // отрисовка змейки
    this.snake.draw()
  }
}

export default Game
