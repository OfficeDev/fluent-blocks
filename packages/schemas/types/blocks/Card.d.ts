import { DescriptionListProps } from './DescriptionList'
import { FigureProps } from './Figure'
import { HeadingProps } from './Heading'
import { ParagraphProps } from './Paragraph'
import { ShortInputsProps } from './ShortInputs'
import { TableProps } from './Table'
import { TabsProps } from './Tabs'

export type CardContentItemEntity =
  | HeadingProps
  | ParagraphProps
  | FigureProps
  | TabsProps
  | ShortInputsProps
  | DescriptionListProps
  | TableProps

export type CardContentItemSequence = CardContentItemEntity[]

export interface CardProps {
  card: CardContentItemSequence
}
