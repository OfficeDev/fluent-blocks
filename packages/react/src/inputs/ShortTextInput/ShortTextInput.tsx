import get from 'lodash/get'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'

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

import { Paragraph } from '../../blocks'
import {
  Inline,
  InlineContent,
  InlineEntity,
  InlineSequenceOrString,
} from '../../inlines'
import {
  deleteInputValue,
  makeId,
  makePayload,
  putInputValue,
  rem,
  sx,
  useCommonStyles,
  useDebounce,
  useFluentBlocksContext,
  useShortInputStyles,
  useTextBlockStyles,
} from '../../lib'
import {
  ShortInputContextualProps,
  WithActionHandler,
  WithInputElements,
} from '../../props'

export interface ShortTextInputInnerProps
  extends WithInputElements<
      Omit<
        NaturalShortTextInputProps['textInput'],
        'before' | 'after' | 'validationMessage'
      >
    >,
    WithActionHandler<SingleValueInputActionPayload> {
  before?: InlineEntity
  after?: InlineEntity
  validationMessage?: InlineSequenceOrString
}

export interface ShortTextInputProps
  extends Omit<NaturalShortTextInputProps, 'textInput'>,
    ShortInputContextualProps {
  textInput: ShortTextInputInnerProps
}

const inputValidationStyle = (color: string) => ({
  ...sx.border('1px', 'solid', color),
  '&:hover, &:focus-within': {
    ...sx.border('1px', 'solid', color),
  },
})

const useShortTextInputStyles = makeStyles({
  'root--toolbar-item': {
    ...sx.flex(0, 1, rem(240)),
  },
  label: {
    display: 'block',
  },
  'validation--valid': {
    // this intentionally does not apply a border
  },
  'validation--pending': {
    // this intentionally does not apply a border
  },
  'validation--invalid': inputValidationStyle(
    'var(--colorPaletteRedForeground1)'
  ),
  'input--no-block-siblings': {
    marginBlockStart: 0,
  },
  validationMessage: {
    minHeight: rem((16 * 20) / 14),
    marginTop: rem(4),
  },
  'validationMessage--valid': {
    '& > p': {
      color: 'var(--colorPaletteGreenForeground1)',
    },
  },
  'validationMessage--invalid': {
    '& > p': {
      color: 'var(--colorPaletteRedForeground1)',
    },
  },
})

export const ShortTextInput = ({
  textInput: {
    label,
    disambiguatingLabel,
    labelVariant = 'block',
    description,
    descriptionVariant = 'block',
    actionId,
    placeholder,
    inputType,
    before,
    after,
    autocomplete,
    initialValue,
    onAction,
    metadata,
    include,
    disabled,
    validationValence,
    validationMessage,
  },
  contextualVariant = 'block-inputs',
  contextualElevationVariant = 'surface',
}: ShortTextInputProps) => {
  const shortTextInputStyles = useShortTextInputStyles()
  const shortInputStyles = useShortInputStyles()
  const commonStyles = useCommonStyles()
  const textBlockStyles = useTextBlockStyles()
  const [value, setValue] = useState(initialValue || '')
  const debouncedValue = useDebounce(value, 400)
  const didMount = useRef(false)
  const { onAction: contextOnAction } = useFluentBlocksContext()

  useEffect(() => {
    putInputValue(actionId, initialValue || '')
    return () => deleteInputValue(actionId)
  }, [])

  const onChange = useCallback(
    (nextValue: string) => {
      putInputValue(actionId, nextValue)
      if (didMount.current) {
        const payload = makePayload(
          {
            actionId,
            type: 'change' as 'change',
            value: nextValue,
          },
          metadata,
          include
        )
        onAction ? onAction(payload) : contextOnAction(payload)
      } else {
        didMount.current = true
      }
    },
    [actionId, onAction, contextOnAction, metadata, include]
  )

  useEffect(() => onChange(debouncedValue), [debouncedValue])

  const labelId = makeId(actionId, 'label')
  const descriptionId = makeId(actionId, 'description')
  const validationId = makeId(actionId, 'validation')

  return (
    <div
      role="none"
      className={cx(
        shortInputStyles.root,
        contextualVariant === 'toolbar-item' &&
          shortTextInputStyles['root--toolbar-item']
      )}
    >
      <Label
        id={labelId}
        className={cx(
          shortTextInputStyles.label,
          textBlockStyles.inputMetaSpacing,
          labelVariant === 'visuallyHidden' && commonStyles.visuallyHidden
        )}
      >
        <InlineContent inlines={label} />
      </Label>
      {description && (
        <Paragraph
          paragraph={description}
          contextualId={descriptionId}
          visuallyHidden={descriptionVariant === 'visuallyHidden'}
          contextualVariant="inputMeta"
        />
      )}
      <Input
        {...{
          id: actionId,
          placeholder,
          disabled,
          value,
          onChange: ({ target }) => setValue(get(target, 'value', '')),
          type: inputType || 'text',
          ...(before && { contentBefore: Inline(before) }),
          ...(after && { contentAfter: Inline(after) }),
          className: cx(
            shortInputStyles.input,
            labelVariant === 'visuallyHidden' &&
              (!description || descriptionVariant === 'visuallyHidden') &&
              shortTextInputStyles['input--no-block-siblings'],
            validationValence &&
              shortTextInputStyles[`validation--${validationValence}`]
          ),
          ...(autocomplete && { autocomplete }),
          ...(disambiguatingLabel
            ? { 'aria-label': disambiguatingLabel }
            : { 'aria-labelledby': labelId }),
          ...(description && { 'aria-describedby': descriptionId }),
          ...(validationValence && validationValence === 'valid'
            ? { 'aria-invalid': false }
            : {
                'aria-invalid': true,
                ...(validationMessage && { 'aria-errormessage': validationId }),
              }),
        }}
        appearance={
          contextualElevationVariant === 'elevated'
            ? 'filled-darker'
            : 'filled-lighter'
        }
      />
      {validationValence && (
        <div
          className={cx(
            shortTextInputStyles.validationMessage,
            validationValence !== 'pending' &&
              shortTextInputStyles[`validationMessage--${validationValence}`]
          )}
        >
          {validationValence !== 'pending' && (
            <Paragraph
              paragraph={validationMessage || ''}
              contextualId={validationId}
              contextualVariant="inputMeta"
            />
          )}
        </div>
      )}
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
