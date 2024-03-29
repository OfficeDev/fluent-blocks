import get from 'lodash/get'
import { ReactElement, useCallback, useEffect, useRef } from 'react'

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
import { Inline, InlineEntity } from '../../inlines'
import { InputLabelContent } from '../../internal'
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
import { useValidation } from '../../lib/useValidation'
import {
  ShortInputContextualProps,
  TextInputProps,
  WithActionHandler,
  WithInputElements,
} from '../../props'

export interface ShortTextInputInnerProps
  extends WithInputElements<
      Omit<
        NaturalShortTextInputProps['textInput'],
        'before' | 'after' | 'initialValidation' | 'validator' | 'description'
      >
    >,
    TextInputProps,
    WithActionHandler<SingleValueInputActionPayload> {
  before?: InlineEntity
  after?: InlineEntity
}

export interface ShortTextInputProps
  extends Omit<NaturalShortTextInputProps, 'textInput'>,
    ShortInputContextualProps {
  textInput: ShortTextInputInnerProps
}

const inputValidationStyle = (color: string) => ({
  ...sx.borderColor(color),
  '&:hover, &:focus-within': {
    // v9/Griffel offers no alternative to !important here.
    ...sx.borderColor(`${color} !important`),
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
  'validation-hc--valid': {
    // this intentionally does not apply a border
  },
  'validation-hc--pending': {
    // this intentionally does not apply a border
  },
  'validation-hc--invalid': inputValidationStyle(
    'var(--colorBrandForegroundLink)'
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
  'validationMessage-hc--valid': {
    '& > p': {
      color: 'var(--colorNeutralForeground1)',
    },
  },
  'validationMessage-hc--invalid': {
    '& > p': {
      color: 'var(--colorBrandForegroundLink)',
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
    initialValidation,
    validator,
    required,
  },
  contextualVariant = 'block-inputs',
  contextualElevationVariant = 'surface',
}: ShortTextInputProps) => {
  const shortTextInputStyles = useShortTextInputStyles()
  const shortInputStyles = useShortInputStyles()
  const commonStyles = useCommonStyles()
  const textBlockStyles = useTextBlockStyles()
  const didMount = useRef(false)
  const [value, setValue, validation] = useValidation(
    didMount,
    initialValue,
    initialValidation,
    validator
  )
  const debouncedValue = useDebounce(value, 400)
  const { onAction: contextOnAction, themeName } = useFluentBlocksContext()

  useEffect(() => {
    putInputValue(actionId, initialValue || '')
    return () => deleteInputValue(actionId)
  }, [actionId, initialValue])

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

  useEffect(() => onChange(debouncedValue), [debouncedValue, onChange])

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
        <InputLabelContent label={label} required={required} />
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
            !!validation &&
              shortTextInputStyles[
                `validation${themeName === 'highContrast' ? '-hc' : ''}--${
                  validation.valence
                }`
              ]
          ),
          ...(autocomplete && { autocomplete }),
          ...(disambiguatingLabel
            ? { 'aria-label': disambiguatingLabel }
            : { 'aria-labelledby': labelId }),
          ...(description && { 'aria-describedby': descriptionId }),
          ...(validation &&
            (validation.valence === 'valid'
              ? { 'aria-invalid': false }
              : {
                  'aria-invalid': true,
                  'aria-errormessage': validationId,
                })),
          'aria-required': !!required,
        }}
        appearance={
          contextualElevationVariant === 'elevated'
            ? 'filled-darker'
            : 'filled-lighter'
        }
      />
      {validation && (
        <div
          className={cx(
            shortTextInputStyles.validationMessage,
            validation.valence !== 'pending' &&
              shortTextInputStyles[
                `validationMessage${
                  themeName === 'highContrast' ? '-hc' : ''
                }--${validation.valence}`
              ]
          )}
        >
          {validation.valence !== 'pending' && (
            <Paragraph
              paragraph={validation.message}
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
