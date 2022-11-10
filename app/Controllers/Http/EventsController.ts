import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {
  changeStatusEventValidator,
  createEventValidator,
  findEventValidator,
  updateEventValidator
} from 'App/Validators/Events'

import EventApproved from 'App/Chains/EventStatus/EventApproved'
import GoogleAPIException from 'App/Exceptions/GoogleApiException'
import PermissionDeniedException from 'App/Exceptions/PermissionDeniedException'
import Event from 'App/Models/Event'
import EventImage from 'App/Models/EventImage'
import EventLink from 'App/Models/EventLink'

export default class EventsController {
  public async index({ response }: HttpContextContract) {
    const events = await Event.query()
      .preload('images', (query) => {
        query.select('id', 'src', 'description')
      })
      .preload('relatedLinks', (query) => {
        query.select('id', 'url', 'description')
      })
      .orWhere('isInternal', false)

    return response.status(200).json({ events })
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const payload = request.body()

    await createEventValidator.validate(payload)

    const { id } = auth.user.$attributes

    const event = await Event.create({
      title: payload.title,
      description: payload.description,
      objective: payload.objective,
      contactDetails: payload.contactDetails,
      startDate: payload.startDate,
      endDate: payload.endDate,
      location: payload.location,
      isInternal: payload.isInternal,
      status: 'PENDING',
      createdBy: id,
      updatedBy: id
    })

    await EventImage.createMany(
      payload.images.map((image) => ({
        ...image,
        eventId: event.id
      }))
    )

    await EventLink.createMany(
      payload.links.map((link) => ({
        ...link,
        eventId: event.id
      }))
    )

    return response.status(200).json({ event })
  }

  public async find({ auth, request, response }: HttpContextContract) {
    const payload = request.params()

    await findEventValidator.validate(payload)

    const { id } = auth.user.$attributes

    const event = await Event.query()
      .where('id', payload.id)
      .whereRaw('created_by = ?', [id])
      .preload('author')
      .preload('maintainer')
      .first()

    if (!event) {
      throw new PermissionDeniedException('', 401, 'E_PERMISSION_DENIED')
    }

    return response.status(200).json({ event })
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const payload = { ...request.params(), ...request.body() }

    await updateEventValidator.validate(payload)

    const { id } = auth.user.$attributes

    const event = await Event.query()
      .where('id', payload.id)
      .whereRaw('reated_by = ?', [id])
      .first()

    if (!event) {
      throw new PermissionDeniedException('', 401, 'E_PERMISSION_DENIED')
    }

    await event
      .merge({
        title: payload.title,
        description: payload.description,
        objective: payload.objective,
        contactDetails: payload.contactDetails,
        startDate: payload.startDate,
        endDate: payload.endDate,
        location: payload.location,
        isInternal: payload.isInternal,
        createdBy: id,
        updatedBy: id
      })
      .save()

    return response.status(200).json({ event })
  }

  public async changeStatus({ auth, request, response }: HttpContextContract) {
    const payload = { ...request.body(), ...request.params() }

    await changeStatusEventValidator.validate(payload)

    const { id: eventId, status } = payload
    const { id } = auth.user.$attributes

    let event = await Event.query()
      .where('id', eventId)
      .whereRaw('created_by = ?', [id])
      .first()

    if (!event) {
      throw new PermissionDeniedException('', 401, 'E_PERMISSION_DENIED')
    }

    event = await event.merge({ status }).save()

    if (!(await new EventApproved().next(event))) {
      throw new GoogleAPIException('', 400, 'E_GOOGLE_API_ERROR')
    }

    return response.status(200).json({ event })
  }
}
