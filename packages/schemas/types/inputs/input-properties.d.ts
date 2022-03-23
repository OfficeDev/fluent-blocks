import { InlineSequenceOrString } from '../inlines'

export interface InputProps {
  label: InlineSequenceOrString,
  actionId: string,
}

export interface InputRequiredProps {
  required?: boolean,
}

export interface InputPropsInitialValueProps {
  initialValue?: string
}

export interface TextInputProps extends InputProps, InputRequiredProps, InputPropsInitialValueProps {
  type: 'text'
  placeholder?: string
}

export interface LabeledValueProps {
  value: string
  label: InlineSequenceOrString
}
