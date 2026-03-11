import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.updateOrCreate(
      { email: "admin@mail.com" },
      { 
        password: "abcdfg",
        role: "ADMIN"
      }
    )
  }
}
