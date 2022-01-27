import { z } from 'zod'
import { ReactElement } from 'react'
// todo: fix this import when Card is released directly from @fluentui/react-components
// eslint-disable-next-line import/no-extraneous-dependencies
import { Card as FluentCard } from '@fluentui/react-card'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import {
  escapeElement,
  invalidCardContentItem,
  propsElementUnion,
  rem,
  renderIfEscape,
  Sequence,
  useCommonStyles,
  useFluentPatternsContext,
} from '../../lib'
import {
  paragraphPropsOrElement,
  renderIfParagraph,
} from '../Paragraph/Paragraph'
import { headingPropsOrElement, renderIfHeading } from '../Heading/Heading'
import { figurePropsOrElement, renderIfFigure } from '../Figure/Figure'
import { tabsPropsOrElement, renderIfTabs } from '../Tabs/Tabs'
import {
  renderIfShortInputs,
  shortInputsPropsOrElement,
} from '../ShortInputs/ShortInputs'
import { renderIfWidget, widgetPropsOrElement } from './exemplars/Widget'

export const cardContentItemEntity = z.union([
  headingPropsOrElement,
  paragraphPropsOrElement,
  figurePropsOrElement,
  tabsPropsOrElement,
  shortInputsPropsOrElement,
  escapeElement,
])
export type CardContentItemEntity = z.infer<typeof cardContentItemEntity>

export const cardContentItemSequence = z.array(cardContentItemEntity)
export type CardContentItemSequence = z.infer<typeof cardContentItemSequence>

export const cardProps = z
  .object({
    card: cardContentItemSequence,
  })
  .merge(
    z
      .object({
        contextualVariant: z
          .union([z.literal('block'), z.literal('layout')])
          .default('block'),
      })
      .partial()
  )
export type CardProps = z.infer<typeof cardProps>

const CardContentItem = (o: CardContentItemEntity) =>
  renderIfHeading(o) ||
  renderIfParagraph(o) ||
  renderIfFigure(o) ||
  renderIfTabs(o) ||
  renderIfShortInputs(o) ||
  renderIfEscape(o) ||
  invalidCardContentItem(o)

const useCardStyles = makeStyles({
  root: {
    padding: rem(20),
  },
  hc: (theme) => ({
    borderColor: theme.colorNeutralForeground1,
    borderWidth: '1px',
    borderStyle: 'solid',
  }),
  layoutItemCard: {
    minHeight: '100%',
    boxSizing: 'border-box',
  },
})

export const Card = ({ card, contextualVariant = 'block' }: CardProps) => {
  const commonStyles = useCommonStyles()
  const cardStyles = useCardStyles()
  const { themeName } = useFluentPatternsContext()
  return (
    <FluentCard
      className={cx(
        cardStyles.root,
        themeName === 'high-contrast' && cardStyles.hc,
        contextualVariant === 'block' && commonStyles.mainContentWidth,
        contextualVariant === 'block' && commonStyles.centerBlock,
        contextualVariant === 'layout' && cardStyles.layoutItemCard
      )}
    >
      <div className={commonStyles.elevatedSurface}>
        {Sequence<CardContentItemEntity>(card, CardContentItem, {
          contextualVariant: 'card',
        })}
      </div>
    </FluentCard>
  )
}

function isCardProps(o: any): o is CardProps {
  return 'card' in o
}

function isCardElement(o: any): o is ReactElement<CardProps, typeof Card> {
  return o?.type === Card
}

export const cardPropsOrElementExact = propsElementUnion<
  typeof cardProps,
  typeof Card
>(cardProps)
export type CardPropsOrElementExact = z.infer<typeof cardPropsOrElementExact>

export function renderIfCardExact(o: any) {
  return isCardProps(o) ? <Card {...o} /> : isCardElement(o) ? o : null
}

export const cardPropsOrElement = z.union([
  cardPropsOrElementExact,
  widgetPropsOrElement,
])
export type CardPropsOrElement = z.infer<typeof cardPropsOrElement>

export function renderIfCard(o: any) {
  return renderIfCardExact(o) || renderIfWidget(o)
}
