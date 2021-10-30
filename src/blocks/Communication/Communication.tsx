import { z, ZodType, ZodTypeAny } from 'zod'
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
import {
  invalidBlock,
  escapeElement,
  renderIfEscape,
  isEscapeElement,
  rem,
} from '../../lib'
import { ActionsBlock, actionsBlockProps } from './ActionsBlock'

function escaped<T extends ZodTypeAny>(arg: T) {
  return z.union([arg, escapeElement])
}

export const variant = z.union([
  z.literal('primary'),
  z.literal('secondary'),
  z.literal('tertiary'),
])

export const communicationProps = z.object({
  illustration: z.union([illustrationName, themedImageProps]).optional(),
  title: escaped(z.string()),
  description: escaped(z.string()).optional(),
  actions: escaped(actionsBlockProps).optional(),
  viewportHeight: z.boolean().optional(),
})

export type CommunicationProps = z.infer<typeof communicationProps>

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
    width: '100%',
    textAlign: 'center',
  },
})

export function Communication(props: CommunicationProps) {
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
        {!!title &&
          (isEscapeElement(title) ? (
            renderIfEscape(title)
          ) : (
            <Heading paragraph={[{ text: title }]} />
          ))}
        {!!description &&
          (isEscapeElement(description) ? (
            renderIfEscape(description)
          ) : (
            <Paragraph paragraph={[{ text: description }]} />
          ))}
        {!!actions &&
          (isEscapeElement(actions) ? (
            renderIfEscape(actions)
          ) : (
            <ActionsBlock {...actions} />
          ))}
      </div>
    </div>
  )
}
