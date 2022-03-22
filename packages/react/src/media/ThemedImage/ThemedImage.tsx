import { z } from 'zod'
import { ReactElement, cloneElement } from 'react'
import { makeStyles } from '@fluentui/react-components'
import {
  imageSrc,
  themedImageProps as naturalThemedImageProps,
} from '@fluent-blocks/schemas'

import { propsElementUnion, useFluentBlocksContext } from '../../lib'

const imageElement = z
  .object({ type: z.union([z.literal('img'), z.literal('svg')]) })
  .catchall(z.any())
  .transform((el) => el as ReactElement<any, 'img' | 'svg'>)

const image = z.union([imageSrc, imageElement])

export const themedImageProps = naturalThemedImageProps.merge(
  z.object({
    light: image,
    dark: image,
    highContrast: image,
  })
)
export type ThemedImageProps = z.infer<typeof themedImageProps>

const useThemedImageStyles = makeStyles({
  img: { maxWidth: '100%', height: 'auto' },
})

export function ThemedImage(props: ThemedImageProps) {
  const { themeName } = useFluentBlocksContext()
  const value = props[themeName]
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
  return 'light' in o && 'dark' in o && 'highContrast' in o
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
