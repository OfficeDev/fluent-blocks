import { HeadingProps } from './Heading'
import { ParagraphProps } from './Paragraph'
import { FigureProps } from './Figure'
import { TabsProps } from './Tabs'
import { ShortInputsProps } from './ShortInputs'
import { DescriptionListProps } from './DescriptionList'

export type CardContentItemEntity =
  | HeadingProps
  | ParagraphProps
  | FigureProps
  | TabsProps
  | ShortInputsProps
  | DescriptionListProps

export type CardContentItemSequence = CardContentItemEntity[]

export interface CardProps {
  card: CardContentItemSequence
}
