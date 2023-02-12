import Config, { TViewImg } from './config'
import Food from './food'
import Game from './game'
import Score from './score'

export type TSnakePosition = {
  x: number
  y: number
  orientation: TOrientation
}

type TOrientation = 'up' | 'right' | 'down' | 'left'

class Snake {
  snakeListPosition: TSnakePosition[]
  private canvas: CanvasRenderingContext2D
  private config: typeof Config
  private score: Score
  private food: Food
  private game: Game
  private x: number
  private y: number
  private dx: number
  private dy: number
  private maxBodySnake: number

  private orientation: TOrientation

  constructor(canvas: CanvasRenderingContext2D, score: Score, food: Food, game: Game) {
    this.canvas = canvas
    this.config = Config
    this.score = score
    this.food = food
    this.game = game

    // Для направления змейки
    this.orientation = 'up'
    this.dx = 0
    this.dy = 0

    // Начальная позиция змеи
    this.x = this.config.startPositionSnake.x * this.config.gridCellWidth
    this.y = this.config.startPositionSnake.y * this.config.gridCellWidth

    // Длина змеи
    this.maxBodySnake = this.config.maxBodySnake

    // позиция всей змеи
    this.snakeListPosition = []

    // отслеживание клавиш
    this.control()
    
    this.preventScroll = this.preventScroll.bind(this);
  }

  draw() {
    // расчет направления змеи
    this.orientationSnake()

    // Проверка на конец игры
    const dead = this.checkPositionDead()
    if (!dead) {
      this.clearSnake()
      this.snakeListPosition.unshift({ x: this.x, y: this.y, orientation: this.orientation })
      if (this.snakeListPosition.length > this.maxBodySnake) this.snakeListPosition.pop()
      this.checkPositionSnakeAndFood()
      this.drawSnake()
    }
  }

  // расчет направления змеи
  private orientationSnake() {
    switch (this.orientation) {
      case 'up':
        this.dx = 0
        this.dy = -this.config.gridCellWidth
        break
      case 'right':
        this.dx = this.config.gridCellWidth
        this.dy = 0
        break
      case 'down':
        this.dx = 0
        this.dy = this.config.gridCellWidth
        break
      case 'left':
        this.dx = -this.config.gridCellWidth
        this.dy = 0
        break
    }
    this.x += this.dx
    this.y += this.dy
  }

  // проверка позииции змеи и еды
  private checkPositionSnakeAndFood() {
    if (this.snakeListPosition[0].x === this.food.x && this.snakeListPosition[0].y === this.food.y) {
      this.score.scorePlus()
      this.food.random(this.snakeListPosition)
      this.maxBodySnake += 1
    }
  }

  // проверки конца игры
  private checkPositionDead() {
    const arrDeadPosition = [
      this.x < this.config.gridCellWidth,
      this.x > this.config.gridCellWidth * this.config.gridColsRows,
      this.y < this.config.gridCellWidth,
      this.y > this.config.gridCellWidth * this.config.gridColsRows
    ]

    // Проверка на границы
    const isDeadPosition = arrDeadPosition.some((el: boolean) => el)

    // Проверка на съедение хвоста
    const isEatTail = this.snakeListPosition.some((el) => this.x === el.x && this.y === el.y)

    // Если совпадает с условиями останавливаем игру
    if (isDeadPosition || isEatTail) {
      this.game.stop()
      return true
    } else return false
  }

  // отрисовка вида змеи
  private drawSnake() {
    this.snakeListPosition.forEach((item, i, snake) => {
      const snakeImg = this.config.viewSnake[i === 0 ? 'head' : i === (snake.length - 1) ? 'tail' : 'body']
      this.drawSnakeRotate(snakeImg, item.x, item.y, this.getDegreeRotation(item.orientation))
    })
  }

  // получение градусов поворота змеи
  private getDegreeRotation(orientation: TOrientation) {
    switch (orientation) {
      case 'up':
        return 0
      case 'right':
        return 90
      case 'down':
        return 180
      case 'left':
        return -90
    }
  }

  // отрисовка поворота элементов
  private drawSnakeRotate(img: TViewImg, x: number, y: number, angle: number) {
    this.canvas.save()
    this.canvas.translate(x + this.config.gridCellWidth / 2, y + this.config.gridCellWidth / 2)
    this.canvas.rotate(angle * (Math.PI / 180))
    this.canvas.translate(-x - this.config.gridCellWidth / 2, -y - this.config.gridCellWidth / 2)
    this.canvas.drawImage(img, x, y, this.config.gridCellWidth, this.config.gridCellWidth)
    this.canvas.restore()
  }

  // очистка
  private clearSnake() {
    this.snakeListPosition.forEach(item => {
      this.canvas.clearRect(item.x, item.y, this.config.gridCellWidth, this.config.gridCellWidth)
    })
  }
  
  
  // запрет на скролл страницы при управлении змейкой
  private preventScroll(e: KeyboardEvent) {
    const keys = ['KeyW', 'KeyD', 'KeyS', 'KeyA',
                  'ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
    if (keys.includes(e.code)) {
      e.preventDefault();
    }
  }

  // управление
  control() {
    document.addEventListener('keydown', (e) => {
      this.preventScroll(e);
      if (e.code == 'KeyW' || e.key == 'ArrowUp' && this.orientation !== 'down') {
        this.orientation = 'up'
      } else if (e.code == 'KeyD' || e.key == 'ArrowRight' && this.orientation !== 'left') {
        this.orientation = 'right'
      } else if (e.code == 'KeyS' || e.key == 'ArrowDown' && this.orientation !== 'up') {
        this.orientation = 'down'
      } else if (e.code == 'KeyA' || e.key == 'ArrowLeft' && this.orientation !== 'right') {
        this.orientation = 'left'
      }
    })
  }

  // сброс на начальное состояние
  reset() {
    this.orientation = 'up'
    this.dx = 0
    this.dy = 0

    // Начальная позиция змеи
    this.x = this.config.startPositionSnake.x * this.config.gridCellWidth
    this.y = this.config.startPositionSnake.y * this.config.gridCellWidth

    // Длина змеи
    this.maxBodySnake = this.config.maxBodySnake

    this.snakeListPosition = []
  }
}

export default Snake
