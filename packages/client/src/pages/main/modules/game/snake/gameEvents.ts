type IEventFn = () => void
type IEventName = string

class GameEvents {
  private readonly allEvents: { [key: IEventName]: IEventFn }

  constructor() {
    this.allEvents = {}
  }

  launchEvent(event: IEventName) {
    this.allEvents?.[event]?.()
  }

  setEvent(eventName: IEventName, eventFn: IEventFn) {
    this.allEvents[eventName] = eventFn
  }
}

export default new GameEvents()
