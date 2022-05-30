import {
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

export interface InputProps extends WithInputElements<NaturalInputProps> {}

export interface InputInitialValueProps
  extends InputProps,
    NaturalInputWithInitialStringValue {}

export interface TextInputProps
  extends WithInputElements<NaturalTextInputInnerProps> {}

export interface LabeledValueProps
  extends WithInputElements<NaturalLabeledValueProps> {}

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
