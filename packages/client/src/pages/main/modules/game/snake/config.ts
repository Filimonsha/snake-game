import { getFoodOptimize, getGridsBgOptimize } from './optimize'

type TListGridBg = string[]
type TListFoods = { [key: string]: string }

class Config {
  public readonly canvasBgWidth: number
  public readonly canvasBgHeight: number
  public readonly canvasGridWidth: number
  public readonly canvasGridHeight: number
  public readonly gridColsRows: number
  public readonly gridCellWidth: number
  public gridBackgroundsList: TListGridBg
  public foodsList: TListFoods
  public speed: number
  public startPositionSnake: { x: number; y: number }

  constructor(bg: TListGridBg, foods: TListFoods) {
    this.canvasBgWidth = 800
    this.canvasBgHeight = 800

    this.canvasGridWidth = 680
    this.canvasGridHeight = 680
    this.gridColsRows = 15
    this.gridCellWidth = 40

    this.speed = 250 // ms

    this.gridBackgroundsList = bg
    this.foodsList = foods

    this.startPositionSnake = { x: 7, y: 12 }
  }
}

export default new Config(await getGridsBgOptimize(), await getFoodOptimize())
