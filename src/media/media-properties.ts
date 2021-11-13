import { z } from 'zod'

export const mediaProps = z.object({
  label: z.string().optional(),
})
