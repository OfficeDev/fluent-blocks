import {
  DescribedInputProps,
  DescribedLabeledValueProps,
  InputInitialValueProps,
  InputRequiredProps,
} from './input-properties'

export interface RadioGroupInnerProps
  extends DescribedInputProps,
    InputRequiredProps,
    InputInitialValueProps {
  options: [
    DescribedLabeledValueProps,
    DescribedLabeledValueProps,
    ...DescribedLabeledValueProps[]
  ]
}

export interface RadioGroupProps {
  radioGroup: RadioGroupInnerProps
}
