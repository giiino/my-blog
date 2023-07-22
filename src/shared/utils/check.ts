export function isKey<T extends Object>(x: T, k: PropertyKey): k is keyof T {
  return k in x
}
