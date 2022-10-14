/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import Logger from '@ioc:Adonis/Core/Logger'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ValidationError } from 'yup'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error instanceof ValidationError) {
      return ctx.response.status(406).send({
        errors: [
          {
            code: 'not_acceptable',
            status: 406,
            message: {
              [`${error.path}`]: error.message
            }
          }
        ]
      })
    }

    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ctx.response.status(401).json({
        errors: [
          {
            code: 'unauthenticated',
            status: 401,
            message: 'request.unauthenticated'
          }
        ]
      })
    }

    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(404).json({
        errors: [
          {
            code: 'not_found',
            status: 404,
            message: 'request.record_not_found'
          }
        ]
      })
    }

    if (error.code === 'E_PERMISSION_DENIED') {
      return ctx.response.status(401).json({
        errors: [
          {
            code: 'permission_denied',
            status: 401,
            message: 'request.permission_denied'
          }
        ]
      })
    }

    if (error.code === 'E_GOOGLE_API_ERROR') {
      return ctx.response.status(500).json({
        errors: [
          {
            code: 'calendar_service_error',
            status: 500,
            message: 'request.calendar_service_error'
          }
        ]
      })
    }

    return super.handle(error, ctx)
  }
}
