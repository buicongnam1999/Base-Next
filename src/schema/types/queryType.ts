import { CONTRACT, EXPERIENCE, FIELD_ACTIVITY, JOB, RANK, SALARY } from './index'

export interface IJobsInput {
  address?: string
  contract?: CONTRACT
  experience?: EXPERIENCE
  job?: JOB
  name?: string
  rank?: RANK
  salary?: keyof SALARY
  fieldActivity: FIELD_ACTIVITY
  offset?: number
  limit?: number
}
