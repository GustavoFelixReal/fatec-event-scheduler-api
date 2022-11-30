import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()

    return response.status(200).json({ users })
  }

  public async find({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const user = await User.find(id)

    return response.status(200).json({ user })
  }
}
