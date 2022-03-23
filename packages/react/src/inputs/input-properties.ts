import {
  InputProps as NaturalInputProps,
  InputInitialValueProps as NaturalInputWithInitialStringValue,
  TextInputProps as NaturalTextInputProps,
  LabeledValueProps as NaturalLabeledValueProps,
  InlineSequenceOrString as NaturalInlineSequenceOrString,
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
  extends WithInputElements<NaturalTextInputProps> {}

export interface LabeledValueProps
  extends WithInputElements<NaturalLabeledValueProps> {}

export type ShortInputContextualVariant =
  | 'block-inputs'
  | 'card-inputs'
  | 'narrow-inputs'
  | 'tabs'
  | 'toolbar-item'
  | 'toolbar-item--needs-update'
  | 'toolbar-item--hidden'

export interface ShortInputContextualProps {
  contextualVariant?: ShortInputContextualVariant
  selected?: boolean
  controls?: string
}
