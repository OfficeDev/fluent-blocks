import { TextProps } from './Text'
import { IconProps } from './Icon'

export type InlineEntity = string | TextProps | IconProps
export type InlineSequence = InlineEntity[]
export type InlineSequenceOrString = string | InlineSequence
export interface InlineContentProps {
  inlines: InlineSequenceOrString
}
