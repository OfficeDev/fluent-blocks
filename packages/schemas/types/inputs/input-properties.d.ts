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

export interface InputInitialValidationProps {
  initialValidation?: ValidationProps
}

export interface ValidationProps {
  valence: 'valid' | 'invalid' | 'pending'
  message: InlineSequenceOrString
}

interface ValidatorProps {
  validMessage?: InlineSequenceOrString
  invalidMessage: InlineSequenceOrString
}

interface LengthValidatorProps extends ValidatorProps {
  validator: 'length'
  min?: number
  max?: number
}

interface RegexpValidatorProps extends ValidatorProps {
  validator: 'regexp'
  regexp: string
}

export type Validator = LengthValidatorProps | RegexpValidatorProps

export interface TextInputInnerProps
  extends DescribedInputProps,
    InputRequiredProps,
    InputInitialValueProps,
    InputInitialValidationProps {
  placeholder?: string
  labelVariant?: 'block' | 'visuallyHidden'
  autocomplete?: string
  validator?: Validator
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

export interface AddableLabeledValueProps
  extends LabeledValueProps,
    DescriptionProps {
  adds?: string[]
  addsForConvenience?: string[]
}
