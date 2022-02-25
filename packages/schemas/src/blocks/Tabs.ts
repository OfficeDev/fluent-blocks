import { z } from 'zod'
import { buttonProps } from '../inputs'
import { figureProps } from './Figure'
import { headingProps } from './Heading'
import { shortInputsProps } from './ShortInputs'
import { paragraphProps } from './Paragraph'
import { descriptionListProps } from './DescriptionList'

export const tabProps = buttonProps.omit({
  type: true,
  actionId: true,
  variant: true,
  iconVariant: true,
})

export const tabPanelItemEntity = z.union([
  headingProps,
  paragraphProps,
  figureProps,
  shortInputsProps,
  descriptionListProps,
])

export const tabPanelItemSequence = z.array(tabPanelItemEntity)

export const tabsItemProps = z.object({
  tab: tabProps,
  panel: tabPanelItemSequence,
})

export const tabsProps = z.object({
  label: z.string(),
  tabs: z.array(tabsItemProps),
  tabVariant: z
    .union([z.literal('subtle'), z.literal('transparent')])
    .default('transparent')
    .optional(),
  tabListVariant: z
    .union([z.literal('start'), z.literal('center')])
    .default('start')
    .optional(),
})
