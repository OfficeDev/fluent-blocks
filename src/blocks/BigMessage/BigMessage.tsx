import { z } from 'zod'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import { escaped, renderIfEscape, rem, propsElementUnion } from '../../lib'
import { mediaEntity } from '../../media'
import { inlineSequence } from '../../inlines'

import { Figure } from '../Figure/Figure'
import { Heading } from '../Heading/Heading'
import { Paragraph } from '../Paragraph/Paragraph'
import { Button, buttonProps } from '../../inputs/Button/Button'
import { ReactElement } from 'react'

const actionProps = buttonProps.omit({ variant: true, type: true })
type ActionProps = z.infer<typeof actionProps>

function isActionProps(o: any): o is ActionProps {
  return o && 'label' in o && 'actionId' in o
}

const actionsBlockProps = z.object({
  primary: actionProps.optional(),
  secondary: actionProps.optional(),
  tertiary: actionProps.optional(),
})
type ActionsBlockProps = z.infer<typeof actionsBlockProps>

export const bigMessageProps = z.object({
  message: z.object({
    variation: z.literal('big'),
    media: mediaEntity.optional(),
    title: inlineSequence,
    description: inlineSequence.optional(),
    actions: escaped(actionsBlockProps).optional(),
    viewportHeight: z.boolean().optional(),
  }),
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

const useActionBlockStyles = makeStyles({
  root: {
    maxWidth: rem(280),
    margin: `${rem(20)} auto`,
    '& button': {
      marginBlockStart: rem(4),
      marginBlockEnd: rem(4),
    },
  },
})

function ActionsBlock({ primary, secondary, tertiary }: ActionsBlockProps) {
  const styles = useActionBlockStyles()
  return (
    <div className={styles.root}>
      {isActionProps(primary) && (
        <Button {...primary} type="button" variant="primary" />
      )}
      {isActionProps(secondary) && <Button {...secondary} type="button" />}
      {isActionProps(tertiary) && (
        <Button {...tertiary} type="button" variant="subtle" />
      )}
    </div>
  )
}

export function BigMessage(props: BigMessageProps) {
  const {
    message: { media, title, description, actions, viewportHeight = true },
  } = props
  const styles = useBigMessageStyles()
  return (
    <div
      className={
        viewportHeight ? cx(styles.root, styles.viewportHeight) : styles.root
      }
    >
      <div className={styles.container}>
        {media && <Figure media={media} variation="narrow" />}
        <Heading level={3} paragraph={title} />
        {description && <Paragraph paragraph={description} />}
        {actions && (renderIfEscape(actions) || <ActionsBlock {...actions} />)}
      </div>
    </div>
  )
}

function isBigMessageProps(o: any): o is BigMessageProps {
  return (
    'message' in o && 'variation' in o.message && o.message.variation === 'big'
  )
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
