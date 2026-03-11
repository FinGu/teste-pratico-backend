import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { userValidator } from '#validators/user'

export default class UserController {
  async index({ response, auth }: HttpContext) {
    if(!auth.user!.is_admin()){
      return response.forbidden({ error: true, response: 'Nao eh admin' })
    }

    const users = await User.all()

    return response.ok(users)
  }

  async store({ request, response, auth }: HttpContext) {
    if(!auth.user!.is_admin()){
      return response.forbidden({ error: true, response: 'Nao eh admin' })
    }

    const payload = await request.validateUsing(userValidator)

    const user = await User.create(payload)

    return response.created(user)
  }

  async update({ params, request, response, auth }: HttpContext) {
    if(!auth.user!.is_admin()){
      return response.forbidden({ error: true, response: 'Nao eh admin' })
    }

    const user = await User.findOrFail(params.id)

    const payload = await request.validateUsing(userValidator)

    user.merge(payload)

    await user.save()

    return response.ok(user)
  }

  async destroy({ params, response, auth }: HttpContext) {
    if(!auth.user!.is_admin()){
      return response.forbidden({ error: true, response: 'Nao eh admin' })
    }

    const user = await User.findOrFail(params.id)

    await user.delete()

    return response.noContent()
  }
}
