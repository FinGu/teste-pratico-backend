import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * SessionController handles user authentication and session management.
 * It provides methods for displaying the login page, authenticating users,
 * and logging out.
 */
export default class SessionController {
  async auth({ request, response }: HttpContext) {
    const { email, password } = request.all()

    const user = await User.verifyCredentials(email, password)

    if(!user){
        return response.unauthorized({ error: true, response: "usuario nao encontrado" })
    }

    const token = await User.accessTokens.create(user)

    response.ok({
       error: false, response: token.value?.release()
    })
  }
}
