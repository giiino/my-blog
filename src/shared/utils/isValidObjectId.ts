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
