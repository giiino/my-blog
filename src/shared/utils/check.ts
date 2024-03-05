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
