import { z } from 'zod'
import { Illustration } from '../Illustration'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import {
  themedImageProps,
  illustrationName,
  isIllustrationName,
  isThemedImageProps,
} from '../Illustration/models'
import { Heading } from '../Heading/Heading'
import { Paragraph } from '../Paragraph/Paragraph'
import { escaped, renderIfEscape, rem } from '../../lib'
import { inlineSequence } from '../../inlines'
import { Button, buttonProps } from '../../inputs/Button/Button'

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
  illustration: z.union([illustrationName, themedImageProps]).optional(),
  title: inlineSequence,
  description: inlineSequence.optional(),
  actions: escaped(actionsBlockProps).optional(),
  viewportHeight: z.boolean().optional(),
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
  const { illustration, title, description, actions, viewportHeight } = {
    viewportHeight: true,
    ...props,
  }
  const styles = useBigMessageStyles()
  return (
    <div
      className={
        viewportHeight ? cx(styles.root, styles.viewportHeight) : styles.root
      }
    >
      <div className={styles.container}>
        {!!illustration ? (
          isIllustrationName(illustration) ? (
            <Illustration name={illustration} />
          ) : isThemedImageProps(illustration) ? (
            <Illustration {...illustration} />
          ) : (
            <Illustration name="error" />
          )
        ) : null}
        {!!title && (renderIfEscape(title) || <Heading paragraph={title} />)}
        {!!description &&
          (renderIfEscape(description) || (
            <Paragraph paragraph={description} />
          ))}
        {!!actions &&
          (renderIfEscape(actions) || <ActionsBlock {...actions} />)}
      </div>
    </div>
  )
}
