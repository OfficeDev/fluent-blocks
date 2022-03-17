import { z } from 'zod'
import { ReactElement } from 'react'
import { textProps } from '@fluent-blocks/schemas'

import { useTextStyles, zodElement } from '../../lib'

export type TextProps = z.infer<typeof textProps>

export const Text = (props: TextProps) => {
  const { text, variant } = props
  const textStyles = useTextStyles()
  switch (variant) {
    case 'code':
      return <code className={textStyles.code}>{text}</code>
    default:
      return <>{text}</>
  }
}

function isTextProps(o: any): o is TextProps {
  return 'text' in o
}

function isTextElement(o: any): o is ReactElement<TextProps, typeof Text> {
  return o?.type === Text
}

export const textElement = zodElement<typeof textProps, typeof Text>(textProps)
export type TextElement = z.infer<typeof textElement>

export function renderIfText(o: any) {
  return isTextProps(o) ? <Text {...o} /> : isTextElement(o) ? o : null
}
