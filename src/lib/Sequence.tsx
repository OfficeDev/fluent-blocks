import { cloneElement, ReactElement, Attributes } from 'react'

import { key } from './keys'

type FCElementConstructor<P> = (props: P) => ReactElement<P> | null

export function Sequence<P>(
  entities: P[] | undefined,
  Entity: FCElementConstructor<P>,
  props?: Record<string, any>
) {
  return (
    <>
      {(entities ?? []).map((o: P) => {
        const contentElement = Entity(o)
        return (
          contentElement &&
          cloneElement(contentElement, { key: key(o), ...props } as Partial<P> &
            Attributes)
        )
      })}
    </>
  )
}
