import { TransactionProductSchema } from '#database/schema'
import Product from '#models/product'
import Transaction from '#models/transaction'
import Gateway from '#models/gateway'

import { belongsTo, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'

export default class TransactionProduct extends TransactionProductSchema {
  @hasOne(() => Product)
  declare product: HasOne<typeof Product>

  @hasOne(() => Transaction)
  declare transaction: HasOne<typeof Transaction>

  @belongsTo(() => Gateway)
  declare gateway: BelongsTo<typeof Gateway>
}
