import { z } from 'zod'
import { InlineContent, inlineSequence } from '../inlines'
import { makeStyles } from '@fluentui/react-components'
import { rem } from '../lib'

export const paragraphProps = z.object({
  paragraph: inlineSequence,
})

export type ParagraphProps = z.infer<typeof paragraphProps>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isParagraph(o: any): o is ParagraphProps {
  return 'paragraph' in o
}

export const useParagraphStyles = makeStyles({
  root: {
    maxWidth: rem(432),
    lineHeight: 20 / 14,
    marginInlineStart: 'auto',
    marginInlineEnd: 'auto',
    marginBlockStart: rem(4),
    marginBlockEnd: rem(4),
  },
  heading: (theme) => ({
    color: theme.alias.color.neutral.neutralForeground1,
    fontSize: 'inherit',
    fontWeight: 600,
    marginBlockStart: rem(24),
  }),
  h1: {
    fontSize: rem(18),
    lineHeight: 24 / 18,
    fontWeight: 700,
  },
})

export const Paragraph = (props: ParagraphProps) => {
  const { paragraph } = paragraphProps.parse(props)
  const styles = useParagraphStyles()
  return (
    <p className={styles.root}>
      <InlineContent inlines={paragraph} />
    </p>
  )
}
