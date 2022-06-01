import {
  FormEvent,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
} from 'react'

import {
  RadioGroup as FluentRadioGroup,
  Label,
  Radio,
  RadioGroupOnChangeData,
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
import { SingleSelectProps } from '../../../../props/select'

export interface RadioGroupProps extends Omit<SingleSelectProps, 'select'> {
  select: SingleSelectProps['select'] & {
    variant: 'group'
    multiple?: false
  }
}

const useRadioGroupStyles = makeStyles({
  root: {
    marginBlockStart: '.5rem',
    marginBlockEnd: '1rem',
  },
  radioGroup: {
    marginBlockStart: '.25rem',
  },
  label: {
    display: 'block',
  },
})

export const RadioGroup = ({
  select: {
    label,
    disambiguatingLabel,
    description,
    descriptionVariant,
    actionId,
    initialValue,
    options,
  },
}: SingleSelectProps) => {
  const radioGroupStyles = useRadioGroupStyles()
  const commonStyles = useCommonStyles()
  const textBlockStyles = useTextBlockStyles()
  const labelId = makeId(actionId, 'label')
  const descriptionId = makeId(actionId, 'description')

  useEffect(() => {
    putInputValue(actionId, initialValue || '')
    return () => deleteInputValue(actionId)
  }, [initialValue])

  const putRadioValue = useCallback(
    (_e: FormEvent<HTMLDivElement>, { value }: RadioGroupOnChangeData) =>
      putInputValue(actionId, value),
    [actionId]
  )

  return (
    <div
      role="none"
      className={cx(
        commonStyles.centerBlock,
        commonStyles.mainContentWidth,
        radioGroupStyles.root
      )}
    >
      <Label
        id={labelId}
        className={cx(radioGroupStyles.label, textBlockStyles.inputMetaSpacing)}
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
      <FluentRadioGroup
        defaultValue={initialValue}
        className={radioGroupStyles.radioGroup}
        onChange={putRadioValue}
        {...(disambiguatingLabel
          ? { 'aria-label': disambiguatingLabel }
          : { 'aria-labelledby': labelId })}
        {...(description && { 'aria-describedby': descriptionId })}
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
    </div>
  )
}

export type RadioGroupElement = ReactElement<RadioGroupProps, typeof RadioGroup>
export type RadioGroupPropsOrElement = RadioGroupProps | RadioGroupElement

function isRadioGroupProps(o: any): o is RadioGroupProps {
  return 'select' in o && o.select.variant === 'group' && !o.select.multiple
}

function isRadioGroupElement(o: any): o is RadioGroupElement {
  return o?.type === RadioGroup
}

export function renderIfRadioGroup(o: any) {
  return isRadioGroupProps(o) ? (
    <RadioGroup {...o} />
  ) : isRadioGroupElement(o) ? (
    o
  ) : null
}
