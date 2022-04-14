import { ReactElement } from 'react'

import { ShortTextInputProps as NaturalShortTextInputProps } from '@fluent-blocks/schemas'
import { makeStyles } from '@fluentui/react-components'
// todo: fix this import when it stabilizes
import { Input, Label } from '@fluentui/react-components/unstable'

import { Inline, InlineContent } from '../../inlines'
import { rem, sx } from '../../lib'
import { WithInputElements } from '../../props'

export interface ShortTextInputProps
  extends WithInputElements<NaturalShortTextInputProps> {
  contextualVariant?: 'block-inputs' | 'card'
}

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
  inputType,
  before,
  after,
  initialValue,
  contextualVariant = 'block-inputs',
}: ShortTextInputProps) => {
  const shortTextInputStyles = useShortTextInputStyles()
  return (
    <div className={shortTextInputStyles.root}>
      <Label htmlFor={actionId} className={shortTextInputStyles.label}>
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
          switch (contextualVariant) {
            case 'card':
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
