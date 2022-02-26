import { z } from 'zod'
import { inlineSequenceOrString } from '../inlines'

export const descriptionListItemProps = z.object({
  title: inlineSequenceOrString,
  description: inlineSequenceOrString,
})

export const descriptionListProps = z.object({
  descriptionList: z.array(descriptionListItemProps),
})
