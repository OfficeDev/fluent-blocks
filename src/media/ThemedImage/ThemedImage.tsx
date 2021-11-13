import { z } from 'zod'
import { ReactElement, cloneElement } from 'react'

import { themedMap, useFluentPatternsContext } from '../../lib'
import { mediaProps } from '../media-properties'

const imageElement = z
  .object({ type: z.union([z.literal('img'), z.literal('svg')]) })
  .catchall(z.any())
  .transform((el) => el as ReactElement<any, 'img' | 'svg'>)

const image = z.union([z.string().url(), imageElement])
type Image = z.infer<typeof image>

export const themedImageProps = mediaProps.merge(themedMap<typeof image>(image))
export type ThemedImageProps = z.infer<typeof themedImageProps>

export function ThemedImage(props: ThemedImageProps) {
  const { theme } = useFluentPatternsContext()
  const value = props[theme]
  return typeof value == 'string' ? (
    <img
      {...(props.label ? { alt: props.label } : { role: 'none' })}
      src={value}
    />
  ) : value.type === 'img' ? (
    cloneElement(value, props.label ? { alt: props.label } : { role: 'none' })
  ) : (
    cloneElement(
      value,
      props.label ? { 'aria-label': props.label } : { role: 'none' }
    )
  )
}
