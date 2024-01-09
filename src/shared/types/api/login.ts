import { User } from '@/db/entity/User'

export type UserInfo = Pick<User, 'avatar' | 'isAdmin' | 'userName'>
