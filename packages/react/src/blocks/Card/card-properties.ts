import { z } from 'zod'
import { cardProps as naturalCardProps } from '@fluentui/blocks-schemas'

import { headingPropsOrElement } from '../Heading/Heading'
import { paragraphPropsOrElement } from '../Paragraph/Paragraph'
import { figurePropsOrElement } from '../Figure/Figure'
import { tabsPropsOrElement } from '../Tabs/Tabs'
import { shortInputsPropsOrElement } from '../ShortInputs/ShortInputs'
import { descriptionListPropsOrElement } from '../DescriptionList/DescriptionList'
import { escapeElement } from '../../lib'

export const cardContentItemEntity = z.union([
  headingPropsOrElement,
  paragraphPropsOrElement,
  figurePropsOrElement,
  tabsPropsOrElement,
  shortInputsPropsOrElement,
  descriptionListPropsOrElement,
  escapeElement,
])
export type CardContentItemEntity = z.infer<typeof cardContentItemEntity>

export const cardContentItemSequence = z.array(cardContentItemEntity)
export type CardContentItemSequence = z.infer<typeof cardContentItemSequence>

export const cardContextualVariants = {
  contextualVariant: z
    .union([z.literal('block'), z.literal('layout')])
    .default('block')
    .optional(),
}

export const cardProps = naturalCardProps
  .merge(
    z.object({
      card: cardContentItemSequence,
    })
  )
  .extend(cardContextualVariants)
export type CardProps = z.infer<typeof cardProps>
