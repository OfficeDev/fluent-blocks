import { z, ZodTypeAny } from 'zod'
import { escapeElement } from './Escape'

export function escaped<T extends ZodTypeAny>(arg: T) {
  return z.union([arg, escapeElement])
}
