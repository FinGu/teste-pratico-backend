import axios from 'axios'
import env from '#start/env'
import { GatewayError } from './gateway_handler.ts'

export default class GatewayOneService{
  async process(data: any): Promise<string | GatewayError> {
    try {

      const response = await axios.post(`${env.get('G1_URL')}/transactions`, {
        amount: data.amount,
        name: data.client.name,
        email: data.client.email,
        cardNumber: data.card_number,
        cvv: data.cvv.toString()
      }, {
        headers: {
          'Authorization': `Bearer ${env.get('G1_TOKEN')}`
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

      await axios.post(`${env.get('G1_URL')}/transactions/${external_id}/charge_back`, {}, {
        headers: {
          'Authorization': `Bearer ${env.get('G1_TOKEN')}`
        }
      })

      return true
    } catch (error) {
      return false
    }
  }
}
