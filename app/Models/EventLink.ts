import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import AppBaseModel from './AppBaseModel'
import Event from './Event'

export default class EventLink extends AppBaseModel {
  public static table: string = 'events_links'

  @column({ isPrimary: true })
  public id: number

  @column()
  public eventId: number

  @column()
  public description: string

  @column()
  public url: string

  @belongsTo(() => Event, {
    foreignKey: 'eventId'
  })
  public event: BelongsTo<typeof Event>
}
