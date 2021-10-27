import { z } from 'zod'
import { inlineSequence } from '../inlines'

export const inputProps = z.object({
  label: inlineSequence,
  required: z.boolean().optional(),
})

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
  label: inlineSequence,
})
