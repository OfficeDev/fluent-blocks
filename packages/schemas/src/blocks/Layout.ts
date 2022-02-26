import { z } from 'zod'
import { cardProps } from './Card'

export const layoutItemEntity = cardProps

export const layoutVariant = z.union([z.literal('grid'), z.literal('flex')])

export const layoutItemProps = z.object({
  item: layoutItemEntity,
  inlineSizeFactor: z
    .union([z.literal(1), z.literal(2)])
    .default(1)
    .optional(),
  blockSizeFactor: z
    .union([z.literal(1), z.literal(2)])
    .default(1)
    .optional(),
})

export const layoutProps = z.object({
  layout: z.object({
    variant: layoutVariant,
    items: z.array(layoutItemProps),
  }),
})
