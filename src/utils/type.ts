export interface IPartnerProps {
    path: string
    icon: string
    name?: string
  }
  export interface FormRegisterType {
    username: string
    email: string
    password: string
    confirmPassword: string
  }
  
  export interface FormForgotPasswordType {
    email: string
    verifyCode: string
    password: string
    confirmPassword: string
  }
  
  export interface FormLoginType {
    email: string
    password: string
  }
  
  export interface ErrorsType {
    [key: string]: {
      dirty: boolean
      error: boolean
      message: string
    }
  }
  