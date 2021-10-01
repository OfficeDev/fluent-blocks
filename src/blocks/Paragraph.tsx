import { z } from 'zod'
import { InlineContent, inlineSequence } from '../inlines'
import { makeStyles } from '@fluentui/react-components'
import { rem } from '../lib'

export const paragraphProps = z.object({
  paragraph: inlineSequence,
})

export type ParagraphProps = z.infer<typeof paragraphProps>

export function isParagraph(o: any): o is ParagraphProps {
  return 'paragraph' in o
}

const fontSizeLevel = (level: number) => rem(14 * Math.pow(1.25, level - 1))

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
    lineHeight: 24 / 18,
  }),
  h1: {
    fontSize: fontSizeLevel(3),
    fontWeight: 700,
  },
  h2: {
    fontSize: fontSizeLevel(2),
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
