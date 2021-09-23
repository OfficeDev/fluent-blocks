import { randomString } from './random'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const keyMap = new Map<any, string>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const key = (v: any) => {
  const existingKey = keyMap.get(v)
  if (existingKey) {return existingKey}
  const newKey = randomString()
  keyMap.set(v, newKey)
  return newKey
}
