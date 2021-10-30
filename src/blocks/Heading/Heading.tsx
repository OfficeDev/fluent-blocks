import { createElement } from 'react'
import { z } from 'zod'
import { InlineContent } from '../../inlines'
import { mergeClasses as cx } from '@fluentui/react-components'
import { useParagraphStyles, paragraphProps } from '../Paragraph/Paragraph'

export const headingProps = paragraphProps.extend({
  level: z.number().max(6).min(1).default(6).optional(),
})
export type HeadingProps = z.infer<typeof headingProps>

export const Heading = (props: HeadingProps) => {
  const { paragraph, level } = { level: 6, ...props }
  const content = <InlineContent inlines={paragraph} />
  const styles = useParagraphStyles()
  const elementName = level >= 1 && level <= 5 ? `h${level}` : 'h6'
  return createElement(
    elementName,
    {
      className:
        level === 1
          ? cx(styles.root, styles.heading, styles.h1)
          : level === 2
          ? cx(styles.root, styles.heading, styles.h2)
          : level === 3
          ? cx(styles.root, styles.heading, styles.h3)
          : cx(styles.root, styles.heading),
    },
    content
  ) as JSX.Element
}
