import dayjs from 'dayjs'
import removeMd from 'remove-markdown'

import { isKey } from './check'

export const markdownToTxt = (target: string, textNumber: number) => {
  return removeMd(target.substring(0, textNumber)).replace(/\n/g, '')
}

export const formatDate = (time: number) => {
  return dayjs(time).tz().format('YYYY-MM-DD')
}

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
