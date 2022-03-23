import noop from 'lodash/noop'
import { createContext } from 'react'

import { ActionPayload as NaturalActionPayload } from '@fluent-blocks/schemas'

export type ActionPayload = NaturalActionPayload

export type ActionHandler<A = ActionPayload> = (payload: A) => void

export type PropsWithActionHandler<P extends {}, A> = P & {
  onAction?: ActionHandler<A>
}

const ActionsContext = createContext({
  onAction: noop,
})
