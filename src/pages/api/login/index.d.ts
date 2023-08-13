import { User } from '@/db/entity/User'

export type UserInfo = Omit<
  User,
  '_id' | 'identityType' | 'password' | 'createAt'
>
