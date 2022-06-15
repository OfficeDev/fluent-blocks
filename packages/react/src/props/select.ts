import {
  MultipleSelectInnerProps as NaturalMultipleSelectInnerProps,
  SelectProps as NaturalSelectProps,
  SingleSelectInnerProps as NaturalSingleSelectInnerProps,
} from '@fluent-blocks/schemas'

import { ActionPayload, WithActionHandler } from './actions'
import {
  DescribedLabeledValueProps,
  WithDescribedInputElements,
} from './inputs'

export interface SingleSelectChangeAction extends ActionPayload {
  type: 'change'
  value: string
}

export interface SingleSelectInnerProps
  extends WithDescribedInputElements<
      Omit<NaturalSingleSelectInnerProps, 'options'>
    >,
    WithActionHandler<SingleSelectChangeAction> {
  options: [
    DescribedLabeledValueProps,
    DescribedLabeledValueProps,
    ...DescribedLabeledValueProps[]
  ]
}

export interface MultipleSelectChangeAction extends ActionPayload {
  type: 'change'
  values: string[]
}

export interface MultipleSelectInnerProps
  extends WithDescribedInputElements<
      Omit<NaturalMultipleSelectInnerProps, 'options'>
    >,
    WithActionHandler<MultipleSelectChangeAction> {
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
