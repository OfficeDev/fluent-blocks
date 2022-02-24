import { z, ZodTypeAny } from 'zod'
import { textInputPropsShape } from './input-properties'

export const multilineTextInputProps = (inlineSequenceType?: ZodTypeAny) =>
  z.object({
    ...textInputPropsShape(inlineSequenceType),
    multiline: z.literal(true),
  })
