import Gateway from '#models/gateway'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Gateway.createMany([
      {
        name: 'G1',
        isActive: true,
        priority: 3
      },
      {
        name: 'G2',
        isActive: true,
        priority: 2
      }
    ])

    // Write your database queries inside the run method
  }
}
