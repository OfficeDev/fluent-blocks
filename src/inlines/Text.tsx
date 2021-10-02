import { cloneElement, ReactElement } from 'react'
import { z } from 'zod'
import { propsElementUnion, key } from '../lib'

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

function isTextProps(p: any): p is TextProps {
  return 'text' in p
}

function isTextElement(p: any): p is ReactElement<TextProps, typeof Text> {
  return p?.type === Text
}

export const textPropsOrElement = propsElementUnion<
  typeof textProps,
  TextProps,
  typeof Text
>(textProps)
export type TextPropsOrElement = z.infer<typeof textPropsOrElement>

export function renderIfText(p: any) {
  return isTextProps(p) ? (
    <Text {...p} key={key(p)} />
  ) : isTextElement(p) ? (
    cloneElement(p, { key: key(p.props) })
  ) : null
}
