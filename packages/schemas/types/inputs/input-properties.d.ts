import { InlineSequenceOrString } from '../inlines'
import { ActionPayload } from '../lib/actions'

export interface InputProps {
  label: InlineSequenceOrString
  disambiguatingLabel?: string
  actionId: string
  include?: string[]
  metadata?: Record<string, string | string[]>
}

interface DescriptionProps {
  description?: InlineSequenceOrString
  descriptionVariant?: 'block' | 'visuallyHidden'
}

export interface DescribedInputProps extends InputProps, DescriptionProps {}

export interface InputRequiredProps {
  required?: boolean
}

export interface InputInitialValueProps {
  initialValue?: string
}

export interface InputInitialValuesProps {
  initialValues?: string[]
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
  values: string[]
}

export interface LabeledValueProps {
  value: string
  label: InlineSequenceOrString
}

export interface DescribedLabeledValueProps
  extends LabeledValueProps,
    DescriptionProps {}

export interface IncludableLabeledValueProps
  extends LabeledValueProps,
    DescriptionProps {
  includes?: string[]
}
