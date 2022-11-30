import { Chain } from '@ioc:Adonis/Core/Chain'
import Event from 'App/Models/Event'

import Calendar from '@ioc:Calendar'

export default class EventCancelled implements Chain {
  public async handle(event: Event) {
    if (event.status === 'CANCELLED') {
      const { timeZone } = Intl.DateTimeFormat().resolvedOptions()
      const id = event.calendarEventId.replaceAll('-', '')

      const startDate = new Date(event.startDate.toString()).toISOString()
      const endDate = new Date(event.endDate.toString()).toISOString()

      const calendarEvent = {
        id,
        anyoneCanAddSelf: false,
        summary: '[CANCELADO] ' + event.title,
        location: event.location,
        description: event.description,
        start: {
          dateTime: startDate,
          timeZone
        },
        end: {
          dateTime: endDate,
          timeZone
        }
      }
      await Calendar.changeEventStatus(id, 'cancelled', calendarEvent)
    }

    return true
  }

  public async next(event: Event) {
    return this.handle(event)
  }
}
