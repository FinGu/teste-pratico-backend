import { TransactionSchema } from '#database/schema'
import Client from '#models/client'
import Gateway from '#models/gateway'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Transaction extends TransactionSchema {
  @belongsTo(() => Client, {
    foreignKey: 'client'
  })
  declare client_data: BelongsTo<typeof Client>

  @belongsTo(() => Gateway, {
    foreignKey: 'gateway'
  })
  declare gateway_data: BelongsTo<typeof Gateway>

  serialize() {
    return {
      id: this.id,
      name: this.client_data?.name,
      email: this.client_data?.email,
      status: this.status,
      card_last_numbers: this.cardLastNumbers,
      amount: Number(this.amount),
    }
  }
}
