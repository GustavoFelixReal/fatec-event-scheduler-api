import * as yup from 'yup'

export const registerUserValidator = yup.object().shape({
  name: yup.string().required('validation.name_required'),
  username: yup.string().required('validation.username_required'),
  email: yup
    .string()
    .email('validation.invalid_email')
    .required('validation.email_required'),
  password: yup
    .string()
    .required('validation.password_required')
    .min(6, 'validation.password_too_short')
    .max(180, 'validation.password_too_long'),
  confirmPassword: yup
    .string()
    .required('validation.confirm_password_required')
    .oneOf([yup.ref('password'), null], 'validation.confirm_password_required')
})
