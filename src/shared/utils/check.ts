export function isKey<T extends Object>(x: T, k: PropertyKey): k is keyof T {
  return k in x
}

export const isVoid = (target: any) => {
  if (Array.isArray(target)) {
    return target.length === 0
  }
  if (typeof target === 'object') {
    return Object.keys(target).every((key) => !target?.[key])
  }

  if (!target || target === '') {
    return true
  }
}

export function isValidObjectId(id: any): boolean {
  if (typeof id !== 'string') {
    return false
  }

  if (id.length !== 12 && id.length !== 24) {
    return false
  }

  const hexRegex = /^[0-9a-fA-F]+$/
  if (!hexRegex.test(id)) {
    return false
  }

  return true
}
