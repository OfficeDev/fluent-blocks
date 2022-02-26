import { z } from 'zod'
import { layoutItemProps } from '../blocks'
import { widgetProps } from './Widget'

// Dashboard is an exemplar of Layout.

export const dashboardProps = z.object({
  dashboard: z.object({
    items: z.array(
      layoutItemProps
        .pick({ inlineSizeFactor: true, blockSizeFactor: true })
        .merge(
          z.object({
            item: widgetProps,
          })
        )
    ),
  }),
})
