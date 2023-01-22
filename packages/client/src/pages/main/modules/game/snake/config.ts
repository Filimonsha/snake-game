import { listOptimize, objectOptimize } from './optimize'

export type TViewImg = HTMLImageElement

type TViewImgObject = {
  [key: string]: TViewImg
}

type TViewImgList = TViewImg[]

// 0 = random
type TBgSelected = 0 | 1 | 2 | 3 | 4 | 5 | 6

type TFoodSelected = 'random' | 'apple' | 'banana' | 'cherry' | 'grape' | 'pear' | 'strawberry'

export interface IUpdateConfig {
  speed?: number
  bg?: TBgSelected
  food?: TFoodSelected
}

const viewImgSnake = {
  head: `snakeGame/snake/head.png`,
  body: `snakeGame/snake/body.png`,
  tail: `snakeGame/snake/tail.png`
}

const viewImgFoods = {
  apple: `snakeGame/food/apple.svg`,
  banana: `snakeGame/food/banana.svg`,
  cherry: `snakeGame/food/cherry.svg`,
  grape: `snakeGame/food/grape.svg`,
  pear: `snakeGame/food/pear.svg`,
  strawberry: `snakeGame/food/strawberry.svg`
}

const viewImgBg = [
  `snakeGame/grid/BG-1.png`,
  `snakeGame/grid/BG-2.png`,
  `snakeGame/grid/BG-3.png`,
  `snakeGame/grid/BG-4.png`,
  `snakeGame/grid/BG-5.png`,
  `snakeGame/grid/BG-6.png`
]

class Config {
  public readonly canvasBgWidth: number
  public readonly canvasBgHeight: number
  public readonly canvasGridWidth: number
  public readonly canvasGridHeight: number
  public readonly gridColsRows: number
  public readonly gridCellWidth: number
  public viewGridBackgrounds: TViewImgList
  public viewFoods: TViewImgObject
  public speed: number
  public startPositionSnake: { x: number; y: number }
  public bgSelected: TBgSelected
  public foodSelected: TFoodSelected
  public viewSnake: TViewImgObject
  public maxBodySnake: number

  constructor(viewGridBackgrounds: TViewImgList, viewFoods: TViewImgObject, viewSnake: TViewImgObject) {
    this.canvasBgWidth = 800
    this.canvasBgHeight = 800

    this.canvasGridWidth = 680
    this.canvasGridHeight = 680
    this.gridColsRows = 15
    this.gridCellWidth = 40

    this.viewGridBackgrounds = viewGridBackgrounds
    this.viewFoods = viewFoods
    this.viewSnake = viewSnake

    // Изменяемые
    this.speed = 250 // ms
    this.bgSelected = 0
    this.foodSelected = 'random'

    // Стартовая позиция змейки
    this.startPositionSnake = { x: 7, y: 12 }

    this.maxBodySnake = 3
  }
}

export default new Config(await listOptimize(viewImgBg), await objectOptimize(viewImgFoods), await objectOptimize(viewImgSnake))
