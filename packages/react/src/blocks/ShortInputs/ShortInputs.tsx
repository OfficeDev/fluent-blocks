import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { shortInputsProps as naturalShortInputsProps } from '@fluent-blocks/schemas'

import {
  escapeElement,
  invalidShortInput,
  propsElementUnion,
  rem,
  renderIfEscape,
  Sequence,
  sx,
  useCommonStyles,
} from '../../lib'
import {
  buttonPropsOrElement,
  renderIfButton,
  renderIfShortTextInput,
  shortTextInputPropsOrElement,
} from '../../inputs'

export const shortInputEntity = z.union([
  shortTextInputPropsOrElement,
  buttonPropsOrElement,
  escapeElement,
])
export type ShortInputEntity = z.infer<typeof shortInputEntity>

export const shortInputSequence = z.array(shortInputEntity)
export type ShortInputSequence = z.infer<typeof shortInputSequence>

export const shortInputsProps = naturalShortInputsProps
  .merge(
    z.object({
      inputs: shortInputSequence,
    })
  )
  .extend({
    contextualVariant: z
      .union([z.literal('card'), z.literal('block')])
      .default('block')
      .optional(),
  })
export type ShortInputsProps = z.infer<typeof shortInputsProps>
type Variants = ShortInputsProps['variant']

const useShortInputsStyles = makeStyles({
  root: {
    marginBlockEnd: '.5rem',
  },
  cardContext: {
    marginInlineStart: '-.5rem',
    marginInlineEnd: '-.5rem',
    marginBlockEnd: 0,
  },
  'shortInputSequence--flex': {
    display: 'flex',
    ...sx.flexFlow('row', 'wrap'),
    ...sx.gap('.5rem'),
  },
  'shortInputSequence--narrow-block': {
    marginBlockStart: rem(20),
    display: 'flex',
    ...sx.flexFlow('column', 'nowrap'),
    ...sx.gap('.5rem'),
  },
})

const ShortInput = (o: ShortInputEntity) =>
  renderIfShortTextInput(o) ||
  renderIfButton(o) ||
  renderIfEscape(o) ||
  invalidShortInput(o)

export const ShortInputs = (props: ShortInputsProps) => {
  const { inputs, variant = 'flex', contextualVariant = 'block' } = props
  const shortInputsStyles = useShortInputsStyles()
  const commonStyles = useCommonStyles()
  return (
    <div
      className={cx(
        commonStyles.centerBlock,
        commonStyles.mainContentWidth,
        shortInputsStyles.root,
        contextualVariant === 'card' && shortInputsStyles.cardContext
      )}
    >
      <div
        className={cx.apply(this, [
          shortInputsStyles[`shortInputSequence--${variant}`],
          ...(variant === 'narrow-block'
            ? [commonStyles.narrowWidth, commonStyles.centerBlock]
            : []),
        ])}
      >
        {Sequence<ShortInputEntity>(inputs, ShortInput, {
          contextualVariant:
            variant === 'narrow-block'
              ? 'narrow-inputs'
              : `${contextualVariant}-inputs`,
        })}
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
