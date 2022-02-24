import { z, ZodTypeAny } from 'zod'
import { inlineSequenceOrString } from '../inlines'

const naturalInlineSequenceType = inlineSequenceOrString()

export const inputPropsShape = (inlineSequenceType?: ZodTypeAny) => ({
  label: inlineSequenceType || naturalInlineSequenceType,
  actionId: z.string(),
  required: z.boolean().optional(),
})

export const inputPropsWithInitialStringValueShape = (
  inlineSequenceType?: ZodTypeAny
) => ({
  ...inputPropsShape(inlineSequenceType),
  initialValue: z.string().nonempty().optional().nullable(),
})

export const textInputPropsShape = (inlineSequenceType?: ZodTypeAny) => ({
  ...inputPropsWithInitialStringValueShape(inlineSequenceType),
  type: z.literal('text'),
  placeholder: z.string().optional(),
})

export const labeledValuePropsShape = (inlineSequenceType?: ZodTypeAny) => ({
  value: z.string().nonempty(),
  label: inlineSequenceType || naturalInlineSequenceType,
})
