export const getCustomSyntax = (target: string, delimiter: string) => {
  const patternRule = '\\' + delimiter
  const pattern = new RegExp(
    '^' + patternRule + '(.*?)' + patternRule + '$',
    'g'
  )
  var match = pattern.exec(target)
  if (!match) return undefined

  return match[1]
}
