import { z } from 'zod'
import { ReactElement } from 'react'
import { Chart as ChartJS } from 'chart.js'
import set from 'lodash/set'

import { propsElementUnion } from '../../lib'

import { PieChart } from './PieChart'
import { chartTypes, chartData } from './chart-types'

set(ChartJS, 'defaults.global.legend.display', false)
set(
  ChartJS,
  'defaults.global.defaultFontFamily',
  `Segoe UI, system-ui, sans-serif`
)

export const chartProps = z.object({
  chart: z.object({
    type: chartTypes,
    title: z.string(),
    data: chartData,
  }),
})

export type ChartProps = z.infer<typeof chartProps>

export function Chart(props: ChartProps) {
  const { chart } = props
  switch (chart.type) {
    case 'pie':
      return <PieChart {...chart} />
    default:
      return null
  }
}

function isChartProps(o: any): o is ChartProps {
  return 'chart' in o
}

function isChartElement(o: any): o is ReactElement<ChartProps, typeof Chart> {
  return o?.type === Chart
}

export const chartPropsOrElement = propsElementUnion<
  typeof chartProps,
  typeof Chart
>(chartProps)
export type ChartPropsOrElement = z.infer<typeof chartPropsOrElement>

export function renderIfChart(o: any) {
  return isChartProps(o) ? <Chart {...o} /> : isChartElement(o) ? o : null
}
