import { CardProps as NaturalCardProps } from '@fluent-blocks/schemas'

import { HeadingPropsOrElement } from '../Heading/Heading'
import { ParagraphPropsOrElement } from '../Paragraph/Paragraph'
import { FigurePropsOrElement } from '../Figure/Figure'
import { TabsPropsOrElement } from '../Tabs/Tabs'
import { ShortInputsPropsOrElement } from '../ShortInputs/ShortInputs'
import { DescriptionListPropsOrElement } from '../DescriptionList/DescriptionList'
import { EscapeElement } from '../../lib'

export type CardContentItemEntity =
  | HeadingPropsOrElement
  | ParagraphPropsOrElement
  | FigurePropsOrElement
  | TabsPropsOrElement
  | ShortInputsPropsOrElement
  | DescriptionListPropsOrElement
  | EscapeElement

export type CardContentItemSequence = CardContentItemEntity[]

export interface CardProps extends Omit<NaturalCardProps, 'card'> {
  card: CardContentItemSequence
  contextualVariant?: 'block' | 'layout'
}
