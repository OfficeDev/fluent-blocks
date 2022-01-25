import { z } from 'zod'

export const layoutVariant = z.union([z.literal('grid'), z.literal('flex')])
export type LayoutVariant = z.infer<typeof layoutVariant>
