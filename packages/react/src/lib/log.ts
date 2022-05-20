export function warn(m: string) {
  return function warnMessage(p: any) {
    console.warn(m, p)
    return null
  }
}
