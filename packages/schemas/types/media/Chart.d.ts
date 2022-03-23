import { MediaProps } from './media-properties'

export type ChartType =
  | 'line'
  | 'line-stacked'
  | 'line-area'
  | 'bar'
  | 'bar-stacked'
  | 'bar-horizontal'
  | 'bar-horizontal-stacked'
  | 'pie'
  | 'doughnut'
  | 'bubble'

export type BubbleChartDatum = {
  x: number
  y: number
  z: number
}

export interface ChartDataset {
  label: string
  data: number[] | BubbleChartDatum
  hidden?: boolean
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface ChartProps extends MediaProps {
  chart: {
    type: ChartType
    data: ChartData
  }
}
