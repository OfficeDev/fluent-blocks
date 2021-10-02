import { z } from 'zod'
import { InlineContent, inlineSequence } from '../inlines'
import { makeStyles } from '@fluentui/react-components'
import { propsElementUnion, rem } from '../lib'
import { ReactElement } from 'react'

export const paragraphProps = z.object({
  paragraph: inlineSequence,
})
export type ParagraphProps = z.infer<typeof paragraphProps>

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
    fontSize: rem(24),
    lineHeight: 32 / 24,
  },
  h2: {
    fontSize: rem(20),
    lineHeight: 28 / 20,
  },
  h3: {
    fontSize: rem(16),
    lineHeight: 22 / 16,
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

function isParagraphProps(p: any): p is ParagraphProps {
  return 'paragraph' in p
}

function isParagraphElement(
  p: any
): p is ReactElement<ParagraphProps, typeof Paragraph> {
  return p?.type === Paragraph
}

export const paragraphPropsOrElement = propsElementUnion<
  typeof paragraphProps,
  ParagraphProps,
  typeof Paragraph
>(paragraphProps)
export type ParagraphPropsOrElement = z.infer<typeof paragraphPropsOrElement>

export function renderIfParagraph(p: any) {
  return isParagraphProps(p) ? (
    <Paragraph {...p} />
  ) : isParagraphElement(p) ? (
    p
  ) : null
}
