import { TextInputProps } from './input-properties'
import { InlineEntity } from '../inlines'

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

export interface ShortTextInputProps extends TextInputProps {
  inputType?: ShortTextInputType
  before?: InlineEntity
  after?: InlineEntity
  multiline?: false
}
