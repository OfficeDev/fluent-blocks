import { z } from 'zod'
import { ReactElement } from 'react'
import { propsElementUnion } from '../../lib'

const chartTypes = z.union([
  z.literal('line'),
  z.literal('line-stacked'),
  z.literal('line-area'),
  z.literal('bar'),
  z.literal('bar-stacked'),
  z.literal('bar-horizontal'),
  z.literal('bar-horizontal-stacked'),
  z.literal('pie'),
  z.literal('doughnut'),
  z.literal('bubble'),
])

export const chartProps = z.object({
  chart: z.object({
    type: chartTypes,
  }),
})

export type ChartProps = z.infer<typeof chartProps>

export function Chart(props: ChartProps) {
  const { chart } = props
  return <div>This is a chart of type {chart.type}</div>
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
