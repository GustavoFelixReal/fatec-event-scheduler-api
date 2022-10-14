import Env from '@ioc:Adonis/Core/Env'

import { Auth, calendar_v3, google } from 'googleapis'

type EventDateTime = {
  dateTime: string
  timeZone: string
}

type AllDayEventDateTime = {
  date: string
}

type EventStatus = 'confirmed' | 'tentative' | 'cancelled'

interface CalendarEvent {
  id: string
  anyoneCanAddSelf?: boolean
  status?: EventStatus
  summary: string
  location: string
  description: string
  start: EventDateTime | AllDayEventDateTime
  end: EventDateTime | AllDayEventDateTime
}

export default class Calendar {
  protected auth: Auth.GoogleAuth
  protected calendar: calendar_v3.Calendar

  constructor() {
    const path = require('path')

    this.auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, '../../google-auth.json'),
      scopes: Env.get('GOOGLE_SCOPES')
    })

    this.calendar = google.calendar({
      version: 'v3',
      auth: this.auth
    })
  }

  public async getEvent(eventId: string) {}

  public async getEvents() {
    const events = await this.calendar.events.list({
      calendarId: Env.get('GOOGLE_CALENDAR_ID')
    })

    return events.data.items
  }

  public async createEvent(event: CalendarEvent) {
    await this.calendar.events.insert({
      calendarId: Env.get('GOOGLE_CALENDAR_ID'),
      requestBody: {
        ...event
      }
    })
  }

  public async changeEventStatus(eventId: string, status: EventStatus) {
    await this.calendar.events.update({
      calendarId: Env.get('GOOGLE_CALENDAR_ID'),
      eventId,
      requestBody: {
        status
      }
    })
  }
}
