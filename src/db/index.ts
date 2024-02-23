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

export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource)

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'development' && AppDataSource.isInitialized) {
      resolve(AppDataSource)
      return
    }
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource)
      else reject('Failed to create connection with database')
    }, delay)
  })
}
