import dayjs from 'dayjs'
import removeMd from 'remove-markdown'

export const markdownToTxt = (target: string, textNumber: number) => {
  return removeMd(target.substring(0, textNumber)).replace(/\n/g, '')
}

export const formatDate = (time: number) => {
  return dayjs(time).tz().format('YYYY-MM-DD')
}

export const serialize = <T>(target: T) => {
  try {
    return JSON.parse(JSON.stringify(target))
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const exclude = <O extends Object, K extends keyof O>(
  target: O,
  keys: K[]
) => {
  return Object.fromEntries(
    Object.entries(target).filter(([key]) => !keys.includes(key as K))
  ) as Omit<O, K>
}

export const pick = <O extends Object, K extends keyof O>(
  target: O,
  keys: K[]
) => {
  return Object.fromEntries(
    Object.entries(target).filter(([key]) => {
      return keys.includes(key as K)
    })
  ) as Pick<O, K>
}
