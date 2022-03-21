import { z } from 'zod'
import { ReactElement } from 'react'
import { makeStyles } from '@fluentui/react-components'
import { shortTextInputProps as naturalShortTextInputProps } from '@fluent-blocks/schemas'

// todo: fix this import when it stabilizes
import { Input, Label } from '@fluentui/react-components/unstable'

import { propsElementUnion, rem, sx } from '../../lib'
import { labelWithElements } from '../input-properties'
import { Inline, InlineContent, inlineEntity } from '../../inlines'

export const shortTextInputProps = naturalShortTextInputProps
  .merge(labelWithElements)
  .merge(
    z.object({
      before: inlineEntity.optional(),
      after: inlineEntity.optional(),
    })
  )
  .extend({
    contextualVariant: z
      .union([z.literal('block-inputs'), z.literal('card')])
      .default('block-inputs')
      .optional(),
  })
export type ShortTextInputProps = z.infer<typeof shortTextInputProps>

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

function isShortTextInputProps(o: any): o is ShortTextInputProps {
  return 'type' in o && o.type === 'text' && !('multiline' in o && o.multiline)
}

function isShortTextInputElement(
  o: any
): o is ReactElement<ShortTextInputProps, typeof ShortTextInput> {
  return o?.type === ShortTextInput && isShortTextInputProps(o?.props)
}

export const shortTextInputPropsOrElement = propsElementUnion<
  typeof shortTextInputProps,
  typeof ShortTextInput
>(shortTextInputProps)
export type ShortTextInputPropsOrElement = z.infer<
  typeof shortTextInputPropsOrElement
>

export function renderIfShortTextInput(o: any) {
  return isShortTextInputProps(o) ? (
    <ShortTextInput {...o} />
  ) : isShortTextInputElement(o) ? (
    o
  ) : null
}
