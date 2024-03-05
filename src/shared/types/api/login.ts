export interface User {
  avatar: string
  createAt: number
  identityType: string
  isAdmin: boolean
  password: string
  userName: string
}

export type UserInfo = Pick<User, 'avatar' | 'isAdmin' | 'userName'>
