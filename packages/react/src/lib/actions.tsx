import noop from 'lodash/noop'
import { createContext } from 'react'

import { ActionPayload as NaturalActionPayload } from '@fluent-blocks/schemas'

export type ActionPayload = NaturalActionPayload

export type ActionHandler<A extends ActionPayload> = (payload: A) => void

export type UpdatingActionHandler<A extends ActionPayload> = (
  payload: A
) => string

export type WithActionHandler<A extends ActionPayload> = {
  onAction?: ActionHandler<A>
}

export type WithUpdatingActionHandler<A extends ActionPayload> = {
  onAction?: UpdatingActionHandler<A>
}

const ActionsContext = createContext({
  onAction: noop,
})
