import { ReactElement } from 'react'
import { DashboardProps as NaturalDashboardProps } from '@fluent-blocks/schemas'

import { Layout } from '../../Layout'
import { LayoutProps } from '../../layout-properties'
import { WidgetPropsOrElement } from '../../../Card/exemplars/Widget'
import { LayoutItemProps } from '../../LayoutItem'

export interface DashboardProps
  extends Omit<NaturalDashboardProps, 'dashboard'> {
  dashboard: Omit<NaturalDashboardProps['dashboard'], 'items'> & {
    items: (Pick<LayoutItemProps, 'inlineSizeFactor' | 'blockSizeFactor'> & {
      item: WidgetPropsOrElement
    })[]
  }
}

export const dashboardLayout = ({
  dashboard: { items },
}: DashboardProps): LayoutProps => ({
  layout: { variant: 'grid', items },
})

export const Dashboard = (props: DashboardProps) => (
  <Layout {...dashboardLayout(props)} />
)

export type DashboardElement = ReactElement<DashboardProps, typeof Dashboard>
export type DashboardPropsOrElement = DashboardProps | DashboardElement

function isDashboardProps(o: any): o is DashboardProps {
  return 'dashboard' in o
}

function isDashboardElement(o: any): o is DashboardElement {
  return o?.type === Dashboard
}

export function renderIfDashboard(o: any) {
  return isDashboardProps(o) ? (
    <Dashboard {...o} />
  ) : isDashboardElement(o) ? (
    o
  ) : null
}
