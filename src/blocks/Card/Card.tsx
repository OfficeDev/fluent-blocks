import { z } from 'zod'
import { ReactElement } from 'react'
// todo: fix this import when Card is released directly from @fluentui/react-components
// eslint-disable-next-line import/no-extraneous-dependencies
import { Card as FluentCard } from '@fluentui/react-card'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import {
  invalidCardContentItem,
  propsElementUnion,
  rem,
  renderIfEscape,
  Sequence,
  useCommonStyles,
  useFluentPatternsContext,
} from '../../lib'
import { renderIfParagraph } from '../Paragraph/Paragraph'
import { renderIfHeading } from '../Heading/Heading'
import { renderIfFigure } from '../Figure/Figure'
import { renderIfTabs } from '../Tabs/Tabs'
import { renderIfShortInputs } from '../ShortInputs/ShortInputs'
import { renderIfDescriptionList } from '../DescriptionList/DescriptionList'
import { renderIfWidget, widgetPropsOrElement } from './exemplars/Widget'
import { CardContentItemEntity, CardProps, cardProps } from './card-properties'

const CardContentItem = (o: CardContentItemEntity) =>
  renderIfHeading(o) ||
  renderIfParagraph(o) ||
  renderIfFigure(o) ||
  renderIfTabs(o) ||
  renderIfShortInputs(o) ||
  renderIfDescriptionList(o) ||
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
  blockCard: {
    marginInlineStart: 'auto',
    marginInlineEnd: 'auto',
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
        commonStyles.elevatedSurface,
        themeName === 'high-contrast' && cardStyles.hc,
        contextualVariant === 'block' && commonStyles.mainContentWidth,
        contextualVariant === 'block' && cardStyles.blockCard,
        contextualVariant === 'layout' && cardStyles.layoutItemCard
      )}
      tabIndex={0}
    >
      {Sequence<CardContentItemEntity>(card, CardContentItem, {
        contextualVariant: 'card',
      })}
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
