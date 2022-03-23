import { z } from 'zod'

export const textProps = z.object({
  text: z.string(),
  variant: z
    .union([
      z.literal('normal'),
      z.literal('emphasized'),
      z.literal('strong'),
      z.literal('highlighted'),
      z.literal('code'),
    ])
    .optional(),
})
export type ZTextProps = typeof textProps
