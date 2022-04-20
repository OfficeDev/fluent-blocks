import { ReactElement } from 'react'

import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'
// todo: fix this import when it stabilizes
import { Card as FluentCard } from '@fluentui/react-components/unstable'

import {
  Sequence,
  invalidCardContentItem,
  rem,
  renderIfEscape,
  sx,
  useCommonStyles,
  useFluentBlocksContext,
} from '../../lib'
import { CardContentItemEntity, CardProps } from '../../props'
import { renderIfDescriptionList } from '../DescriptionList/DescriptionList'
import { renderIfFigure } from '../Figure/Figure'
import { renderIfHeading } from '../Heading/Heading'
import { renderIfParagraph } from '../Paragraph/Paragraph'
import { renderIfShortInputs } from '../ShortInputs/ShortInputs'
import { renderIfTabs } from '../Tabs/Tabs'
import { WidgetPropsOrElement, renderIfWidget } from './exemplars/Widget'

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
    boxSizing: 'border-box',
    ...sx.padding(rem(12)),
    ...sx.border('1px', 'solid', 'transparent'),
  },
  hc: {
    ...sx.borderColor('var(--colorNeutralForeground1)'),
  },
  layoutItemCard: {
    minHeight: '100%',
  },
  blockCard: {
    marginInlineStart: 'auto',
    marginInlineEnd: 'auto',
    marginBlockStart: rem(20),
    marginBlockEnd: rem(20),
  },
})

export const Card = ({ card, contextualVariant = 'block' }: CardProps) => {
  const commonStyles = useCommonStyles()
  const cardStyles = useCardStyles()
  const { themeName } = useFluentBlocksContext()
  return (
    <FluentCard
      className={cx(
        cardStyles.root,
        commonStyles.elevatedSurface,
        themeName === 'highContrast' && cardStyles.hc,
        contextualVariant === 'block' &&
          commonStyles.mainContentWidthEncapsulated,
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

export type CardElement = ReactElement<CardProps, typeof Card>
export type CardPropsOrElementExact = CardProps | CardElement
export type CardPropsOrElement = WidgetPropsOrElement | CardPropsOrElementExact

function isCardProps(o: any): o is CardProps {
  return 'card' in o
}

function isCardElement(o: any): o is CardElement {
  return o?.type === Card
}

export function renderIfCardExact(o: any) {
  return isCardProps(o) ? <Card {...o} /> : isCardElement(o) ? o : null
}

export function renderIfCard(o: any) {
  return renderIfCardExact(o) || renderIfWidget(o)
}
