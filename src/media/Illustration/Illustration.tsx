import { z } from 'zod'
import { ReactElement } from 'react'

import { propsElementUnion } from '../../lib'

import dfault from './Default'
import error from './Error'
import empty from './Empty'
import hello from './Hello'
import thanks from './Thanks'

import { ThemedImage } from '../ThemedImage/ThemedImage'
import { mediaProps } from '../media-properties'

export const illustrationProps = mediaProps.merge(
  z.object({
    illustration: z.union([
      z.literal('default'),
      z.literal('empty'),
      z.literal('error'),
      z.literal('hello'),
      z.literal('thanks'),
    ]),
  })
)
export type IllustrationProps = z.infer<typeof illustrationProps>

const illustrations = { default: dfault, thanks, hello, empty, error }

export function Illustration(props: IllustrationProps) {
  const { illustration } = props
  const image = illustrations[illustration] ?? illustrations.error
  return <ThemedImage {...props} {...image} />
}

function isIllustrationProps(o: any): o is IllustrationProps {
  return 'illustration' in o
}

function isIllustrationElement(
  o: any
): o is ReactElement<IllustrationProps, typeof Illustration> {
  return o?.type === Illustration
}

export const illustrationPropsOrElement = propsElementUnion<
  typeof illustrationProps,
  typeof Illustration
>(illustrationProps)
export type IllustrationPropsOrElement = z.infer<
  typeof illustrationPropsOrElement
>

export function renderIfIllustration(o: any) {
  return isIllustrationProps(o) ? (
    <Illustration {...o} />
  ) : isIllustrationElement(o) ? (
    o
  ) : null
}
