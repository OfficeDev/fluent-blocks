import { ChangeEvent, Fragment, useCallback, useEffect, useState } from 'react'

import {
  Checkbox,
  CheckboxOnChangeData,
  CheckboxProps as FluentCheckboxProps,
} from '@fluentui/react-components'

import { Paragraph } from '../../../../blocks'
import { InlineContent } from '../../../../inlines'
import { deleteInputValue, makeId, putInputValue } from '../../../../lib'
import { MultipleSelectProps } from '../../../../props'

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
  },
  contextualLabelId,
  contextualDescriptionId,
}: CheckboxGroupProps) => {
  const [values, setValues] = useState<Set<string>>(new Set(initialValues))

  useEffect(() => {
    putInputValue(actionId, initialValues || [])
    return () => deleteInputValue(actionId)
  }, [initialValues])

  const onChange: FluentCheckboxProps['onChange'] = useCallback(
    (
      { target: { value } }: ChangeEvent<HTMLInputElement>,
      { checked }: CheckboxOnChangeData
    ) => {
      if (checked) {
        values.add(value)
      } else {
        values.delete(value)
      }
      const nextValues = Array.from(values)
      putInputValue(actionId, nextValues)
      setValues(new Set(nextValues))
    },
    []
  )

  return (
    <div
      role="group"
      {...(disambiguatingLabel
        ? { 'aria-label': disambiguatingLabel }
        : { 'aria-labelledby': contextualLabelId })}
      {...(description && { 'aria-describedby': contextualDescriptionId })}
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
