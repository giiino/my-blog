import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { Post } from './entity/Post'
import { User } from './entity/User'

const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGODB_URL,
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities: [User, Post]
})

AppDataSource.initialize()
  .then(() => {
    console.log(`Data Source has been initialized`)
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err)
  })

export const getDataSource = async (): Promise<DataSource> => {
  if (process.env.NODE_ENV !== 'development') {
    return Promise.resolve(AppDataSource)
  }

  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy()
    return AppDataSource.initialize()
  }
  return AppDataSource.initialize()
}
