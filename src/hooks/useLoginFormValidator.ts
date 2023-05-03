import { useState } from 'react'
import { ErrorsType, FormLoginType } from '@utils/type'
import { emailValidator, passwordValidator } from '@utils/validator'

const touchErrors = (errors: ErrorsType) => {
  return Object.entries(errors).reduce((acc: any, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    }
    return acc
  }, {})
}
export const useLoginFormValidator = (form: FormLoginType) => {
  const [errors, setErrors] = useState<ErrorsType>({
    email: {
      dirty: false,
      error: false,
      message: '',
    },
    password: {
      dirty: false,
      error: false,
      message: '',
    },
  })

  const validateForm = ({
    form,
    field,
    errors,
    forceTouchErrors = false,
  }: {
    form: FormLoginType
    field?: string
    errors: ErrorsType
    forceTouchErrors?: boolean
  }) => {
    let isValid = true

    // Create a deep copy of the errors
    let nextErrors: ErrorsType = JSON.parse(JSON.stringify(errors))

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors)
    }
    if (nextErrors.email.dirty && (field ? field === 'email' : true)) {
      const emailMessage = emailValidator(form.email)
      nextErrors.email.error = !!emailMessage
      nextErrors.email.message = emailMessage
      if (!!emailMessage) {
        isValid = false
      }
    }

    if (nextErrors.password.dirty && (field ? field === 'password' : true)) {
      const passwordMessage = passwordValidator(form.password)
      nextErrors.password.error = !!passwordMessage
      nextErrors.password.message = passwordMessage
      if (!!passwordMessage) {
        isValid = false
      }
    }

    setErrors(nextErrors)

    return {
      isValid,
      errors: nextErrors,
    }
  }

  const onBlurField = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name
    const fieldError = errors[field]
    if (fieldError.dirty) {
      return
    }

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    }

    validateForm({ form, field, errors: updatedErrors })
  }

  return {
    validateForm,
    onBlurField,
    errors,
  }
}
