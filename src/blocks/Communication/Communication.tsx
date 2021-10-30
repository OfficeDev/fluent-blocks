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
} from '../../lib'

function escaped<T extends ZodTypeAny>(arg: T) {
  return z.union([arg, escapeElement])
}

function oneOrMany<T extends ZodTypeAny>(arg: T) {
  return z.union([arg, z.array(arg)])
}

export const variant = z.union([
  z.literal('primary'),
  z.literal('secondary'),
  z.literal('tertiary'),
])

export const action = z.object({
  label: z.string(),
  variant,
})

export const actionsBlock = z.object({
  primary: action.optional(),
  secondary: action.optional(),
  tertiary: action.optional(),
})

export const communicationProps = z.object({
  illustration: z.union([illustrationName, themedImageProps]).optional(),
  title: escaped(z.string()),
  description: escaped(z.string()).optional(),
  actions: escaped(actionsBlock).optional(),
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
    margin: '20px',
    maxWidth: '510px',
    minWidth: '280px',
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
      </div>
    </div>
  )
}
