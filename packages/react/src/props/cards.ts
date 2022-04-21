import { CardProps as NaturalCardProps } from '@fluent-blocks/schemas'

import {
  DescriptionListPropsOrElement,
  FigurePropsOrElement,
  HeadingPropsOrElement,
  ParagraphPropsOrElement,
  ShortInputsPropsOrElement,
  TablePropsOrElement,
  TabsPropsOrElement,
} from '../blocks'
import { EscapeElement } from '../lib'

export type CardContentItemEntity =
  | HeadingPropsOrElement
  | ParagraphPropsOrElement
  | FigurePropsOrElement
  | TabsPropsOrElement
  | ShortInputsPropsOrElement
  | DescriptionListPropsOrElement
  | TablePropsOrElement
  | EscapeElement

export type CardContentItemSequence = CardContentItemEntity[]

export interface CardProps extends Omit<NaturalCardProps, 'card'> {
  card: CardContentItemSequence
  contextualVariant?: 'block' | 'layout'
}
