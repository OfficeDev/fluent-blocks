import { z, ZodObject } from 'zod'

export const actionPayload = z.object({
  type: z.string(),
  actionId: z.string(),
})
export type ActionPayload = z.infer<typeof actionPayload>

export type ActionHandler<P = ActionPayload> = (payload: P) => void

export type PropsWithActionHandler<P> = P & { onAction?: ActionHandler }

export function withActionHandler<P extends ZodObject<any>>(payload: P) {
  return { onAction: z.function().args(payload).returns(z.void()).optional() }
}
