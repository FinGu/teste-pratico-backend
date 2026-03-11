import axios from 'axios'
import env from '#start/env'
import { GatewayError } from './gateway_handler.ts'

export default class GatewayTwoService{
  async process(data: any): Promise<string | GatewayError> {
    try {
      const response = await axios.post(`${env.get('G2_URL')}/transacoes`, {
        valor: data.amount,
        nome: data.client.name,
        email: data.client.email,
        numeroCartao: data.card_number,
        cvv: data.cvv.toString()
      }, {
        headers: {
          'Gateway-Auth-Token': env.get('G2_TOKEN'),
          'Gateway-Auth-Secret': env.get('G2_SECRET')
        }
      })

      let errno = response.data.success

      if(typeof errno !== 'undefined'){
        return { success: false, error: response.data.erros }
      }

      return response.data.id

    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async refund(external_id: string): Promise<boolean> {
    try {
      await axios.post(`${env.get('G2_URL')}/transacoes/reembolso`, {
        id: external_id
      }, {
        headers: {
          'Gateway-Auth-Token': env.get('G2_TOKEN'),
          'Gateway-Auth-Secret': env.get('G2_SECRET')
        }
      })

      return true
    } catch (error) {
      return false
    }
  }
}
