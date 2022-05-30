import {
  InputInitialValueProps,
  InputProps,
  InputRequiredProps,
  LabeledValueProps,
} from './input-properties'

export interface RadioGroupInnerProps
  extends InputProps,
    InputRequiredProps,
    InputInitialValueProps {
  options: [LabeledValueProps, LabeledValueProps, ...LabeledValueProps[]]
}

export interface RadioGroupProps {
  radioGroup: RadioGroupInnerProps
}
