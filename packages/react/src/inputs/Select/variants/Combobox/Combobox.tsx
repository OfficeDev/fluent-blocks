import get from 'lodash/get'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { MultipleValueInputActionPayload } from '@fluent-blocks/schemas'
import {
  Combobox as FluentCombobox,
  Option,
} from '@fluentui/react-components/unstable'

import { Paragraph } from '../../../../blocks'
import {
  deleteInputValue,
  makeId,
  makePayload,
  putInputValue,
  useFluentBlocksContext,
} from '../../../../lib'
import {
  DescribedLabeledValueProps,
  MultipleSelectProps,
} from '../../../../props'

interface DescribedStringLabeledValueProps
  extends Omit<DescribedLabeledValueProps, 'label'> {
  label: string
}

export interface ComboboxProps extends Omit<MultipleSelectProps, 'select'> {
  select: Omit<MultipleSelectProps['select'], 'options'> & {
    variant: 'combobox'
    multiple: true
    options: [
      DescribedStringLabeledValueProps,
      DescribedStringLabeledValueProps,
      ...DescribedStringLabeledValueProps[]
    ]
    placeholder?: string
  }
  contextualLabelId?: string
  contextualDescriptionId?: string
}

export const Combobox = ({
  select: {
    disambiguatingLabel,
    description,
    actionId,
    initialValues,
    options,
    placeholder,
    onAction,
    metadata,
    include,
  },
  contextualLabelId,
  contextualDescriptionId,
}: ComboboxProps) => {
  const { onAction: contextOnAction } = useFluentBlocksContext()

  const [values, setValues] = useState<string[]>(initialValues || [])

  useEffect(() => {
    putInputValue(actionId, initialValues || [])
    return () => deleteInputValue(actionId)
  }, [])

  const onChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      // todo: figure out how v9 conveys values
      const nextValues = [get(target, 'value', '')]
      setValues(nextValues)
      if (nextValues) {
        putInputValue(actionId, nextValues)
      }
      const actionPayload = makePayload<MultipleValueInputActionPayload>(
        {
          actionId,
          type: 'change' as 'change',
          values: nextValues,
        },
        metadata,
        include
      )
      onAction && onAction(actionPayload)
      contextOnAction && contextOnAction(actionPayload)
    },
    [actionId, onAction, contextOnAction, metadata, include]
  )

  return (
    <>
      <FluentCombobox
        {...{
          id: actionId,
          values,
          onChange,
          placeholder,
          ...(disambiguatingLabel
            ? { 'aria-label': disambiguatingLabel }
            : { 'aria-labelledby': contextualLabelId }),
          ...(description && { 'aria-describedby': contextualDescriptionId }),
        }}
      >
        {options.map(({ value, label, description, descriptionVariant }) => {
          const optionDescriptionId = makeId(value, 'optionDescription')
          return (
            <Option
              key={value}
              {...{
                value,
                ...(description && {
                  'aria-describedby': optionDescriptionId,
                }),
              }}
            >
              {label}
            </Option>
          )
        })}
      </FluentCombobox>
      {options.map(({ value, description }) => {
        if (description) {
          const optionDescriptionId = makeId(value, 'optionDescription')
          return (
            <Paragraph
              key={value}
              {...{
                paragraph: description,
                contextualId: optionDescriptionId,
                contextualVariant: 'inputMeta--selectOption',
                visuallyHidden: true,
              }}
            />
          )
        } else {
          return null
        }
      })}
    </>
  )
}

function isComboboxProps(o: any): o is ComboboxProps {
  return 'select' in o && o.select.variant === 'combobox' && o.select.multiple
}

export function renderIfCombobox(o: any) {
  return isComboboxProps(o) ? <Combobox {...o} /> : null
}
