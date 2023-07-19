import { getDataSource } from '@/db'
import { User } from '@/db/entity/User'

export async function getUserInfo() {
  const AppDataSource = await getDataSource()
  const userRepo = AppDataSource.getRepository(User)
  const data = await userRepo.find()
  return data
}
