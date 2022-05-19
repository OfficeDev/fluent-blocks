import { ReactElement } from 'react'

import { DescribedTextProps } from '@fluent-blocks/schemas'

import { Described, useTextStyles } from '../../lib'
import { Text } from './Text'

export const DescribedText = ({
  description,
  ...textProps
}: DescribedTextProps) => {
  const textStyles = useTextStyles()
  const textElement = <Text {...textProps} />
  return Described(
    description ? (
      <span tabIndex={0} className={textStyles.described}>
        {textElement}
      </span>
    ) : (
      textElement
    ),
    description
  )
}

export type DescribedTextElement = ReactElement<
  DescribedTextProps,
  typeof DescribedText
>

function isDescribedTextProps(o: any): o is DescribedTextProps {
  return 'description' in o && 'text' in o
}

function isDescribedTextElement(o: any): o is DescribedTextElement {
  return o?.type === DescribedText
}

export function renderIfDescribedText(o: any) {
  return isDescribedTextProps(o) ? (
    <DescribedText {...o} />
  ) : isDescribedTextElement(o) ? (
    o
  ) : null
}
