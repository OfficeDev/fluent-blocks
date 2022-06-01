import { TextInputInnerProps } from './input-properties'

export interface MultilineTextInputInnerProps extends TextInputInnerProps {
  multiline: true
}

export interface MultilineTextInputProps {
  textInput: MultilineTextInputInnerProps
}
