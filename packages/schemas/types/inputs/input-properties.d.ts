import { InlineSequenceOrString } from '../inlines'
import { ActionPayload } from '../lib/actions'

export interface InputProps {
  label: InlineSequenceOrString
  actionId: string
}

export interface InputRequiredProps {
  required?: boolean
}

export interface InputInitialValueProps {
  initialValue?: string
}

export interface TextInputProps
  extends InputProps,
    InputRequiredProps,
    InputInitialValueProps {
  type: 'text'
  placeholder?: string
  labelVisuallyHidden?: boolean
}

export interface SingleValueInputActionPayload extends ActionPayload {
  type: 'change'
  value: string
}

export interface MultipleValueInputActionPayload extends ActionPayload {
  type: 'change'
  value: string[]
}

export interface LabeledValueProps {
  value: string
  label: InlineSequenceOrString
}
