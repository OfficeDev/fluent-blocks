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
