import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import { escaped, renderIfEscape, rem, propsElementUnion } from '../../lib'
import { mediaEntity } from '../../media'
import { inlineSequence } from '../../inlines'
import { ButtonProps, buttonProps } from '../../inputs'

import { Figure } from '../Figure/Figure'
import { Heading, headingLevel } from '../Heading/Heading'
import { Paragraph } from '../Paragraph/Paragraph'
import { ShortInputs } from '../ShortInputs/ShortInputs'

const actionProps = buttonProps.omit({ variant: true, type: true })

const actionsBlockProps = z.object({
  primary: actionProps.optional(),
  secondary: actionProps.optional(),
  tertiary: actionProps.optional(),
})
type ActionsBlockProps = z.infer<typeof actionsBlockProps>

export const bigMessageProps = z.object({
  message: z.object({
    variant: z.literal('big'),
    media: mediaEntity.optional(),
    title: inlineSequence,
    abstract: inlineSequence.optional(),
    actions: escaped(actionsBlockProps).optional(),
    viewportHeight: z.boolean().optional(),
  }),
  level: headingLevel.default(2).optional(),
})

export type BigMessageProps = z.infer<typeof bigMessageProps>

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
    margin: rem(20),
    maxWidth: rem(510),
    minWidth: rem(280),
    textAlign: 'center',
  },
})

function ActionsBlock({ primary, secondary, tertiary }: ActionsBlockProps) {
  const inputs: ButtonProps[] = []
  primary && inputs.push({ type: 'button', variant: 'primary', ...primary })
  secondary && inputs.push({ type: 'button', ...secondary })
  tertiary && inputs.push({ type: 'button', variant: 'subtle', ...tertiary })
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

function isBigMessageProps(o: any): o is BigMessageProps {
  return 'message' in o && 'variant' in o.message && o.message.variant === 'big'
}

function isBigMessageElement(
  o: any
): o is ReactElement<BigMessageProps, typeof BigMessage> {
  return o?.type === BigMessage
}

export const bigMessagePropsOrElement = propsElementUnion<
  typeof bigMessageProps,
  typeof BigMessage
>(bigMessageProps)
export type BigMessagePropsOrElement = z.infer<typeof bigMessagePropsOrElement>

export function renderIfBigMessage(o: any) {
  return isBigMessageProps(o) ? (
    <BigMessage {...o} />
  ) : isBigMessageElement(o) ? (
    o
  ) : null
}
