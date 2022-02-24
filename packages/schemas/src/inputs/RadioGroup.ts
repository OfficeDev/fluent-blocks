import { z, ZodTypeAny } from 'zod'
import {
  inputPropsWithInitialStringValueShape,
  labeledValuePropsShape,
} from './input-properties'

export const radioGroupProps = (inlineSequenceType?: ZodTypeAny) =>
  z.object({
    ...inputPropsWithInitialStringValueShape(inlineSequenceType),
    type: z.literal('radio-group'),
    options: z
      .array(z.object(labeledValuePropsShape(inlineSequenceType)))
      .min(2),
  })
