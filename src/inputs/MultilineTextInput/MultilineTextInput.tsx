import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import { textInputProps } from '../input-properties'
import { Placeholder, propsElementUnion, useCommonStyles } from '../../lib'

export const multilineTextInputProps = textInputProps.merge(
  z.object({
    multiline: z.literal(true),
  })
)
export type MultilineTextInputProps = z.infer<typeof multilineTextInputProps>

const useMultilineTextInputStyles = makeStyles({
  root: {
    marginBlockEnd: '.5rem',
  },
})

export const MultilineTextInput = (props: MultilineTextInputProps) => {
  // todo: replace placeholder when `react-components` makes correct component available
  const styles = useMultilineTextInputStyles()
  const commonStyles = useCommonStyles()
  return (
    <Placeholder
      label="Multiline text input"
      className={cx(
        commonStyles.mainContentWidth,
        commonStyles.centerBlock,
        styles.root
      )}
    />
  )
}

function isMultilineTextInputProps(o: any): o is MultilineTextInputProps {
  return 'type' in o && o.type === 'text' && 'multiline' in o && o.multiline
}

function isMultilineTextInputElement(
  o: any
): o is ReactElement<MultilineTextInputProps, typeof MultilineTextInput> {
  return o?.type === MultilineTextInput
}

export const multilineTextInputPropsOrElement = propsElementUnion<
  typeof multilineTextInputProps,
  MultilineTextInputProps,
  typeof MultilineTextInput
>(multilineTextInputProps)
export type MultilineTextInputPropsOrElement = z.infer<
  typeof multilineTextInputPropsOrElement
>

export function renderIfMultilineTextInput(o: any) {
  return isMultilineTextInputProps(o) ? (
    <MultilineTextInput {...o} />
  ) : isMultilineTextInputElement(o) ? (
    o
  ) : null
}
