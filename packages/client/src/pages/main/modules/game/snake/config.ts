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
  }
}

const pathMedia = 'snakeGame/'

const getBase64FromUrl = async (url: string) => {
  const data = await fetch(url)
  const blob = await data.blob()
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      const base64data = reader.result
      resolve(base64data)
    }
  })
}

const getFoodOptimize = async () => {
  const listFoods: { [p: string]: unknown } = {
    apple: `${pathMedia}food/apple.svg`,
    banana: `${pathMedia}food/banana.svg`,
    cherry: `${pathMedia}food/cherry.svg`,
    grape: `${pathMedia}food/grape.svg`,
    pear: `${pathMedia}food/pear.svg`,
    strawberry: `${pathMedia}food/strawberry.svg`
  }
  return await (Object.entries(listFoods).reduce(async (acc, [k, v]) => (
    { ...await acc, [k]: await getBase64FromUrl(v as string) }
  ), Promise.resolve({})))
}

const getGridsBgOptimize = async () => {
  const listBg = [
    `${pathMedia}grid/BG-1.png`,
    `${pathMedia}grid/BG-2.png`,
    `${pathMedia}grid/BG-3.png`,
    `${pathMedia}grid/BG-4.png`,
    `${pathMedia}grid/BG-5.png`,
    `${pathMedia}grid/BG-6.png`
  ]
  return await Promise.all(listBg.map(async (item: string) => await getBase64FromUrl(item))) as string[]
}

export default new Config(await getGridsBgOptimize(), await getFoodOptimize())
