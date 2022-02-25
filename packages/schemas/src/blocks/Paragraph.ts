import { z } from 'zod'
import { inlineSequenceOrString } from '../inlines'

export const paragraphProps = z.object({
  paragraph: inlineSequenceOrString,
})
