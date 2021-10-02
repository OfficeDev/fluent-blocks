export const warn = (m: string) => (p: any) => {
  console.warn(m, p)
  return null
}
