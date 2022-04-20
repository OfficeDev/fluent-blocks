import get from 'lodash/get'
import { ReactElement, useEffect, useRef, useState } from 'react'

import {
  ShortTextInputProps as NaturalShortTextInputProps,
  SingleValueInputActionPayload,
} from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'
// todo: fix this import when it stabilizes
import { Input, Label } from '@fluentui/react-components/unstable'

import { Inline, InlineContent } from '../../inlines'
import {
  rem,
  sx,
  useCommonStyles,
  useDebounce,
  useFluentBlocksContext,
} from '../../lib'
import {
  ShortInputContextualProps,
  WithActionHandler,
  WithInputElements,
} from '../../props'

export interface ShortTextInputProps
  extends WithInputElements<NaturalShortTextInputProps>,
    WithActionHandler<SingleValueInputActionPayload>,
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
  input: {
    width: '100%',
  },
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
  onAction,
  contextualVariant = 'block-inputs',
  contextualElevationVariant = 'surface',
}: ShortTextInputProps) => {
  const shortTextInputStyles = useShortTextInputStyles()
  const commonStyles = useCommonStyles()
  const [value, setValue] = useState(initialValue || '')
  const debouncedValue = useDebounce(value, 400)
  const didMount = useRef(false)
  const { onAction: contextOnAction } = useFluentBlocksContext()

  useEffect(() => {
    if (didMount.current) {
      const payload = {
        actionId,
        type: 'change' as 'change',
        value: debouncedValue,
      }
      onAction ? onAction(payload) : contextOnAction(payload)
    } else {
      didMount.current = true
    }
  }, [debouncedValue])

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
          value,
          onChange: ({ target }) => setValue(get(target, 'value', '')),
          type: inputType || 'text',
          ...(before && { contentBefore: Inline(before) }),
          ...(after && { contentAfter: Inline(after) }),
          className: shortTextInputStyles.input,
        }}
        appearance={
          contextualElevationVariant === 'elevated'
            ? 'filledDarker'
            : 'filledLighter'
        }
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
