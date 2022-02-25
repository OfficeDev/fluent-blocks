import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { multilineTextInputProps as naturalMultilineTextInputProps } from '@fluentui/blocks-schemas'

import { Placeholder, propsElementUnion, useCommonStyles } from '../../lib'
import { labelWithElements } from '../input-properties'

export const multilineTextInputProps =
  naturalMultilineTextInputProps.merge(labelWithElements)
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
        commonStyles.centerBlock,
        commonStyles.mainContentWidth,
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
