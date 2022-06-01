import { ReactElement } from 'react'

import { BigMessageProps as NaturalBigMessageProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import { InlineSequenceOrString } from '../../inlines'
import { ButtonProps } from '../../inputs'
import {
  EscapeElement,
  isEscapeElement,
  rem,
  renderIfEscape,
  sx,
} from '../../lib'
import { MediaEntity } from '../../media'
import { Figure } from '../Figure/Figure'
import { Heading } from '../Heading/Heading'
import { Paragraph } from '../Paragraph/Paragraph'
import { ShortInputSequence, ShortInputs } from '../ShortInputs/ShortInputs'

type BigMessageActionProps = Omit<ButtonProps['button'], 'variant' | 'type'>

type ActionsBlockProps = {
  primary?: BigMessageActionProps | EscapeElement
  secondary?: BigMessageActionProps | EscapeElement
  tertiary?: BigMessageActionProps | EscapeElement
}

export interface BigMessageProps
  extends Omit<NaturalBigMessageProps, 'message'> {
  message: Omit<
    NaturalBigMessageProps['message'],
    'media' | 'title' | 'abstract' | 'actions'
  > & {
    title: InlineSequenceOrString
    media?: MediaEntity
    abstract?: InlineSequenceOrString
    actions?: ActionsBlockProps | EscapeElement
  }
}

const useBigMessageStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewportHeight: {
    minHeight: '100vh',
  },
  container: {
    ...sx.margin(rem(20)),
    maxWidth: rem(510),
    minWidth: rem(280),
    textAlign: 'center',
  },
})

function ActionsBlock({ primary, secondary, tertiary }: ActionsBlockProps) {
  const inputs: ShortInputSequence = []
  if (primary) {
    isEscapeElement(primary)
      ? inputs.push(primary)
      : inputs.push({
          button: {
            variant: 'primary',
            ...(primary as BigMessageActionProps),
          },
        })
  }
  if (secondary) {
    isEscapeElement(secondary)
      ? inputs.push(secondary)
      : inputs.push({ button: secondary as BigMessageActionProps })
  }
  if (tertiary) {
    isEscapeElement(tertiary)
      ? inputs.push(tertiary)
      : inputs.push({
          button: {
            variant: 'subtle',
            ...(tertiary as BigMessageActionProps),
          },
        })
  }
  return <ShortInputs variant="narrow-block" inputs={inputs} />
}

export function BigMessage(props: BigMessageProps) {
  const {
    message: { media, title, abstract, actions, viewportHeight = true },
    level = 2,
  } = props
  const styles = useBigMessageStyles()
  return (
    <div
      className={
        viewportHeight ? cx(styles.root, styles.viewportHeight) : styles.root
      }
    >
      <div className={styles.container}>
        {media && <Figure media={media} variant="narrow" />}
        <Heading level={level} paragraph={title} />
        {abstract && <Paragraph paragraph={abstract} />}
        {actions && (renderIfEscape(actions) || <ActionsBlock {...actions} />)}
      </div>
    </div>
  )
}

export type BigMessageElement = ReactElement<BigMessageProps, typeof BigMessage>
export type BigMessagePropsOrElement = BigMessageProps | BigMessageElement

function isBigMessageProps(o: any): o is BigMessageProps {
  return 'message' in o && 'variant' in o.message && o.message.variant === 'big'
}

function isBigMessageElement(o: any): o is BigMessageElement {
  return o?.type === BigMessage
}

export function renderIfBigMessage(o: any) {
  return isBigMessageProps(o) ? (
    <BigMessage {...o} />
  ) : isBigMessageElement(o) ? (
    o
  ) : null
}
