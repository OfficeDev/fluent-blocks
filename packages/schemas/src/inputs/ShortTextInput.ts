import { z } from 'zod'
import { textInputProps } from './input-properties'
import { inlineEntity } from '../inlines'

export const shortTextInputProps = textInputProps.merge(
  z.object({
    before: inlineEntity.optional(),
    after: inlineEntity.optional(),
    multiline: z.literal(false).optional(),
  })
)
