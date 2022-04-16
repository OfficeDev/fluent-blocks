import { ReactElement } from 'react'

import { ShortTextInputProps as NaturalShortTextInputProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'
// todo: fix this import when it stabilizes
import { Input, Label } from '@fluentui/react-components/unstable'

import { Inline, InlineContent } from '../../inlines'
import { rem, sx, useCommonStyles } from '../../lib'
import { ShortInputContextualProps, WithInputElements } from '../../props'

export interface ShortTextInputProps
  extends WithInputElements<NaturalShortTextInputProps>,
    ShortInputContextualProps {
  contextualElevationVariant?: 'surface' | 'elevated'
}

const useShortTextInputStyles = makeStyles({
  root: {
    minWidth: rem(140),
    ...sx.flex(1, 0, '0'),
  },
  'root--toolbar-item': {
    ...sx.flex(0, 1, rem(240)),
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
  inputType,
  before,
  after,
  initialValue,
  labelVisuallyHidden,
  contextualVariant = 'block-inputs',
  contextualElevationVariant = 'surface',
}: ShortTextInputProps) => {
  const shortTextInputStyles = useShortTextInputStyles()
  const commonStyles = useCommonStyles()
  return (
    <div
      className={cx(
        shortTextInputStyles.root,
        contextualVariant === 'toolbar-item' &&
          shortTextInputStyles['root--toolbar-item']
      )}
    >
      <Label
        htmlFor={actionId}
        className={cx(
          shortTextInputStyles.label,
          labelVisuallyHidden && commonStyles.visuallyHidden
        )}
      >
        <InlineContent inlines={label} />
      </Label>
      <Input
        {...{
          id: actionId,
          placeholder,
          defaultValue: initialValue,
          type: inputType || 'text',
          ...(before && { contentBefore: Inline(before) }),
          ...(after && { contentAfter: Inline(after) }),
        }}
        appearance={(() => {
          switch (contextualElevationVariant) {
            case 'elevated':
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
