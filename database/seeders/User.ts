import Env from '@ioc:Adonis/Core/Env'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        id: 1,
        name: Env.get('SA_NAME'),
        username: Env.get('SA_USER'),
        email: Env.get('SA_EMAIL'),
        isAdmin: true,
        isBlocked: false,
        password: Env.get('SA_PASSWORD')
      }
    ])
    // Write your database queries inside the run method
  }
}
