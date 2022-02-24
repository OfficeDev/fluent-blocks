import noop from 'lodash/noop'
import { createContext } from 'react'
import { z, AnyZodObject } from 'zod'
import { actionPayload } from '@fluentui/blocks-schemas'

export type ActionPayload = z.infer<typeof actionPayload>

export type ActionHandler<A = ActionPayload> = (payload: A) => void

export type PropsWithActionHandler<P extends {}, A> = P & {
  onAction?: ActionHandler<A>
}

export function withActionHandler<P extends AnyZodObject>(payload: P) {
  return { onAction: z.function().args(payload).returns(z.void()).optional() }
}

export function actionHandler<P extends AnyZodObject>(payload: P) {
  return z.object(withActionHandler<P>(payload))
}

const ActionsContext = createContext({
  onAction: noop,
})
