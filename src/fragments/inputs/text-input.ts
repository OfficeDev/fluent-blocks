import { z } from 'zod'
import { inputPropsWithInitialStringValue } from './input-properties'

const textInputProps = inputPropsWithInitialStringValue.merge(
  z.object({
    placeholder: z.string().optional(),
  })
)

export const shortTextInputProps = textInputProps.merge(
  z.object({
    multiline: z.literal(false).optional(),
  })
)

export const multilineTextInputProps = textInputProps.merge(
  z.object({
    placeholder: z.string().optional(),
    multiline: z.literal(true),
  })
)
