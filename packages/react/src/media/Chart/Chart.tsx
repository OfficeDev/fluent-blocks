import { Chart as ChartJS } from 'chart.js'
import set from 'lodash/set'
import { ReactElement } from 'react'

import { ChartProps as NaturalChartProps } from '@fluent-blocks/schemas'
import { makeStyles } from '@fluentui/react-components'

import { invalidChart } from '../../lib'
import { BubbleChart } from './variants/BubbleChart'
import { HorizontalBarChart } from './variants/HorizontalBarChart'
import { LineChart } from './variants/LineChart'
import { PieChart } from './variants/PieChart'
import { StackedLineChart } from './variants/StackedLineChart'
import { VerticalBarChart } from './variants/VerticalBarChart'

export type ChartProps = NaturalChartProps

set(ChartJS, 'defaults.global.legend.display', false)
set(
  ChartJS,
  'defaults.global.defaultFontFamily',
  `Segoe UI, system-ui, sans-serif`
)

const useChartStyles = makeStyles({
  root: {
    '& canvas': { width: '100% !important' },
  },
})

function ChartInner(props: ChartProps) {
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

export function Chart(props: ChartProps) {
  const chartStyles = useChartStyles()
  return <div className={chartStyles.root}>{ChartInner(props)}</div>
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
