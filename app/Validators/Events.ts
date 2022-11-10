import Event from 'App/Models/Event'
import * as yup from 'yup'

export const createEventValidator = yup.object().shape({
  title: yup.string().required('validation.event_title_required'),
  description: yup.string().required('validation.event_description_required'),
  objective: yup.string().required('validation.event_objective_required'),
  contactDetails: yup.string().max(300),
  startDate: yup.date().required('validation.event_start_date_required'),
  endDate: yup.date().required('validation.event_end_date_required'),
  location: yup.string().required('validation.event_location_required'),
  images: yup.array().of(
    yup.object().shape({
      src: yup.string().required('validation.event_image_src_required'),
      description: yup.string().max(50)
    })
  ),
  links: yup.array().of(
    yup.object().shape({
      url: yup.string().required('validation.event_link_url_required'),
      description: yup.string().max(50)
    })
  )
})

export const findEventValidator = yup.object().shape({
  id: yup.string().required('validation.event_id_required')
})

export const updateEventValidator = yup.object().shape({
  id: yup.string().required('validation.event_id_required'),
  title: yup.string().required('validation.event_title_required'),
  description: yup.string().required('validation.event_description_required'),
  objective: yup.string().required('validation.event_objective_required'),
  contactDetails: yup.string().max(300),
  startDate: yup.date().required('validation.event_start_date_required'),
  endDate: yup.date().required('validation.event_end_date_required'),
  location: yup.string().required('validation.event_location_required')
})

export const changeStatusEventValidator = yup.object().shape({
  id: yup.string().required('validation.event_id_required'),
  status: yup
    .string()
    .required('validation.event_status_required')
    .oneOf(Event.allStatus, 'validation.invalid_status')
})
