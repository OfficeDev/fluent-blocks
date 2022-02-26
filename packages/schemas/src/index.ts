import { ZodTypeAny } from 'zod'

export * from './blocks'
export * from './exemplars'
export * from './inlines'
export * from './inputs'
export * from './media'
export * from './lib/actions'
export * from './lib/themes'

import blocks from './blocks/schemas'
import exemplars from './exemplars/schemas'
import inlines from './inlines/schemas'
import inputs from './inputs/schemas'
import media from './media/schemas'
import lib from './lib/schemas'

export const schemas: Record<string, ZodTypeAny> = {
  ...blocks,
  ...exemplars,
  ...inlines,
  ...inputs,
  ...media,
  ...lib,
}
