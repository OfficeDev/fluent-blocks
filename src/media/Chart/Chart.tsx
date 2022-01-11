import { z } from 'zod'
import { ReactElement } from 'react'
import { propsElementUnion } from '../../lib'
import { PieChart } from './PieChart'

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

const chartDataset = z.object({
  label: z.string(),
  data: z.union([
    z.array(z.number()),
    z.array(z.object({ x: z.number(), y: z.number(), z: z.number() })),
  ]),
  hidden: z.boolean().optional(),
})

export type ChartDataset = z.infer<typeof chartDataset>

const chartData = z.object({
  labels: z.array(z.string()),
  datasets: z.array(chartDataset),
})

export type ChartData = z.infer<typeof chartData>

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
