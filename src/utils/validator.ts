import { FormRegisterType } from './type'

export const usernameValidator = (username: string) => {
  if (!username) {
    return 'Họ và tên là bắt buộc'
  }
  return ''
}

export const emailValidator = (email: string) => {
  if (!email) {
    return 'Email là bắt buộc'
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return 'Định dạng email không chính xác'
  }
  return ''
}

export const passwordValidator = (password: string) => {
  if (!password) {
    return 'Mật khẩu là bắt buộc'
  } else if (password.length < 8) {
    return 'Mật khẩu phải có ít nhất 8 ký tự'
  }
  return ''
}

export const confirmPasswordValidator = (confirmPassword: string, form: FormRegisterType) => {
  if (!confirmPassword) {
    return 'Xác nhận mật khẩu là bắt buộc'
  } else if (confirmPassword.length < 8) {
    return 'Xác nhận mật khẩu phải có tối thiểu 8 ký tự'
  } else if (confirmPassword !== form.password) {
    return 'Mật khẩu không phù hợp'
  }
  return ''
}

export const verifyCodeValidator = (verifyCode: string) => {
  if (!verifyCode) {
    return 'verifyCode là bắt buộc'
  }
  return ''
}
