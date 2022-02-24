import { z } from 'zod'

export const actionPayload = z.object({
  type: z.string(),
  actionId: z.string(),
})

export const anyActionPayload = actionPayload.passthrough()
