import { createElement } from 'react'
import { z } from 'zod'
import { InlineContent } from './InlineContent'
import { mergeClasses as cx } from '@fluentui/react-components'
import { useParagraphStyles, paragraphProps } from './Paragraph'

export const headingProps = paragraphProps.extend({
  level: z.number().max(6).min(1).default(6),
})

export type HeadingProps = z.infer<typeof headingProps>

export const Heading = (props: HeadingProps) => {
  const { paragraph, level } = headingProps.parse(props)
  const content = <InlineContent inlines={paragraph} />
  const styles = useParagraphStyles()
  const elementName = level >= 1 && level <= 5 ? `h${level}` : 'h6'
  return createElement(
    elementName,
    {
      className:
        level === 1
          ? cx(styles.root, styles.heading, styles.h1)
          : cx(styles.root, styles.heading),
    },
    content
  )
}
