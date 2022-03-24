import { ReactElement } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import { ShortInputsProps as NaturalShortInputsProps } from '@fluent-blocks/schemas'

import {
  EscapeElement,
  invalidShortInput,
  rem,
  renderIfEscape,
  Sequence,
  sx,
  useCommonStyles,
} from '../../lib'
import {
  ButtonPropsOrElement,
  renderIfButton,
  renderIfShortTextInput,
  ShortTextInputPropsOrElement,
} from '../../inputs'

export type ShortInputEntity =
  | ShortTextInputPropsOrElement
  | ButtonPropsOrElement
  | EscapeElement

export type ShortInputSequence = ShortInputEntity[]

export interface ShortInputsProps
  extends Omit<NaturalShortInputsProps, 'inputs'> {
  inputs: ShortInputSequence
  contextualVariant?: 'card' | 'block'
}

const useShortInputsStyles = makeStyles({
  root: {
    marginBlockStart: '.5rem',
    marginBlockEnd: '1rem',
  },
  cardContext: {
    marginInlineStart: '-.5rem',
    marginInlineEnd: '-.5rem',
    marginBlockEnd: 0,
  },
  'shortInputSequence--flex': {
    display: 'flex',
    alignItems: 'flex-end',
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

export type ShortInputsElement = ReactElement<
  ShortInputsProps,
  typeof ShortInputs
>
export type ShortInputsPropsOrElement = ShortInputsProps | ShortInputsElement

function isShortInputsProps(o: any): o is ShortInputsProps {
  return 'inputs' in o
}

function isShortInputsElement(o: any): o is ShortInputsElement {
  return o?.type === ShortInputs
}

export function renderIfShortInputs(o: any) {
  return isShortInputsProps(o) ? (
    <ShortInputs {...o} />
  ) : isShortInputsElement(o) ? (
    o
  ) : null
}
