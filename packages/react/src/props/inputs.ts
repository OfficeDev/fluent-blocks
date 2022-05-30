import {
  DescribedLabeledValueProps as NaturalDescribedLabeledValueProps,
  InlineSequenceOrString as NaturalInlineSequenceOrString,
  InputProps as NaturalInputProps,
  InputInitialValueProps as NaturalInputWithInitialStringValue,
  LabeledValueProps as NaturalLabeledValueProps,
  TextInputInnerProps as NaturalTextInputInnerProps,
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

export interface InputProps extends WithInputElements<NaturalInputProps> {}

export interface InputInitialValueProps
  extends InputProps,
    NaturalInputWithInitialStringValue {}

export interface TextInputProps
  extends WithDescribedInputElements<NaturalTextInputInnerProps> {}

export interface LabeledValueProps
  extends WithInputElements<NaturalLabeledValueProps> {}

export interface DescribedLabeledValueProps
  extends WithDescribedInputElements<NaturalDescribedLabeledValueProps> {}

export type ShortInputContextualVariant =
  | 'block-inputs'
  | 'card-inputs'
  | 'narrow-inputs'
  | 'toolbar-item'
  | 'toolbar-item--needs-update'
  | 'toolbar-item--hidden'
  | 'sidebar'

export interface ShortInputContextualProps {
  contextualVariant?: ShortInputContextualVariant
}
