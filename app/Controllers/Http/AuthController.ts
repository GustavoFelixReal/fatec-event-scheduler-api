import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

import { registerUserValidator } from 'App/Validators/Users'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.body()

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '1day'
      })

      response.header('Authorization', 'Bearer ' + token.token)

      return response.status(200)
    } catch {
      return response.status(400).send('Invalid credentials')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()

    return response.status(200)
  }

  public async register({ request, response }: HttpContextContract) {
    const payload = request.body()

    await registerUserValidator.validate(payload)

    const user = User.create({
      name: payload.name,
      username: payload.username,
      email: payload.email,
      password: payload.password
    })

    return response.status(200).json({ user })
  }
}
