import {
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

import AppBaseModel from './AppBaseModel'
import EventImages from './EventImage'
import EventLinks from './EventLink'
import User from './User'

export default class Event extends AppBaseModel {
  public static allStatus: string[] = [
    'PENDING',
    'APPROVED',
    'REJECTED',
    'CANCELLED'
  ]

  @column({ isPrimary: true })
  public id: number

  @column()
  public calendarEventId: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public objective: string

  @column()
  public contactDetails: string

  @column()
  public startDate: DateTime

  @column()
  public endDate: DateTime

  @column()
  public location: string

  @column()
  public isInternal: boolean

  @column()
  public isPublic: boolean

  @column()
  public status: string

  @column()
  public createdBy: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public updatedBy: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateCalendarEventId(event: Event) {
    event.calendarEventId = uuidv4()
  }

  @belongsTo(() => User, {
    foreignKey: 'createdBy'
  })
  public author: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'updatedBy'
  })
  public maintainer: BelongsTo<typeof User>

  @hasMany(() => EventLinks, {
    foreignKey: 'eventId'
  })
  public relatedLinks: HasMany<typeof EventLinks>

  @hasMany(() => EventImages, {
    foreignKey: 'eventId'
  })
  public images: HasMany<typeof EventImages>
}
