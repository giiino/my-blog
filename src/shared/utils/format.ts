import { isKey } from './check'

export const serializeData = <T>(target: T) => {
  return JSON.parse(JSON.stringify(target))
}

export const removeAttrsFromObject = <T extends Object>({
  target,
  removeAttrs
}: {
  target: T
  removeAttrs: Array<keyof T>
}): Partial<T> => {
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
