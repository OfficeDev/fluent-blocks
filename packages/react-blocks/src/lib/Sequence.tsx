import { cloneElement, ReactElement, Attributes } from 'react'

import { key } from './keys'

type FCElementConstructor<P> = (props: P) => ReactElement<P> | null

export function Sequence<P>(
  entities: P[] | undefined,
  Entity: FCElementConstructor<P>,
  sharedProps?: Record<string, any>,
  uniqueProps?: Record<string, any>[]
) {
  return (
    <>
      {(entities ?? []).map((o: P, index) => {
        const contentElement = Entity(o)
        return (
          contentElement &&
          cloneElement(contentElement, {
            key: key(o),
            ...sharedProps,
            ...(uniqueProps && uniqueProps[index]),
          } as Partial<P> & Attributes)
        )
      })}
    </>
  )
}
