import get from 'lodash/get'
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { MultipleValueInputActionPayload } from '@fluent-blocks/schemas'
import { Checkbox, CheckboxOnChangeData } from '@fluentui/react-components'

import { Paragraph } from '../../../../blocks'
import { InlineContent } from '../../../../inlines'
import {
  deleteInputValue,
  makeId,
  makePayload,
  putInputValue,
  useFluentBlocksContext,
} from '../../../../lib'
import {
  AddableLabeledValueProps,
  MultipleSelectProps,
} from '../../../../props'

export interface CheckboxGroupProps
  extends Omit<MultipleSelectProps, 'select'> {
  select: MultipleSelectProps['select'] & {
    variant: 'group'
    multiple: true
  }
  contextualLabelId?: string
  contextualDescriptionId?: string
}

export const CheckboxGroup = ({
  select: {
    disambiguatingLabel,
    description,
    actionId,
    initialValues,
    options,
    metadata,
    include,
    onAction,
  },
  contextualLabelId,
  contextualDescriptionId,
}: CheckboxGroupProps) => {
  const { onAction: contextOnAction } = useFluentBlocksContext()

  const valueMap = useMemo(
    () =>
      options.reduce(
        (acc: Record<string, AddableLabeledValueProps>, option) => {
          acc[option.value] = option
          return acc
        },
        {}
      ),
    [options]
  )

  const [values, setValues] = useState<Set<string>>(new Set(initialValues))

  const disabledValueMap = useMemo(
    () =>
      options.reduce((acc: Record<string, boolean>, option) => {
        get(option, 'adds', []).forEach((addedValue: string) => {
          if (values.has(option.value)) {
            acc[addedValue] = true
          }
        })
        return acc
      }, {}),
    [values, options]
  )

  useEffect(() => {
    putInputValue(actionId, initialValues || [])
    return () => deleteInputValue(actionId)
  }, [actionId, initialValues])

  const onChange = useCallback(
    (
      { target: { value } }: ChangeEvent<HTMLInputElement>,
      { checked }: CheckboxOnChangeData
    ) => {
      if (checked) {
        values.add(value)
        get(valueMap, [value, 'adds'], []).forEach((addedValue) =>
          values.add(addedValue)
        )
        get(valueMap, [value, 'addsForConvenience'], []).forEach((addedValue) =>
          values.add(addedValue)
        )
      } else {
        values.delete(value)
      }
      const nextValues = Array.from(values)
      putInputValue(actionId, nextValues)
      setValues(new Set(nextValues))
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
    [values, actionId, metadata, include, onAction, contextOnAction, valueMap]
  )

  return (
    <div
      {...{
        role: 'group',
        id: actionId,
        ...(disambiguatingLabel
          ? { 'aria-label': disambiguatingLabel }
          : { 'aria-labelledby': contextualLabelId }),
        ...(description && { 'aria-describedby': contextualDescriptionId }),
      }}
    >
      {options.map(({ value, label, description, descriptionVariant }) => {
        const optionDescriptionId = makeId(value, 'optionDescription')
        return (
          <Fragment key={value}>
            <Checkbox
              {...{
                value,
                checked: values.has(value),
                onChange,
                label: <InlineContent inlines={label} />,
                ...(description && {
                  'aria-describedby': optionDescriptionId,
                }),
                ...(disabledValueMap[value] && { disabled: true }),
              }}
            />
            {description && (
              <Paragraph
                paragraph={description}
                contextualId={optionDescriptionId}
                contextualVariant="inputMeta--selectOption"
                visuallyHidden={descriptionVariant === 'visuallyHidden'}
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

function isCheckboxGroupProps(o: any): o is CheckboxGroupProps {
  return 'select' in o && o.select.variant === 'group' && o.select.multiple
}

export function renderIfCheckboxGroup(o: any) {
  return isCheckboxGroupProps(o) ? <CheckboxGroup {...o} /> : null
}
