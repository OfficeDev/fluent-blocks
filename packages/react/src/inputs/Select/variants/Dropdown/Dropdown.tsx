import get from 'lodash/get'
import { ChangeEvent, Fragment, useCallback, useEffect } from 'react'

import { Select as FluentSelect } from '@fluentui/react-components/unstable'

import { Paragraph } from '../../../../blocks'
import { InlineContent } from '../../../../inlines'
import { deleteInputValue, makeId, putInputValue } from '../../../../lib'
import { SingleSelectProps } from '../../../../props'

export interface DropdownProps extends Omit<SingleSelectProps, 'select'> {
  select: SingleSelectProps['select'] & {
    variant: 'combobox'
    multiple?: false
  }
  contextualLabelId?: string
  contextualDescriptionId?: string
}

export const Dropdown = ({
  select: { disambiguatingLabel, description, actionId, initialValue, options },
  contextualLabelId,
  contextualDescriptionId,
}: DropdownProps) => {
  useEffect(() => {
    putInputValue(actionId, initialValue || '')
    return () => deleteInputValue(actionId)
  }, [initialValue])

  const putSelectValue = useCallback(
    ({ target }: ChangeEvent<HTMLSelectElement>) => {
      const value = get(target, 'value', null)
      if (value) {
        putInputValue(actionId, value)
      }
    },
    [actionId]
  )

  return (
    <>
      <FluentSelect
        defaultValue={initialValue}
        onChange={putSelectValue}
        {...(disambiguatingLabel
          ? { 'aria-label': disambiguatingLabel }
          : { 'aria-labelledby': contextualLabelId })}
        {...(description && { 'aria-describedby': contextualDescriptionId })}
      >
        {options.map(({ value, label, description, descriptionVariant }) => {
          const optionDescriptionId = makeId(value, 'optionDescription')
          return (
            <Fragment key={value}>
              <option
                {...{
                  value,
                  ...(description && {
                    'aria-describedby': optionDescriptionId,
                  }),
                }}
              >
                <InlineContent inlines={label} />
              </option>
            </Fragment>
          )
        })}
      </FluentSelect>
      {options.map(({ value, description }) => {
        const optionDescriptionId = makeId(value, 'optionDescription')
        return (
          description && (
            <Paragraph
              paragraph={description}
              contextualId={optionDescriptionId}
              contextualVariant="inputMeta--selectOption"
              visuallyHidden
            />
          )
        )
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
