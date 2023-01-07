import Config from './config'

export default class CanvasBackground {
  private readonly element: HTMLCanvasElement
  public context: CanvasRenderingContext2D
  private gridBg: HTMLImageElement | null
  private config: typeof Config

  constructor(block: HTMLElement) {
    this.element = document.createElement('canvas')
    this.element.id = 'background-layer'
    this.context = this.element?.getContext('2d') as CanvasRenderingContext2D
    this.config = Config
    this.element.width = this.config.canvasBgWidth
    this.element.height = this.config.canvasBgHeight
    this.gridBg = null

    block.appendChild(this.element)
  }

  // Установка рандомного игрового поля
  async draw() {
    const list = this.config.gridBackgroundsList

    // Удаление игрового поля если есть
    if (this.gridBg) this.context.clearRect(0, 0, this.element.width, this.element.height)

    // Вставка игрового поля
    this.gridBg = new Image()
    this.gridBg.src = list[Math.floor(Math.random() * list.length)]
    this.gridBg.onload = () => {
      this.context.drawImage(this.gridBg as HTMLImageElement, 0, 0, this.element.width, this.element.height)
    }
  }
}
