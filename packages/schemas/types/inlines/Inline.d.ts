import { AvatarProps } from './Avatar'
import { IconProps } from './Icon'
import { TextProps } from './Text'

export type InlineEntity = string | TextProps | IconProps | AvatarProps
export type InlineSequence = InlineEntity[]
export type InlineSequenceOrString = string | InlineSequence
export interface InlineContentProps {
  inlines: InlineSequenceOrString
}
