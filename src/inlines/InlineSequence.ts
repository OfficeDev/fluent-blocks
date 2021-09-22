import { z } from 'zod'
import { textProps } from './Text'
import { iconProps } from './Icon'

export const inlineProps = z.union([textProps, iconProps])

export const inlineSequence = z.array(inlineProps)

export type InlineSequence = z.infer<typeof inlineSequence>
