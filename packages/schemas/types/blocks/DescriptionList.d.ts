import { DescribedInlineSequenceOrString } from '../inlines'

export interface DescriptionListItemProps {
  title: DescribedInlineSequenceOrString
  description: DescribedInlineSequenceOrString
}

export interface DescriptionListProps {
  descriptionList: DescriptionListItemProps[]
  sizeVariant?: 1 | 2 | 3 | '1' | '2' | '3'
}
