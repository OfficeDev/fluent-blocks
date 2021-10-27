import { z } from 'zod'
import {
  invalidShortInput,
  propsElementUnion,
  useCommonStyles,
} from '../../lib'
import { renderIfShortTextInput, shortTextInputProps } from '../../inputs'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { ReactElement } from 'react'

const shortInputsProps = z.object({
  inputs: z.array(shortTextInputProps).min(1),
})
export type ShortInputsProps = z.infer<typeof shortInputsProps>

const useShortInputsStyles = makeStyles({
  root: {
    marginBlockEnd: '.5rem',
  },
  shortInputSeries: {
    display: 'flex',
    flexFlow: 'row wrap',
    marginInlineEnd: '-.5rem',
    marginBlockEnd: '-.5rem',
  },
})

export const ShortInputs = (props: ShortInputsProps) => {
  const { inputs } = props
  const styles = useShortInputsStyles()
  const commonStyles = useCommonStyles()
  return (
    <div className={cx(commonStyles.mainContentWidth, styles.root)}>
      <div className={styles.shortInputSeries}>
        {inputs.map((o) => renderIfShortTextInput(o) || invalidShortInput(o))}
      </div>
    </div>
  )
}

function isShortInputsProps(o: any): o is ShortInputsProps {
  return 'inputs' in o
}

function isShortInputsElement(
  o: any
): o is ReactElement<ShortInputsProps, typeof ShortInputs> {
  return o?.type === ShortInputs
}

export const shortInputsPropsOrElement = propsElementUnion<
  typeof shortInputsProps,
  ShortInputsProps,
  typeof ShortInputs
>(shortInputsProps)
export type ShortInputsPropsOrElement = z.infer<
  typeof shortInputsPropsOrElement
>

export function renderIfShortInputs(o: any) {
  return isShortInputsProps(o) ? (
    <ShortInputs {...o} />
  ) : isShortInputsElement(o) ? (
    o
  ) : null
}
