import GameEvents from './gameEvents'

class Score {
  public score: number
  private events: typeof GameEvents

  constructor() {
    this.events = GameEvents
    this.score = 0
  }

  scorePlus() {
    this.score++
    this.events.launchEvent('scoreUpdate')
  }

  scoreReset() {
    this.score = 0
    this.events.launchEvent('scoreUpdate')
  }
}

export default Score
