import { ReactElement } from 'react'

import { RadioGroupProps as NaturalRadioGroupProps } from '@fluent-blocks/schemas'
import {
  RadioGroup as FluentRadioGroup,
  Label,
  Radio,
  mergeClasses as cx,
  makeStyles,
} from '@fluentui/react-components'

import { InlineContent } from '../../inlines'
import { makeLabelId, useCommonStyles } from '../../lib'
import { WithInputElements } from '../../props'

export interface RadioGroupInnerProps
  extends WithInputElements<NaturalRadioGroupProps['radioGroup']> {}

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
    color: 'var(--surface-foreground)',
  },
})

export const RadioGroup = ({
  radioGroup: { label, actionId, initialValue, options },
}: RadioGroupProps) => {
  const radioGroupStyles = useRadioGroupStyles()
  const commonStyles = useCommonStyles()
  const labelId = makeLabelId(actionId)
  return (
    <div
      className={cx(
        commonStyles.centerBlock,
        commonStyles.mainContentWidth,
        radioGroupStyles.root
      )}
    >
      <Label id={labelId} className={radioGroupStyles.label}>
        <InlineContent inlines={label} />
      </Label>
      <FluentRadioGroup
        defaultValue={initialValue}
        aria-labelledby={labelId}
        className={radioGroupStyles.radioGroup}
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
