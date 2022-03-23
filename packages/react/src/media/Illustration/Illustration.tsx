import { ReactElement } from 'react'
import { IllustrationProps as NaturalIllustrationProps } from '@fluent-blocks/schemas'

import dfault from './variants/Default'
import error from './variants/Error'
import empty from './variants/Empty'
import hello from './variants/Hello'
import thanks from './variants/Thanks'

import { ThemedImage } from '../ThemedImage/ThemedImage'

export type IllustrationProps = NaturalIllustrationProps

const illustrations = { default: dfault, thanks, hello, empty, error }

export function Illustration(props: IllustrationProps) {
  const { illustration } = props
  const image = illustrations[illustration] ?? illustrations.error
  return <ThemedImage {...props} {...image} />
}

function isIllustrationProps(o: any): o is IllustrationProps {
  return 'illustration' in o
}

function isIllustrationElement(o: any): o is IllustrationElement {
  return o?.type === Illustration
}

export type IllustrationElement = ReactElement<
  IllustrationProps,
  typeof Illustration
>
export type IllustrationPropsOrElement = IllustrationProps | IllustrationElement

export function renderIfIllustration(o: any) {
  return isIllustrationProps(o) ? (
    <Illustration {...o} />
  ) : isIllustrationElement(o) ? (
    o
  ) : null
}
