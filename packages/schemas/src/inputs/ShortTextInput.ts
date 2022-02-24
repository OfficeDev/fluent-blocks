import { z, ZodTypeAny } from 'zod'
import { textInputPropsShape } from './input-properties'

export const shortTextInputProps = (inlineSequenceType?: ZodTypeAny) =>
  z.object({
    ...textInputPropsShape(inlineSequenceType),
    multiline: z.literal(false).optional(),
  })
