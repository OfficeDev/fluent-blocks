import { z } from 'zod'
import { inlineSequenceOrString } from '../inlines'

export const inputProps = z.object({
  label: inlineSequenceOrString,
  actionId: z.string(),
  required: z.boolean().optional(),
})

export const actionProps = z.object({})

export const inputPropsWithInitialStringValue = inputProps.merge(
  z.object({
    initialValue: z.string().nonempty().optional().nullable(),
  })
)

export const textInputProps = inputPropsWithInitialStringValue.merge(
  z.object({
    type: z.literal('text'),
    placeholder: z.string().optional(),
  })
)

export const labeledValueProps = z.object({
  value: z.string().nonempty(),
  label: inlineSequenceOrString,
})
