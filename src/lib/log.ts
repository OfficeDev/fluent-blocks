// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const warn = (m: string) => (p: any) => {
  console.warn(m, p)
  return null
}
