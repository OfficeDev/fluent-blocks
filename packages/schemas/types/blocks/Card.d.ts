import { InlineSequenceOrString } from '../inlines'
import { MenuActionSequence } from '../lib/menu'
import { DescriptionListProps } from './DescriptionList'
import { FigureProps } from './Figure'
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
    title: InlineSequenceOrString
    titleVisuallyHidden?: boolean
    actions?: MenuActionSequence
    body: CardContentItemSequence
  }
}
