import { randomString } from './random'

const keyMap = new Map<any, string>()

export const key = (v: any) => {
  const existingKey = keyMap.get(v)
  if (existingKey) {
    return existingKey
  }
  const newKey = randomString()
  keyMap.set(v, newKey)
  return newKey
}
