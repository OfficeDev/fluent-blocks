import {
  DescribedLabeledValueProps as NaturalDescribedLabeledValueProps,
  InlineSequenceOrString as NaturalInlineSequenceOrString,
  InputProps as NaturalInputProps,
  InputInitialValueProps as NaturalInputWithInitialStringValue,
  LabeledValueProps as NaturalLabeledValueProps,
  TextInputInnerProps as NaturalTextInputInnerProps,
  ValidationProps as NaturalValidationProps,
} from '@fluent-blocks/schemas'

import { InlineSequenceOrString } from '../inlines'

export type WithInputElements<
  T extends { label: NaturalInlineSequenceOrString }
> = Omit<T, 'label'> & {
  label: InlineSequenceOrString
}
export type WithDescribedInputElements<
  T extends {
    label: NaturalInlineSequenceOrString
    description?: NaturalInlineSequenceOrString
  }
> = Omit<T, 'label' | 'description'> & {
  label: InlineSequenceOrString
  description?: InlineSequenceOrString
}

export interface ValidationProps
  extends Omit<NaturalValidationProps, 'message'> {
  message: InlineSequenceOrString
}

export interface InputProps extends WithInputElements<NaturalInputProps> {}

export interface InputInitialValueProps
  extends InputProps,
    NaturalInputWithInitialStringValue {}

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

export interface TextInputProps
  extends WithDescribedInputElements<
    Omit<NaturalTextInputInnerProps, 'initialValidation' | 'validator'>
  > {
  initialValidation?: ValidationProps
  validator?: ValidatorProps
}

export interface LabeledValueProps
  extends WithInputElements<NaturalLabeledValueProps> {}

export interface DescribedLabeledValueProps
  extends WithDescribedInputElements<NaturalDescribedLabeledValueProps> {}

export interface AddableLabeledValueProps
  extends WithDescribedInputElements<NaturalDescribedLabeledValueProps> {
  adds?: string[]
  addsForConvenience?: string[]
}

export type ShortInputContextualVariant =
  | 'block-inputs'
  | 'card-inputs'
  | 'narrow-inputs'
  | 'toolbar-item'
  | 'toolbar-item--needs-update'
  | 'toolbar-item--hidden'
  | 'nav'

export interface ShortInputContextualProps {
  contextualVariant?: ShortInputContextualVariant
  contextualElevationVariant?: 'surface' | 'elevated'
}
