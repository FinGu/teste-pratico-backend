import type { HttpContext } from '@adonisjs/core/http'
import Transaction from '#models/transaction'
import { transactionValidator } from '#validators/transaction'
import Client from '#models/client'
import { GatewayHandler } from '#services/gateway_handler'
import Gateway from '#models/gateway'

export default class PurchaseController{
  async list({ response }: HttpContext) {
    const result = await Transaction
        .query()
        .preload('client_data')

    return response.ok({ data: result })
  }

  async show({ params, response }: HttpContext) {
    const transaction = await Transaction
        .query()
        .where('id', params.id)
        .preload('client_data')
        .firstOrFail()

    return response.ok(transaction)
  }

  async create({ request, response }: HttpContext) {
      const payload = await request.validateUsing(transactionValidator)

      const client = await Client.firstOrCreate({ email: payload.email }, { name: payload.name })

      const gateway_handler = new GatewayHandler()

      const gateways = await gateway_handler.get_enabled_gateways_in_order()

      let last_error = ''

      for (const gateway of gateways) {
        const service = gateway_handler.get_service_from_gateway(gateway)

        const gresult = await service.process({
          amount: payload.amount,
          card_number: payload.cardNumber,
          client: client,
          cvv: payload.cvv,
        })

        if (typeof gresult === 'string') {
          const transaction = await Transaction.create({
            externalId: gresult,
            amount: payload.amount.toString(),
            client: client.id,
            status: 'paid',
            cardLastNumbers: payload.cardNumber.slice(-4),
            gateway: gateway.id,
          })

          return response.ok({ id: transaction.id })
        }

        last_error = gresult.error
      }

      return response.badRequest({ error: true, response: last_error})
  }

  async chargeback({ params, response }: HttpContext) {
    const transaction = await Transaction.findOrFail(params.id)

    const gateway_handler = new GatewayHandler()

    const gateway = await Gateway.findOrFail(transaction.gateway)

    const service = gateway_handler.get_service_from_gateway(gateway)

    const success = await service.refund(transaction.externalId)

    if(!success){
        return response.badRequest({ error: true, response: "Falha ao fazer chargeback" })
    }

    transaction.status = 'charged_back'

    await transaction.save()

    return response.ok({ error:false, response: 'sucesso' })
  }
}
