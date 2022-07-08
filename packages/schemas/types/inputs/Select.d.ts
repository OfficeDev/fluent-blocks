import {
  DescribedInputProps,
  DescribedLabeledValueProps,
  IncludableLabeledValueProps,
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
    InputRequiredProps,
    InputInitialValuesProps {
  variant: SelectVariant
  multiple: true
  options: [
    IncludableLabeledValueProps,
    IncludableLabeledValueProps,
    ...IncludableLabeledValueProps[]
  ]
}

export interface SelectProps {
  select: SingleSelectInnerProps | MultipleSelectInnerProps
}
