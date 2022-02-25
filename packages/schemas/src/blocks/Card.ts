import { z } from 'zod'
import { headingProps } from './Heading'
import { paragraphProps } from './Paragraph'
import { figureProps } from './Figure'
import { tabsProps } from './Tabs'
import { shortInputsProps } from './ShortInputs'
import { descriptionListProps } from './DescriptionList'

export const cardContentItemEntity = z.union([
  headingProps,
  paragraphProps,
  figureProps,
  tabsProps,
  shortInputsProps,
  descriptionListProps,
])

export const cardContentItemSequence = z.array(cardContentItemEntity)

export const cardProps = z.object({
  card: cardContentItemSequence,
})
