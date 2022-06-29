import get from 'lodash/get'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { SingleValueInputActionPayload } from '@fluent-blocks/schemas'
import { Select as FluentSelect } from '@fluentui/react-components/unstable'

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

  const [value, setValue] = useState<string>(initialValue || '')

  useEffect(() => {
    putInputValue(actionId, initialValue || '')
    return () => deleteInputValue(actionId)
  }, [])

  const onChange = useCallback(
    ({ target }: ChangeEvent<HTMLSelectElement>) => {
      const nextValue = get(target, 'value', '')
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
      <FluentSelect
        {...{
          id: actionId,
          value,
          onChange,
          ...(disambiguatingLabel
            ? { 'aria-label': disambiguatingLabel }
            : { 'aria-labelledby': contextualLabelId }),
          ...(description && { 'aria-describedby': contextualDescriptionId }),
        }}
      >
        <option
          value=""
          disabled
          {...(!initialValue && {
            // React errors about this, but provides no alternative means of
            // selecting the falsy placeholder value when `initialValue`
            // is falsy.
            selected: true,
          })}
        >
          {placeholder || ' '}
        </option>
        {options.map(({ value, label, description, descriptionVariant }) => {
          const optionDescriptionId = makeId(value, 'optionDescription')
          return (
            <option
              key={value}
              {...{
                value,
                ...(description && {
                  'aria-describedby': optionDescriptionId,
                }),
              }}
            >
              {label}
            </option>
          )
        })}
      </FluentSelect>
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
