import { LayoutItemProps } from '../blocks'
import { WidgetProps } from './Widget'

// Dashboard is an exemplar of Layout.

export interface DashboardProps {
  dashboard: {
    items: (Pick<LayoutItemProps, 'inlineSizeFactor' | 'blockSizeFactor'> & {
      item: WidgetProps
    })[]
  }
}
