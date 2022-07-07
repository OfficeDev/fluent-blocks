import {
  MultipleValueInputActionPayload,
  MultipleSelectInnerProps as NaturalMultipleSelectInnerProps,
  SelectProps as NaturalSelectProps,
  SingleSelectInnerProps as NaturalSingleSelectInnerProps,
  SingleValueInputActionPayload,
} from '@fluent-blocks/schemas'

import { WithActionHandler } from './actions'
import {
  DescribedLabeledValueProps,
  WithDescribedInputElements,
} from './inputs'

export interface SingleSelectInnerProps
  extends WithDescribedInputElements<
      Omit<NaturalSingleSelectInnerProps, 'options'>
    >,
    WithActionHandler<SingleValueInputActionPayload> {
  options: [
    DescribedLabeledValueProps,
    DescribedLabeledValueProps,
    ...DescribedLabeledValueProps[]
  ]
}

export interface MultipleSelectInnerProps
  extends WithDescribedInputElements<
      Omit<NaturalMultipleSelectInnerProps, 'options'>
    >,
    WithActionHandler<MultipleValueInputActionPayload> {
  options: [
    DescribedLabeledValueProps,
    DescribedLabeledValueProps,
    ...DescribedLabeledValueProps[]
  ]
}

interface SelectOuterProps extends Omit<NaturalSelectProps, 'select'> {}

export interface SelectProps extends SelectOuterProps {
  select: SingleSelectInnerProps | MultipleSelectInnerProps
}

export interface SingleSelectProps extends SelectOuterProps {
  select: SingleSelectInnerProps
}

export interface MultipleSelectProps extends SelectOuterProps {
  select: MultipleSelectInnerProps
}
