import { InlineEntity } from '../inlines'
import { TextInputInnerProps } from './input-properties'

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

export interface ShortTextInputInnerProps extends TextInputInnerProps {
  inputType: ShortTextInputType
  before?: InlineEntity
  after?: InlineEntity
  multiline?: false
}

export interface ShortTextInputProps {
  textInput: ShortTextInputInnerProps
}
