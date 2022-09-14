import { DescribedInlineSequenceOrString } from '../inlines'
import { MenuActionSequence } from '../lib/menu'
import { DescriptionListProps } from './DescriptionList'
import { FigureProps } from './Figure'
import { HeadingLevel } from './Heading'
import { ParagraphProps } from './Paragraph'
import { ShortInputsProps } from './ShortInputs'
import { TableProps } from './Table'
import { TabsProps } from './Tabs'

export type CardContentItemEntity =
  | ParagraphProps
  | FigureProps
  | TabsProps
  | ShortInputsProps
  | DescriptionListProps
  | TableProps

export type CardContentItemSequence = CardContentItemEntity[]

export interface CardProps {
  card: {
    title: DescribedInlineSequenceOrString
    level?: HeadingLevel
    titleVisuallyHidden?: boolean
    actions?: MenuActionSequence
    body: CardContentItemSequence
  }
}
