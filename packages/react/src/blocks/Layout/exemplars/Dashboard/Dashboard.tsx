import { z } from 'zod'
import { ReactElement } from 'react'
import { dashboardProps as naturalDashboardProps } from '@fluentui/blocks-schemas'

import { propsElementUnion } from '../../../../lib'

import { Layout } from '../../Layout'
import { LayoutProps } from '../../layout-properties'
import { widgetPropsOrElement } from '../../../Card/exemplars/Widget'
import { layoutItemProps } from '../../LayoutItem'

export const dashboardProps = naturalDashboardProps.merge(
  z.object({
    dashboard: naturalDashboardProps.shape.dashboard.merge(
      z.object({
        items: z.array(
          layoutItemProps
            .pick({ inlineSizeFactor: true, blockSizeFactor: true })
            .merge(
              z.object({
                item: widgetPropsOrElement,
              })
            )
        ),
      })
    ),
  })
)
export type DashboardProps = z.infer<typeof dashboardProps>

export const dashboardLayout = ({
  dashboard: { items },
}: DashboardProps): LayoutProps => ({
  layout: { variant: 'grid', items },
})

export const Dashboard = (props: DashboardProps) => (
  <Layout {...dashboardLayout(props)} />
)

function isDashboardProps(o: any): o is DashboardProps {
  return 'dashboard' in o
}

function isDashboardElement(
  o: any
): o is ReactElement<DashboardProps, typeof Dashboard> {
  return o?.type === Dashboard
}

export const dashboardPropsOrElement = propsElementUnion<
  typeof dashboardProps,
  typeof Dashboard
>(dashboardProps)
export type DashboardPropsOrElement = z.infer<typeof dashboardPropsOrElement>

export function renderIfDashboard(o: any) {
  return isDashboardProps(o) ? (
    <Dashboard {...o} />
  ) : isDashboardElement(o) ? (
    o
  ) : null
}
