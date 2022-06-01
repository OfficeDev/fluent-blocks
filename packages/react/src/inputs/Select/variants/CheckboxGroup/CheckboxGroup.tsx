import {
  ChangeEvent,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react'

import {
  Checkbox,
  CheckboxOnChangeData,
  CheckboxProps as FluentCheckboxProps,
  Label,
  mergeClasses as cx,
  makeStyles,
} from '@fluentui/react-components'

import { Paragraph } from '../../../../blocks'
import { InlineContent } from '../../../../inlines'
import {
  deleteInputValue,
  makeId,
  putInputValue,
  useCommonStyles,
  useTextBlockStyles,
} from '../../../../lib'
import { MultipleSelectProps } from '../../../../props/select'

const useCheckboxGroupStyles = makeStyles({
  root: {
    marginBlockStart: '.5rem',
    marginBlockEnd: '1rem',
  },
  checkboxGroup: {
    marginBlockStart: '.25rem',
  },
  label: {
    display: 'block',
  },
})

export interface CheckboxProps extends Omit<MultipleSelectProps, 'select'> {
  select: MultipleSelectProps['select'] & {
    variant: 'group'
    multiple: true
  }
}

export const CheckboxGroup = ({
  select: {
    label,
    disambiguatingLabel,
    description,
    descriptionVariant,
    actionId,
    initialValues,
    options,
  },
}: MultipleSelectProps) => {
  const checkboxGroupStyles = useCheckboxGroupStyles()
  const commonStyles = useCommonStyles()
  const textBlockStyles = useTextBlockStyles()
  const labelId = makeId(actionId, 'label')
  const descriptionId = makeId(actionId, 'description')

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
      role="none"
      className={cx(
        commonStyles.centerBlock,
        commonStyles.mainContentWidth,
        checkboxGroupStyles.root
      )}
    >
      <Label
        id={labelId}
        className={cx(
          checkboxGroupStyles.label,
          textBlockStyles.inputMetaSpacing
        )}
      >
        <InlineContent inlines={label} />
      </Label>
      {description && (
        <Paragraph
          paragraph={description}
          contextualId={descriptionId}
          visuallyHidden={descriptionVariant === 'visuallyHidden'}
          contextualVariant="inputMeta"
        />
      )}
      <div
        role="group"
        className={checkboxGroupStyles.checkboxGroup}
        {...(disambiguatingLabel
          ? { 'aria-label': disambiguatingLabel }
          : { 'aria-labelledby': labelId })}
        {...(description && { 'aria-describedby': descriptionId })}
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
    </div>
  )
}

export type CheckboxGroupElement = ReactElement<
  CheckboxProps,
  typeof CheckboxGroup
>
export type CheckboxGroupPropsOrElement = CheckboxProps | CheckboxGroupElement

function isCheckboxGroupProps(o: any): o is CheckboxProps {
  return 'select' in o && o.select.variant === 'group' && o.select.multiple
}

function isCheckboxGroupElement(o: any): o is CheckboxGroupElement {
  return o?.type === CheckboxGroup
}

export function renderIfCheckboxGroup(o: any) {
  return isCheckboxGroupProps(o) ? (
    <CheckboxGroup {...o} />
  ) : isCheckboxGroupElement(o) ? (
    o
  ) : null
}
