import Gateway from '#models/gateway'
import GatewayOneService from './gateway1.ts'
import GatewayTwoService from './gateway2.ts'

export interface GatewayError {
  success: boolean
  error: string
}

export interface GatewayInterface {
  process(data: any): Promise<string | GatewayError>
  refund(external_id: string): Promise<boolean>
}

export class GatewayHandler{
  async get_enabled_gateways_in_order(): Promise<Gateway[]> {
    return await Gateway.query()
      .where('is_active', true)
      .orderBy('priority', 'asc')
  }

  get_service_from_gateway(gt: Gateway): GatewayInterface {
    if(gt.name === 'G2'){
        return new GatewayTwoService()
    }

    return new GatewayOneService()
  }
}
