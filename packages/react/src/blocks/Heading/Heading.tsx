import { ReactElement, createElement } from 'react'

import { HeadingProps as NaturalHeadingProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx } from '@fluentui/react-components'

import { DescribedInlineContent } from '../../inlines'
import { useCommonStyles, useTextBlockStyles } from '../../lib'
import { ParagraphProps } from '../Paragraph/Paragraph'

export interface HeadingProps
  extends Omit<NaturalHeadingProps, 'paragraph'>,
    ParagraphProps {}

export const Heading = (props: HeadingProps) => {
  const {
    paragraph,
    level = 6,
    contextualVariant = 'block',
    contextualId,
    visuallyHidden,
  } = props
  const content = <DescribedInlineContent inlines={paragraph} />
  const textStyles = useTextBlockStyles()
  const commonStyles = useCommonStyles()
  const elementName = level >= 1 && level <= 5 ? `h${level}` : 'h6'

  const baseStyles = cx(
    textStyles.root,
    commonStyles.centerBlock,
    commonStyles.mainContentWidth,
    textStyles.heading,
    visuallyHidden && commonStyles.visuallyHidden
  )

  const className = (() => {
    switch (true) {
      case contextualVariant === 'card' && level === 1:
        return cx(baseStyles, textStyles.h2, textStyles.cardSpacing)
      case contextualVariant === 'card' && level === 2:
        return cx(baseStyles, textStyles.h2, textStyles.cardSpacing)
      case contextualVariant === 'card':
        return cx(baseStyles, textStyles.h3, textStyles.cardSpacing)
      case level === 1:
        return cx(baseStyles, textStyles.h1)
      case level === 2:
        return cx(baseStyles, textStyles.h2)
      case level === 3:
        return cx(baseStyles, textStyles.h3)
      default:
        return baseStyles
    }
  })()

  return createElement(
    elementName,
    { className, id: contextualId },
    content
  ) as JSX.Element
}

export type HeadingElement = ReactElement<HeadingProps, typeof Heading>
export type HeadingPropsOrElement = HeadingProps | HeadingElement

function isHeadingProps(o: any): o is HeadingProps {
  return 'level' in o
}

function isHeadingElement(o: any): o is HeadingElement {
  return o?.type === Heading
}

export function renderIfHeading(o: any) {
  return isHeadingProps(o) ? <Heading {...o} /> : isHeadingElement(o) ? o : null
}
