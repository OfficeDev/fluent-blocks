import { ReactElement } from 'react'
import { Chart as ChartJS } from 'chart.js'
import set from 'lodash/set'
import { ChartProps } from '@fluent-blocks/schemas'

import { invalidChart } from '../../lib'

import { PieChart } from './variants/PieChart'
import { VerticalBarChart } from './variants/VerticalBarChart'
import { HorizontalBarChart } from './variants/HorizontalBarChart'
import { LineChart } from './variants/LineChart'
import { StackedLineChart } from './variants/StackedLineChart'
import { BubbleChart } from './variants/BubbleChart'

set(ChartJS, 'defaults.global.legend.display', false)
set(
  ChartJS,
  'defaults.global.defaultFontFamily',
  `Segoe UI, system-ui, sans-serif`
)

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
    case 'bubble':
      return <BubbleChart {...chart} {...{ label }} />
    default:
      return invalidChart(props)
  }
}

export type ChartElement = ReactElement<ChartProps, typeof Chart>
export type ChartPropsOrElement = ChartProps | ChartElement

function isChartProps(o: any): o is ChartProps {
  return 'chart' in o
}

function isChartElement(o: any): o is ChartElement {
  return o?.type === Chart
}

export function renderIfChart(o: any) {
  return isChartProps(o) ? <Chart {...o} /> : isChartElement(o) ? o : null
}
