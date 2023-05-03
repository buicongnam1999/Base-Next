import { BUCKET } from '.'
import { Basics } from './basics'

// activate
export interface IActiveCodeInput {
  email: string
  verificationCode: string
}
export interface IverficationExtra {
  redirect: string
  promotionCode: string
  email: string
}

export interface IUserPayload {
  id?: string
  email: string
  username: string
  emailVerified?: boolean
  socialProviderType?: string
  socialUserId?: string
  externalUserId?: string
  firstName?: string
  lastName?: string
  nickname?: string
  picture?: string
  gender?: number
  birthdate?: string
  createdAt?: string
}

export interface IActivateUserPayload {
  user?: IUserPayload
  accessToken: string
  refreshToken: string
  extra?: IverficationExtra
}

// authenticate
export interface IAuthenticateInput {
  email: string
  password: string
}

export interface IAuthenticatePayload {
  user: IUserPayload
  accessToken: string
  refreshToken: string
}
// createImageUploadRequest
export interface ICreateImageUploadRequestInput {
  filename: string
}

export interface ICreateImageUploadPayload {
  url: string
}

// forgot password request

export interface IUserForgotPasswordRequestInput {
  email: string
}

export interface IRequestPasswordResetPayLoad {
  requestPasswordReset: IUserPayload
}

// verifyCodePasswordReset

export interface IVerifyCodePasswordResetInput {
  email: string
  verificationCode: string
}

export interface IDeleteResumePhotoInput {
  id: string
}

export interface IForgotPasswordInput {
  email: string
  newPassword: string
  confirmPassword: string
}

// signup
export interface ISignUpInput {
  username: string
  email: string
  password: string
}

export interface ISignUpPayload {
  user: IUserPayload
}


export interface IResetPasswordPayload {
  id: string
  username: string
  email: string
  emailVerified: boolean
  socialProviderType: number
  socialUserId: string
  externalUserId: string
  firstName: string
  lastName: string
  nickname: string
  picture: string
  gender: number
  birthdate: string
  createdAt: string
}
// update photo
export interface IUpdateResumePhotoRequestInput {
  id: string
  filename: string
}
// upload image

export interface IUploadImageInput {
  filename: string
  bucket: BUCKET
}

// Recruitment
export interface IcreateRecruitmentInput {
  recruitmentId: string
  resumeId: string
}
