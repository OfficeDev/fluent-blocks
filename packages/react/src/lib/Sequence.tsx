import { cloneElement, ReactElement, Attributes } from 'react'

import { key } from './keys'

type FCElementConstructor<P> = (props: P) => ReactElement<P> | null

export function Sequence<P, S = {}>(
  entities: P[] | undefined,
  Entity: FCElementConstructor<P & Partial<S>>,
  sharedProps?: Record<string, any>,
  uniqueProps?: Record<string, any>[]
) {
  return (
    <>
      {(entities ?? []).map((o: P, index) => {
        const contentElement = Entity({
          ...o,
          ...sharedProps,
          ...(uniqueProps && uniqueProps[index]),
        })
        return (
          contentElement &&
          cloneElement(contentElement, {
            key: key(o),
          } as Partial<P & S> & Attributes)
        )
      })}
    </>
  )
}
