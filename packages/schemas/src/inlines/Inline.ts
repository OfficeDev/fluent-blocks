import { z } from 'zod'
import { textProps } from './Text'
import { iconProps } from './Icon'

export const inlineEntity = z.union([z.string(), textProps, iconProps])

export const inlineSequence = z.array(inlineEntity)

export const inlineSequenceOrString = z.union([z.string(), inlineSequence])

export const inlineContentProps = z.object({
  inlines: inlineSequenceOrString,
})
