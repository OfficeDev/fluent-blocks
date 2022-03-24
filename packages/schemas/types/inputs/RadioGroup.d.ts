import {
  InputProps,
  InputInitialValueProps,
  InputRequiredProps,
  LabeledValueProps,
} from './input-properties'

export interface RadioGroupProps
  extends InputProps,
    InputRequiredProps,
    InputInitialValueProps {
  type: 'radio-group'
  options: [LabeledValueProps, LabeledValueProps, ...LabeledValueProps[]]
}
