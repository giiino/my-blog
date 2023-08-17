import dayjs from 'dayjs'

import { isKey } from './check'

export const formatDate = (time: number) => dayjs(time).format('YYYY-MM-DD')

export const serializeData = <T>(target: T) => {
  try {
    return JSON.parse(JSON.stringify(target))
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const exclude = <T extends Object>(
  target: T,
  removeAttrs: Array<keyof T>
): Partial<T> => {
  return Object.keys(target).reduce((acc, key) => {
    if (!isKey(target, key)) {
      return acc
    }
    if (!removeAttrs.includes(key)) {
      acc[key] = target[key]
    }
    return acc
  }, {} as T)
}

export const pick = <T extends Object>(
  target: T,
  pickedAttrs: Array<keyof T>
): Partial<T> => {
  return Object.keys(target).reduce((acc, key) => {
    if (!isKey(target, key)) {
      return acc
    }
    if (pickedAttrs.includes(key)) {
      acc[key] = target[key]
    }
    return acc
  }, {} as T)
}
