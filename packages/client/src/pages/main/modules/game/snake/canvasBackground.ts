import Config, { TViewImg } from './config'

class CanvasBackground {
  private readonly element: HTMLCanvasElement
  public context: CanvasRenderingContext2D
  private gridBg: TViewImg | null
  private config: Config
  private block: HTMLElement

  constructor(config:Config, block: HTMLElement) {
    this.block = block
    this.element = document.createElement('canvas')
    this.element.id = 'background-layer'
    this.context = this.element?.getContext('2d') as CanvasRenderingContext2D
    this.config = config
    this.element.width = this.config.canvasBgWidth
    this.element.height = this.config.canvasBgHeight
    this.gridBg = null

    this.createBlock()
  }

  // Отрисовка игрового поля
  draw() {
    // Удаление игрового поля если есть
    if (this.gridBg) this.context.clearRect(0, 0, this.element.width, this.element.height)

    // Вставка игрового поля
    this.getBackground()

    // fix отрисовки. ждем загрузки поля если не почему-то не загрузилось
    if (this.gridBg) {
      if (!this.gridBg.complete) this.gridBg.onload = () => this.canvasDrawImage()
      else this.canvasDrawImage()
    }
  }

  canvasDrawImage() {
    this.context.drawImage(this.gridBg as TViewImg, 0, 0, this.element.width, this.element.height)
  }

  // Установка игрового поля
  private getBackground() {
    const list = this.config.viewGridBackgrounds
    const bgSelected = this.config.bgSelected
    this.gridBg = bgSelected ? list[bgSelected - 1] : list[Math.floor(Math.random() * list.length)]
  }

  private createBlock() {
    this.block?.appendChild(this.element)
  }
}

export default CanvasBackground
