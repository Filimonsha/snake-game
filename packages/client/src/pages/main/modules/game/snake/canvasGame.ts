import Config from './config'

export default class CanvasGame{
  private readonly element: HTMLCanvasElement
  public context: CanvasRenderingContext2D
  private config: typeof Config

  constructor(block: HTMLElement) {
    this.element = document.createElement('canvas')
    this.element.id = 'game-layer'
    this.context = this.element?.getContext('2d') as CanvasRenderingContext2D
    this.config = Config
    this.element.width = this.config.canvasGridWidth
    this.element.height = this.config.canvasGridHeight
    block.appendChild(this.element)
  }
}
