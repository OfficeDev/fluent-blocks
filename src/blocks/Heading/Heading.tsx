import { z } from 'zod'
import { createElement } from 'react'
import { mergeClasses as cx } from '@fluentui/react-components'

import { InlineContent } from '../../inlines'
import { useCommonStyles } from '../../lib'

import { useParagraphStyles, paragraphProps } from '../Paragraph/Paragraph'

export const headingProps = paragraphProps.extend({
  level: z.number().max(6).min(1).default(6),
})
export type HeadingProps = z.infer<typeof headingProps>

export const Heading = (props: HeadingProps) => {
  const { paragraph, level } = props
  const content = <InlineContent inlines={paragraph} />
  const styles = useParagraphStyles()
  const commonStyles = useCommonStyles()
  const elementName = level >= 1 && level <= 5 ? `h${level}` : 'h6'
  return createElement(
    elementName,
    {
      className:
        level === 1
          ? cx(
              styles.root,
              commonStyles.mainContentWidth,
              styles.heading,
              styles.h1
            )
          : level === 2
          ? cx(
              styles.root,
              commonStyles.mainContentWidth,
              styles.heading,
              styles.h2
            )
          : level === 3
          ? cx(
              styles.root,
              commonStyles.mainContentWidth,
              styles.heading,
              styles.h3
            )
          : cx(styles.root, commonStyles.mainContentWidth, styles.heading),
    },
    content
  ) as JSX.Element
}
