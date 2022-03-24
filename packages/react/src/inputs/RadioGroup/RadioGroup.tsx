import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { RadioGroupProps as NaturalRadioGroupProps } from '@fluent-blocks/schemas'

// todo: fix this import when it stabilizes
import {
  RadioGroup as FluentRadioGroup,
  Radio,
  Label,
} from '@fluentui/react-components/unstable'

import { makeLabelId, useCommonStyles } from '../../lib'
import { WithInputElements } from '../input-properties'
import { InlineContent } from '../../inlines'

export interface RadioGroupProps
  extends WithInputElements<NaturalRadioGroupProps> {}

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
  label,
  actionId,
  initialValue,
  options,
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
  return 'type' in o && o.type === 'radio-group'
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
