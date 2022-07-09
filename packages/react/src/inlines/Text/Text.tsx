import { ReactElement } from 'react'

import { TextProps as NaturalTextProps } from '@fluent-blocks/schemas'

import { useTextStyles } from '../../lib'

export type TextProps = NaturalTextProps

export const Text = (props: TextProps) => {
  const { text, variant } = props
  const textStyles = useTextStyles()
  switch (variant) {
    case 'code':
      return <code className={textStyles[variant]}>{text}</code>
    case 'strong':
    case 'emphasized':
    case 'subtle':
      return <span className={textStyles[variant]}>{text}</span>
    default:
      return <>{text}</>
  }
}

export type TextElement = ReactElement<TextProps, typeof Text>

function isTextProps(o: any): o is TextProps {
  return 'text' in o
}

function isTextElement(o: any): o is TextElement {
  return o?.type === Text
}

export function renderIfText(o: any) {
  return isTextProps(o) ? <Text {...o} /> : isTextElement(o) ? o : null
}
