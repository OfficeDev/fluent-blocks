import { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { z, ZodObject } from 'zod'

export const actionPayload = z.object({
  type: z.string(),
  actionId: z.string(),
})
export type ActionPayload = z.infer<typeof actionPayload>
export type ActionEvent = CustomEvent<ActionPayload>

export function actionHandler<P extends ZodObject<any>>(payload: P) {
  return z.function().args(payload).returns(z.void())
}

export function emit<E extends HTMLElement, P extends ActionPayload>(
  $el: E,
  payload: P
): void {
  $el.dispatchEvent(
    new CustomEvent('action', { detail: payload, bubbles: true })
  )
}

export function CaptureActions({
  onAction,
  children,
}: PropsWithChildren<{ onAction?: (payload: ActionPayload) => void }>) {
  const $el = useRef<HTMLDivElement | null>(null)

  const onActionCb = useCallback(
    (event: ActionEvent) => onAction && onAction(event.detail),
    [onAction]
  ) as EventListener

  useEffect(() => {
    $el.current?.addEventListener('action', onActionCb)
    return () => $el.current?.removeEventListener('action', onActionCb)
  }, [$el.current])

  return <div ref={$el}>{children}</div>
}
