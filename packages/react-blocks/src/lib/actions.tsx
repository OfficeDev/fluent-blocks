import noop from 'lodash/noop'
import { createContext } from 'react'
import { z, AnyZodObject } from 'zod'

export const actionPayload = z.object({
  type: z.string(),
  actionId: z.string(),
})
export type ActionPayload = z.infer<typeof actionPayload>

export const anyActionPayload = actionPayload.passthrough()

export type ActionHandler<A = ActionPayload> = (payload: A) => void

export type PropsWithActionHandler<P extends {}, A> = P & {
  onAction?: ActionHandler<A>
}

export function withActionHandler<P extends AnyZodObject>(payload: P) {
  return { onAction: z.function().args(payload).returns(z.void()).optional() }
}

const ActionsContext = createContext({
  onAction: noop,
})
