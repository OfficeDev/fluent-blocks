import { z } from 'zod'
import { buttonProps, shortTextInputProps } from '../inputs'

export const shortInputEntity = z.union([shortTextInputProps, buttonProps])

export const shortInputSequence = z.array(shortInputEntity)

export const shortInputsProps = z.object({
  inputs: shortInputSequence,
  variant: z
    .union([z.literal('flex'), z.literal('narrow-block')])
    .default('flex')
    .optional(),
})
