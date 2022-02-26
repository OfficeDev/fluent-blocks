import { z } from 'zod'

export const codeProps = z.object({
  code: z.string(),
})
