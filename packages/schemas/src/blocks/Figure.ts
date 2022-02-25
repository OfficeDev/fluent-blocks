import { z } from 'zod'
import { mediaEntity } from '../media'
import { inlineSequenceOrString } from '../inlines'

export const figureProps = z.object({
  media: mediaEntity,
  caption: inlineSequenceOrString.optional(),
  captionHidden: z.boolean().optional(),
  variant: z
    .union([
      z.literal('viewportWidth'),
      z.literal('textWidth'),
      z.literal('narrow'),
    ])
    .default('viewportWidth')
    .optional(),
})
