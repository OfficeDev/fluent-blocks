import { z, ZodTypeAny } from 'zod'

export const themeName = z.union([
  z.literal('light'),
  z.literal('dark'),
  z.literal('high-contrast'),
])
