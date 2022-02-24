import { z } from 'zod'
import * as ex from '../lib/extensible-types'

export const textVariant = ex.union([
  z.literal('normal'),
  z.literal('emphasized'),
  z.literal('strong'),
  z.literal('highlighted'),
  z.literal('code'),
])

export const textProps = ex.object({
  text: z.string(),
  variant: textVariant().optional(),
})
