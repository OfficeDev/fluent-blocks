import { ReactElement, useState } from 'react'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import {
  ExplicitlyLabeledShortTextInputProps as NaturalExplicitlyLabeledShortTextInputProps,
  ShortTextInputActionPayload,
  ShortTextInputLabeledByPlaceholderProps as NaturalShortTextInputLabeledByPlaceholderProps,
} from '@fluent-blocks/schemas'

// todo: fix this import when it stabilizes
import { Input, Label } from '@fluentui/react-components/unstable'

import { rem, sx, useCommonStyles, WithUpdatingActionHandler } from '../../lib'
import {
  ShortInputContextualProps,
  WithInputElements,
} from '../input-properties'
import { Inline, InlineContent } from '../../inlines'

export interface ExplicitlyLabeledShortTextInputProps
  extends WithInputElements<NaturalExplicitlyLabeledShortTextInputProps>,
    WithUpdatingActionHandler<ShortTextInputActionPayload>,
    ShortInputContextualProps {}

export interface ShortTextInputLabeledByPlaceholderProps
  extends NaturalShortTextInputLabeledByPlaceholderProps,
    WithUpdatingActionHandler<ShortTextInputActionPayload>,
    ShortInputContextualProps {}

export type ShortTextInputProps =
  | ExplicitlyLabeledShortTextInputProps
  | ShortTextInputLabeledByPlaceholderProps

const useShortTextInputStyles = makeStyles({
  root: {
    minWidth: rem(140),
    ...sx.flex(1, 0, '0'),
  },
  label: {
    color: 'var(--surface-foreground)',
  },
  input: {},
})

export const ShortTextInput = ({
  label,
  actionId,
  placeholder,
  placeholderIsLabel,
  inputType,
  before,
  after,
  initialValue,
  onAction,
  contextualVariant = 'block-inputs',
}: ShortTextInputProps) => {
  const shortTextInputStyles = useShortTextInputStyles()
  const commonStyles = useCommonStyles()
  const [internalValue, setInternalValue] = useState(initialValue || '')
  return (
    <div className={shortTextInputStyles.root}>
      <Label
        htmlFor={actionId}
        className={cx(
          shortTextInputStyles.label,
          placeholderIsLabel && commonStyles.visuallyHidden
        )}
      >
        <InlineContent inlines={label} />
      </Label>
      <Input
        {...{
          id: actionId,
          placeholder: placeholderIsLabel ? (label as string) : placeholder,
          value: internalValue,
          type: inputType || 'text',
          onChange: (_e, { value }) => {
            setInternalValue(value || '')
          },
          ...(before && { contentBefore: Inline(before) }),
          ...(after && { contentAfter: Inline(after) }),
          ...(onAction && {
            onKeyUp: ({ key }) =>
              key === 'Enter' &&
              setInternalValue(
                onAction({
                  type: 'activate',
                  actionId,
                  value: internalValue || '',
                }) || ''
              ),
          }),
        }}
        appearance={(() => {
          switch (contextualVariant) {
            case 'card-inputs':
              return 'filledDarker'
            default:
              return 'filledLighter'
          }
        })()}
      />
    </div>
  )
}

export type ShortTextInputElement = ReactElement<
  ShortTextInputProps,
  typeof ShortTextInput
>
export type ShortTextInputPropsOrElement =
  | ShortTextInputProps
  | ShortTextInputElement

function isShortTextInputProps(o: any): o is ShortTextInputProps {
  return 'type' in o && o.type === 'text' && !('multiline' in o && o.multiline)
}

function isShortTextInputElement(o: any): o is ShortTextInputElement {
  return o?.type === ShortTextInput && isShortTextInputProps(o?.props)
}

export function renderIfShortTextInput(o: any) {
  return isShortTextInputProps(o) ? (
    <ShortTextInput {...o} />
  ) : isShortTextInputElement(o) ? (
    o
  ) : null
}
