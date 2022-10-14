import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.query().preload('organization', (query) => {
      query.select('id', 'name')
    })

    return response.status(200).json({ users })
  }
}
