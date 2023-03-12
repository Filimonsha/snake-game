import Config from './config'

class CanvasGame {
  private readonly element: HTMLCanvasElement
  public context: CanvasRenderingContext2D
  private config: typeof Config
  private block: HTMLElement

  constructor(block: HTMLElement) {
    this.block = block
    this.element = document.createElement('canvas')
    this.element.id = 'game-layer'
    this.context = this.element?.getContext('2d') as CanvasRenderingContext2D
    this.config = Config
    this.element.width = this.config.canvasGridWidth
    this.element.height = this.config.canvasGridHeight

    this.createBlock()
  }

  clear() {
    this.context.clearRect(0, 0, this.element.width, this.element.height)
  }

  private createBlock() {
    this.block?.appendChild(this.element)
  }
}

export default CanvasGame
