import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  static accessTokens = DbAccessTokensProvider.forModel(User)

  is_superuser(){
    return this.is_admin() || this.is_manager();
  }

  is_manager(){
    return this.role === 'MANAGER'
  }

  is_admin(){
    return this.role === 'ADMIN'
  }
}
