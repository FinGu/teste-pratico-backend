import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('client').unsigned().references('id').inTable('clients').notNullable()

      table.integer('gateway').unsigned().references('id').inTable('gateways').notNullable()

      table.string('external_id').notNullable() // ID retornado pelo Gateway

      table.string('status').notNullable()

      table.decimal('amount', 12, 3).notNullable()

      table.string('card_last_numbers').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
