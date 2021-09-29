import { cloneElement } from 'react'
import { z } from 'zod'
import { jsxon } from '../lib/jsxon'
import { key } from '../lib/keys'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTextPropsOrInstance(p: any): p is TextPropsOrInstance {
  return 'text' in p || 'text' in p?.props
}

export const Text = (props: TextProps) => {
  const { text, variant } = textProps.parse(props)
  switch (variant) {
    // todo: handle other cases by wrapping in a `span` that applies the correct styles.
    default:
      return <>{text}</>
  }
}

export const textPropsOrInstance = jsxon<typeof textProps, TextProps>(textProps)
export type TextPropsOrInstance = z.infer<typeof textPropsOrInstance>

export function renderText(arg: TextPropsOrInstance) {
  const t = textPropsOrInstance.parse(arg)
  return 'text' in t ? (
    <Text {...(t as TextProps)} key={key(t)} />
  ) : 'text' in t?.props ? (
    cloneElement(t as JSX.Element, { key: key(t.props) })
  ) : null
}
