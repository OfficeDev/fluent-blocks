import { InlineSequenceOrString } from '../inlines'
import { ActionPayload } from '../lib/actions'

export interface InputProps {
  label: InlineSequenceOrString
  disambiguatingLabel?: string
  actionId: string
}

interface DescriptionProps {
  description?: string
  descriptionVariant?: 'block' | 'visuallyHidden'
}

export interface DescribedInputProps extends InputProps, DescriptionProps {}

export interface InputRequiredProps {
  required?: boolean
}

export interface InputInitialValueProps {
  initialValue?: string
}

export interface TextInputInnerProps
  extends DescribedInputProps,
    InputRequiredProps,
    InputInitialValueProps {
  placeholder?: string
  labelVariant?: 'block' | 'visuallyHidden'
  autocomplete?: string
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

export interface DescribedLabeledValueProps extends DescriptionProps {
  value: string
  label: InlineSequenceOrString
}
