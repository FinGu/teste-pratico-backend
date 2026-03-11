import { ClientSchema } from '#database/schema'
import Transaction from '#models/transaction'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Client extends ClientSchema {
  @hasMany(() => Transaction, {
    foreignKey: 'client'
  })
  declare transactions: HasMany<typeof Transaction>
}
