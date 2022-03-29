import { ReactElement, Suspense as ReactSuspense } from 'react'

export function renderIfSuspense(o: any) {
  return o.type === ReactSuspense ? o : null
}
