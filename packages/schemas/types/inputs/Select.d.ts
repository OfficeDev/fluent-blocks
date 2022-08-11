import {
  AddableLabeledValueProps,
  DescribedInputProps,
  DescribedLabeledValueProps,
  InputInitialValueProps,
  InputInitialValuesProps,
  InputRequiredProps,
} from './input-properties'

export type SelectVariant = 'group' | 'combobox'

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
    InputInitialValuesProps {
  variant: SelectVariant
  multiple: true
  options: [
    AddableLabeledValueProps,
    AddableLabeledValueProps,
    ...AddableLabeledValueProps[]
  ]
}

export interface SelectProps {
  select: SingleSelectInnerProps | MultipleSelectInnerProps
}
