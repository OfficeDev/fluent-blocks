import { z } from 'zod'
import { createElement, ReactElement } from 'react'
import { mergeClasses as cx } from '@fluentui/react-components'

import { InlineContent } from '../../inlines'
import {
  propsElementUnion,
  useCommonStyles,
  useTextBlockStyles,
} from '../../lib'

import { paragraphProps } from '../Paragraph/Paragraph'

export const headingLevel = z.number().max(6).min(1)

export const headingProps = paragraphProps.extend({
  level: headingLevel.default(6).optional(),
})
export type HeadingProps = z.infer<typeof headingProps>

export const Heading = (props: HeadingProps) => {
  const { paragraph, level = 6, contextualVariant = 'block' } = props
  const content = <InlineContent inlines={paragraph} />
  const textStyles = useTextBlockStyles()
  const commonStyles = useCommonStyles()
  const elementName = level >= 1 && level <= 5 ? `h${level}` : 'h6'

  const baseStyles = cx(
    textStyles.root,
    commonStyles.mainContentWidth,
    contextualVariant === 'block' && commonStyles.centerBlock,
    textStyles.heading
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

  return createElement(elementName, { className }, content) as JSX.Element
}

function isHeadingProps(o: any): o is HeadingProps {
  return 'level' in o
}

function isHeadingElement(
  o: any
): o is ReactElement<HeadingProps, typeof Heading> {
  return o?.type === Heading
}

export const headingPropsOrElement = propsElementUnion<
  typeof headingProps,
  typeof Heading
>(headingProps)
export type HeadingPropsOrElement = z.infer<typeof headingPropsOrElement>

export function renderIfHeading(o: any) {
  return isHeadingProps(o) ? <Heading {...o} /> : isHeadingElement(o) ? o : null
}
