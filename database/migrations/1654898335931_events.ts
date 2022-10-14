import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('calendar_event_id')
      table.string('title', 50).notNullable()
      table.text('description').notNullable()
      table.text('objective').notNullable()
      table.string('contact_details', 300)
      table.dateTime('start_date').notNullable()
      table.dateTime('end_date').notNullable()
      table.boolean('is_recurrent').defaultTo(false)
      table.string('recurrency_rule')
      table.string('location', 300).notNullable()
      table.boolean('is_internal').defaultTo(true)
      table.boolean('is_public').defaultTo(true)
      table.string('status', 50).defaultTo('PENDING')
      table.string('cycle', 6)
      table.timestamp('created_at', { useTz: true })
      table
        .bigint('created_by')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
      table.timestamp('updated_at', { useTz: true })
      table
        .bigint('updated_by')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
