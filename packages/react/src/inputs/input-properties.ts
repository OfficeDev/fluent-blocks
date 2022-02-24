import { z } from 'zod'

export const shortInputContextualVariants = z
  .object({
    contextualVariant: z
      .union([
        z.literal('block-inputs'),
        z.literal('card-inputs'),
        z.literal('narrow-inputs'),
        z.literal('tabs'),
      ])
      .default('block-inputs'),
    selected: z.boolean().default(false),
    controls: z.string(),
  })
  .partial()
