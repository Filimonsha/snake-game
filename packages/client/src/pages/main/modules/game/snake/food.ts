import Config from './config'
import { getRandomObjectItem } from './utils'

class Food {
  private canvas: CanvasRenderingContext2D
  public x: number
  public y: number
  private config: typeof Config
  private foodZoom: { offset: number; width: number }
  private food: string | null

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

  random() {
    const { x, y, w, h } = this.getPosition()

    // очистка позиции еды
    if (this.food) this.canvas.clearRect(x, y, w, h)

    this.x = this.getRandomPosition()
    this.y = this.getRandomPosition()
    this.food = getRandomObjectItem(this.config.foodsList)
  }

  draw() {
    const { x, y, w, h } = this.getPosition()

    const img = new Image()

    if (this.food) {
      img.src = this.food
      img.onload = () => {
        this.canvas.drawImage(img as HTMLImageElement, x, y, w, h)
      }
    }
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