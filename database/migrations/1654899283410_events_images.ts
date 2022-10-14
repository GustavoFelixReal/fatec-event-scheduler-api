import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventsImages extends BaseSchema {
  protected tableName = 'events_images'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .bigInteger('event_id')
        .unsigned()
        .references('events.id')
        .onDelete('CASCADE')
        .notNullable()
      table.string('description', 50)
      table.string('src', 255).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
