import { ReactElement } from 'react'

import { ParagraphProps as NaturalParagraphProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx } from '@fluentui/react-components'

import {
  DescribedInlineContent,
  DescribedInlineSequenceOrString,
} from '../../inlines'
import { useCommonStyles, useTextBlockStyles, useTextStyles } from '../../lib'

export interface ParagraphProps
  extends Omit<NaturalParagraphProps, 'paragraph'> {
  paragraph: DescribedInlineSequenceOrString
  contextualVariant?: 'card' | 'block' | 'inputMeta' | 'inputMeta--selectOption'
  contextualId?: string
  visuallyHidden?: boolean
}

export const Paragraph = (props: ParagraphProps) => {
  const {
    paragraph,
    contextualVariant = 'block',
    contextualId,
    visuallyHidden,
  } = props
  const textBlockStyles = useTextBlockStyles()
  const textStyles = useTextStyles()
  const commonStyles = useCommonStyles()
  return (
    <p
      className={cx(
        textBlockStyles.root,
        commonStyles.centerBlock,
        commonStyles.mainContentWidth,
        contextualVariant === 'card' && textBlockStyles.cardSpacing,
        contextualVariant === 'inputMeta' && textBlockStyles.inputMetaSpacing,
        contextualVariant === 'inputMeta--selectOption' &&
          textBlockStyles.selectOptionMetaSpacing,
        contextualVariant === 'inputMeta' && textStyles.subtle,
        contextualVariant === 'inputMeta--selectOption' && textStyles.subtle,
        visuallyHidden && commonStyles.visuallyHidden
      )}
      {...(contextualId && { id: contextualId })}
    >
      {DescribedInlineContent({ inlines: paragraph })}
    </p>
  )
}

export type ParagraphElement = ReactElement<ParagraphProps, typeof Paragraph>
export type ParagraphPropsOrElement = ParagraphProps | ParagraphElement

function isParagraphProps(o: any): o is ParagraphProps {
  return 'paragraph' in o
}

function isParagraphElement(o: any): o is ParagraphElement {
  return o?.type === Paragraph
}

export function renderIfParagraph(o: any) {
  return isParagraphProps(o) ? (
    <Paragraph {...o} />
  ) : isParagraphElement(o) ? (
    o
  ) : null
}
