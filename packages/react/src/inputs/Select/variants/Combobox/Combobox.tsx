import get from 'lodash/get'
import pick from 'lodash/pick'
import getValues from 'lodash/values'
import {
  ReactEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { MultipleValueInputActionPayload } from '@fluent-blocks/schemas'
import {
  Combobox as FluentCombobox,
  ComboboxProps as FluentComboboxProps,
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
  MultipleSelectProps,
  ShortInputContextualProps,
} from '../../../../props'

interface DescribedStringLabeledValueProps
  extends Omit<DescribedLabeledValueProps, 'label'> {
  label: string
}

export interface ComboboxProps
  extends Omit<MultipleSelectProps, 'select'>,
    ShortInputContextualProps {
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

type OnSelectParams = Parameters<
  Exclude<FluentComboboxProps['onSelect'], undefined>
>

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
  contextualElevationVariant = 'surface',
}: ComboboxProps) => {
  const { onAction: contextOnAction } = useFluentBlocksContext()

  const shortInputStyles = useShortInputStyles()

  const [values, setValues] = useState<string[]>(initialValues || [])

  const labelMap = useMemo(
    () =>
      options.reduce(
        (acc: Record<string, DescribedStringLabeledValueProps>, option) => {
          acc[option.label] = option
          return acc
        },
        {}
      ),
    [options]
  )

  const valueMap = useMemo(
    () =>
      options.reduce(
        (acc: Record<string, DescribedStringLabeledValueProps>, option) => {
          acc[option.value] = option
          return acc
        },
        {}
      ),
    [options]
  )

  useEffect(() => {
    putInputValue(actionId, initialValues || [])
    return () => deleteInputValue(actionId)
  }, [])

  const onSelect = useCallback(
    (event: OnSelectParams[0], props?: OnSelectParams[1]) => {
      if (props) {
        const nextValues: string[] = getValues(
          pick(labelMap, get(props, 'selectedOptions', []))
        ).map(({ value }) => value)
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
      }
    },
    [actionId, onAction, contextOnAction, metadata, include]
  )

  return (
    <>
      <FluentCombobox
        {...{
          id: actionId,
          values,
          onSelect: onSelect as ReactEventHandler,
          selectedOptions: getValues(pick(valueMap, values)).map(
            ({ label }) => label
          ),
          multiselect: true,
          placeholder,
          appearance:
            contextualElevationVariant === 'elevated'
              ? 'filled-darker'
              : 'filled-lighter',
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
