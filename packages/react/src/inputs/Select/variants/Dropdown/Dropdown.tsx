import get from 'lodash/get'
import { ReactEventHandler, useCallback, useEffect, useState } from 'react'

import { SingleValueInputActionPayload } from '@fluent-blocks/schemas'
import {
  Dropdown as FluentDropdown,
  DropdownProps as FluentDropdownProps,
  Option,
} from '@fluentui/react-components/unstable'

import { Paragraph } from '../../../../blocks'
import {
  deleteInputValue,
  makeId,
  makePayload,
  putInputValue,
  useFluentBlocksContext,
  useShortInputStyles,
} from '../../../../lib'
import {
  DescribedLabeledValueProps,
  SingleSelectProps,
} from '../../../../props'

interface DescribedStringLabeledValueProps
  extends Omit<DescribedLabeledValueProps, 'label'> {
  label: string
}

export interface DropdownProps extends Omit<SingleSelectProps, 'select'> {
  select: Omit<SingleSelectProps['select'], 'options'> & {
    variant: 'combobox'
    options: [
      DescribedStringLabeledValueProps,
      DescribedStringLabeledValueProps,
      ...DescribedStringLabeledValueProps[]
    ]
    multiple?: false
    placeholder?: string
  }
  contextualLabelId?: string
  contextualDescriptionId?: string
}

type OnSelectParams = Parameters<
  Exclude<FluentDropdownProps['onSelect'], undefined>
>

export const Dropdown = ({
  select: {
    disambiguatingLabel,
    description,
    actionId,
    initialValue,
    options,
    placeholder,
    onAction,
    metadata,
    include,
  },
  contextualLabelId,
  contextualDescriptionId,
}: DropdownProps) => {
  const { onAction: contextOnAction } = useFluentBlocksContext()

  const shortInputStyles = useShortInputStyles()

  const [value, setValue] = useState<string>(initialValue || '')

  useEffect(() => {
    putInputValue(actionId, initialValue || '')
    return () => deleteInputValue(actionId)
  }, [])

  const onSelect = useCallback(
    ({ target }: OnSelectParams[0], _props: OnSelectParams[1]) => {
      const nextValue = get(target, ['dataset', 'value'], '')
      setValue(nextValue)
      if (nextValue) {
        putInputValue(actionId, nextValue)
      }
      const actionPayload = makePayload<SingleValueInputActionPayload>(
        {
          actionId,
          type: 'change' as 'change',
          value: nextValue,
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
      <FluentDropdown
        {...{
          id: actionId,
          selectedOptions: [
            options.find(({ value: optionValue }) => value === optionValue)
              ?.label || '',
          ],
          multiselect: false,
          onSelect: onSelect as ReactEventHandler,
          placeholder,
          className: shortInputStyles.input,
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
                'data-value': value,
                ...(description && {
                  'aria-describedby': optionDescriptionId,
                }),
              }}
            >
              {label}
            </Option>
          )
        })}
      </FluentDropdown>
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

function isDropdownProps(o: any): o is DropdownProps {
  return 'select' in o && o.select.variant === 'combobox' && !o.select.multiple
}

export function renderIfDropdown(o: any) {
  return isDropdownProps(o) ? <Dropdown {...o} /> : null
}
