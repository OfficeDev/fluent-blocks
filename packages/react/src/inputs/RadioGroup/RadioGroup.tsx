import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { radioGroupProps as naturalRadioGroupProps } from '@fluent-blocks/schemas'

// todo: fix this import when it stabilizes
import {
  RadioGroup as FluentRadioGroup,
  Radio,
  Label,
} from '@fluentui/react-components/unstable'

import { propsElementUnion, useCommonStyles } from '../../lib'
import { labelWithElements } from '../input-properties'
import { InlineContent } from '../../inlines'

export const radioGroupProps = naturalRadioGroupProps.merge(labelWithElements)
export type RadioGroupProps = z.infer<typeof radioGroupProps>

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
  const labelId = `${actionId}__label`
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

function isRadioGroupProps(o: any): o is RadioGroupProps {
  return 'type' in o && o.type === 'radio-group'
}

function isRadioGroupElement(
  o: any
): o is ReactElement<RadioGroupProps, typeof RadioGroup> {
  return o?.type === RadioGroup
}

export const radioGroupPropsOrElement = propsElementUnion<
  typeof radioGroupProps,
  typeof RadioGroup
>(radioGroupProps)
export type RadioGroupPropsOrElement = z.infer<typeof radioGroupPropsOrElement>

export function renderIfRadioGroup(o: any) {
  return isRadioGroupProps(o) ? (
    <RadioGroup {...o} />
  ) : isRadioGroupElement(o) ? (
    o
  ) : null
}
