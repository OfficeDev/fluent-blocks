import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles } from '@fluentui/react-components'
import { shortTextInputProps as naturalShortTextInputProps } from '@fluentui/blocks-schemas'
import { inlineSequenceOrString } from '../../inlines'

import { Placeholder, propsElementUnion, rem, sx } from '../../lib'

export const shortTextInputProps = naturalShortTextInputProps(
  inlineSequenceOrString
)
export type ShortTextInputProps = z.infer<typeof shortTextInputProps>

const useShortTextInputStyles = makeStyles({
  rootPlaceholder: {
    minWidth: rem(140),
    ...sx.flex(1, 0, '0'),
  },
})

export const ShortTextInput = (props: ShortTextInputProps) => {
  // todo: replace placeholder when `react-components` makes correct component available
  const styles = useShortTextInputStyles()
  return (
    <Placeholder label="Short text input" className={styles.rootPlaceholder} />
  )
}

function isShortTextInputProps(o: any): o is ShortTextInputProps {
  return 'type' in o && o.type === 'text' && !('multiline' in o && o.multiline)
}

function isShortTextInputElement(
  o: any
): o is ReactElement<ShortTextInputProps, typeof ShortTextInput> {
  return o?.type === ShortTextInput && isShortTextInputProps(o?.props)
}

export const shortTextInputPropsOrElement = propsElementUnion<
  typeof shortTextInputProps,
  typeof ShortTextInput
>(shortTextInputProps)
export type ShortTextInputPropsOrElement = z.infer<
  typeof shortTextInputPropsOrElement
>

export function renderIfShortTextInput(o: any) {
  return isShortTextInputProps(o) ? (
    <ShortTextInput {...o} />
  ) : isShortTextInputElement(o) ? (
    o
  ) : null
}
