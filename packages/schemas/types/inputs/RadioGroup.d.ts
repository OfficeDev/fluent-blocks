import {
  InputProps,
  InputPropsInitialValueProps,
  InputRequiredProps,
  LabeledValueProps,
} from './input-properties'

export interface RadioGroupProps
  extends InputProps,
    InputRequiredProps,
    InputPropsInitialValueProps {
  type: 'radio-group'
  options: [LabeledValueProps, LabeledValueProps, ...LabeledValueProps[]]
}
