import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles } from '@fluentui/react-components'

import { textInputProps } from '../input-properties'
import { Placeholder, propsElementUnion, rem } from '../../lib'

export const shortTextInputProps = textInputProps.merge(
  z.object({
    multiline: z.literal(false).optional(),
  })
)
export type ShortTextInputProps = z.infer<typeof shortTextInputProps>

const useShortTextInputStyles = makeStyles({
  rootPlaceholder: {
    marginBlockStart: 0,
    marginBlockEnd: '.5rem',
    marginInlineStart: 0,
    marginInlineEnd: '.5rem',
    minWidth: rem(140),
    flex: '1 0 0',
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
  ShortTextInputProps,
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
