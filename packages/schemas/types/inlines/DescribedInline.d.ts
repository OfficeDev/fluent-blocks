import { AvatarProps } from './Avatar'
import { DescribedIconProps, IconProps } from './Icon'
import { LinkProps } from './Link'
import { DescribedTextProps, TextProps } from './Text'

export type DescribedInlineEntity =
  | string
  | DescribedTextProps
  | TextProps
  | DescribedIconProps
  | IconProps
  | AvatarProps
  | LinkProps
export type DescribedInlineSequence = DescribedInlineEntity[]
export type DescribedInlineSequenceOrString = string | DescribedInlineSequence
export interface DescribedInlineContentProps {
  inlines: DescribedInlineSequenceOrString
}
