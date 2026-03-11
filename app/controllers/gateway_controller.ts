import type { HttpContext } from '@adonisjs/core/http'
import Gateway from '#models/gateway'

export default class GatewayController{
  async index({ response }: HttpContext) {
    const gateways = await Gateway.query().orderBy('priority', 'asc')
    
    return response.ok(gateways)
  }

  async update({ params, request, response, auth }: HttpContext) {
    if(!auth.user!.is_admin()){
        return response.forbidden({ message: 'Nao eh admin' })
    }
    
    const gateway = await Gateway.findOrFail(params.id)

    const {isActive, priority} = request.all() 

    gateway.merge({
      isActive: isActive,
      priority: priority
    })

    await gateway.save()

    return response.ok(gateway)
  }
}
