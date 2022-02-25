import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { radioGroupProps as naturalRadioGroupProps } from '@fluentui/blocks-schemas'

import { Placeholder, propsElementUnion, useCommonStyles } from '../../lib'
import { labelWithElements } from '../input-properties'

export const radioGroupProps = naturalRadioGroupProps.merge(labelWithElements)
export type RadioGroupProps = z.infer<typeof radioGroupProps>

const useRadioGroupStyles = makeStyles({
  root: {
    marginBlockEnd: '.5rem',
  },
})

export const RadioGroup = (props: RadioGroupProps) => {
  const styles = useRadioGroupStyles()
  const commonStyles = useCommonStyles()
  return (
    <Placeholder
      label="Radio group"
      className={cx(
        commonStyles.centerBlock,
        commonStyles.mainContentWidth,
        styles.root
      )}
    />
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
