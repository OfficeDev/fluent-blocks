import { ReactElement } from 'react'

import {
  MultilineTextInputProps as NaturalMultilineTextInputProps,
  SingleValueInputActionPayload,
} from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import { Placeholder, useCommonStyles } from '../../lib'
import { WithActionHandler, WithInputElements } from '../../props'

export interface MultilineTextInputInnerProps
  extends WithInputElements<NaturalMultilineTextInputProps['textInput']>,
    WithActionHandler<SingleValueInputActionPayload> {}

export interface MultilineTextInputProps
  extends Omit<NaturalMultilineTextInputProps, 'textInput'> {
  textInput: MultilineTextInputInnerProps
  contextualElevationVariant?: 'surface' | 'elevated'
}

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

export type MultilineTextInputElement = ReactElement<
  MultilineTextInputProps,
  typeof MultilineTextInput
>
export type MultilineTextInputPropsOrElement =
  | MultilineTextInputProps
  | MultilineTextInputElement

function isMultilineTextInputProps(o: any): o is MultilineTextInputProps {
  return 'textInput' in o && 'multiline' in o.textInput && o.textInput.multiline
}

function isMultilineTextInputElement(o: any): o is MultilineTextInputElement {
  return o?.type === MultilineTextInput
}

export function renderIfMultilineTextInput(o: any) {
  return isMultilineTextInputProps(o) ? (
    <MultilineTextInput {...o} />
  ) : isMultilineTextInputElement(o) ? (
    o
  ) : null
}
