import { z } from 'zod'
import { ReactElement, cloneElement } from 'react'

import {
  propsElementUnion,
  themedMap,
  useFluentPatternsContext,
} from '../../lib'
import { mediaProps } from '../media-properties'
import { makeStyles } from '@fluentui/react-components'

const imageElement = z
  .object({ type: z.union([z.literal('img'), z.literal('svg')]) })
  .catchall(z.any())
  .transform((el) => el as ReactElement<any, 'img' | 'svg'>)

const image = z.union([z.string().url(), imageElement])

export const themedImageProps = mediaProps.merge(themedMap<typeof image>(image))
export type ThemedImageProps = z.infer<typeof themedImageProps>

const useThemedImageStyles = makeStyles({
  img: { maxWidth: '100%', height: 'auto' },
})

export function ThemedImage(props: ThemedImageProps) {
  const { theme } = useFluentPatternsContext()
  const value = props[theme]
  const themedImageStyles = useThemedImageStyles()
  return typeof value == 'string' ? (
    <img
      {...(props.label ? { alt: props.label } : { role: 'none' })}
      src={value}
      className={themedImageStyles.img}
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

function isThemedImageProps(o: any): o is ThemedImageProps {
  return 'light' in o && 'dark' in o && 'high-contrast' in o
}

function isThemedImageElement(
  o: any
): o is ReactElement<ThemedImageProps, typeof ThemedImage> {
  return o?.type === ThemedImage
}

export const themedImagePropsOrElement = propsElementUnion<
  typeof themedImageProps,
  typeof ThemedImage
>(themedImageProps)
export type ThemedImagePropsOrElement = z.infer<
  typeof themedImagePropsOrElement
>

export function renderIfThemedImage(o: any) {
  return isThemedImageProps(o) ? (
    <ThemedImage {...o} />
  ) : isThemedImageElement(o) ? (
    o
  ) : null
}
