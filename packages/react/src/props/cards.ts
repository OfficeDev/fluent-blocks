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
import { InlineSequenceOrString } from '../inlines'
import { EscapeElement } from '../lib'
import { MenuActionSequence } from './menus'

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
  card: Omit<NaturalCardProps['card'], 'title' | 'actions' | 'body'> & {
    title: InlineSequenceOrString
    actions?: MenuActionSequence
    body: CardContentItemSequence
  }
  contextualVariant?: 'block' | 'layout'
}
