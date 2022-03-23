import { InlineSequenceOrString } from '../inlines'

export interface DescriptionListItemProps {
  title: InlineSequenceOrString
  description: InlineSequenceOrString
}

export interface DescriptionListProps {
  descriptionList: DescriptionListItemProps[]
}
