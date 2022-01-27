import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import {
  escapeElement,
  invalidShortInput,
  propsElementUnion,
  renderIfEscape,
  Sequence,
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

const shortInputsProps = z
  .object({
    inputs: shortInputSequence,
    variant: z
      .union([z.literal('flex'), z.literal('narrow-block')])
      .default('flex')
      .optional(),
  })
  .merge(
    z
      .object({
        contextualVariant: z
          .union([z.literal('card'), z.literal('block')])
          .default('block'),
      })
      .partial()
  )
export type ShortInputsProps = z.infer<typeof shortInputsProps>

const useShortInputsStyles = makeStyles({
  root: {
    marginBlockEnd: '.5rem',
  },
  cardContext: {
    marginInlineStart: '-.5rem',
    marginInlineEnd: '-.5rem',
  },
  'shortInputSequence--flex': {
    display: 'flex',
    flexFlow: 'row wrap',
    gap: '.5rem',
  },
  'shortInputSequence--narrow-block': {
    marginBlockStart: '.5rem',
    '& > *': {
      marginBlockEnd: '.5rem',
    },
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
