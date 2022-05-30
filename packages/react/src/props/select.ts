import {
  MultipleSelectInnerProps as NaturalMultipleSelectInnerProps,
  SelectProps as NaturalSelectProps,
  SingleSelectInnerProps as NaturalSingleSelectInnerProps,
} from '@fluent-blocks/schemas'

import {
  DescribedLabeledValueProps,
  WithDescribedInputElements,
} from './inputs'

export interface SingleSelectInnerProps
  extends WithDescribedInputElements<
    Omit<NaturalSingleSelectInnerProps, 'options'>
  > {
  options: [
    DescribedLabeledValueProps,
    DescribedLabeledValueProps,
    ...DescribedLabeledValueProps[]
  ]
}

export interface MultipleSelectInnerProps
  extends WithDescribedInputElements<
    Omit<NaturalMultipleSelectInnerProps, 'options'>
  > {
  options: [
    DescribedLabeledValueProps,
    DescribedLabeledValueProps,
    ...DescribedLabeledValueProps[]
  ]
}

export interface SelectProps extends Omit<NaturalSelectProps, 'select'> {
  select: SingleSelectInnerProps | MultipleSelectInnerProps
}
