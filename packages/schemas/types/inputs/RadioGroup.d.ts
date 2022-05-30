import {
  DescribedInputProps,
  InputInitialValueProps,
  InputRequiredProps,
  LabeledValueProps,
} from './input-properties'

export interface RadioGroupInnerProps
  extends DescribedInputProps,
    InputRequiredProps,
    InputInitialValueProps {
  options: [LabeledValueProps, LabeledValueProps, ...LabeledValueProps[]]
}

export interface RadioGroupProps {
  radioGroup: RadioGroupInnerProps
}
