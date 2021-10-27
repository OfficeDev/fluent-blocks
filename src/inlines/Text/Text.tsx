import { ReactElement } from 'react'
import { z } from 'zod'
import { propsElementUnion } from '../../lib'

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
  const { text, variant } = props
  switch (variant) {
    // todo: handle other cases by wrapping in a `span` that applies the correct styles.
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

export const textPropsOrElement = propsElementUnion<
  typeof textProps,
  TextProps,
  typeof Text
>(textProps)
export type TextPropsOrElement = z.infer<typeof textPropsOrElement>

export function renderIfText(o: any) {
  return isTextProps(o) ? <Text {...o} /> : isTextElement(o) ? o : null
}
