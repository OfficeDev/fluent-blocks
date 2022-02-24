import { z } from 'zod'
import { ReactElement } from 'react'
import { mergeClasses as cx } from '@fluentui/react-components'

import { InlineContent, inlineSequenceOrString } from '../../inlines'
import {
  propsElementUnion,
  useCommonStyles,
  useTextBlockStyles,
} from '../../lib'

export const paragraphProps = z
  .object({
    paragraph: inlineSequenceOrString,
  })
  .merge(
    z
      .object({
        contextualVariant: z
          .union([z.literal('card'), z.literal('block')])
          .default('block'),
      })
      .partial()
  )
export type ParagraphProps = z.infer<typeof paragraphProps>

export const Paragraph = (props: ParagraphProps) => {
  const { paragraph, contextualVariant = 'block' } = props
  const textStyles = useTextBlockStyles()
  const commonStyles = useCommonStyles()
  return (
    <p
      className={cx(
        textStyles.root,
        commonStyles.centerBlock,
        commonStyles.mainContentWidth,
        contextualVariant === 'card' && textStyles.cardSpacing
      )}
    >
      <InlineContent inlines={paragraph} />
    </p>
  )
}

function isParagraphProps(o: any): o is ParagraphProps {
  return 'paragraph' in o
}

function isParagraphElement(
  o: any
): o is ReactElement<ParagraphProps, typeof Paragraph> {
  return o?.type === Paragraph
}

export const paragraphPropsOrElement = propsElementUnion<
  typeof paragraphProps,
  typeof Paragraph
>(paragraphProps)
export type ParagraphPropsOrElement = z.infer<typeof paragraphPropsOrElement>

export function renderIfParagraph(o: any) {
  return isParagraphProps(o) ? (
    <Paragraph {...o} />
  ) : isParagraphElement(o) ? (
    o
  ) : null
}
