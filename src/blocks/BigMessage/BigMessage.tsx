import { z } from 'zod'
import { Illustration } from '../Illustration'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import {
  themedImageProps,
  illustrationName,
  isIllustrationName,
  isThemedImageProps,
} from '../Illustration/models'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'
import { escaped, renderIfEscape, rem } from '../../lib'
import { ActionsBlock, actionsBlockProps } from './ActionsBlock'
import { inlineSequence } from '../../inlines'

export const variant = z.union([
  z.literal('primary'),
  z.literal('secondary'),
  z.literal('tertiary'),
])

export const bigMessageProps = z.object({
  illustration: z.union([illustrationName, themedImageProps]).optional(),
  title: inlineSequence,
  description: inlineSequence.optional(),
  actions: escaped(actionsBlockProps).optional(),
  viewportHeight: z.boolean().optional(),
})

export type BigMessageProps = z.infer<typeof bigMessageProps>

const useStyles = makeStyles({
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

export function BigMessage(props: BigMessageProps) {
  const { illustration, title, description, actions, viewportHeight } = {
    viewportHeight: true,
    ...props,
  }
  const styles = useStyles()
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
