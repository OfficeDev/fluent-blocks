import { FormEvent, Fragment, useCallback, useEffect, useState } from 'react'

import { SingleValueInputActionPayload } from '@fluent-blocks/schemas'
import {
  RadioGroup as FluentRadioGroup,
  Radio,
  RadioGroupOnChangeData,
} from '@fluentui/react-components'

import { Paragraph } from '../../../../blocks'
import { InlineContent } from '../../../../inlines'
import {
  deleteInputValue,
  makeId,
  makePayload,
  putInputValue,
  useFluentBlocksContext,
} from '../../../../lib'
import { SingleSelectProps } from '../../../../props'

export interface RadioGroupProps extends Omit<SingleSelectProps, 'select'> {
  select: SingleSelectProps['select'] & {
    variant: 'group'
    multiple?: false
  }
  contextualLabelId?: string
  contextualDescriptionId?: string
}

export const RadioGroup = ({
  select: {
    disambiguatingLabel,
    description,
    actionId,
    initialValue,
    options,
    metadata,
    include,
    onAction,
    required,
  },
  contextualLabelId,
  contextualDescriptionId,
}: RadioGroupProps) => {
  const { onAction: contextOnAction } = useFluentBlocksContext()

  const [value, setValue] = useState<string>(initialValue || '')

  useEffect(() => {
    putInputValue(actionId, initialValue || '')
    return () => deleteInputValue(actionId)
  }, [actionId, initialValue])

  const onChange = useCallback(
    (
      _e: FormEvent<HTMLDivElement>,
      { value: elementValue }: RadioGroupOnChangeData
    ) => {
      const nextValue = elementValue || ''
      setValue(nextValue)
      putInputValue(actionId, nextValue)
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
    [actionId, metadata, include, onAction, contextOnAction]
  )

  return (
    <FluentRadioGroup
      {...{
        id: actionId,
        onChange,
        ...(value && { value }),
        ...(disambiguatingLabel
          ? { 'aria-label': disambiguatingLabel }
          : { 'aria-labelledby': contextualLabelId }),
        ...(description && { 'aria-describedby': contextualDescriptionId }),
        'aria-required': !!required,
      }}
    >
      {options.map(({ value, label, description, descriptionVariant }) => {
        const optionDescriptionId = makeId(value, 'optionDescription')
        return (
          <Fragment key={value}>
            <Radio
              {...{
                value,
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
    </FluentRadioGroup>
  )
}

function isRadioGroupProps(o: any): o is RadioGroupProps {
  return 'select' in o && o.select.variant === 'group' && !o.select.multiple
}

export function renderIfRadioGroup(o: any) {
  return isRadioGroupProps(o) ? <RadioGroup {...o} /> : null
}
