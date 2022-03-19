import { z } from 'zod'
import { textInputProps } from './input-properties'
import { inlineEntity } from '../inlines'

export const shortTextInputProps = textInputProps.merge(
  z.object({
    inputType: z
      .union([
        z.literal('text'),
        z.literal('password'),
        z.literal('search'),
        z.literal('tel'),
        z.literal('email'),
        z.literal('url'),
        z.literal('number'),
        z.literal('time'),
        z.literal('date'),
        z.literal('month'),
        z.literal('week'),
        z.literal('datetime-local'),
      ])
      .optional(),
    before: inlineEntity.optional(),
    after: inlineEntity.optional(),
    multiline: z.literal(false).optional(),
  })
)
