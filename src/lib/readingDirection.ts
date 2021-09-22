import { z } from 'zod'

export const dir = z.union([z.literal('ltr'), z.literal('rtl')])

export type Dir = z.infer<typeof dir>
