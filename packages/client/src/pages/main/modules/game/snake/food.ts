import Config, { TViewImg } from './config'
import { getRandomObjectItem } from './utils'
import { TSnakePosition } from './snake'

class Food {
  private canvas: CanvasRenderingContext2D
  public x: number
  public y: number
  private config: typeof Config
  private foodZoom: { offset: number; width: number }
  private food: TViewImg | null

  constructor(canvas: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.config = Config
    this.x = 0
    this.y = 0
    this.food = null

    this.foodZoom = {
      width: 10,
      offset: 5
    }
  }

  // Установка еды в рандомное место
  random(snakeListPosition: TSnakePosition[]) {
    const { x, y, w, h } = this.getPosition()

    // очистка позиции еды
    if (this.food) this.canvas.clearRect(x, y, w, h)

    // Определение вида еды
    this.setFood()

    // Установка рандомной позиции с проверками
    this.randomAndCheckPosition(snakeListPosition)
  }

  draw() {
    const { x, y, w, h } = this.getPosition()
    if (this.food) this.canvas.drawImage(this.food, x, y, w, h)
  }

  // Установка вида еды
  private setFood() {
    const list = this.config.viewFoods
    const foodSelected = this.config.foodSelected
    this.food = foodSelected !== 'random' ? list[foodSelected] : getRandomObjectItem(this.config.viewFoods)
  }

  private randomAndCheckPosition(snakeListPosition: TSnakePosition[]) {
    const coordinates = {
      x: this.getRandomPosition(),
      y: this.getRandomPosition()
    }

    const isIntersectingPosition = snakeListPosition.some((el) => coordinates.x === el.x && coordinates.y === el.y)

    if (isIntersectingPosition) {
      this.randomAndCheckPosition(snakeListPosition)
      return
    }

    this.x = coordinates.x
    this.y = coordinates.y
  }

  private getRandomPosition() {
    return Math.floor(Math.random() * this.config.gridColsRows + 1) * this.config.gridCellWidth
  }

  private getPosition() {
    return {
      x: this.x - this.foodZoom.offset,
      y: this.y - this.foodZoom.offset,
      w: this.config.gridCellWidth + this.foodZoom.width,
      h: this.config.gridCellWidth + this.foodZoom.width
    }
  }
}

export default Food
