import { ReactElement } from 'react'

import { RadioGroupProps as NaturalRadioGroupProps } from '@fluent-blocks/schemas'
import {
  RadioGroup as FluentRadioGroup,
  Label,
  Radio,
  mergeClasses as cx,
  makeStyles,
} from '@fluentui/react-components'

import { Paragraph } from '../../blocks'
import { InlineContent } from '../../inlines'
import { makeId, useCommonStyles, useTextBlockStyles } from '../../lib'
import { WithDescribedInputElements } from '../../props'

export interface RadioGroupInnerProps
  extends WithDescribedInputElements<NaturalRadioGroupProps['radioGroup']> {}

export interface RadioGroupProps
  extends Omit<NaturalRadioGroupProps, 'radioGroup'> {
  radioGroup: RadioGroupInnerProps
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
  radioGroup: {
    label,
    disambiguatingLabel,
    description,
    descriptionVariant,
    actionId,
    initialValue,
    options,
  },
}: RadioGroupProps) => {
  const radioGroupStyles = useRadioGroupStyles()
  const commonStyles = useCommonStyles()
  const textBlockStyles = useTextBlockStyles()
  const labelId = makeId(actionId, 'label')
  const descriptionId = makeId(actionId, 'description')
  return (
    <div
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
        {...(disambiguatingLabel
          ? { 'aria-label': disambiguatingLabel }
          : { 'aria-labelledby': labelId })}
      >
        {options.map(({ value, label }) => (
          <Radio
            key={value}
            {...{ value, label: <InlineContent inlines={label} /> }}
          />
        ))}
      </FluentRadioGroup>
    </div>
  )
}

export type RadioGroupElement = ReactElement<RadioGroupProps, typeof RadioGroup>
export type RadioGroupPropsOrElement = RadioGroupProps | RadioGroupElement

function isRadioGroupProps(o: any): o is RadioGroupProps {
  return 'radioGroup' in o
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
