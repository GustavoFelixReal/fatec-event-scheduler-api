import Hash from '@ioc:Adonis/Core/Hash'
import { beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import AppBaseModel from './AppBaseModel'
import Event from './Event'

export default class User extends AppBaseModel {
  public static table: string = 'users'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column()
  public isAdmin: boolean

  @column()
  public isBlocked: boolean

  @column()
  public isDeleted: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Event, {
    foreignKey: 'createdBy'
  })
  public createdEvent: HasMany<typeof Event>

  @hasMany(() => Event, {
    foreignKey: 'updatedBy'
  })
  public updatedEvent: HasMany<typeof Event>
}
