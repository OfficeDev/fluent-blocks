import { z } from 'zod'
import { ReactElement } from 'react'
// todo: fix this import when Card is released directly from @fluentui/react-components
// eslint-disable-next-line import/no-extraneous-dependencies
import { Card as FluentCard } from '@fluentui/react-card'

import {
  escapeElement,
  invalidCardContentItem,
  propsElementUnion,
  renderIfEscape,
  Sequence,
} from '../../lib'
import {
  paragraphPropsOrElement,
  renderIfParagraph,
} from '../Paragraph/Paragraph'
import { figurePropsOrElement, renderIfFigure } from '../Figure/Figure'
import { headingPropsOrElement, renderIfHeading } from '../Heading/Heading'

export const cardContentItemEntity = z.union([
  headingPropsOrElement,
  paragraphPropsOrElement,
  figurePropsOrElement,
  escapeElement,
])
export type CardContentItemEntity = z.infer<typeof cardContentItemEntity>

export const cardContentItemSequence = z.array(cardContentItemEntity)
export type CardContentItemSequence = z.infer<typeof cardContentItemSequence>

export const cardProps = z.object({
  card: cardContentItemSequence,
})
export type CardProps = z.infer<typeof cardProps>

const CardContentItem = (o: CardContentItemEntity) =>
  renderIfHeading(o) ||
  renderIfParagraph(o) ||
  renderIfFigure(o) ||
  renderIfEscape(o) ||
  invalidCardContentItem(o)

export const Card = ({ card }: CardProps) => (
  <FluentCard>
    {Sequence<CardContentItemEntity>(card, CardContentItem, {
      contextualVariant: 'card',
    })}
  </FluentCard>
)

function isCardProps(o: any): o is CardProps {
  return 'card' in o
}

function isCardElement(o: any): o is ReactElement<CardProps, typeof Card> {
  return o?.type === Card
}

export const cardPropsOrElement = propsElementUnion<
  typeof cardProps,
  typeof Card
>(cardProps)
export type CardPropsOrElement = z.infer<typeof cardPropsOrElement>

export function renderIfCard(o: any) {
  return isCardProps(o) ? <Card {...o} /> : isCardElement(o) ? o : null
}
