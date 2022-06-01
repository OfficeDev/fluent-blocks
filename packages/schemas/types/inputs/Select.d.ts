import {
  DescribedInputProps,
  DescribedLabeledValueProps,
  InputInitialValueProps,
  InputInitialValuesProps,
  InputRequiredProps,
} from './input-properties'

export type SelectVariant = 'group'

export interface SingleSelectInnerProps
  extends DescribedInputProps,
    InputRequiredProps,
    InputInitialValueProps {
  variant: SelectVariant
  multiple?: false
  options: [
    DescribedLabeledValueProps,
    DescribedLabeledValueProps,
    ...DescribedLabeledValueProps[]
  ]
}

export interface MultipleSelectInnerProps
  extends DescribedInputProps,
    InputRequiredProps,
    InputInitialValuesProps {
  variant: SelectVariant
  multiple: true
  options: [
    DescribedLabeledValueProps,
    DescribedLabeledValueProps,
    ...DescribedLabeledValueProps[]
  ]
}

export interface SelectProps {
  select: SingleSelectInnerProps | MultipleSelectInnerProps
}
