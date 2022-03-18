import { z } from 'zod'
import { layoutProps as naturalLayoutProps } from '@fluent-blocks/schemas'
import { layoutItemPropsOrElement } from './LayoutItem'

export const layoutProps = naturalLayoutProps.merge(
  z.object({
    layout: naturalLayoutProps.shape.layout.merge(
      z.object({
        items: z.array(layoutItemPropsOrElement),
      })
    ),
  })
)
export type LayoutProps = z.infer<typeof layoutProps>
