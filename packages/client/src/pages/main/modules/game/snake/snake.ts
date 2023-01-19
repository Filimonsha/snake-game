import Config from './config'

type TSnakePosition = {
  x: number
  y: number
  view: string
}

class Snake {
  snake: TSnakePosition[]
  private canvas: CanvasRenderingContext2D
  private config: typeof Config
  private x: number
  private y: number


  constructor(canvas: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.config = Config

    this.x = 0
    this.y = -this.config.gridCellWidth

    // Начальная позиция змеи
    this.snake = [
      {
        x: this.config.startPositionSnake.x * this.config.gridCellWidth,
        y: this.config.startPositionSnake.y * this.config.gridCellWidth,
        view: 'red'
      }
    ]

    this.control()
  }

  draw() {
    this.clearSnake()

    this.snake[0].x += this.x
    this.snake[0].y += this.y

    this.drawSnake()
  }

  private drawSnake() {
    this.snake.forEach(item => {
      this.canvas.fillStyle = item.view
      this.canvas.fillRect(item.x, item.y, this.config.gridCellWidth, this.config.gridCellWidth)
    })
  }

  private clearSnake() {
    this.snake.forEach(item => {
      this.canvas.clearRect(item.x, item.y, this.config.gridCellWidth, this.config.gridCellWidth)
    })
  }

  control() {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'KeyW' || e.key == 'ArrowUp') {
        this.y = -this.config.gridCellWidth
        this.x = 0
      } else if (e.code == 'KeyD' || e.key == 'ArrowRight') {
        this.x = this.config.gridCellWidth
        this.y = 0
      } else if (e.code == 'KeyS' || e.key == 'ArrowDown') {
        this.y = this.config.gridCellWidth
        this.x = 0
      } else if (e.code == 'KeyA' || e.key == 'ArrowLeft') {
        this.x = -this.config.gridCellWidth
        this.y = 0
      }
    })
  }
}

export default Snake
