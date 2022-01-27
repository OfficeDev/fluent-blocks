import { z } from 'zod'
import { headingPropsOrElement } from '../Heading/Heading'
import { paragraphPropsOrElement } from '../Paragraph/Paragraph'
import { figurePropsOrElement } from '../Figure/Figure'
import { tabsPropsOrElement } from '../Tabs/Tabs'
import { shortInputsPropsOrElement } from '../ShortInputs/ShortInputs'
import { escapeElement } from '../../lib'

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

export const cardContextualVariants = z
  .object({
    contextualVariant: z
      .union([z.literal('block'), z.literal('layout')])
      .default('block'),
  })
  .partial()

export const cardProps = z
  .object({
    card: cardContentItemSequence,
  })
  .merge(cardContextualVariants)
export type CardProps = z.infer<typeof cardProps>
