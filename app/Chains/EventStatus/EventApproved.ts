import { Chain } from '@ioc:Adonis/Core/Chain'
import Event from 'App/Models/Event'

import { inject } from '@adonisjs/core/build/standalone'
import Calendar from '@ioc:Calendar'
import EventCancelled from './EventCancelled'

@inject()
export default class EventApproved implements Chain {
  public async handle(event: Event) {
    if (event.status === 'APPROVED') {
      const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

      const id = event.calendarEventId.replaceAll('-', '')
      const startDate = new Date(event.startDate.toString()).toISOString()
      const endDate = new Date(event.endDate.toString()).toISOString()

      try {
        await Calendar.createEvent({
          id,
          anyoneCanAddSelf: true,
          status: 'confirmed',
          summary: event.title,
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
        })
      } catch {
        return false
      }
    }
  }

  public async next(event: Event) {
    if ((await this.handle(event)) !== false) {
      return await new EventCancelled().next(event)
    }

    return false
  }
}
