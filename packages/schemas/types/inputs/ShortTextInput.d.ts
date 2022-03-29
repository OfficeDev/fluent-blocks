import { TextInputProps } from './input-properties'
import { InlineEntity } from '../inlines'
import { ActionPayload } from '../lib/actions'

export interface ShortTextInputActionPayload extends ActionPayload {
  type: 'activate'
  value: string
}

export type ShortTextInputType =
  | 'text'
  | 'password'
  | 'search'
  | 'tel'
  | 'email'
  | 'url'
  | 'number'
  | 'time'
  | 'date'
  | 'month'
  | 'week'
  | 'datetime-local'

export interface ExplicitlyLabeledShortTextInputProps extends TextInputProps {
  inputType?: ShortTextInputType
  before?: InlineEntity
  after?: InlineEntity
  multiline?: false
  placeholderIsLabel?: boolean
}

export interface ShortTextInputLabeledByPlaceholderProps
  extends Omit<ExplicitlyLabeledShortTextInputProps, 'label'> {
  label: string
  placeholderIsLabel: true
}

export type ShortTextInputProps =
  | ExplicitlyLabeledShortTextInputProps
  | ShortTextInputLabeledByPlaceholderProps
