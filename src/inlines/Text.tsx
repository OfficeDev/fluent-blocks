import { cloneElement, ReactElement } from 'react'
import { z } from 'zod'
import { jsxon, key } from '../lib'

export const textVariant = z.union([
  z.literal('normal'),
  z.literal('emphasized'),
  z.literal('strong'),
  z.literal('highlighted'),
])

export const textProps = z.object({
  text: z.string(),
  variant: textVariant.optional(),
})

export type TextProps = z.infer<typeof textProps>

export const Text = (props: TextProps) => {
  const { text, variant } = textProps.parse(props)
  switch (variant) {
    // todo: handle other cases by wrapping in a `span` that applies the correct styles.
    default:
      return <>{text}</>
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isTextProps(p: any): p is TextProps {
  return 'text' in p
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isTextInstance(p: any): p is ReactElement<TextProps> {
  return p?.type === Text
}

export const textPropsOrInstance = jsxon<typeof textProps, TextProps>(textProps)
export type TextPropsOrInstance = z.infer<typeof textPropsOrInstance>

export function renderIfText(p: TextPropsOrInstance) {
  return isTextProps(p) ? (
    <Text {...p} key={key(p)} />
  ) : isTextInstance(p) ? (
    cloneElement(p, { key: key(p.props) })
  ) : null
}
