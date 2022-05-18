import { ReactElement } from 'react'

import { TextProps } from '@fluent-blocks/schemas'

import { Described, useTextStyles } from '../../lib'

export const Text = (props: TextProps) => {
  const { text, variant } = props
  const textStyles = useTextStyles()
  const textElement = (() => {
    switch (variant) {
      case 'code':
        return <code className={textStyles.code}>{text}</code>
      default:
        return props.description ? (
          <span tabIndex={0} className={textStyles.described}>
            {text}
          </span>
        ) : (
          <>{text}</>
        )
    }
  })()
  return Described(textElement, props.description)
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
