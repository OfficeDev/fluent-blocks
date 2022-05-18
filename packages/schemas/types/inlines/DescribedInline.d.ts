import { DescribedIconProps } from './Icon'
import { LinkProps } from './Link'
import { DescribedTextProps } from './Text'

export type DescribedInlineEntity =
  | string
  | DescribedTextProps
  | DescribedIconProps
  | LinkProps
export type DescribedInlineSequence = DescribedInlineEntity[]
export type DescribedInlineSequenceOrString = string | DescribedInlineSequence
export interface DescribedInlineContentProps {
  inlines: DescribedInlineSequenceOrString
}
