import get from 'lodash/get'
import { ReactElement, useEffect, useRef, useState } from 'react'

import {
  ShortTextInputProps as NaturalShortTextInputProps,
  SingleValueInputActionPayload,
} from '@fluent-blocks/schemas'
import {
  Input,
  Label,
  mergeClasses as cx,
  makeStyles,
} from '@fluentui/react-components'

import { Inline, InlineContent } from '../../inlines'
import {
  makeLabelId,
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

export interface ShortTextInputInnerProps
  extends WithInputElements<NaturalShortTextInputProps['textInput']>,
    WithActionHandler<SingleValueInputActionPayload> {}

export interface ShortTextInputProps
  extends Omit<NaturalShortTextInputProps, 'textInput'>,
    ShortInputContextualProps {
  textInput: ShortTextInputInnerProps
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
    '& .fuib-Icon': { fontSize: '1rem' },
  },
})

export const ShortTextInput = ({
  textInput: {
    label,
    disambiguatingLabel,
    actionId,
    placeholder,
    inputType,
    before,
    after,
    autocomplete,
    initialValue,
    labelVariant = 'block',
    onAction,
  },
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

  const labelId = makeLabelId(actionId)

  return (
    <div
      className={cx(
        shortTextInputStyles.root,
        contextualVariant === 'toolbar-item' &&
          shortTextInputStyles['root--toolbar-item']
      )}
    >
      <Label
        id={labelId}
        className={cx(
          shortTextInputStyles.label,
          labelVariant === 'block' && commonStyles.visuallyHidden
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
          ...(autocomplete && { autocomplete }),
          ...(disambiguatingLabel
            ? { 'aria-label': disambiguatingLabel }
            : { 'aria-labelledby': labelId }),
        }}
        appearance={
          contextualElevationVariant === 'elevated'
            ? 'filled-darker'
            : 'filled-lighter'
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
  return (
    'textInput' in o && !('multiline' in o.textInput && o.textInput.multiline)
  )
}

function isShortTextInputElement(o: any): o is ShortTextInputElement {
  return o?.type === ShortTextInput
}

export function renderIfShortTextInput(o: any) {
  return isShortTextInputProps(o) ? (
    <ShortTextInput {...o} />
  ) : isShortTextInputElement(o) ? (
    o
  ) : null
}
