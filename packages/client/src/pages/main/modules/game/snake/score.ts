import Snake from './snake'
import Food from './food'

export default class Score {
  public score: number
  private fnUpdate: null | ((v: number) => void)
  private snake: Snake
  private food: Food

  constructor(snake: Snake, food: Food) {
    this.score = 0
    this.fnUpdate = null
    this.snake = snake
    this.food = food
  }

  check() {
    if(this.snake.snake[0].x === this.food.x && this.snake.snake[0].y === this.food.y){
      this.scorePlus()
      this.food.random()
    }
  }

  scorePlus() {
    this.score++
    this.fnUpdateScore()
  }

  scoreReset() {
    this.score = 0
    this.fnUpdateScore()
  }

  public setFnUpdateScore(fn: (value: (((prevState: number) => number) | number)) => void) {
    this.fnUpdate = fn
  }

  private fnUpdateScore() {
    this.fnUpdate?.(this.score)
  }
}
