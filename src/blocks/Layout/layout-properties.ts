import { z } from 'zod'
import { layoutItemPropsOrElement } from './LayoutItem'

export const layoutVariant = z.union([z.literal('grid'), z.literal('flex')])
export type LayoutVariant = z.infer<typeof layoutVariant>

export const layoutProps = z.object({
  layout: z.object({
    variant: layoutVariant,
    items: z.array(layoutItemPropsOrElement),
  }),
})
export type LayoutProps = z.infer<typeof layoutProps>
