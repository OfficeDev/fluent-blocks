import { z } from 'zod'
import { ReactElement } from 'react'
import { Chart as ChartJS } from 'chart.js'
import set from 'lodash/set'

import { propsElementUnion } from '../../lib'

import { mediaProps } from '../media-properties'
import { chartTypes, chartData } from './chart-types'
import { PieChart } from './variants/PieChart'
import { VerticalBarChart } from './variants/VerticalBarChart'
import { HorizontalBarChart } from './variants/HorizontalBarChart'
import { LineChart } from './variants/LineChart'
import { StackedLineChart } from './variants/StackedLineChart'

set(ChartJS, 'defaults.global.legend.display', false)
set(
  ChartJS,
  'defaults.global.defaultFontFamily',
  `Segoe UI, system-ui, sans-serif`
)

export const chartProps = mediaProps.merge(
  z.object({
    chart: z.object({
      type: chartTypes,
      title: z.string(),
      data: chartData,
    }),
  })
)

export type ChartProps = z.infer<typeof chartProps>

export function Chart(props: ChartProps) {
  const { chart, label } = props
  switch (chart.type) {
    case 'pie':
      return <PieChart {...chart} {...{ label }} />
    case 'doughnut':
      return <PieChart {...chart} {...{ label }} cutoutPercentage={70} />
    case 'bar':
      return <VerticalBarChart {...chart} {...{ label }} />
    case 'bar-stacked':
      return <VerticalBarChart {...chart} {...{ label }} stacked />
    case 'bar-horizontal':
      return <HorizontalBarChart {...chart} {...{ label }} />
    case 'bar-horizontal-stacked':
      return <HorizontalBarChart {...chart} {...{ label }} stacked />
    case 'line':
      return <LineChart {...chart} {...{ label }} />
    case 'line-area':
      return <LineChart {...chart} {...{ label }} gradients />
    case 'line-stacked':
      return <StackedLineChart {...chart} {...{ label }} />
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
