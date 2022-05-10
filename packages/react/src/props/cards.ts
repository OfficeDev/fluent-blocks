import { CardProps as NaturalCardProps } from '@fluent-blocks/schemas'

import {
  DescriptionListPropsOrElement,
  FigurePropsOrElement,
  HeadingPropsOrElement,
  ParagraphPropsOrElement,
  ShortInputsPropsOrElement,
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
  | EscapeElement

export type CardContentItemSequence = CardContentItemEntity[]

export interface CardProps extends Omit<NaturalCardProps, 'card'> {
  card: CardContentItemSequence
  contextualVariant?: 'block' | 'layout'
}
