import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class CalendarProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('Calendar', () => {
      const Calendar = require('./calendar').default

      return new Calendar()
    })
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {}

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
