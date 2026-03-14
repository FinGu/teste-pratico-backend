import axios from 'axios'
import env from '#start/env'
import { GatewayError, GatewayInterface } from './gateway_handler.ts'

export default class GatewayOneService implements GatewayInterface{

  async get_token(): Promise<string | GatewayError>{
      //ideal seria guardar o token, no caso de oauth
      try{
        const response = await axios.post(`${env.get('G1_URL')}/login`, {
          email: env.get('G1_EMAIL'),
          token: env.get('G1_TOKEN')
        })

        return response.data.token 
      }
      catch(error){
         return { success: false, error: error.message }
      }
  }
  
  async process(data: any): Promise<string | GatewayError> {
    try {
      const token = await this.get_token()

      if(typeof token !== 'string'){
          return { success: false, error: token.error }
      }

      const response = await axios.post(`${env.get('G1_URL')}/transactions`, {
        amount: data.amount,
        name: data.client.name,
        email: data.client.email,
        cardNumber: data.card_number,
        cvv: data.cvv
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if(!response.data.success){
          return { success: false, error: response.data.erros };
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
