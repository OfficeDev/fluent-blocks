import { IconProps } from './Icon'
import { LinkProps } from './Link'
import { TextProps } from './Text'

export type InlineEntity = string | TextProps | IconProps | LinkProps
export type InlineSequence = InlineEntity[]
export type InlineSequenceOrString = string | InlineSequence
export interface InlineContentProps {
  inlines: InlineSequenceOrString
}
