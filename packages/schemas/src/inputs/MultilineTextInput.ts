import { z } from 'zod'
import { textInputProps } from './input-properties'

export const multilineTextInputProps = textInputProps.merge(
  z.object({
    multiline: z.literal(true),
  })
)
