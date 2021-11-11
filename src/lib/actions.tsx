import {
  createElement,
  useCallback,
  useEffect,
  useRef,
  ComponentClass,
  FunctionComponent,
  PropsWithChildren,
  RefAttributes,
} from 'react'
import { z, ZodObject } from 'zod'

export const actionPayload = z.object({
  type: z.string(),
  actionId: z.string(),
})
export type ActionPayload = z.infer<typeof actionPayload>

export type ActionEvent = CustomEvent<ActionPayload>

export type ActionHandler = (payload: ActionPayload) => void

export type PropsWithActionHandler<P> = P & { onAction?: ActionHandler }

export function withActionHandler<P extends ZodObject<any>>(payload: P) {
  return { onAction: z.function().args(payload).returns(z.void()).optional() }
}

export function emit<E extends HTMLElement, P extends ActionPayload>(
  $el: E,
  payload: P
): void {
  $el.dispatchEvent(
    new CustomEvent('action', { detail: payload, bubbles: true })
  )
}

type ActionsListenerComponent =
  | FunctionComponent<PropsWithChildren<RefAttributes<{}>>>
  | ComponentClass<PropsWithChildren<RefAttributes<{}>>>
  | string

export function ActionsListener({
  onAction,
  children,
  as,
}: PropsWithChildren<
  PropsWithActionHandler<{ as?: ActionsListenerComponent }>
>) {
  const $el = useRef<HTMLDivElement | null>(null)

  const onActionCb = useCallback(
    (event: ActionEvent) => onAction && onAction(event.detail),
    [onAction]
  ) as EventListener

  useEffect(() => {
    $el.current?.addEventListener('action', onActionCb)
    return () => $el.current?.removeEventListener('action', onActionCb)
  }, [$el.current])

  return createElement(as || 'div', { ref: $el, children })
}
