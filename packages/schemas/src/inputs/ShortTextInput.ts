import { z } from 'zod'
import { textInputProps } from './input-properties'

export const shortTextInputProps = textInputProps.merge(
  z.object({
    multiline: z.literal(false).optional(),
  })
)
